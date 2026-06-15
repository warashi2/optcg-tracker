'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/',          label: 'Dashboard' },
  { href: '/leaders',   label: 'Leaders' },
  { href: '/database',  label: 'Card Database' },
  { href: '/decks',     label: 'Decklists' },
  { href: '/cards',     label: 'Card Stats' },
  { href: '/matchups',  label: 'Matchups' },
];

export default function Nav() {
  const path = usePathname();
  return (
    <header style={{ background: '#0d0d0d', borderBottom: '1px solid rgba(212,160,23,0.2)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 56 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 700, color: '#d4a017', letterSpacing: 1 }}>
            ☠ OPTCG META
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#27ae60', background: 'rgba(39,174,96,0.1)', border: '1px solid rgba(39,174,96,0.2)', padding: '3px 10px', borderRadius: 20, fontWeight: 500 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#27ae60', display: 'inline-block' }} className="animate-pulse-dot" />
          Live · OP-16
        </div>
      </div>
      <nav style={{ display: 'flex', gap: 2, padding: '0 20px', borderTop: '1px solid rgba(212,160,23,0.1)', overflowX: 'auto' }}>
        {LINKS.map(l => {
          const active = l.href === '/' ? path === '/' : path.startsWith(l.href);
          return (
            <Link key={l.href} href={l.href} style={{
              padding: '10px 14px', fontSize: 13, fontWeight: active ? 600 : 400,
              color: active ? '#d4a017' : '#7a6a55',
              borderBottom: active ? '2px solid #d4a017' : '2px solid transparent',
              textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.15s',
              fontFamily: active ? 'Cinzel, serif' : 'Inter, sans-serif',
              letterSpacing: active ? '0.5px' : 0,
            }}>
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
