import { NextRequest, NextResponse } from 'next/server';
import { getCachedCards } from '@/lib/scraper';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'all';
  const color = searchParams.get('color') || 'all';
  const q = (searchParams.get('q') || '').toLowerCase();

  let cards = getCachedCards();

  if (type !== 'all') cards = cards.filter(c => c.type === type);
  if (color !== 'all') cards = cards.filter(c => c.color === color);
  if (q) cards = cards.filter(c => c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q));

  cards.sort((a, b) => b.playRate - a.playRate);

  return NextResponse.json(
    { cards, total: cards.length },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}
