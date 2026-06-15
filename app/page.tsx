import { getCachedLeaders, getCachedCards, getCachedMatchups, getCacheMeta } from '@/lib/scraper';
import { Page, StatCard, StatGrid, TierBadge, WinRateBar, ShareBar, ColorDots, TableWrap } from '@/components/ui';
import Link from 'next/link';

export const revalidate = 3600;

export default function HomePage() {
  const leaders = getCachedLeaders('OP16');
  const cards = getCachedCards();
  const matchups = getCachedMatchups();
  const meta = getCacheMeta();

  const topLeader = [...leaders].sort((a, b) => b.winRate - a.winRate)[0];
  const topMeta = [...leaders].sort((a, b) => b.metaShare - a.metaShare)[0];
  const topCard = cards[0];
  const updated = new Date(meta.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <Page>
      <div style={{ marginBottom: 28 }}>
        <div className="font-display" style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
          OP-16 Meta Dashboard
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>
          Live data from tournament top-cuts · {meta.totalMatches.toLocaleString()}+ matches tracked · Last updated {updated}
        </div>
      </div>

      <StatGrid>
        <StatCard label="Leaders Tracked" value={leaders.length} sub="OP-16 format" accent="var(--accent)" />
        <StatCard label="Matches Logged" value={`${Math.round(meta.totalMatches / 1000)}k+`} sub="Bayesian-adjusted" />
        <StatCard label="Top Win Rate" value={`${topLeader?.winRate}%`} sub={topLeader?.name} accent="var(--green)" />
        <StatCard label="Most Played" value={topMeta?.name?.split('/')[0] || ''} sub={`${topMeta?.metaShare}% meta share`} accent="var(--accent)" />
        <StatCard label="Top Card" value={topCard?.name || ''} sub={`${topCard?.playRate}% play rate`} accent="var(--purple)" />
        <StatCard label="Matchups Tracked" value={matchups.length} sub="Head-to-head pairs" />
      </StatGrid>

      <div style={{ marginBottom: 24 }}>
        <TableWrap title="Top Leaders — OP-16" subtitle="S & A tier sorted by win rate"
          sourceLinks={[
            { label: 'opmetagame.com', href: 'https://opmetagame.com/decks/' },
            { label: 'op-leaderboard.com', href: 'https://op-leaderboard.com/leader' },
          ]}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['#','Leader','Tier','Win Rate','Meta Share','Colors'].map(h => (
              <th key={h} style={{ textAlign:'left', padding:'10px 16px', fontSize:11, color:'var(--muted)', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.05em', borderBottom:'1px solid var(--border)' }}>{h}</th>
            ))}</tr></thead>
            <tbody>
              {leaders.filter(l => l.tier === 'S' || l.tier === 'A').sort((a,b) => b.winRate - a.winRate).map((l,i) => (
                <tr key={l.id}  >
                  <td style={{ padding:'12px 16px', color:i<3?'var(--accent)':'var(--muted)', fontWeight:600 }}>{i+1}</td>
                  <td style={{ padding:'12px 16px', fontWeight:500 }}>{l.name}</td>
                  <td style={{ padding:'12px 16px' }}><TierBadge tier={l.tier} /></td>
                  <td style={{ padding:'12px 16px' }}><WinRateBar value={l.winRate} /></td>
                  <td style={{ padding:'12px 16px' }}><ShareBar value={l.metaShare} /></td>
                  <td style={{ padding:'12px 16px' }}><ColorDots colors={l.colors} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
        <div style={{ textAlign:'right', marginTop:10 }}>
          <Link href="/leaders" style={{ fontSize:13, color:'var(--blue)', textDecoration:'none' }}>View all {leaders.length} leaders →</Link>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <TableWrap title="Most Played Cards — OP-16" subtitle="Play rate across tournament top-cut decklists"
          sourceLinks={[{ label:'op-leaderboard.com/card-popularity', href:'https://op-leaderboard.com/card-popularity' }]}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr>{['#','Card','Type','Color','Cost','Play Rate','× Copies'].map(h => (
              <th key={h} style={{ textAlign:'left', padding:'10px 16px', fontSize:11, color:'var(--muted)', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.05em', borderBottom:'1px solid var(--border)' }}>{h}</th>
            ))}</tr></thead>
            <tbody>
              {cards.slice(0,8).map((c,i) => (
                <tr key={c.id}  >
                  <td style={{ padding:'12px 16px', color:i<3?'var(--accent)':'var(--muted)', fontWeight:600 }}>{i+1}</td>
                  <td style={{ padding:'12px 16px', fontWeight:500 }}>{c.name}<span style={{ fontSize:11, color:'var(--muted)', marginLeft:8 }}>{c.id}</span></td>
                  <td style={{ padding:'12px 16px' }}>
                    <span style={{ fontSize:10, padding:'2px 6px', borderRadius:4, fontWeight:500, background:c.type==='Character'?'rgba(90,159,232,0.15)':c.type==='Event'?'rgba(155,126,232,0.15)':'rgba(74,206,160,0.12)', color:c.type==='Character'?'var(--blue)':c.type==='Event'?'var(--purple)':'var(--green)' }}>{c.type}</span>
                  </td>
                  <td style={{ padding:'12px 16px' }}><span className={`color-dot c-${c.color}`} /></td>
                  <td style={{ padding:'12px 16px', color:'var(--muted)' }}>{c.cost}</td>
                  <td style={{ padding:'12px 16px' }}><WinRateBar value={c.playRate} /></td>
                  <td style={{ padding:'12px 16px', color:'var(--accent)', fontWeight:600 }}>×{c.avgCopies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
        <div style={{ textAlign:'right', marginTop:10 }}>
          <Link href="/cards" style={{ fontSize:13, color:'var(--blue)', textDecoration:'none' }}>View all {cards.length} cards →</Link>
        </div>
      </div>
    </Page>
  );
}
