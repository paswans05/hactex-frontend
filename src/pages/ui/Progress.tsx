/*
 * Hactex React — Progress UI page.
 * Built with the shared component classes, inline token
 * styles, and demo figures. Static markup; the @keyframes at-stripe animation
 * is preserved via a <style> tag.
 */
import { PageHead } from '../../components/shell/PageHead';

const SIZES = [
  { label: 'Small (4px)', height: '4px', pct: 38 },
  { label: 'Medium (8px)', height: undefined, pct: 64 },
  { label: 'Large (14px)', height: '14px', pct: 82 },
];

const COLORS = [
  { label: 'Success', variant: 'at-progress--success', pct: 90 },
  { label: 'Warning', variant: 'at-progress--warning', pct: 55 },
  { label: 'Danger', variant: 'at-progress--danger', pct: 24 },
  { label: 'Info', variant: 'at-progress--info', pct: 70 },
];

const LABELED = [
  { name: 'Storage', pct: 72, variant: '' },
  { name: 'Bandwidth', pct: 34, variant: '' },
  { name: 'Quota', pct: 91, variant: 'at-progress--danger' },
];

const STACKED = [
  { color: 'var(--at-success-text)', pct: 42, label: 'Done 42%' },
  { color: 'var(--at-warning-text)', pct: 28, label: 'In progress 28%' },
  { color: 'var(--at-danger-text)', pct: 14, label: 'Blocked 14%' },
];

const CIRCULAR = [
  { stroke: 'var(--at-accent)', offset: '24.3', value: '75%' },
  { stroke: 'var(--at-success)', offset: '0', value: '100%' },
  { stroke: 'var(--at-danger)', offset: '63.3', value: '35%' },
];

const STRIPE_ACCENT = 'linear-gradient(45deg, color-mix(in oklab, var(--at-accent) 70%, transparent) 25%, transparent 25%, transparent 50%, color-mix(in oklab, var(--at-accent) 70%, transparent) 50%, color-mix(in oklab, var(--at-accent) 70%, transparent) 75%, transparent 75%, transparent)';
const STRIPE_SUCCESS = 'linear-gradient(45deg, color-mix(in oklab, var(--at-success) 70%, transparent) 25%, transparent 25%, transparent 50%, color-mix(in oklab, var(--at-success) 70%, transparent) 50%, color-mix(in oklab, var(--at-success) 70%, transparent) 75%, transparent 75%, transparent)';

export default function Progress(): React.JSX.Element {
  return (
    <>
      <style>{`
        @keyframes at-stripe {
          from { background-position: 16px 0; }
          to { background-position: 0 0; }
        }
      `}</style>

      <PageHead
        title="Progress"
        subtitle="Communicate completion of tasks and processes."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Export</button>
            <button className="at-btn at-btn--primary at-press">Run job</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* 1. Sizes */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Sizes</div>
                <div className="at-eyebrow">Thin, default, thick</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              {SIZES.map((s) => (
                <div key={s.label}>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginBlockEnd: 'var(--at-space-1)' }}>
                    {s.label}
                  </div>
                  <div className="at-progress" style={s.height ? { height: s.height } : undefined}>
                    <div className="at-progress__bar" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Colors */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Colors</div>
                <div className="at-eyebrow">Semantic variants</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              {COLORS.map((c) => (
                <div key={c.label}>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginBlockEnd: 'var(--at-space-1)' }}>
                    {c.label}
                  </div>
                  <div className={`at-progress ${c.variant}`}>
                    <div className="at-progress__bar" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Striped & animated */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Striped &amp; animated</div>
                <div className="at-eyebrow">Active background texture</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-progress">
                <div className="at-progress__bar at-progress-stripe" style={{ width: '45%', backgroundImage: STRIPE_ACCENT, backgroundSize: '16px 16px' }} />
              </div>
              <div className="at-progress">
                <div className="at-progress__bar at-progress-stripe" style={{ width: '78%', backgroundColor: 'var(--at-success)', backgroundImage: STRIPE_SUCCESS, backgroundSize: '16px 16px', animation: 'at-stripe 1s linear infinite' }} />
              </div>
            </div>
          </div>

          {/* 4. Labeled */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Labeled</div>
                <div className="at-eyebrow">Progress with values</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              {LABELED.map((l) => (
                <div key={l.name}>
                  <div className="at-cluster" style={{ justifyContent: 'space-between', marginBlockEnd: 'var(--at-space-1)' }}>
                    <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{l.name}</span>
                    <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{l.pct}%</span>
                  </div>
                  <div className={`at-progress ${l.variant}`}>
                    <div className="at-progress__bar" style={{ width: `${l.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Stacked */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Stacked</div>
                <div className="at-eyebrow">Multiple bars in one track</div>
              </div>
            </div>
            <div className="at-progress" style={{ height: '16px', display: 'flex' }}>
              {STACKED.map((s) => (
                <div key={s.label} className={`at-progress__bar`} style={{ width: `${s.pct}%`, borderRadius: 0, background: s.color }} />
              ))}
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-4)', marginBlockStart: 'var(--at-space-3)', flexWrap: 'wrap' }}>
              {STACKED.map((s) => (
                <span key={s.label} className="at-cluster" style={{ gap: 'var(--at-space-2)', alignItems: 'center' }}>
                  <span style={{ width: '10px', height: '10px', background: s.color }} />
                  <span style={{ fontSize: 'var(--at-text-sm)' }}>{s.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* 6. Circular */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Circular</div>
                <div className="at-eyebrow">Radial progress</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-5)', flexWrap: 'wrap' }}>
              {CIRCULAR.map((c) => (
                <div key={c.value} style={{ position: 'relative', width: '84px', height: '84px' }}>
                  <svg viewBox="0 0 36 36" style={{ width: '84px', height: '84px', transform: 'rotate(-90deg)' }}>
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--at-surface)" strokeWidth={4} />
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke={c.stroke} strokeWidth={4} strokeLinecap="round" strokeDasharray="97.4" strokeDashoffset={c.offset} />
                  </svg>
                  <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
