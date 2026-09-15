/*
 * Hactex React — Projects dashboard.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  { label: 'Active Projects', value: '42', delta: '▲ 5.0%', dir: 'up' },
  { label: 'Tasks Completed', value: '1,860', delta: '▲ 9.4%', dir: 'up' },
  { label: 'Overdue Tasks', value: '73', delta: '▼ 12.0% (improved)', dir: 'up' },
  { label: 'Team Utilization', value: '81%', delta: '▲ 2.2%', dir: 'up' },
];

const THROUGHPUT_CATEGORIES = ['W1', 'W2', 'W3', 'W4'];
const THROUGHPUT_SERIES = [
  { name: 'Created', data: [142, 158, 134, 176] },
  { name: 'Completed', data: [128, 146, 151, 162] },
];

const STATUS_SERIES = [24, 9, 5, 4];
const STATUS_LABELS = ['On-track', 'At-risk', 'Delayed', 'Done'];

const WORKLOAD_CATEGORIES = ['Devon', 'Lena', 'Tomás', 'Priya', 'Ava', 'Sofia'];
const WORKLOAD_SERIES = [{ name: 'Tasks', data: [18, 15, 12, 11, 9, 7] }];

const BUDGET = [
  { label: 'Budget spent', meta: '$1.82M / $2.4M', width: '76%', variant: '' },
  { label: 'Time logged', meta: '3,840 / 4,800 h', width: '80%', variant: 'at-progress--info' },
  { label: 'Billable ratio', meta: '68%', width: '68%', variant: 'at-progress--success' },
];

const RECENT_PROJECTS = [
  { name: 'Hactex Rebrand', lead: 'Devon Okafor', progress: '82%', due: 'Aug 14', status: 'On-track', kind: 'success' },
  { name: 'Mobile App v2', lead: 'Lena Brandt', progress: '54%', due: 'Sep 02', status: 'At-risk', kind: 'warning' },
  { name: 'Billing Migration', lead: 'Tomás Herrera', progress: '38%', due: 'Aug 28', status: 'Delayed', kind: 'danger' },
  { name: 'Design System', lead: 'Priya Nair', progress: '100%', due: 'Jul 30', status: 'Done', kind: 'info' },
];

const MILESTONES = [
  { title: 'Design System shipped', meta: 'Jul 30 · done' },
  { title: 'Hactex Rebrand review', meta: 'Aug 14 · upcoming' },
  { title: 'Billing cutover', meta: 'Aug 28 · at-risk' },
  { title: 'Mobile beta', meta: 'Sep 02 · upcoming' },
];

const SCHEDULE = [
  { name: 'Aurora Redesign', team: 'Design', left: '4%', width: '46%', pct: '74%', color: 'var(--at-accent-text)', strong: true },
  { name: 'Mobile App v3', team: 'Engineering', left: '20%', width: '62%', pct: '48%', color: 'var(--at-chart-2-text)', strong: true },
  { name: 'Billing Migration', team: 'Platform', left: '36%', width: '50%', pct: '28%', color: 'var(--at-chart-3-text)', strong: true },
  { name: 'Data Warehouse', team: 'Data', left: '52%', width: '38%', pct: '12% · risk', color: 'var(--at-warning-text)', strong: false },
];

const HEALTH = [
  { name: 'Aurora Redesign', pct: '74%', width: '74%', variant: '' },
  { name: 'Mobile App v3', pct: '48%', width: '48%', variant: 'at-progress--info' },
  { name: 'Billing Migration', pct: '28%', width: '28%', variant: 'at-progress--warning' },
  { name: 'Data Warehouse', pct: '12% · at risk', width: '12%', variant: 'at-progress--danger', danger: true },
];

export const SLUG = 'dashboards/projects';

export default function Projects(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Projects"
        subtitle="Delivery throughput, schedule & team workload."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">This quarter</button>
            <button className="at-btn at-btn--primary at-press">+ New project</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        {/* KPI row */}
        <div className="at-row">
          {KPIS.map((k) => (
            <div key={k.label} className="at-col-3 at-card at-kpi">
              <div className="at-kpi__label">{k.label}</div>
              <div className="at-kpi__value">{k.value}</div>
              <div className={`at-kpi__delta at-kpi__delta--${k.dir}`}>{k.delta}</div>
            </div>
          ))}
        </div>

        {/* Task throughput + Project status */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Task Throughput</div>
                <div className="at-eyebrow">Created vs. completed · weekly</div>
              </div>
              <div className="at-segment">
                <button className="at-segment__btn is-active">4 weeks</button>
                <button className="at-segment__btn">12 weeks</button>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={300}
              legend
              series={THROUGHPUT_SERIES}
              categories={THROUGHPUT_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head"><div className="at-chart__title">Project Status</div></div>
            <ApexChart
              type="donut"
              height={300}
              legend
              series={STATUS_SERIES}
              labels={STATUS_LABELS}
              centerLabel="Projects"
              centerValue="42"
            />
          </div>
        </div>

        {/* Team workload + Budget & time */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Team Workload</div>
                <div className="at-eyebrow">Assigned tasks per member</div>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={280}
              color="--at-secondary"
              series={WORKLOAD_SERIES}
              categories={WORKLOAD_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Budget &amp; Time</div>
              <div className="at-eyebrow">Portfolio usage</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              {BUDGET.map((b) => (
                <div key={b.label}>
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{b.label}</span>
                    <span className="at-text-muted">{b.meta}</span>
                  </div>
                  <div className={`at-progress ${b.variant}`} style={{ marginBlockStart: 'var(--at-space-2)' }}>
                    <div className="at-progress__bar" style={{ width: b.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent projects table + Milestones */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__title">Recent Projects</div>
              <a href="#" className="at-btn at-btn--ghost at-btn--sm">View all →</a>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Lead</th>
                    <th>Progress</th>
                    <th>Due</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_PROJECTS.map((p) => (
                    <tr key={p.name}>
                      <td className="at-text-strong">{p.name}</td>
                      <td>{p.lead}</td>
                      <td>
                        <div className="at-progress" style={{ width: 120 }}>
                          <div className="at-progress__bar" style={{ width: p.progress }}></div>
                        </div>
                      </td>
                      <td>{p.due}</td>
                      <td><span className={`at-badge at-badge--${p.kind}`}>{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Milestones</div>
            </div>
            <div className="at-timeline">
              {MILESTONES.map((m) => (
                <div key={m.title} className="at-timeline__item">
                  <span className="at-timeline__dot"></span>
                  <div className="at-text-strong">{m.title}</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{m.meta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Schedule (gantt) + Project Health */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Project Schedule</div>
                <div className="at-eyebrow">Active timelines · Q2–Q3</div>
              </div>
              <button className="at-btn at-btn--ghost at-btn--sm at-press">Open timeline</button>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              {/* month scale */}
              <div
                className="at-cluster"
                style={{
                  justifyContent: 'flex-end',
                  gap: 'var(--at-space-6)',
                  paddingInlineStart: 148,
                  color: 'var(--at-text-muted)',
                  fontSize: 'var(--at-text-xs)',
                  fontFamily: 'var(--at-mono, var(--at-font-mono, monospace))',
                }}
              >
                <span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
              </div>
              {/* gantt rows */}
              {SCHEDULE.map((s) => (
                <div key={s.name} className="at-cluster" style={{ gap: 'var(--at-space-3)', flexWrap: 'nowrap', alignItems: 'center' }}>
                  <div style={{ width: 136, flex: '0 0 136px' }}>
                    <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{s.name}</div>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{s.team}</div>
                  </div>
                  <div
                    style={{
                      flex: '1 1 auto',
                      height: 18,
                      borderRadius: 'var(--at-radius-pill)',
                      background: 'color-mix(in oklab, var(--at-ink) 8%, transparent)',
                      position: 'relative',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: `0 auto 0 ${s.left}`,
                        width: s.width,
                        borderRadius: 'var(--at-radius-pill)',
                        background: s.color,
                      }}
                    ></span>
                  </div>
                  <span
                    className={`at-num ${s.strong ? 'at-text-strong' : ''}`}
                    style={{ width: 56, textAlign: 'right', fontSize: 'var(--at-text-sm)' }}
                  >{s.pct}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Project Health</div>
                <div className="at-eyebrow">Percent complete</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              {HEALTH.map((h) => (
                <div key={h.name}>
                  <div className="at-cluster" style={{ justifyContent: 'space-between', marginBlockEnd: 6 }}>
                    <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{h.name}</span>
                    <b className={`at-num ${h.danger ? '' : 'at-text-strong'}`} style={{ fontSize: 'var(--at-text-sm)', ...(h.danger ? { color: 'var(--at-danger-text)' } : {}) }}>{h.pct}</b>
                  </div>
                  <div className={`at-progress ${h.variant}`}>
                    <div className="at-progress__bar" style={{ width: h.width }}></div>
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
