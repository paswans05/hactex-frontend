/*
 * Hactex React — Tabs UI page.
 * Built with the shared component classes, inline token
 * styles, and demo figures. Each tab card owns its own active-index useState
 * (one useState per tab strip). The .at-tab-icon helper class is
 * preserved via a <style> tag (source defines it inline).
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const LINE_TABS = [
  'Overview content: a high-level summary of your workspace metrics.',
  'Activity content: a feed of recent events and changes.',
  'Settings content: configure preferences and integrations.',
];
const PILL_TABS = [
  'Day view — hourly breakdown.',
  'Week view — daily totals across 7 days.',
  'Month view — weekly aggregates for the period.',
];
const SEG_TABS = [
  'Grid layout shows items as cards.',
  'List layout shows items as rows.',
  'Map layout plots items geographically.',
];
const ICON_TABS = [
  'Home tab — the landing surface.',
  'Stats tab — charts and KPIs.',
  'Settings tab — preferences and config.',
];
const VERT_TABS: { title: string; body: string }[] = [
  { title: 'General settings', body: 'Manage your workspace name, default language, and time zone.' },
  { title: 'Security', body: 'Configure two-factor authentication, sessions, and API keys.' },
  { title: 'Notifications', body: 'Choose delivery channels and frequency for each alert type.' },
  { title: 'Billing', body: 'View your plan, payment method, and download past invoices.' },
];

const lineBtn = (active: boolean): React.CSSProperties => ({
  background: 'none',
  border: active ? 'none' : 'none',
  borderBottom: active ? '3px solid var(--at-ink)' : undefined,
  marginBlockEnd: active ? '-2px' : undefined,
  fontWeight: active ? 700 : undefined,
  cursor: 'pointer',
  paddingBlockEnd: 'var(--at-space-2)',
  color: 'inherit',
});

const vertBtn = (active: boolean): React.CSSProperties => ({
  textAlign: 'start',
  background: active ? 'var(--at-ink-strong)' : 'none',
  color: active ? 'var(--at-paper)' : 'inherit',
  fontWeight: active ? 700 : undefined,
  border: '2px solid var(--at-ink)',
  padding: 'var(--at-space-3)',
  cursor: 'pointer',
});

export default function Tabs(): React.JSX.Element {
  const [line, setLine] = useState(1);
  const [pill, setPill] = useState(1);
  const [seg, setSeg] = useState(1);
  const [icon, setIcon] = useState(1);
  const [vert, setVert] = useState(1);

  return (
    <>
      <style>{`
        .at-tab-icon {
          display: inline-flex;
          align-items: center;
          gap: var(--at-space-2);
          background: none;
          border: 2px solid var(--at-ink);
          padding: var(--at-space-2) var(--at-space-3);
          cursor: pointer;
          color: inherit;
        }
        .at-tab-icon.is-active {
          background: var(--at-ink-strong);
          color: var(--at-paper);
          font-weight: 700;
        }
      `}</style>

      <PageHead
        title="Tabs"
        subtitle="Switch between related views within the same context."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">History</button>
            <button className="at-btn at-btn--primary at-press">New view</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* 1. Line */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Line</div>
                <div className="at-eyebrow">Underline indicator</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-4)', borderBlockEnd: '2px solid var(--at-ink)', marginBlockEnd: 'var(--at-space-4)' }}>
              <button onClick={() => setLine(1)} style={lineBtn(line === 1)}>Overview</button>
              <button onClick={() => setLine(2)} style={lineBtn(line === 2)}>Activity</button>
              <button onClick={() => setLine(3)} style={lineBtn(line === 3)}>Settings</button>
            </div>
            <div className="at-text-muted">{LINE_TABS[line - 1]}</div>
          </div>

          {/* 2. Pill */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Pill</div>
                <div className="at-eyebrow">Enclosed pill toggles</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-2)', marginBlockEnd: 'var(--at-space-4)' }}>
              <button onClick={() => setPill(1)} className={`at-segment__btn${pill === 1 ? ' is-active' : ''}`} style={{ borderRadius: '999px' }}>Day</button>
              <button onClick={() => setPill(2)} className={`at-segment__btn${pill === 2 ? ' is-active' : ''}`} style={{ borderRadius: '999px' }}>Week</button>
              <button onClick={() => setPill(3)} className={`at-segment__btn${pill === 3 ? ' is-active' : ''}`} style={{ borderRadius: '999px' }}>Month</button>
            </div>
            <div className="at-text-muted">{PILL_TABS[pill - 1]}</div>
          </div>

          {/* 3. Segmented */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Segmented</div>
                <div className="at-eyebrow">Compact at-segment control</div>
              </div>
            </div>
            <div className="at-segment" style={{ marginBlockEnd: 'var(--at-space-4)' }}>
              <button onClick={() => setSeg(1)} className={`at-segment__btn${seg === 1 ? ' is-active' : ''}`}>Grid</button>
              <button onClick={() => setSeg(2)} className={`at-segment__btn${seg === 2 ? ' is-active' : ''}`}>List</button>
              <button onClick={() => setSeg(3)} className={`at-segment__btn${seg === 3 ? ' is-active' : ''}`}>Map</button>
            </div>
            <div className="at-text-muted">{SEG_TABS[seg - 1]}</div>
          </div>

          {/* 4. With icons */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">With icons</div>
                <div className="at-eyebrow">Glyph + label tabs</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-2)', borderBlockEnd: '2px solid var(--at-ink)', marginBlockEnd: 'var(--at-space-4)' }}>
              <button onClick={() => setIcon(1)} className={`at-tab-icon${icon === 1 ? ' is-active' : ''}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Home</span>
              </button>
              <button onClick={() => setIcon(2)} className={`at-tab-icon${icon === 2 ? ' is-active' : ''}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                <span>Stats</span>
              </button>
              <button onClick={() => setIcon(3)} className={`at-tab-icon${icon === 3 ? ' is-active' : ''}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33" />
                </svg>
                <span>Settings</span>
              </button>
            </div>
            <div className="at-text-muted">{ICON_TABS[icon - 1]}</div>
          </div>

          {/* 5. Vertical */}
          <div className="at-col-12 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Vertical</div>
                <div className="at-eyebrow">Side navigation panels</div>
              </div>
            </div>
            <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-col-3">
                <div className="at-stack" style={{ gap: 0 }}>
                  <button onClick={() => setVert(1)} style={vertBtn(vert === 1)}>General</button>
                  <button onClick={() => setVert(2)} style={{ ...vertBtn(vert === 2), marginBlockEnd: '-2px' }}>Security</button>
                  <button onClick={() => setVert(3)} style={{ ...vertBtn(vert === 3), marginBlockEnd: '-2px' }}>Notifications</button>
                  <button onClick={() => setVert(4)} style={vertBtn(vert === 4)}>Billing</button>
                </div>
              </div>
              <div className="at-col-9">
                <div className="at-text-strong" style={{ marginBlockEnd: 'var(--at-space-2)' }}>
                  {VERT_TABS[vert - 1].title}
                </div>
                <p className="at-text-muted">{VERT_TABS[vert - 1].body}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
