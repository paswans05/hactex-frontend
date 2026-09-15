/*
 * Hactex React — LMS / Courses dashboard.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  { label: 'Total Students', value: '18,420', delta: '▲ 7.3%', dir: 'up' },
  { label: 'Active Courses', value: '142', delta: '▲ 3.0%', dir: 'up' },
  { label: 'Completion Rate', value: '64%', delta: '▲ 2.1%', dir: 'up' },
  { label: 'Course Revenue', value: '$58,900', delta: '▲ 9.0%', dir: 'up' },
];

const ENROL_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const ENROL_SERIES = [
  { name: 'Enrollments', data: [820, 940, 1120, 1080, 1240, 1320] },
  { name: 'Revenue', data: [7400, 8200, 9800, 9400, 10800, 11800] },
];

const CATEGORY_SERIES = [38, 26, 20, 16];
const CATEGORY_LABELS = ['Development', 'Design', 'Business', 'Marketing'];

const LEARNING = [
  { course: 'Advanced TypeScript', pct: '62%', width: '62%', variant: '' },
  { course: 'UI Design Fundamentals', pct: '48%', width: '48%', variant: 'at-progress--info' },
  { course: 'GraphQL in Practice', pct: '81%', width: '81%', variant: 'at-progress--success' },
];

const COURSES = [
  { course: 'Full-Stack React', cat: 'Development', students: '2,840', revenue: '$28,400', rating: '4.9', kind: 'success' },
  { course: 'Design Systems 101', cat: 'Design', students: '1,920', revenue: '$15,360', rating: '4.8', kind: 'success' },
  { course: 'Product Strategy', cat: 'Business', students: '1,480', revenue: '$11,840', rating: '4.6', kind: 'secondary' },
  { course: 'Growth Marketing', cat: 'Marketing', students: '1,210', revenue: '$9,680', rating: '4.5', kind: 'secondary' },
];

const INSTRUCTORS = [
  { name: 'Devon Okafor', count: '2,840', kind: 'accent' },
  { name: 'Lena Brandt', count: '1,920', kind: 'secondary' },
  { name: 'Tomás Herrera', count: '1,480', kind: 'tertiary' },
  { name: 'Priya Nair', count: '1,210', kind: 'lime' },
];

const CLASSES = [
  { time: '10:00', meridian: 'AM', title: 'Live Q&A · React Patterns', meta: 'Daniel Cho · 184 attending', when: 'Today', whenKind: 'success', accent: true },
  { time: '2:30', meridian: 'PM', title: 'Design Critique Workshop', meta: 'Mira Aoki · 96 attending', when: 'Today', whenKind: 'neutral', accent: false },
  { time: '11:00', meridian: 'AM', title: 'Python Data Lab', meta: 'Priya Nair · 142 enrolled', when: 'Tomorrow', whenKind: 'neutral', accent: false },
  { time: '4:00', meridian: 'PM', title: 'PM Career AMA', meta: 'Tomás Herrera · 210 enrolled', when: 'Fri', whenKind: 'neutral', accent: false },
];

const ENROLLMENTS = [
  { letter: 'A', name: 'Ava Sutton', chartVar: '--at-chart-2', course: 'Advanced React Patterns', date: 'Jun 12', amount: '$89', status: 'Paid', kind: 'success' },
  { letter: 'R', name: 'Ravi Bansal', chartVar: '--at-chart-3', course: 'Python Data Lab', date: 'Jun 11', amount: '$129', status: 'Paid', kind: 'success' },
  { letter: 'M', name: 'Mei Vu', chartVar: '--at-chart-4', course: 'UX Research Fundamentals', date: 'Jun 10', amount: '$59', status: 'Pending', kind: 'warning' },
  { letter: 'J', name: 'Jonas Krüger', chartVar: '--at-chart-5', course: 'Cloud Architecture', date: 'Jun 09', amount: '$199', status: 'Paid', kind: 'success' },
];

export const SLUG = 'dashboards/lms';

export default function Lms(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="LMS / Courses"
        subtitle="Enrollments, completion & revenue — this month."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">This month</button>
            <button className="at-btn at-btn--primary at-press">+ Course</button>
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

        {/* Enrollments & Revenue + Students by Category */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Enrollments &amp; Revenue</div>
                <div className="at-eyebrow">Monthly</div>
              </div>
              <div className="at-segment">
                <button className="at-segment__btn is-active">6M</button>
                <button className="at-segment__btn">1Y</button>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={300}
              legend
              series={ENROL_SERIES}
              categories={ENROL_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div className="at-chart__title">Students by Category</div>
            </div>
            <ApexChart
              type="donut"
              height={300}
              legend
              series={CATEGORY_SERIES}
              labels={CATEGORY_LABELS}
              centerLabel="Students"
              centerValue="3,920"
            />
          </div>
        </div>

        {/* Performance + Continue learning */}
        <div className="at-row">
          <div className="at-col-6 at-card at-chart">
            <div className="at-chart__head">
              <div className="at-chart__title">Performance</div>
            </div>
            <div className="at-row" style={{ alignItems: 'center' }}>
              <div className="at-col-6">
                <ApexChart
                  type="donut"
                  height={180}
                  series={[64, 36]}
                  labels={['Complete', 'Remaining']}
                  centerLabel="Complete"
                  centerValue="64%"
                />
              </div>
              <div className="at-col-6 at-stack" style={{ gap: 'var(--at-space-3)' }}>
                <div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Completion</div>
                  <span className="at-kpi__value" style={{ fontSize: 'var(--at-text-xl)' }}>64%</span>
                </div>
                <div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Avg. Rating</div>
                  <span className="at-kpi__value" style={{ fontSize: 'var(--at-text-xl)' }}>4.7</span>
                  <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>/ 5</span>
                </div>
              </div>
            </div>
          </div>
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Continue Learning</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {LEARNING.map((l) => (
                <div key={l.course}>
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{l.course}</span>
                    <span className="at-text-muted">{l.pct}</span>
                  </div>
                  <div className={`at-progress ${l.variant}`} style={{ marginBlockStart: 'var(--at-space-2)' }}>
                    <div className="at-progress__bar" style={{ width: l.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top courses + Top instructors */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__title">Top Courses</div>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Category</th>
                    <th className="at-num">Students</th>
                    <th className="at-num">Revenue</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {COURSES.map((c) => (
                    <tr key={c.course}>
                      <td className="at-text-strong">{c.course}</td>
                      <td>{c.cat}</td>
                      <td className="at-num">{c.students}</td>
                      <td className="at-num">{c.revenue}</td>
                      <td><span className={`at-badge at-badge--${c.kind}`}>{c.rating}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Top Instructors</div>
            </div>
            <div className="at-list">
              {INSTRUCTORS.map((i) => (
                <div key={i.name} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{i.name}</span>
                    <span className={`at-badge at-badge--${i.kind}`}>{i.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming classes + Recent enrollments */}
        <div className="at-row">
          <div className="at-col-5 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Upcoming Classes</div>
              <button className="at-btn at-btn--ghost at-btn--sm at-press">Calendar</button>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {CLASSES.map((c, idx) => (
                <div
                  key={c.title}
                  className="at-cluster"
                  style={{ gap: 'var(--at-space-3)', flexWrap: 'nowrap', ...(idx < CLASSES.length - 1 ? { paddingBlockEnd: 'var(--at-space-3)', borderBottom: 'var(--at-border)' } : {}) }}
                >
                  <div style={{ textAlign: 'center', minWidth: 54 }}>
                    <div className="at-num at-text-strong" style={{ fontSize: 'var(--at-text-lg)', ...(c.accent ? { color: 'var(--at-accent-text)' } : {}) }}>{c.time}</div>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{c.meridian}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="at-text-strong">{c.title}</div>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{c.meta}</div>
                  </div>
                  <span className={`at-badge at-badge--${c.whenKind}`}>{c.when}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="at-col-7 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div>
                <div className="at-chart__title">Recent Enrollments</div>
                <div className="at-eyebrow">Latest students &amp; payments</div>
              </div>
              <button className="at-btn at-btn--ghost at-btn--sm at-press">View all</button>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Date</th>
                    <th className="at-num">Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ENROLLMENTS.map((e) => (
                    <tr key={e.name}>
                      <td>
                        <div className="at-cluster" style={{ gap: 'var(--at-space-3)', whiteSpace: 'nowrap' }}>
                          <div className="at-avatar at-avatar--sm" style={{ background: `color-mix(in oklab, var(${e.chartVar}) 18%, transparent)`, color: `var(${e.chartVar}-text)` }}>{e.letter}</div>
                          <div className="at-text-strong">{e.name}</div>
                        </div>
                      </td>
                      <td>{e.course}</td>
                      <td className="at-num" style={{ whiteSpace: 'nowrap' }}>{e.date}</td>
                      <td className="at-num">{e.amount}</td>
                      <td><span className={`at-badge at-badge--${e.kind}`}>{e.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
