/*
 * Hactex React — Badges UI page.
 * Built with the shared component classes, inline token
 * styles, and demo figures. The removable-chips card uses useState (the
 * chips array + filter on remove).
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const ORDER_STATUS = [
  { id: '#1042 — Pro Plan', kind: 'success', status: 'Paid' },
  { id: '#1043 — Team Seat', kind: 'warning', status: 'Pending' },
  { id: '#1044 — Add-on', kind: 'info', status: 'Shipped' },
  { id: '#1045 — Refund', kind: 'danger', status: 'Failed' },
  { id: '#1046 — Trial', kind: 'neutral', status: 'Draft' },
];

export default function Badges(): React.JSX.Element {
  const [chips, setChips] = useState<string[]>(['Design', 'React', 'Tailwind', 'TypeScript']);

  return (
    <>
      <PageHead
        title="Badges"
        subtitle="Compact labels for status, counts and trends."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Filter</button>
            <button className="at-btn at-btn--primary at-press">Add label</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* 1. Tones & styles */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Tones &amp; styles</div>
                <div className="at-eyebrow">Full semantic palette</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-2)', flexWrap: 'wrap' }}>
              <span className="at-badge at-badge--accent">Accent</span>
              <span className="at-badge at-badge--secondary">Secondary</span>
              <span className="at-badge at-badge--tertiary">Tertiary</span>
              <span className="at-badge at-badge--lime">Lime</span>
              <span className="at-badge at-badge--success">Success</span>
              <span className="at-badge at-badge--warning">Warning</span>
              <span className="at-badge at-badge--danger">Danger</span>
              <span className="at-badge at-badge--info">Info</span>
              <span className="at-badge at-badge--neutral">Neutral</span>
              <span className="at-badge at-badge--flat">Flat</span>
            </div>
          </div>

          {/* 2. Sizes & shapes */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Sizes &amp; shapes</div>
                <div className="at-eyebrow">Small, default, pill</div>
              </div>
            </div>
            <div className="at-cluster" style={{ alignItems: 'center', gap: 'var(--at-space-3)', flexWrap: 'wrap' }}>
              <span className="at-badge at-badge--accent" style={{ fontSize: 'var(--at-text-xs)', padding: '2px 6px' }}>Small</span>
              <span className="at-badge at-badge--accent">Default</span>
              <span className="at-badge at-badge--accent" style={{ fontSize: 'var(--at-text-lg)', padding: '6px 12px' }}>Large</span>
              <span className="at-badge at-badge--secondary" style={{ borderRadius: '999px' }}>Pill</span>
              <span className="at-badge at-badge--tertiary" style={{ borderRadius: 0 }}>Block</span>
            </div>
          </div>

          {/* 3. Dot badges */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Dot badges</div>
                <div className="at-eyebrow">Status indicators</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-3)', flexWrap: 'wrap' }}>
              <span className="at-cluster" style={{ gap: 'var(--at-space-2)', alignItems: 'center' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--at-success)' }} />
                <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>Operational</span>
              </span>
              <span className="at-cluster" style={{ gap: 'var(--at-space-2)', alignItems: 'center' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--at-warning)' }} />
                <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>Degraded</span>
              </span>
              <span className="at-cluster" style={{ gap: 'var(--at-space-2)', alignItems: 'center' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--at-danger)' }} />
                <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>Outage</span>
              </span>
              <span className="at-cluster" style={{ gap: 'var(--at-space-2)', alignItems: 'center' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--at-info)' }} />
                <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>Maintenance</span>
              </span>
            </div>
          </div>

          {/* 4. With icons */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">With icons</div>
                <div className="at-eyebrow">Glyph + label</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-2)', flexWrap: 'wrap' }}>
              <span className="at-badge at-badge--success at-cluster" style={{ gap: '4px', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" style={{ width: '10px', height: '10px' }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Verified
              </span>
              <span className="at-badge at-badge--warning at-cluster" style={{ gap: '4px', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" style={{ width: '10px', height: '10px' }}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Pending
              </span>
              <span className="at-badge at-badge--info at-cluster" style={{ gap: '4px', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" style={{ width: '10px', height: '10px' }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                Info
              </span>
              <span className="at-badge at-badge--danger at-cluster" style={{ gap: '4px', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" style={{ width: '10px', height: '10px' }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                Blocked
              </span>
            </div>
          </div>

          {/* 5. Trend deltas */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Trend deltas</div>
                <div className="at-eyebrow">Up and down movement</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-3)', flexWrap: 'wrap' }}>
              <span className="at-badge at-badge--success">▲ 12.4%</span>
              <span className="at-badge at-badge--success">▲ 3.1%</span>
              <span className="at-badge at-badge--danger">▼ 8.7%</span>
              <span className="at-badge at-badge--danger">▼ 1.2%</span>
              <span className="at-badge at-badge--neutral">— 0.0%</span>
            </div>
          </div>

          {/* 6. Counters & notifications */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Counters &amp; notifications</div>
                <div className="at-eyebrow">Numeric overlays</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-5)' }}>
              <div style={{ position: 'relative' }}>
                <button className="at-btn at-btn--outline at-btn--icon at-press" aria-label="Inbox">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                  </svg>
                </button>
                <span style={{ position: 'absolute', insetBlockStart: '-6px', insetInlineEnd: '-6px', minWidth: '18px', height: '18px', padding: '0 4px', borderRadius: '9px', background: 'var(--at-danger)', color: 'var(--at-on-danger)', fontSize: 'var(--at-text-xs)', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--at-paper)' }}>8</span>
              </div>
              <div style={{ position: 'relative' }}>
                <button className="at-btn at-btn--outline at-btn--icon at-press" aria-label="Notifications">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </button>
                <span style={{ position: 'absolute', insetBlockStart: '-4px', insetInlineEnd: '-4px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--at-accent)', border: '2px solid var(--at-paper)' }} />
              </div>
              <span className="at-badge at-badge--accent">99+</span>
              <span className="at-badge" style={{ background: 'var(--at-ink-strong)', color: 'var(--at-paper)', borderRadius: '999px', minWidth: '24px', textAlign: 'center' }}>42</span>
            </div>
          </div>

          {/* 7. Removable chips */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Removable chips</div>
                <div className="at-eyebrow">Filter and tag tokens</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-2)', flexWrap: 'wrap' }}>
              {chips.map((chip) => (
                <span key={chip} className="at-badge at-badge--neutral at-cluster" style={{ gap: '6px', alignItems: 'center', paddingBlock: '4px', paddingInline: '8px' }}>
                  <span>{chip}</span>
                  <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1, color: 'inherit' }}
                    onClick={() => setChips((c) => c.filter((x) => x !== chip))}
                    aria-label="Remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 8. Order status cells */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Order status cells</div>
                <div className="at-eyebrow">Status used in tables</div>
              </div>
            </div>
            <div className="at-list">
              {ORDER_STATUS.map((o) => (
                <div key={o.id} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{o.id}</span>
                    <span className={`at-badge at-badge--${o.kind}`}>{o.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
