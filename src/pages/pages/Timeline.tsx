/*
 * Hactex React — Timeline page.
 * Built with the shared component classes, inline token
 * styles, and demo content. Activity + release entries are extracted into const
 * arrays. The Compact/Comfortable segment is a useState toggle.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const TODAY = [
  {
    title: (
      <>
        Mara Lindqvist merged pull request #482 · Tokenize chart palette
      </>
    ),
    meta: (
      <>
        14 files changed across the charts module. CI green, deployed to staging.{' '}
        <span className="at-badge at-badge--inline at-badge--success">+428 −96</span>
      </>
    ),
    time: '09:41',
  },
  {
    title: (
      <>
        Devon Okafor attached <span className="at-badge at-badge--inline at-badge--info">empty-states-v3.fig</span> to the design review
      </>
    ),
    meta: <>Latest iteration of the empty-state system for review.</>,
    time: '08:12',
  },
  {
    title: (
      <>
        Aiko Tanaka shipped feature flag <span className="at-badge at-badge--inline at-badge--accent">charts-v2</span> to production
      </>
    ),
    meta: <>Enabled at 100% — monitoring error rate.</>,
    time: '07:30',
  },
] as const;

const YESTERDAY = [
  {
    title: <>Henry Whitlock closed issue #481 · Drawer z-index on mobile</>,
    meta: (
      <>
        Fixed by raising overlay stack to <span className="at-badge at-badge--inline at-badge--warning">z-900</span>
      </>
    ),
    time: '16:05',
  },
  {
    title: (
      <>
        Sofia Lindqvist commented on <span className="at-badge at-badge--inline at-badge--neutral">create-project.html</span>
      </>
    ),
    meta: <>"Budget field should default to USD, not blank."</>,
    time: '14:22',
  },
] as const;

const RELEASES = [
  { title: 'v2.4.0 — Aurora charts', date: '27 Jun' },
  { title: 'v2.3.1 — Patch: focus rings', date: '19 Jun' },
  { title: 'v2.3.0 — Nested menu', date: '11 Jun' },
  { title: 'v2.2.0 — Command palette', date: '02 Jun' },
] as const;

const MARKERS = [
  { color: 'var(--at-success-text)', title: 'Success', meta: 'Completed step or merge' },
  { color: 'var(--at-warning-text)', title: 'Pending', meta: 'Awaiting an action' },
  { color: 'var(--at-danger-text)', title: 'Failed', meta: 'An error or rejection' },
  { color: 'var(--at-accent-text)', title: 'Now / Highlighted', meta: 'Accent dot for the live node' },
] as const;

function ActivityItem({
  title,
  meta,
  time,
}: {
  title: React.ReactNode;
  meta: React.ReactNode;
  time: string;
}): React.JSX.Element {
  return (
    <div className="at-timeline__item">
      <div className="at-timeline__dot" />
      <div>
        <div className="at-text-strong">{title}</div>
        <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{meta}</div>
      </div>
      <span
        className="at-text-muted at-mono"
        style={{ fontSize: 'var(--at-text-xs)', whiteSpace: 'nowrap' }}
      >
        {time}
      </span>
    </div>
  );
}

export default function Timeline(): React.JSX.Element {
  const [view, setView] = useState<'compact' | 'comfortable'>('compact');

  return (
    <>
      <PageHead
        title="Timeline"
        subtitle="The Timeline surface."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Action</button>
            <button className="at-btn at-btn--primary at-press">Primary</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* Activity Timeline */}
          <div className="at-col-8 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Activity Timeline</div>
                <div className="at-eyebrow">Chronological feed grouped by day — newest first</div>
              </div>
              <div className="at-segment">
                <button
                  className={view === 'compact' ? 'at-segment__btn is-active' : 'at-segment__btn'}
                  onClick={() => setView('compact')}
                >
                  Compact
                </button>
                <button
                  className={view === 'comfortable' ? 'at-segment__btn is-active' : 'at-segment__btn'}
                  onClick={() => setView('comfortable')}
                >
                  Comfortable
                </button>
              </div>
            </div>
            <div className="at-text-strong" style={{ marginBlockEnd: 'var(--at-space-3)' }}>
              Today · Fri, 27 Jun 2026
            </div>
            <div className="at-timeline">
              {TODAY.map((item, i) => (
                <ActivityItem key={i} title={item.title} meta={item.meta} time={item.time} />
              ))}
            </div>
            <div className="at-text-strong" style={{ marginBlock: 'var(--at-space-4) var(--at-space-3)' }}>
              Yesterday · Thu, 26 Jun 2026
            </div>
            <div className="at-timeline">
              {YESTERDAY.map((item, i) => (
                <ActivityItem key={i} title={item.title} meta={item.meta} time={item.time} />
              ))}
            </div>
          </div>

          <div className="at-col-4 at-stack" style={{ gap: 'var(--at-space-5)' }}>
            {/* Release History */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">Release History</div>
              </div>
              <div className="at-timeline">
                {RELEASES.map((r) => (
                  <div key={r.title} className="at-timeline__item">
                    <div className="at-timeline__dot" />
                    <div>
                      <div className="at-text-strong">{r.title}</div>
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{r.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Marker States */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">Marker States</div>
              </div>
              <div className="at-list">
                {MARKERS.map((m) => (
                  <div key={m.title} className="at-list__item">
                    <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
                      <span
                        className="at-timeline__dot"
                        style={{ background: m.color, flexShrink: 0 }}
                      />
                      <div>
                        <div className="at-text-strong">{m.title}</div>
                        <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{m.meta}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
