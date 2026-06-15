import { getCachedLeaders, getCacheMeta } from '@/lib/scraper';
import { Page, StatCard, StatGrid, TierBadge, WinRateBar, ShareBar, ColorDots, TableWrap } from '@/components/ui';

export const revalidate = 3600;

export default function LeadersPage() {
  const leaders = getCachedLeaders('OP16');
  const meta = getCacheMeta();

  const sTier = leaders.filter(l => l.tier === 'S');
  const aTier = leaders.filter(l => l.tier === 'A');
  const bTier = leaders.filter(l => l.tier === 'B');
  const cTier = leaders.filter(l => l.tier === 'C');

  const sorted = [...leaders].sort((a, b) => b.winRate - a.winRate);

  return (
    <Page>
      <div style={{ marginBottom: 24 }}>
        <div className="font-display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>
          Leader Performance
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>
          {leaders.length} leaders tracked · {meta.totalMatches.toLocaleString()}+ matches · OP-16
        </div>
      </div>

      <StatGrid>
        <StatCard label="S-Tier" value={sTier.length} sub="≥55% win rate" accent="var(--accent)" />
        <StatCard label="A-Tier" value={aTier.length} sub="53–55% win rate" accent="var(--green)" />
        <StatCard label="B-Tier" value={bTier.length} sub="51–53% win rate" accent="var(--blue)" />
        <StatCard label="C-Tier" value={cTier.length} sub="Below 51%" accent="var(--muted)" />
      </StatGrid>

      <TableWrap
        title="All Leaders — OP-16"
        subtitle="Sorted by win rate · click column headers to sort · sources updated hourly"
        sourceLinks={[
          { label: 'opmetagame.com', href: 'https://opmetagame.com/decks/' },
          { label: 'op-leaderboard.com', href: 'https://op-leaderboard.com/leader' },
          { label: 'limitlesstcg.com', href: 'https://onepiece.limitlesstcg.com/decks' },
        ]}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
            <thead>
              <tr>
                {['#', 'Leader', 'ID', 'Tier', 'Win Rate', 'Going 1st', 'Going 2nd', 'Meta Share', 'Decks', 'Colors'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '10px 16px', fontSize: 11,
                    color: 'var(--muted)', fontWeight: 500, textTransform: 'uppercase',
                    letterSpacing: '0.05em', borderBottom: '1px solid var(--border)',
                    whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((l, i) => (
                <tr key={l.id}
                  
                  
                >
                  <td style={{ padding: '12px 16px', color: i < 3 ? 'var(--accent)' : 'var(--muted)', fontWeight: 600, fontSize: 12 }}>{i + 1}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 500, whiteSpace: 'nowrap' }}>{l.name}</td>
                  <td style={{ padding: '12px 16px', fontSize: 11, color: 'var(--muted)' }}>{l.id}</td>
                  <td style={{ padding: '12px 16px' }}><TierBadge tier={l.tier} /></td>
                  <td style={{ padding: '12px 16px' }}><WinRateBar value={l.winRate} /></td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: l.goingFirstWr >= 50 ? 'var(--green)' : 'var(--red)' }}>
                    {l.goingFirstWr}%
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: l.goingSecondWr >= 50 ? 'var(--green)' : 'var(--red)' }}>
                    {l.goingSecondWr}%
                  </td>
                  <td style={{ padding: '12px 16px' }}><ShareBar value={l.metaShare} /></td>
                  <td style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: 13 }}>{l.deckCount}</td>
                  <td style={{ padding: '12px 16px' }}><ColorDots colors={l.colors} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableWrap>
    </Page>
  );
}
