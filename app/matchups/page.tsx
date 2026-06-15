import { getCachedMatchups, getCachedLeaders } from '@/lib/scraper';
import { Page, StatCard, StatGrid, TableWrap } from '@/components/ui';

export const revalidate = 3600;

export default function MatchupsPage() {
  const matchups = getCachedMatchups();
  const leaders = getCachedLeaders('OP16').filter(l => l.tier === 'S' || l.tier === 'A');
  const leaderNames = Array.from(new Set(matchups.map(m => m.leader)));

  const getWr = (leader: string, opp: string) => {
    const m = matchups.find(x => x.leader === leader && x.opponent === opp);
    return m ? m.winRate : null;
  };

  const best = [...matchups].sort((a, b) => b.winRate - a.winRate)[0];
  const worst = [...matchups].filter(m => m.leader !== m.opponent).sort((a, b) => a.winRate - b.winRate)[0];
  const mosEven = [...matchups].filter(m => m.leader !== m.opponent).sort((a, b) => Math.abs(a.winRate - 50) - Math.abs(b.winRate - 50))[0];

  return (
    <Page>
      <div style={{ marginBottom: 24 }}>
        <div className="font-display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>
          Matchup Matrix
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>
          Row leader win % vs column leader · green ≥58% · amber 50–57% · red &lt;50%
        </div>
      </div>

      <StatGrid>
        <StatCard label="Best Matchup" value={`${best?.winRate}%`} sub={`${best?.leader} vs ${best?.opponent}`} accent="var(--green)" />
        <StatCard label="Most Even" value={`${mosEven?.winRate}%`} sub={`${mosEven?.leader} vs ${mosEven?.opponent}`} />
        <StatCard label="Hardest Counter" value={`${worst?.winRate}%`} sub={`${worst?.leader} vs ${worst?.opponent}`} accent="var(--red)" />
        <StatCard label="Matchup Pairs" value={matchups.length} sub="S/A tier leaders" accent="var(--accent)" />
      </StatGrid>

      <TableWrap
        title="Head-to-Head Win Rates"
        subtitle="Row = attacking leader · Column = opponent · % = row leader win rate"
        sourceLinks={[
          { label: 'op-leaderboard.com/matchups', href: 'https://op-leaderboard.com/matchups' },
          { label: 'opmetagame.com', href: 'https://opmetagame.com' },
        ]}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, color: 'var(--muted)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap', minWidth: 160 }}>
                  vs →
                </th>
                {leaderNames.map(opp => (
                  <th key={opp} style={{
                    padding: '10px 12px', textAlign: 'center', fontSize: 10,
                    color: 'var(--muted)', borderBottom: '1px solid var(--border)',
                    whiteSpace: 'nowrap', minWidth: 80,
                  }}>
                    {opp.split('/')[0].split(' ').slice(-1)[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leaderNames.map(leader => (
                <tr key={leader}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, whiteSpace: 'nowrap', borderBottom: '1px solid var(--border)' }}>
                    {leader}
                  </td>
                  {leaderNames.map(opp => {
                    if (leader === opp) return (
                      <td key={opp} style={{ padding: '12px', textAlign: 'center', background: 'var(--surface2)', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>—</td>
                    );
                    const wr = getWr(leader, opp);
                    if (wr === null) return (
                      <td key={opp} style={{ padding: '12px', textAlign: 'center', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>?</td>
                    );
                    const bg = wr >= 58 ? 'rgba(74,206,160,0.18)' : wr >= 53 ? 'rgba(232,200,74,0.12)' : 'rgba(232,90,74,0.12)';
                    const col = wr >= 58 ? 'var(--green)' : wr >= 53 ? 'var(--accent)' : 'var(--red)';
                    return (
                      <td key={opp} style={{ padding: '12px', textAlign: 'center', background: bg, color: col, fontWeight: 700, fontSize: 14, borderBottom: '1px solid var(--border)' }}>
                        {wr}%
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: 20, fontSize: 12 }}>
          <span style={{ color: 'var(--green)' }}>■ ≥58% — Favourable</span>
          <span style={{ color: 'var(--accent)' }}>■ 53–57% — Slight edge</span>
          <span style={{ color: 'var(--red)' }}>■ &lt;53% — Unfavourable</span>
        </div>
      </TableWrap>

      {/* Detailed breakdown table */}
      <div style={{ marginTop: 24 }}>
        <TableWrap title="All Matchup Details" subtitle="Sorted by win rate · includes sample size">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Leader', 'vs Opponent', 'Win Rate', 'Sample Size', 'Edge'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: 11, color: 'var(--muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...matchups].sort((a, b) => b.winRate - a.winRate).map((m, i) => {
                  const edge = m.winRate - 50;
                  const col = m.winRate >= 58 ? 'var(--green)' : m.winRate >= 53 ? 'var(--accent)' : 'var(--red)';
                  return (
                    <tr key={i}  >
                      <td style={{ padding: '11px 16px', fontWeight: 500 }}>{m.leader}</td>
                      <td style={{ padding: '11px 16px', color: 'var(--muted)' }}>{m.opponent}</td>
                      <td style={{ padding: '11px 16px', color: col, fontWeight: 700 }}>{m.winRate}%</td>
                      <td style={{ padding: '11px 16px', color: 'var(--muted)', fontSize: 12 }}>{m.sampleSize.toLocaleString()} matches</td>
                      <td style={{ padding: '11px 16px', color: edge > 0 ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}>
                        {edge > 0 ? '+' : ''}{edge}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TableWrap>
      </div>
    </Page>
  );
}
