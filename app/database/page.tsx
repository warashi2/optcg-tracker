'use client';
import { useState, useEffect, useCallback } from 'react';

const COLORS = ['Red','Green','Blue','Purple','Black','Yellow'];
const TYPES = ['Leader','Character','Event','Stage'];
const RARITIES: Record<string, string> = { L:'Leader', C:'Common', UC:'Uncommon', R:'Rare', SR:'Super Rare', SEC:'Secret Rare' };
const COLOR_MAP: Record<string, string> = { Red:'#e74c3c', Green:'#27ae60', Blue:'#2980b9', Purple:'#8e44ad', Black:'#7f8c8d', Yellow:'#f39c12' };

interface Card {
  card_id: string; card_name: string; card_type: string; color: string;
  cost: number | null; power: number | null; counter: number | null;
  rarity: string; card_text: string; card_image: string | null; attribute: string | null; set_name: string;
}

export default function DatabasePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [selected, setSelected] = useState<Card | null>(null);
  const [set, setSet] = useState('OP16');

  const SETS = ['OP16','OP15','OP14','OP13','OP12','OP11','OP10','OP09','OP08','OP07'];

  const fetchCards = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ set });
      if (q) params.set('q', q);
      if (color) params.set('color', color);
      if (type) params.set('type', type);
      const res = await fetch(`/api/card?${params}`);
      const data = await res.json();
      setCards(data.cards || []);
    } catch { setCards([]); }
    setLoading(false);
  }, [set, q, color, type]);

  useEffect(() => { fetchCards(); }, [fetchCards]);

  const imgUrl = (c: Card) => c.card_image ||
    `https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/one-piece/${c.card_id.split('-')[0]}/${c.card_id}_EN.webp`;

  return (
    <div style={{ padding: '24px', maxWidth: 1300, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div className="page-title" style={{ marginBottom: 6 }}>Card Database</div>
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>Browse full card data, images, and effect text from all sets</div>
      </div>

      {/* Filters */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 12, padding: '16px 20px', marginBottom: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          value={q} onChange={e => setQ(e.target.value)}
          placeholder="Search card name..."
          style={{ background: '#1a1008', border: '1px solid var(--border2)', borderRadius: 8, padding: '8px 14px', color: 'var(--text)', fontSize: 13, width: 220, outline: 'none', fontFamily: 'Inter, sans-serif' }}
        />
        <select value={set} onChange={e => setSet(e.target.value)}
          style={{ background: '#1a1008', border: '1px solid var(--border2)', borderRadius: 8, padding: '8px 12px', color: 'var(--text)', fontSize: 13, outline: 'none' }}>
          {SETS.map(s => <option key={s} value={s}>{s.replace('OP','OP-')}</option>)}
        </select>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {COLORS.map(c => (
            <button key={c} onClick={() => setColor(color === c ? '' : c)}
              style={{ padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: `1px solid ${color === c ? COLOR_MAP[c] : 'var(--border)'}`, background: color === c ? `${COLOR_MAP[c]}22` : 'transparent', color: color === c ? COLOR_MAP[c] : 'var(--muted)', transition: 'all 0.15s' }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {TYPES.map(t => (
            <button key={t} onClick={() => setType(type === t ? '' : t)}
              style={{ padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: `1px solid ${type === t ? 'var(--gold)' : 'var(--border)'}`, background: type === t ? 'rgba(212,160,23,0.15)' : 'transparent', color: type === t ? 'var(--gold)' : 'var(--muted)', transition: 'all 0.15s' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Card Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)' }}>
          <div style={{ width: 32, height: 32, border: '2px solid var(--border2)', borderTopColor: 'var(--gold)', borderRadius: '50%', margin: '0 auto 12px' }} className="animate-spin" />
          Loading cards...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
          {cards.map(card => (
            <div key={card.card_id} className="card-img-wrap animate-in" onClick={() => setSelected(card)}>
              <img src={imgUrl(card)} alt={card.card_name}
                onError={e => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/160x224/1a1008/d4a017?text=${card.card_id}`; }}
              />
              <div style={{ padding: '8px 10px', background: 'rgba(0,0,0,0.85)' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{card.card_name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: `${COLOR_MAP[card.color] || '#555'}22`, color: COLOR_MAP[card.color] || 'var(--muted)', border: `1px solid ${COLOR_MAP[card.color] || '#555'}44` }}>{card.color}</span>
                  <span style={{ fontSize: 10, color: card.rarity === 'SR' || card.rarity === 'SEC' ? 'var(--gold)' : 'var(--muted)' }}>{card.rarity}</span>
                </div>
              </div>
            </div>
          ))}
          {cards.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 48, color: 'var(--muted)' }}>No cards found — try different filters</div>
          )}
        </div>
      )}

      {/* Card Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', gap: 20, padding: 24 }}>
              <div style={{ width: 180, flexShrink: 0 }}>
                <img src={imgUrl(selected)} alt={selected.card_name} style={{ width: '100%', borderRadius: 8, border: '1px solid var(--border2)' }}
                  onError={e => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/180x252/1a1008/d4a017?text=${selected.card_id}`; }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 700, color: 'var(--gold)', marginBottom: 4 }}>{selected.card_name}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 16 }}>{selected.card_id} · {selected.set_name}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                  {[
                    ['Type', selected.card_type],
                    ['Color', selected.color],
                    ['Rarity', RARITIES[selected.rarity] || selected.rarity],
                    ['Cost', selected.cost ?? '—'],
                    ['Power', selected.power ? selected.power.toLocaleString() : '—'],
                    ['Counter', selected.counter ? `+${selected.counter}` : '—'],
                    ['Attribute', selected.attribute || '—'],
                  ].map(([label, val]) => (
                    <div key={label as string} style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px' }}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{val as string}</div>
                    </div>
                  ))}
                </div>
                {selected.card_text && (
                  <div style={{ background: 'rgba(212,160,23,0.04)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontSize: 10, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Card Effect</div>
                    <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{selected.card_text}</div>
                  </div>
                )}
              </div>
            </div>
            <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelected(null)} style={{ padding: '7px 20px', borderRadius: 8, border: '1px solid var(--border2)', background: 'transparent', color: 'var(--gold)', cursor: 'pointer', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
