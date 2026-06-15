'use client';
import { useState } from 'react';

const COLOR_MAP: Record<string, string> = { Red:'#e74c3c', Green:'#27ae60', Blue:'#2980b9', Purple:'#8e44ad', Black:'#7f8c8d', Yellow:'#f39c12', Multi:'#d4a017' };

const DECKLISTS = [
  {
    id: 1, leader: 'Purple Enel', leaderId: 'OP15-058', tier: 'S', winRate: 61.0,
    player: 'men', event: 'Hokkaido CS', result: '1st', date: 'Jun 6, 2026',
    colors: ['Purple'],
    cards: [
      { qty: 4, id: 'OP15-118', name: 'Enel', type: 'Character', cost: 6, role: 'Win condition' },
      { qty: 4, id: 'OP12-071', name: 'Charlotte Pudding', type: 'Character', cost: 1, role: 'Early body' },
      { qty: 4, id: 'OP15-061', name: 'Ohm', type: 'Character', cost: 3, role: 'Mid-range' },
      { qty: 4, id: 'OP15-067', name: 'Shura', type: 'Character', cost: 4, role: 'Mid-range' },
      { qty: 3, id: 'OP15-071', name: 'Holly', type: 'Character', cost: 2, role: 'Aggro / Double Attack' },
      { qty: 3, id: 'OP12-063', name: 'Vinsmoke Reiju', type: 'Character', cost: 3, role: 'Searcher' },
      { qty: 2, id: 'OP10-067', name: 'Senor Pink', type: 'Character', cost: 5, role: 'Event recursion' },
      { qty: 2, id: 'ST10-010', name: 'Trafalgar Law', type: 'Character', cost: 5, role: 'Removal' },
      { qty: 1, id: 'OP09-072', name: 'Franky', type: 'Character', cost: 6, role: 'Flex' },
      { qty: 1, id: 'OP07-064', name: 'Sanji', type: 'Character', cost: 3, role: 'Flex' },
      { qty: 1, id: 'OP15-066', name: 'Satori', type: 'Character', cost: 2, role: 'Flex' },
      { qty: 4, id: 'OP15-075', name: 'El Thor', type: 'Event', cost: 0, role: 'Board control' },
      { qty: 4, id: 'OP15-076', name: 'Lightning Beast Kiten', type: 'Event', cost: 0, role: 'Counter / removal' },
      { qty: 4, id: 'OP15-077', name: 'Lightning Dragon', type: 'Event', cost: 0, role: 'Counter' },
      { qty: 4, id: 'OP15-078', name: 'Mamaragan', type: 'Event', cost: 0, role: 'Power spike' },
      { qty: 1, id: 'OP13-076', name: 'Divine Departure', type: 'Event', cost: 4, role: 'Removal' },
      { qty: 3, id: 'OP05-077', name: 'Sky Island Stage', type: 'Stage', cost: 1, role: 'DON!! ramp' },
    ]
  },
  {
    id: 2, leader: 'Black Yamato', leaderId: 'OP16-079', tier: 'S', winRate: 58.3,
    player: 'atto_op', event: '5on5 Tournament', result: '1st', date: 'Jun 8, 2026',
    colors: ['Black'],
    cards: [
      { qty: 4, id: 'OP16-091', name: 'Nami', type: 'Character', cost: 1, role: 'Searcher' },
      { qty: 4, id: 'OP16-092', name: 'Nico Robin', type: 'Character', cost: 2, role: 'Trash filler' },
      { qty: 4, id: 'OP16-082', name: "Kin'emon", type: 'Character', cost: 3, role: 'Searcher (100% hit)' },
      { qty: 4, id: 'OP16-087', name: 'Shinobu', type: 'Character', cost: 3, role: 'Trash enabler' },
      { qty: 4, id: 'OP16-084', name: 'Kouzuki Momonosuke', type: 'Character', cost: 4, role: 'Blocker + recur ≤6' },
      { qty: 4, id: 'OP16-098', name: 'Yamato (SR)', type: 'Character', cost: 5, role: 'Core loop card' },
      { qty: 2, id: 'OP16-081', name: 'Otama', type: 'Character', cost: 1, role: 'Early Wano body' },
      { qty: 2, id: 'OP05-091', name: 'Old-set Wano', type: 'Character', cost: 3, role: 'Consistency' },
      { qty: 2, id: 'OP16-095', name: 'Portgas.D.Ace', type: 'Character', cost: 5, role: 'Off-type pressure' },
      { qty: 2, id: 'OP16-088', name: 'Shimotsuki Ushimaru', type: 'Character', cost: 7, role: 'Board clear' },
      { qty: 4, id: 'OP16-085', name: 'Kouzuki Momonosuke (alt)', type: 'Character', cost: 6, role: 'Recur engine' },
      { qty: 4, id: 'OP16-096', name: 'Yamato (cost 6)', type: 'Character', cost: 6, role: 'Mid pressure' },
      { qty: 4, id: 'OP16-097', name: 'Yamato (cost 8)', type: 'Character', cost: 8, role: 'Finisher w/ Rush' },
      { qty: 4, id: 'OP16-099', name: "I've Come Here To Cut Those Chains!", type: 'Event', cost: 0, role: 'Counter / removal' },
    ]
  },
];

