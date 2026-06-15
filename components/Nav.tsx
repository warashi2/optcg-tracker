'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/',          label: '📊 Dashboard' },
  { href: '/leaders',   label: '👑 Leaders' },
  { href: '/cards',     label: '🃏 Cards' },
  { href: '/matchups',  label: '⚔️ Matchups' },
];

export default function Nav() {
  const path = usePathname();
  return (
    <header style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 56,
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 18, fontWeight: 700, color: 'var(--accent)',
            letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            ☠️ OPTCG Meta Tracker
          </span>
        </Link>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 11, color: 'var(--green)',
          background: 'rgba(74,206,160,0.1)', border: '1px solid rgba(74,206,160,0.2)',
          padding: '3px 10px', borderRadius: 20, fontWeight: 500,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--green)', display: 'inline-block',
          }} className="animate-pulse-dot" />
          Live tournament data
        </div>
      </div>

      {/* Nav links */}
      <nav style={{
        display: 'flex', gap: 4, padding: '0 20px',
        borderTop: '1px solid var(--border)', overflowX: 'auto',
      }}>
        {LINKS.map(l => {
          const active = l.href === '/' ? path === '/' : path.startsWith(l.href);
          return (
            <Link key={l.href} href={l.href} style={{
              padding: '10px 14px',
              fontSize: 13, fontWeight: 500,
              color: active ? 'var(--accent)' : 'var(--muted)',
              borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
              textDecoration: 'none', whiteSpace: 'nowrap',
              transition: 'color 0.15s',
            }}>
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
