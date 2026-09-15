/*
 * Hactex React — Project details (Aurora Redesign).
 * Built with the shared component classes,
 * inline token styles, and demo figures.
 */
import { PageHead } from '../../components/shell/PageHead';

const TASK_STATS = [
  { label: 'Backlog', value: '12' },
  { label: 'In progress', value: '11' },
  { label: 'Review', value: '7' },
  { label: 'Done', value: '22' },
];

const FILES = [
  { tag: 'PDF', bg: undefined, color: undefined, name: 'brand-guide.pdf', size: '4.2 MB' },
  { tag: 'FIG', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', name: 'tokens-spec.fig', size: '18 MB' },
  { tag: 'XLS', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', name: 'audit-results.xlsx', size: '820 KB' },
  { tag: 'CSS', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', name: 'tokens.css', size: '36 KB' },
];

const TEAM = [
  { letter: 'L', name: 'Lena Brandt', bg: undefined, color: undefined, role: 'Project lead', badge: 'Lead', badgeKind: 'accent' },
  { letter: 'D', name: 'Devon Okafor', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', role: 'Staff engineer', badge: null, badgeKind: '' },
  { letter: 'P', name: 'Priya Nair', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', role: 'Accessibility', badge: null, badgeKind: '' },
  { letter: 'A', name: 'Ava Sutton', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', role: 'Product designer', badge: null, badgeKind: '' },
  { letter: 'T', name: 'Tomás Herrera', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', role: 'Frontend engineer', badge: null, badgeKind: '' },
];

const MILESTONES = [
  { title: 'Token foundation shipped', meta: 'Done · May 14' },
  { title: 'Component migration 70%', meta: 'Done · Jun 20' },
  { title: 'Design freeze', meta: 'Jun 30 · 3 days' },
  { title: 'Launch — all surfaces live', meta: 'Jul 18 · 20 days' },
];

const ACTIVITY = [
  { title: 'Devon merged the token role layer', meta: '12m ago' },
  { title: 'Priya commented on the contrast audit', meta: '1h ago' },
  { title: 'Ava uploaded tokens-spec.fig', meta: '3h ago' },
  { title: 'Lena moved 4 tasks to Review', meta: 'Yesterday' },
];

export default function ProjectDetails(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Aurora Redesign"
        subtitle="Design system overhaul · Led by Lena Brandt · Due Jul 18, 2026."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Discuss</button>
            <button className="at-btn at-btn--primary at-press">New task</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div
          className="at-card at-cluster"
          style={{ padding: 'var(--at-space-5)', gap: 'var(--at-space-5)' }}
        >
          <div
            className="at-avatar at-avatar--xl"
            style={{ background: 'var(--at-accent)', color: 'var(--at-on-accent)' }}
          >
            A
          </div>
          <div style={{ flex: '1 1 auto' }}>
            <h2 className="at-page-head__title" style={{ margin: 0 }}>Aurora Redesign</h2>
            <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', maxWidth: '64ch' }}>
              Rebuild the entire component library on the new role-token foundation, ship dark
              mode and 12 accents, and migrate every product surface without a visual
              regression.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>74%</div>
            <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Complete</div>
          </div>
        </div>

        <div className="at-row" style={{ alignItems: 'flex-start' }}>
          <div className="at-col-8 at-stack" style={{ gap: 'var(--at-space-5)' }}>
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div
                className="at-chart__head"
                style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}
              >
                <div>
                  <div className="at-chart__title">Tasks</div>
                  <div className="at-eyebrow">Distribution across the board</div>
                </div>
                <button className="at-btn at-btn--ghost at-btn--sm">Open board</button>
              </div>
              <div className="at-row" style={{ marginBlockEnd: 'var(--at-space-4)' }}>
                {TASK_STATS.map((s) => (
                  <div key={s.label} className="at-col-3">
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{s.label}</div>
                    <div className="at-text-strong">{s.value}</div>
                  </div>
                ))}
              </div>
              <div className="at-list">
                <div className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-muted" style={{ textDecoration: 'line-through' }}>
                      Define role-token layer for surfaces &amp; text
                    </span>
                    <label className="at-check"><input type="checkbox" defaultChecked /></label>
                  </div>
                </div>
                <div className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">Migrate all button variants to the new tokens</span>
                    <label className="at-check"><input type="checkbox" /></label>
                  </div>
                </div>
                <div className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">Audit WCAG contrast across all 12 accents</span>
                    <span className="at-badge at-badge--warning">Overdue</span>
                  </div>
                </div>
                <div className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">Ship dark mode for the dashboard surface</span>
                    <label className="at-check"><input type="checkbox" /></label>
                  </div>
                </div>
              </div>
            </div>

            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div
                className="at-chart__head"
                style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}
              >
                <div>
                  <div className="at-chart__title">Files</div>
                  <div className="at-eyebrow">14 attachments · 248 MB</div>
                </div>
                <button className="at-btn at-btn--ghost at-btn--sm">Upload</button>
              </div>
              <div className="at-row">
                {FILES.map((f) => (
                  <div key={f.name} className="at-col-3 at-cluster">
                    <div
                      className="at-avatar at-avatar--sm"
                      style={{
                        ...(f.bg ? { background: f.bg, color: f.color } : null),
                        ...(f.color ? { color: f.color } : null),
                      }}
                    >
                      {f.tag}
                    </div>
                    <div>
                      <div className="at-text-strong">{f.name}</div>
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{f.size}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="at-col-4 at-stack" style={{ gap: 'var(--at-space-5)' }}>
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div
                className="at-chart__head"
                style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}
              >
                <div className="at-chart__title">Team</div>
                <button className="at-btn at-btn--ghost at-btn--sm">Add</button>
              </div>
              <div className="at-list">
                {TEAM.map((m) => (
                  <div key={m.name} className="at-list__item">
                    <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                      <div className="at-cluster">
                        <div
                          className="at-avatar at-avatar--sm"
                          style={{
                            ...(m.bg ? { background: m.bg, color: m.color } : null),
                            ...(m.color ? { color: m.color } : null),
                          }}
                        >
                          {m.letter}
                        </div>
                        <div>
                          <div className="at-text-strong">{m.name}</div>
                          <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                            {m.role}
                          </div>
                        </div>
                      </div>
                      {m.badge && <span className={`at-badge at-badge--${m.badgeKind}`}>{m.badge}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div
                className="at-chart__head"
                style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}
              >
                <div className="at-chart__title">Milestones</div>
              </div>
              <div className="at-timeline">
                {MILESTONES.map((m) => (
                  <div key={m.title} className="at-timeline__item">
                    <div className="at-timeline__dot" />
                    <div>
                      <div className="at-text-strong">{m.title}</div>
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{m.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div
                className="at-chart__head"
                style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}
              >
                <div className="at-chart__title">Activity</div>
                <button className="at-btn at-btn--ghost at-btn--sm">All</button>
              </div>
              <div className="at-timeline">
                {ACTIVITY.map((a) => (
                  <div key={a.title} className="at-timeline__item">
                    <div className="at-timeline__dot" />
                    <div>
                      <div className="at-text-strong">{a.title}</div>
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{a.meta}</div>
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