const TYPE_COLORS: Record<string, string> = { Character: '#2980b9', Event: '#8e44ad', Stage: '#27ae60', Leader: '#d4a017' };

export default function DecksPage() {
  const [active, setActive] = useState(0);
  const deck = DECKLISTS[active];
  const chars = deck.cards.filter(c => c.type === 'Character');
  const events = deck.cards.filter(c => c.type === 'Event');
  const stages = deck.cards.filter(c => c.type === 'Stage');
  const total = deck.cards.reduce((s, c) => s + c.qty, 0);

  const imgUrl = (id: string) =>
    `https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/one-piece/${id.split('-')[0]}/${id}_EN.webp`;

  return (
    <div style={{ padding: '24px', maxWidth: 1300, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <div className="page-title" style={{ marginBottom: 6 }}>Tournament Decklists</div>
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>Top-cut winning 50-card builds from OP-16 events</div>
      </div>

      {/* Deck selector tabs */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        {DECKLISTS.map((d, i) => (
          <button key={d.id} onClick={() => setActive(i)} style={{
            padding: '12px 20px', borderRadius: 10, cursor: 'pointer', textAlign: 'left',
            border: `1px solid ${active === i ? 'var(--gold)' : 'var(--border)'}`,
            background: active === i ? 'rgba(212,160,23,0.08)' : 'var(--surface)',
            transition: 'all 0.15s', minWidth: 200,
          }}>
            <div style={{ fontSize: 11, color: active === i ? 'var(--gold)' : 'var(--muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d.result} · {d.event}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: active === i ? 'var(--gold)' : 'var(--text)', fontFamily: 'Cinzel, serif' }}>{d.leader}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{d.winRate}% win rate · {d.date}</div>
          </button>
        ))}
      </div>

      {/* Deck content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>

        {/* Left — card list */}
        <div>
          {/* Leader */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: 13, color: 'var(--gold)', fontWeight: 700 }}>Leader</span>
              <span style={{ fontSize: 11, background: 'rgba(212,160,23,0.15)', color: 'var(--gold)', padding: '1px 7px', borderRadius: 4 }}>S-Tier</span>
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={imgUrl(deck.leaderId)} alt={deck.leader} style={{ width: 48, borderRadius: 6, border: '1px solid var(--border2)' }}
                onError={e => { (e.target as HTMLImageElement).style.display='none'; }} />
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>{deck.leader}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{deck.leaderId}</div>
              </div>
            </div>
          </div>

          {/* Card sections */}
          {[['Characters', chars], ['Events', events], ['Stages', stages]].map(([label, group]) =>
            (group as typeof chars).length > 0 && (
              <div key={label as string} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
                <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: 13, color: 'var(--gold)', fontWeight: 700 }}>{label as string}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{(group as typeof chars).reduce((s,c)=>s+c.qty,0)} cards</span>
                </div>
                {(group as typeof chars).map(card => (
                  <div key={card.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: '1px solid rgba(212,160,23,0.05)' }}>
                    <img src={imgUrl(card.id)} alt={card.name} style={{ width: 36, borderRadius: 4, border: '1px solid var(--border)', flexShrink: 0 }}
                      onError={e => { (e.target as HTMLImageElement).style.display='none'; }} />
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(212,160,23,0.15)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--gold)', fontSize: 13, flexShrink: 0 }}>×{card.qty}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 13 }}>{card.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{card.id}</div>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'right' }}>
                      {card.cost !== null && <span style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 7px', borderRadius: 4, marginRight: 6 }}>Cost {card.cost}</span>}
                      <span style={{ color: 'rgba(212,160,23,0.6)', fontStyle: 'italic' }}>{card.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Right — deck summary */}
        <div>
          {/* Stats */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 14, color: 'var(--gold)', marginBottom: 16, fontWeight: 700 }}>Deck Info</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                ['Total cards', total],
                ['Win rate', `${deck.winRate}%`],
                ['Event', deck.event],
                ['Result', deck.result],
                ['Player', deck.player],
                ['Date', deck.date],
              ].map(([l,v]) => (
                <div key={l as string} style={{ background: 'rgba(212,160,23,0.05)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 10px' }}>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{l as string}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{v as string}</div>
                </div>
              ))}
            </div>
            {/* Cost curve */}
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Cost Curve</div>
              {[0,1,2,3,4,5,6,7,8].map(cost => {
                const count = deck.cards.filter(c=>c.cost===cost).reduce((s,c)=>s+c.qty,0);
                const max = 16;
                return count > 0 && (
                  <div key={cost} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                    <span style={{ fontSize: 11, color: 'var(--muted)', width: 16, textAlign: 'right' }}>{cost}</span>
                    <div style={{ flex: 1, height: 12, background: 'rgba(255,255,255,0.04)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, var(--red), var(--gold))', width: `${(count/max)*100}%`, transition: 'width 0.3s' }} />
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--text)', width: 16 }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card images preview strip */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }}>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 13, color: 'var(--gold)', marginBottom: 12, fontWeight: 700 }}>Key Cards</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {deck.cards.filter(c=>c.qty===4).slice(0,6).map(card => (
                <div key={card.id} style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <img src={imgUrl(card.id)} alt={card.name} style={{ width: '100%', display: 'block' }}
                    onError={e => { (e.target as HTMLImageElement).style.display='none'; }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
