import { Tier, Color } from '@/lib/types';

// ─── STAT CARD ───────────────────────────────────────────────────────────────
export function StatCard({ label, value, sub, accent }: {
  label: string; value: string | number; sub?: string; accent?: string;
}) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 10, padding: 16,
    }}>
      <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
        {label}
      </div>
      <div className="font-display" style={{ fontSize: 24, fontWeight: 700, color: accent || 'var(--text)' }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ─── TIER BADGE ──────────────────────────────────────────────────────────────
const TIER_COLORS: Record<Tier, { bg: string; color: string }> = {
  S: { bg: 'rgba(232,200,74,0.15)',  color: 'var(--accent)' },
  A: { bg: 'rgba(74,206,160,0.12)',  color: 'var(--green)' },
  B: { bg: 'rgba(90,159,232,0.12)',  color: 'var(--blue)' },
  C: { bg: 'rgba(123,130,153,0.15)', color: 'var(--muted)' },
};

export function TierBadge({ tier }: { tier: Tier }) {
  const c = TIER_COLORS[tier];
  return (
    <span className="font-display" style={{
      fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 5,
      background: c.bg, color: c.color,
    }}>
      {tier}
    </span>
  );
}

// ─── WIN RATE BAR ────────────────────────────────────────────────────────────
export function WinRateBar({ value }: { value: number }) {
  const color = value >= 58 ? 'var(--green)' : value >= 53 ? 'var(--accent)' : 'var(--red)';
  const pct = Math.max(0, (value - 44) / 20 * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color, minWidth: 42 }}>{value}%</span>
      <div style={{ height: 5, borderRadius: 3, background: 'var(--surface2)', width: 80, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 3, background: color, width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ─── META SHARE BAR ──────────────────────────────────────────────────────────
export function ShareBar({ value }: { value: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 13, minWidth: 38 }}>{value}%</span>
      <div style={{ height: 5, borderRadius: 3, background: 'var(--surface2)', width: 80, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 3, background: 'var(--blue)', width: `${Math.min(100, value / 20 * 100)}%` }} />
      </div>
    </div>
  );
}

// ─── COLOR DOTS ──────────────────────────────────────────────────────────────
export function ColorDots({ colors }: { colors: string[] }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {colors.map((c, i) => (
        <span key={i} className={`color-dot c-${c}`} title={c} />
      ))}
    </div>
  );
}

// ─── TABLE WRAPPER ───────────────────────────────────────────────────────────
export function TableWrap({ title, subtitle, children, sourceLinks }: {
  title: string; subtitle?: string;
  children: React.ReactNode;
  sourceLinks?: { label: string; href: string }[];
}) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 12, overflow: 'hidden',
    }}>
      <div style={{
        padding: '16px 20px', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      }}>
        <div>
          <div className="font-display" style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{subtitle}</div>}
        </div>
      </div>
      {children}
      {sourceLinks && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
          padding: '10px 20px', borderTop: '1px solid var(--border)',
          fontSize: 11, color: 'var(--muted)',
        }}>
          <span>Sources:</span>
          {sourceLinks.map(l => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--blue)', textDecoration: 'none' }}>
              {l.label}
            </a>
          ))}
          <span style={{ marginLeft: 'auto' }}>Updated June 2026 · OP-16</span>
        </div>
      )}
    </div>
  );
}

// ─── LOADING SPINNER ─────────────────────────────────────────────────────────
export function Spinner() {
  return (
    <div style={{ padding: 48, textAlign: 'center', color: 'var(--muted)' }}>
      <div style={{
        width: 28, height: 28, border: '2px solid var(--border2)',
        borderTopColor: 'var(--accent)', borderRadius: '50%',
        margin: '0 auto 12px',
      }} className="animate-spin" />
      Loading…
    </div>
  );
}

// ─── PAGE SHELL ──────────────────────────────────────────────────────────────
export function Page({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>{children}</div>;
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: 12, marginBottom: 24,
    }}>
      {children}
    </div>
  );
}
