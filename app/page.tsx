import { getCachedLeaders, getCachedCards, getCachedMatchups, getCacheMeta } from '@/lib/scraper';
import Link from 'next/link';

export const revalidate = 3600;

const COLOR_MAP: Record<string, string> = { red:'#e74c3c', green:'#27ae60', blue:'#2980b9', purple:'#8e44ad', black:'#7f8c8d', yellow:'#f39c12', multi:'#d4a017' };
const TIER_STYLE: Record<string, {bg:string,color:string}> = {
  S: { bg:'rgba(212,160,23,0.15)', color:'#d4a017' },
  A: { bg:'rgba(39,174,96,0.12)',  color:'#27ae60' },
  B: { bg:'rgba(41,128,185,0.12)', color:'#2980b9' },
  C: { bg:'rgba(100,100,100,0.12)',color:'#7a6a55' },
};

export default function HomePage() {
  const leaders = getCachedLeaders('OP16');
  const cards = getCachedCards();
  const matchups = getCachedMatchups();
  const meta = getCacheMeta();
  const topLeader = [...leaders].sort((a, b) => b.winRate - a.winRate)[0];
  const topMeta = [...leaders].sort((a, b) => b.metaShare - a.metaShare)[0];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '40px 0 32px', borderBottom: '1px solid var(--border)', marginBottom: 32 }}>
        <div style={{ fontFamily:'Cinzel,serif', fontSize: 42, fontWeight: 900, background:'linear-gradient(135deg,#f0c040 0%,#d4a017 40%,#a07010 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', letterSpacing: 2, lineHeight: 1.2, marginBottom: 8 }}>
          ONE PIECE TCG
        </div>
        <div style={{ fontFamily:'Cinzel,serif', fontSize: 18, color:'#c0392b', letterSpacing: 4, marginBottom: 16 }}>
          META TRACKER
        </div>
        <div style={{ color:'var(--muted)', fontSize: 13 }}>
          {meta.totalMatches.toLocaleString()}+ matches · Live tournament data · OP-16 The Time of Battle
        </div>
      </div>

      {/* Quick nav cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12, marginBottom:32 }}>
        {[
          { href:'/leaders', icon:'👑', label:'Leaders', sub:`${leaders.length} tracked · ${topLeader?.winRate}% top WR` },
          { href:'/database', icon:'🃏', label:'Card Database', sub:'Images · effect text · stats' },
          { href:'/decks', icon:'📋', label:'Decklists', sub:'Top-cut 50-card builds' },
          { href:'/matchups', icon:'⚔️', label:'Matchups', sub:`${matchups.length} head-to-head pairs` },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{ textDecoration:'none' }}>
            <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'20px 16px', cursor:'pointer', transition:'all 0.2s', textAlign:'center' }}>
              <div style={{ fontSize:28, marginBottom:8 }}>{item.icon}</div>
              <div style={{ fontFamily:'Cinzel,serif', fontSize:14, fontWeight:700, color:'var(--gold)', marginBottom:4 }}>{item.label}</div>
              <div style={{ fontSize:11, color:'var(--muted)' }}>{item.sub}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:12, marginBottom:32 }}>
        {[
          { label:'Top Leader', value:topLeader?.name?.split('/')[0], sub:`${topLeader?.winRate}% WR`, color:'var(--gold)' },
          { label:'Most Popular', value:topMeta?.name?.split('/')[0], sub:`${topMeta?.metaShare}% meta share`, color:'#e74c3c' },
          { label:'Cards Tracked', value:cards.length, sub:'OP-16 format', color:'var(--gold)' },
          { label:'Matches', value:`${Math.round(meta.totalMatches/1000)}k+`, sub:'Bayesian adjusted', color:'#27ae60' },
          { label:'Leaders', value:leaders.length, sub:'S to C tier', color:'#2980b9' },
          { label:'H2H Pairs', value:matchups.length, sub:'Matchup data', color:'#8e44ad' },
        ].map(s => (
          <div key={s.label} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10, padding:'14px 16px' }}>
            <div style={{ fontSize:10, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>{s.label}</div>
            <div style={{ fontFamily:'Cinzel,serif', fontSize:20, fontWeight:700, color:s.color as string }}>{s.value}</div>
            <div style={{ fontSize:11, color:'var(--muted)', marginTop:3 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Leaders table */}
      <div style={{ background:'var(--surface)', border:'1px solid var(--border2)', borderRadius:12, overflow:'hidden', marginBottom:24 }}>
        <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontFamily:'Cinzel,serif', fontSize:15, fontWeight:700, color:'var(--gold)' }}>S &amp; A Tier Leaders</div>
          <Link href="/leaders" style={{ fontSize:12, color:'var(--gold)', textDecoration:'none', opacity:0.7 }}>View all →</Link>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', minWidth:600 }}>
            <thead>
              <tr style={{ background:'rgba(212,160,23,0.04)' }}>
                {['#','Leader','Tier','Win Rate','Meta Share','Colors'].map(h=>(
                  <th key={h} style={{ textAlign:'left', padding:'9px 16px', fontSize:10, color:'var(--muted)', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:'1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leaders.filter(l=>l.tier==='S'||l.tier==='A').sort((a,b)=>b.winRate-a.winRate).map((l,i)=>{
                const tc = TIER_STYLE[l.tier];
                const wr = l.winRate;
                const wrColor = wr>=58?'#27ae60':wr>=53?'#d4a017':'#e74c3c';
                return (
                  <tr key={l.id} style={{ borderBottom:'1px solid rgba(212,160,23,0.05)' }}>
                    <td style={{ padding:'12px 16px', color:i<3?'var(--gold)':'var(--muted)', fontWeight:700, fontSize:12 }}>{i+1}</td>
                    <td style={{ padding:'12px 16px', fontWeight:500, color:'var(--text)' }}>{l.name}</td>
                    <td style={{ padding:'12px 16px' }}><span style={{ fontSize:11, fontWeight:700, padding:'2px 7px', borderRadius:5, fontFamily:'Cinzel,serif', background:tc.bg, color:tc.color }}>{l.tier}</span></td>
                    <td style={{ padding:'12px 16px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <span style={{ color:wrColor, fontWeight:700, fontSize:14 }}>{wr}%</span>
                        <div style={{ width:60, height:4, background:'rgba(255,255,255,0.06)', borderRadius:2, overflow:'hidden' }}>
                          <div style={{ height:'100%', background:wrColor, width:`${Math.max(0,(wr-44)/20*100)}%`, borderRadius:2 }} />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding:'12px 16px', color:'var(--muted)', fontSize:13 }}>{l.metaShare}%</td>
                    <td style={{ padding:'12px 16px' }}>
                      <div style={{ display:'flex', gap:4 }}>
                        {l.colors.map((c,ci)=><span key={ci} style={{ width:10, height:10, borderRadius:'50%', background:COLOR_MAP[c]||'#555', display:'inline-block' }} />)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding:'8px 16px', borderTop:'1px solid var(--border)', fontSize:11, color:'var(--muted)', display:'flex', gap:16 }}>
          <span>Sources:</span>
          <a href="https://opmetagame.com" target="_blank" rel="noopener noreferrer" style={{ color:'var(--gold)', opacity:0.7, textDecoration:'none' }}>opmetagame.com</a>
          <a href="https://op-leaderboard.com" target="_blank" rel="noopener noreferrer" style={{ color:'var(--gold)', opacity:0.7, textDecoration:'none' }}>op-leaderboard.com</a>
        </div>
      </div>

      {/* Top cards */}
      <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
        <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontFamily:'Cinzel,serif', fontSize:15, fontWeight:700, color:'var(--gold)' }}>Most Played Cards</div>
          <Link href="/cards" style={{ fontSize:12, color:'var(--gold)', textDecoration:'none', opacity:0.7 }}>View all →</Link>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))', gap:12, padding:16 }}>
          {cards.slice(0,8).map((c,i)=>(
            <div key={c.id} style={{ textAlign:'center' }}>
              <div style={{ position:'relative', marginBottom:6 }}>
                <img src={`https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/one-piece/${c.id.split('-')[0]}/${c.id}_EN.webp`}
                  alt={c.name} style={{ width:'100%', borderRadius:6, border:'1px solid var(--border)', display:'block' }} />
                {i<3&&<div style={{ position:'absolute', top:4, left:4, width:20, height:20, borderRadius:'50%', background:'var(--gold)', color:'#000', fontSize:11, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>{i+1}</div>}
              </div>
              <div style={{ fontSize:11, fontWeight:500, color:'var(--text)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.name}</div>
              <div style={{ fontSize:10, color:'var(--gold)' }}>{c.playRate}% play rate</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
