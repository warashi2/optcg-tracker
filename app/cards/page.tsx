import { getCachedCards, getCacheMeta } from '@/lib/scraper';
import { Page, StatCard, StatGrid, WinRateBar, TableWrap } from '@/components/ui';

export const revalidate = 3600;

export default function CardsPage() {
  const cards = getCachedCards();
  const meta = getCacheMeta();
  const chars = cards.filter(c => c.type === 'Character');
  const events = cards.filter(c => c.type === 'Event');
  const top = cards[0];

  return (
    <Page>
      <div style={{ marginBottom: 24 }}>
        <div className="font-display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Card Popularity</div>
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>
          Play rate = % of same-color tournament decks running this card · OP-16 · {meta.totalMatches.toLocaleString()}+ matches
        </div>
      </div>
      <StatGrid>
        <StatCard label="Cards Tracked" value={cards.length} sub="OP-16 meta" accent="var(--accent)" />
        <StatCard label="Characters" value={chars.length} sub={`Top: ${chars[0]?.name || '—'}`} />
        <StatCard label="Events" value={events.length} sub={`Top: ${events[0]?.name || '—'}`} />
        <StatCard label="Top Play Rate" value={`${top?.playRate}%`} sub={top?.name} accent="var(--green)" />
      </StatGrid>
      <TableWrap
        title="Most Played Cards"
        subtitle="Ordered by tournament play rate · 100% = in every deck of that color"
        sourceLinks={[
          { label: 'op-leaderboard.com/card-popularity', href: 'https://op-leaderboard.com/card-popularity' },
          { label: 'optcgapi.com', href: 'https://optcgapi.com/' },
        ]}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr>
                {['#', 'Card', 'Set', 'Type', 'Color', 'Cost', 'Play Rate', 'Avg Copies'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: 11, color: 'var(--muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cards.map((c, i) => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', color: i < 3 ? 'var(--accent)' : 'var(--muted)', fontWeight: 600, fontSize: 12 }}>{i + 1}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontWeight: 500 }}>{c.name}</span>
                    <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 8 }}>{c.id}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--muted)' }}>{c.set}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 500, background: c.type === 'Character' ? 'rgba(90,159,232,0.15)' : c.type === 'Event' ? 'rgba(155,126,232,0.15)' : 'rgba(74,206,160,0.12)', color: c.type === 'Character' ? 'var(--blue)' : c.type === 'Event' ? 'var(--purple)' : 'var(--green)' }}>{c.type}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className={`color-dot c-${c.color}`} />
                      <span style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'capitalize' }}>{c.color}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: 13 }}>{c.cost}</td>
                  <td style={{ padding: '12px 16px' }}><WinRateBar value={c.playRate} /></td>
                  <td style={{ padding: '12px 16px', color: 'var(--accent)', fontWeight: 600 }}>×{c.avgCopies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableWrap>
    </Page>
  );
}
