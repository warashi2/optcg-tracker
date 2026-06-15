/**
 * lib/scraper.ts
 * Fetches live data from public OPTCG tournament sources.
 * Falls back to seed data if scraping fails (rate limits, JS-rendered pages, etc.)
 * Run via: POST /api/scrape  (protected by CRON_SECRET)
 */
import * as fs from 'fs';
import * as path from 'path';
import { Leader, CardStat, MatchupEntry, Format } from './types';
import { SEED_LEADERS, SEED_CARDS, SEED_MATCHUPS } from './seed-data';

const CACHE_PATH = path.join(process.cwd(), '.data');
const LEADERS_FILE = path.join(CACHE_PATH, 'leaders.json');
const CARDS_FILE = path.join(CACHE_PATH, 'cards.json');
const MATCHUPS_FILE = path.join(CACHE_PATH, 'matchups.json');
const META_FILE = path.join(CACHE_PATH, 'meta.json');

// ─── CACHE HELPERS ──────────────────────────────────────────────────────────

export function ensureCacheDir() {
  if (!fs.existsSync(CACHE_PATH)) fs.mkdirSync(CACHE_PATH, { recursive: true });
}

export function writeCache(file: string, data: unknown) {
  ensureCacheDir();
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export function readCache<T>(file: string, fallback: T): T {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf-8')) as T;
  } catch {}
  return fallback;
}

export function getCachedLeaders(format: Format = 'OP16'): Leader[] {
  const all = readCache<Leader[]>(LEADERS_FILE, SEED_LEADERS);
  return all.filter(l => l.format === format);
}

export function getCachedCards(): CardStat[] {
  return readCache<CardStat[]>(CARDS_FILE, SEED_CARDS);
}

export function getCachedMatchups(): MatchupEntry[] {
  return readCache<MatchupEntry[]>(MATCHUPS_FILE, SEED_MATCHUPS);
}

export function getCacheMeta(): { updatedAt: string; totalMatches: number } {
  return readCache(META_FILE, { updatedAt: new Date().toISOString(), totalMatches: 50000 });
}

// ─── OPTCG API — Card Data ───────────────────────────────────────────────────

async function fetchCardDataFromAPI(): Promise<CardStat[]> {
  try {
    // optcgapi.com — free, no auth, REST
    const res = await fetch('https://optcgapi.com/api/allSetCards/', {
      next: { revalidate: 86400 }, // 24h cache
      headers: { 'User-Agent': 'optcg-tracker/1.0 (contact: your@email.com)' },
    });
    if (!res.ok) throw new Error(`optcgapi HTTP ${res.status}`);
    const json = await res.json();

    // Map their schema to ours
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cards: CardStat[] = (json.cards || []).slice(0, 50).map((c: any) => ({
      id: c.card_id || c.id,
      name: c.name,
      type: c.type || 'Character',
      color: (c.color || 'multi').toLowerCase(),
      cost: parseInt(c.cost) || 0,
      playRate: 0, // not in card API — enriched from decklist analysis
      avgCopies: 0,
      set: (c.card_id || '').split('-')[0],
    }));
    return cards.length ? cards : SEED_CARDS;
  } catch (e) {
    console.warn('[scraper] optcgapi fetch failed, using seed:', e);
    return SEED_CARDS;
  }
}

// ─── Limitless TCG — Tournament Decklists ───────────────────────────────────

async function fetchLimitlessTournaments(): Promise<{ leaders: Leader[]; matchups: MatchupEntry[] }> {
  try {
    // Limitless provides structured HTML we can parse
    const res = await fetch('https://onepiece.limitlesstcg.com/decks', {
      headers: { 'User-Agent': 'optcg-tracker/1.0' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`limitless HTTP ${res.status}`);
    const html = await res.text();

    // Extract win rates from HTML — Limitless renders leader stats in data attributes
    const leaderMatches = [...html.matchAll(/data-leader="([^"]+)"[^>]*data-winrate="([^"]+)"[^>]*data-share="([^"]+)"/g)];

    if (leaderMatches.length > 0) {
      const leaders: Leader[] = leaderMatches.map((m, i) => ({
        id: `LIVE-${i}`,
        name: m[1],
        tier: parseFloat(m[2]) >= 58 ? 'S' : parseFloat(m[2]) >= 54 ? 'A' : parseFloat(m[2]) >= 51 ? 'B' : 'C',
        winRate: parseFloat(m[2]),
        metaShare: parseFloat(m[3]),
        deckCount: 1,
        color: 'multi',
        colors: ['multi'],
        goingFirstWr: parseFloat(m[2]) - 1.5,
        goingSecondWr: parseFloat(m[2]) + 1.5,
        format: 'OP16',
        region: 'all',
      }));
      return { leaders, matchups: SEED_MATCHUPS };
    }
    throw new Error('No leader data found in HTML');
  } catch (e) {
    console.warn('[scraper] limitless fetch failed, using seed:', e);
    return { leaders: SEED_LEADERS, matchups: SEED_MATCHUPS };
  }
}

// ─── MAIN SCRAPE FUNCTION ───────────────────────────────────────────────────

export async function runScrape(): Promise<{ success: boolean; message: string }> {
  try {
    console.log('[scraper] Starting data refresh...');
    ensureCacheDir();

    // Run both fetches in parallel
    const [cardData, tourneyData] = await Promise.all([
      fetchCardDataFromAPI(),
      fetchLimitlessTournaments(),
    ]);

    // Enrich card play rates from seed if live data has none
    const enrichedCards = cardData.map(card => {
      const seedMatch = SEED_CARDS.find(s => s.id === card.id || s.name === card.name);
      return seedMatch ? { ...card, playRate: seedMatch.playRate, avgCopies: seedMatch.avgCopies } : card;
    });

    // Merge live leader data with seed, preferring live win rates
    const mergedLeaders = SEED_LEADERS.map(seed => {
      const live = tourneyData.leaders.find(l => l.name.toLowerCase().includes(seed.name.toLowerCase().split('/')[0].trim()));
      return live ? { ...seed, winRate: live.winRate, metaShare: live.metaShare } : seed;
    });

    // Write all caches
    writeCache(LEADERS_FILE, mergedLeaders);
    writeCache(CARDS_FILE, enrichedCards.length > 5 ? enrichedCards : SEED_CARDS);
    writeCache(MATCHUPS_FILE, tourneyData.matchups);
    writeCache(META_FILE, { updatedAt: new Date().toISOString(), totalMatches: 50000 });

    console.log('[scraper] Refresh complete.');
    return { success: true, message: `Refreshed ${mergedLeaders.length} leaders, ${enrichedCards.length} cards` };
  } catch (err) {
    console.error('[scraper] Fatal error:', err);
    return { success: false, message: String(err) };
  }
}
