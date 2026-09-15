/*
 * Hactex React — Profile page.
 * Built with the shared component classes, inline token
 * styles, and demo content (Maya Albright). KPIs, skills, connections extracted
 * into const arrays. The tab nav + composer textarea are useState-driven.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const KPIS = [
  { label: 'Posts', value: '248', delta: null },
  { label: 'Followers', value: '12,940', delta: '▲ 4.2%' },
  { label: 'Projects', value: '36', delta: null },
  { label: 'Endorsements', value: '1,102', delta: '▲ 1.8%' },
] as const;

const SKILLS = [
  'Design Systems', 'Figma', 'Accessibility', 'Prototyping', 'Tokens', 'CSS', 'Research', 'Motion',
] as const;

const ABOUT_ROWS = [
  { icon: '✉', value: 'maya.albright@northwind.io' },
  { icon: '☎', value: '+351 912 044 318' },
  { icon: '◷', value: 'maya.design' },
] as const;

const CONNECTIONS = [
  { letter: 'D', bg: undefined, name: 'Devon Okafor', role: 'Staff Engineer', following: true },
  { letter: 'L', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', name: 'Lena Brandt', role: 'Illustrator', following: false },
  { letter: 'T', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', name: 'Tomás Herrera', role: 'PM, Platform', following: false },
] as const;

export default function Profile(): React.JSX.Element {
  const [tab, setTab] = useState<'overview' | 'activity' | 'projects'>('overview');
  const [update, setUpdate] = useState('');

  return (
    <>
      <PageHead
        title="Profile"
        subtitle="Designer, system-builder, occasional illustrator."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Message</button>
            <button className="at-btn at-btn--primary at-press">Follow</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        {/* Profile header (cover + avatar) — not a titled card */}
        <div className="at-card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '0 var(--at-space-5) var(--at-space-5)' }}>
            <div
              className="at-cluster"
              style={{
                gap: 'var(--at-space-5)',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                paddingTop: '30px',
              }}
            >
              <div
                className="at-avatar at-avatar--xl"
                style={{
                  boxShadow: '0 0 0 4px var(--at-paper), 0 0 0 6px var(--at-accent)',
                  background: 'color-mix(in oklab, var(--at-accent) 16%, var(--at-paper))',
                  color: 'var(--at-accent-text)',
                }}
              >
                M
              </div>
              <div style={{ flex: '1 1 240px', minWidth: 0, paddingBlockEnd: 'var(--at-space-2)' }}>
                <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                  <h2 className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>Maya Albright</h2>
                  <span className="at-badge at-badge--accent">Pro</span>
                </div>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginTop: '2px' }}>
                  Principal Product Designer · Design Systems
                </div>
                <div
                  className="at-cluster at-text-muted"
                  style={{ gap: 'var(--at-space-4)', marginTop: 'var(--at-space-2)', fontSize: 'var(--at-text-xs)' }}
                >
                  <span>Lisbon, Portugal</span>
                  <span>Joined Mar 2022</span>
                  <span className="at-cluster" style={{ gap: '6px', color: 'var(--at-success-text)' }}>
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: 'var(--at-success)',
                        display: 'inline-block',
                      }}
                    />
                    Available for work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI strip (4 cards) */}
        <div className="at-row">
          {KPIS.map((k) => (
            <div key={k.label} className="at-col-3 at-card at-kpi">
              <div className="at-kpi__label">{k.label}</div>
              <div className="at-kpi__value">{k.value}</div>
              {k.delta && <div className="at-kpi__delta at-kpi__delta--up">{k.delta}</div>}
            </div>
          ))}
        </div>

        {/* Two-column: left rail (3 titled) + main (tabbed, untitled) */}
        <div className="at-row">
          <div className="at-col-4 at-stack" style={{ gap: 'var(--at-space-5)' }}>
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">About</div>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
                <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', lineHeight: 1.6 }}>
                  Designer focused on data-dense interfaces and design systems. I help product teams
                  ship calm, accessible tooling — currently leading the component platform at Northwind.
                </p>
                <div className="at-list">
                  {ABOUT_ROWS.map((r) => (
                    <div key={r.value} className="at-list__item">
                      <div className="at-cluster" style={{ gap: 'var(--at-space-2)', minWidth: 0 }}>
                        <span className="at-text-muted">{r.icon}</span>
                        <span className="at-text-strong" style={{ overflowWrap: 'anywhere', minWidth: 0 }}>
                          {r.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">Skills &amp; Tools</div>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-2)', flexWrap: 'wrap' }}>
                {SKILLS.map((s) => (
                  <span key={s} className="at-badge at-badge--neutral">{s}</span>
                ))}
              </div>
            </div>

            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">Connections</div>
                <button className="at-btn at-btn--ghost at-btn--sm">View all</button>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
                {CONNECTIONS.map((c) => (
                  <div key={c.name} className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
                    <div className="at-avatar at-avatar--sm" style={c.bg ? { background: c.bg, color: c.color } : undefined}>{c.letter}</div>
                    <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                      <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{c.name}</div>
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{c.role}</div>
                    </div>
                    <button className={c.following ? 'at-btn at-btn--ghost at-btn--sm' : 'at-btn at-btn--outline at-btn--sm'}>
                      {c.following ? 'Following' : 'Follow'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main column: tabbed activity (no title → does not count) */}
          <div className="at-col-8 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-tabs__nav">
              <button
                className={tab === 'overview' ? 'at-tabs__tab is-active' : 'at-tabs__tab'}
                onClick={() => setTab('overview')}
              >
                Overview
              </button>
              <button
                className={tab === 'activity' ? 'at-tabs__tab is-active' : 'at-tabs__tab'}
                onClick={() => setTab('activity')}
              >
                Activity
              </button>
              <button
                className={tab === 'projects' ? 'at-tabs__tab is-active' : 'at-tabs__tab'}
                onClick={() => setTab('projects')}
              >
                Projects <span className="at-badge at-badge--inline at-badge--neutral">12</span>
              </button>
            </div>
            <div className="at-divider" />
            <div className="at-stack" style={{ gap: 'var(--at-space-4)', marginBlockStart: 'var(--at-space-4)' }}>
              <div className="at-cluster" style={{ gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
                <div className="at-avatar at-avatar--sm" style={{ background: 'var(--at-accent)', color: 'var(--at-on-accent)' }}>M</div>
                <div style={{ flex: '1 1 auto' }}>
                  <textarea
                    className="at-textarea"
                    rows={2}
                    placeholder="Share an update with your followers…"
                    aria-label="Share an update"
                    value={update}
                    onChange={(e) => setUpdate(e.target.value)}
                  />
                  <div className="at-cluster" style={{ justifyContent: 'space-between', marginTop: 'var(--at-space-2)' }}>
                    <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Visible to followers</span>
                    <button className="at-btn at-btn--primary at-btn--sm">Post update</button>
                  </div>
                </div>
              </div>
              <div
                style={{
                  padding: 'var(--at-space-4)',
                  border: '1px solid var(--at-ink)',
                  borderRadius: 'var(--at-radius-md)',
                }}
              >
                <div className="at-cluster" style={{ gap: 'var(--at-space-3)', marginBlockEnd: 'var(--at-space-3)' }}>
                  <div className="at-avatar at-avatar--sm" style={{ background: 'var(--at-accent)', color: 'var(--at-on-accent)' }}>M</div>
                  <div style={{ flex: '1 1 auto' }}>
                    <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>Maya Albright</div>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Jun 24 · 09:12</div>
                  </div>
                </div>
                <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', lineHeight: 1.6 }}>
                  Shipped the new density tokens today — tables, lists and the side rail all read 8%
                  tighter without losing tap targets. Before/after in the thread.
                </p>
                <div
                  className="at-cluster at-text-muted"
                  style={{ gap: 'var(--at-space-4)', marginTop: 'var(--at-space-3)', fontSize: 'var(--at-text-xs)' }}
                >
                  <span>▲ 214</span>
                  <span>● 38</span>
                  <span>↗ Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
