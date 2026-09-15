/*
 * Hactex React — Accordions UI page.
 * Built with the shared component classes, inline token
 * styles, and demo figures. Single-open cards use a useState index|null;
 * the multi-open card uses three independent booleans.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const SINGLE = [
  { q: 'What is Hactex?', a: 'A bold, editorial admin template with thick ink borders and hard offset shadows.' },
  { q: 'How does it theme?', a: 'Six presets plus dark mode, all driven by CSS custom properties.' },
  { q: 'Can I extend it?', a: 'Compose any layout from the token-based primitives.' },
];

const BORDERED = [
  { q: 'Shipping policy', a: 'Free standard shipping on orders over $50.' },
  { q: 'Returns', a: '30-day hassle-free returns on all items.' },
];

const FLUSH = [
  { q: 'General', a: 'Product overview and frequently asked questions.' },
  { q: 'Privacy', a: 'How we handle and protect your personal data.' },
  { q: 'Support', a: 'Contact our team Monday through Friday.' },
];

const META = [
  {
    label: 'Messages', badge: '12 new', kind: 'accent',
    body: 'You have 12 unread conversations across 3 channels.',
    path: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  },
  {
    label: 'Tasks', badge: '4 done', kind: 'success',
    body: '4 of 9 tasks completed this sprint.',
    path: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />,
    poly: '22 4 12 14.01 9 11.01',
  },
  {
    label: 'Activity', badge: 'Updated 2h ago', kind: 'warning',
    body: 'Recent account activity and audit trail.',
    extra: (
      <>
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </>
    ),
  },
];

const headerBtn = (extra?: React.CSSProperties): React.CSSProperties => ({
  width: '100%',
  justifyContent: 'space-between',
  padding: 'var(--at-space-3) var(--at-space-4)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  ...extra,
});

export default function Accordions(): React.JSX.Element {
  const [single, setSingle] = useState<number | null>(1);
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  const [o, setO] = useState<number | null>(1);
  const [f, setF] = useState<number | null>(1);
  const [m, setM] = useState<number | null>(1);

  return (
    <>
      <PageHead
        title="Accordions"
        subtitle="Expandable disclosure panels for layered content."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Export</button>
            <button className="at-btn at-btn--primary at-press">Add section</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* 1. Single-open */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Single-open</div>
                <div className="at-eyebrow">Only one panel open at a time</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 0 }}>
              {SINGLE.map((item, i) => {
                const idx = i + 1;
                const open = single === idx;
                return (
                  <div key={item.q} style={{ border: '2px solid var(--at-ink)', marginBlockEnd: i < SINGLE.length - 1 ? '-2px' : undefined }}>
                    <button className="at-cluster" style={headerBtn()} onClick={() => setSingle(open ? null : idx)}>
                      <span className="at-text-strong">{item.q}</span>
                      <span style={{ fontWeight: 700 }}>{open ? '−' : '+'}</span>
                    </button>
                    {open && (
                      <div style={{ padding: 'var(--at-space-4)', borderBlockStart: '2px solid var(--at-ink)' }}>
                        <p className="at-text-muted">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Multi-open */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Multi-open</div>
                <div className="at-eyebrow">Independent toggles</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div style={{ border: '2px solid var(--at-ink)' }}>
                <button className="at-cluster" style={headerBtn()} onClick={() => setA((v) => !v)}>
                  <span className="at-text-strong">Account settings</span>
                  <span style={{ fontWeight: 700 }}>{a ? '−' : '+'}</span>
                </button>
                {a && (
                  <div style={{ padding: 'var(--at-space-4)', borderBlockStart: '2px solid var(--at-ink)' }}>
                    <p className="at-text-muted">Manage your profile, password and two-factor authentication.</p>
                  </div>
                )}
              </div>
              <div style={{ border: '2px solid var(--at-ink)' }}>
                <button className="at-cluster" style={headerBtn()} onClick={() => setB((v) => !v)}>
                  <span className="at-text-strong">Billing</span>
                  <span style={{ fontWeight: 700 }}>{b ? '−' : '+'}</span>
                </button>
                {b && (
                  <div style={{ padding: 'var(--at-space-4)', borderBlockStart: '2px solid var(--at-ink)' }}>
                    <p className="at-text-muted">Review invoices, update payment methods and download receipts.</p>
                  </div>
                )}
              </div>
              <div style={{ border: '2px solid var(--at-ink)' }}>
                <button className="at-cluster" style={headerBtn()} onClick={() => setC((v) => !v)}>
                  <span className="at-text-strong">Notifications</span>
                  <span style={{ fontWeight: 700 }}>{c ? '−' : '+'}</span>
                </button>
                {c && (
                  <div style={{ padding: 'var(--at-space-4)', borderBlockStart: '2px solid var(--at-ink)' }}>
                    <p className="at-text-muted">Choose which alerts you receive by email and push.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3. Bordered */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Bordered</div>
                <div className="at-eyebrow">Heavy ink dividers</div>
              </div>
            </div>
            <div style={{ border: '2px solid var(--at-ink)' }}>
              {BORDERED.map((item, i) => {
                const idx = i + 1;
                const open = o === idx;
                return (
                  <div key={item.q} style={i < BORDERED.length - 1 ? { borderBlockEnd: '2px solid var(--at-ink)' } : undefined}>
                    <button className="at-cluster" style={headerBtn({ padding: 'var(--at-space-4)', background: 'var(--at-surface)' })} onClick={() => setO(open ? null : idx)}>
                      <span className="at-text-strong">{item.q}</span>
                      <span style={{ fontWeight: 700 }}>{open ? '−' : '+'}</span>
                    </button>
                    {open && (
                      <div style={{ padding: 'var(--at-space-4)' }}>
                        <p className="at-text-muted">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Flush */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Flush</div>
                <div className="at-eyebrow">Edge-to-edge, no outer border</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 0 }}>
              {FLUSH.map((item, i) => {
                const idx = i + 1;
                const open = f === idx;
                return (
                  <div key={item.q} style={i < FLUSH.length - 1 ? { borderBlockEnd: '2px solid var(--at-ink)' } : undefined}>
                    <button className="at-cluster" style={headerBtn({ padding: 'var(--at-space-3) 0' })} onClick={() => setF(open ? null : idx)}>
                      <span className="at-text-strong">{item.q}</span>
                      <span style={{ fontWeight: 700 }}>{open ? '−' : '+'}</span>
                    </button>
                    {open && (
                      <div style={{ paddingBlockEnd: 'var(--at-space-3)' }}>
                        <p className="at-text-muted">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. With icons & meta */}
          <div className="at-col-12 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">With icons &amp; meta</div>
                <div className="at-eyebrow">Rich headers with badges and counts</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {META.map((item, i) => {
                const idx = i + 1;
                const open = m === idx;
                return (
                  <div key={item.label} style={{ border: '2px solid var(--at-ink)' }}>
                    <button className="at-cluster" style={headerBtn({ padding: 'var(--at-space-4)' })} onClick={() => setM(open ? null : idx)}>
                      <span className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                          {item.path}
                          {item.poly && <polyline points={item.poly} />}
                          {item.extra}
                        </svg>
                        <span className="at-text-strong">{item.label}</span>
                        <span className={`at-badge at-badge--${item.kind}`}>{item.badge}</span>
                      </span>
                      <span style={{ fontWeight: 700 }}>{open ? '−' : '+'}</span>
                    </button>
                    {open && (
                      <div style={{ padding: 'var(--at-space-4)', borderBlockStart: '2px solid var(--at-ink)' }}>
                        <p className="at-text-muted">{item.body}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
