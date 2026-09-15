/*
 * Hactex React — School dashboard.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  { label: 'Total Students', value: '2,340', delta: '▲ 2.0%', dir: 'up' },
  { label: 'Teachers', value: '148', delta: '▲ 1.0%', dir: 'up' },
  { label: 'Attendance Rate', value: '94.8%', delta: '▲ 0.4%', dir: 'up' },
  { label: 'Fee Collection', value: '88%', delta: '▲ 3.0%', dir: 'up' },
];

const ATTENDANCE_CATEGORIES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const ATTENDANCE_SERIES = [
  { name: 'Present', data: [2100, 2120, 2080, 2150, 2060] },
  { name: 'Late', data: [84, 72, 96, 68, 110] },
  { name: 'Absent', data: [156, 148, 164, 122, 170] },
];

const GRADE_SERIES = [28, 26, 24, 22];
const GRADE_LABELS = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

const SCORES_CATEGORIES = ['Math', 'Science', 'English', 'History', 'Art', 'CS'];
const SCORES_SERIES = [{ name: 'Score', data: [82, 78, 86, 74, 88, 80] }];

const PERFORMERS = [
  { letter: 'A', name: 'Ava Sutton', grade: 'Grade 12', score: '98.4%', rank: '1', rankKind: 'accent', bg: undefined },
  { letter: 'M', name: 'Marcus Reed', grade: 'Grade 11', score: '96.8%', rank: '2', rankKind: 'secondary', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)' },
  { letter: 'N', name: 'Nadia Klein', grade: 'Grade 12', score: '95.2%', rank: '3', rankKind: 'tertiary', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)' },
  { letter: 'J', name: 'Jonas Berg', grade: 'Grade 10', score: '94.6%', rank: '4', rankKind: 'lime', bg: 'var(--at-lime)', color: 'var(--at-on-lime)' },
];

const TIMETABLE = [
  { subject: 'Mathematics', time: '09:00', kind: 'accent' },
  { subject: 'Science', time: '10:30', kind: 'secondary' },
  { subject: 'English', time: '12:00', kind: 'tertiary' },
  { subject: 'Art', time: '14:00', kind: 'neutral' },
];

const NOTICES = [
  { body: <>Sports Day moved to Jul 4 — full schedule posted</>, meta: '2h ago · Admin', strong: 'Sports Day' },
  { body: <>Mid-term <b>report cards</b> available to parents</>, meta: 'Yesterday · Academics', strong: 'report cards' },
  { body: <>Library closed <b>Saturday</b> for maintenance</>, meta: '2d ago · Facilities', strong: 'Saturday' },
  { body: <>Parent-teacher conferences — <b>book your slot</b></>, meta: '4d ago · Admin', strong: 'book your slot' },
];

const ADMISSIONS = [
  { letter: 'L', name: 'Leah Kowalski', id: '#S-22841', grade: 'Grade 9', guardian: 'Anna Kowalski', enrolled: 'Jun 24', fees: 'Paid', feesKind: 'success', status: 'Active', statusKind: 'success', bg: 'color-mix(in oklab, var(--at-chart-2) 18%, transparent)', fg: 'var(--at-chart-2-text)' },
  { letter: 'D', name: 'Diego Méndez', id: '#S-22842', grade: 'Grade 10', guardian: 'Carlos Méndez', enrolled: 'Jun 23', fees: 'Partial', feesKind: 'warning', status: 'Active', statusKind: 'success', bg: 'color-mix(in oklab, var(--at-chart-3) 18%, transparent)', fg: 'var(--at-chart-3-text)' },
  { letter: 'Y', name: 'Yara Patel', id: '#S-22843', grade: 'Grade 11', guardian: 'Priya Patel', enrolled: 'Jun 22', fees: 'Paid', feesKind: 'success', status: 'Pending', statusKind: 'neutral', bg: 'color-mix(in oklab, var(--at-chart-4) 18%, transparent)', fg: 'var(--at-chart-4-text)' },
  { letter: 'F', name: 'Femi Oyelaran', id: '#S-22844', grade: 'Grade 9', guardian: 'Tunde Oyelaran', enrolled: 'Jun 21', fees: 'Paid', feesKind: 'success', status: 'Active', statusKind: 'success', bg: undefined, fg: undefined },
];

export default function School(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="School"
        subtitle={<>Enrolment, attendance &amp; performance — this term.</>}
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">This term</button>
            <button className="at-btn at-btn--primary at-press">+ Student</button>
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

        {/* Attendance stacked column + By grade donut */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Attendance Overview</div>
                <div className="at-eyebrow">Present · late · absent — by weekday</div>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={300}
              stacked
              legend
              series={ATTENDANCE_SERIES}
              categories={ATTENDANCE_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div className="at-chart__title">Students by Grade</div>
            </div>
            <ApexChart
              type="donut"
              height={300}
              legend
              series={GRADE_SERIES}
              labels={GRADE_LABELS}
              centerLabel="Students"
              centerValue="1,240"
            />
          </div>
        </div>

        {/* Exam scores by subject (column) + Fee collection */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Average Exam Scores</div>
                <div className="at-eyebrow">By subject · %</div>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={280}
              color="--at-secondary"
              series={SCORES_SERIES}
              categories={SCORES_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Fee Collection</div>
              <div className="at-eyebrow">This term</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Collected</span>
                  <span className="at-kpi__value" style={{ fontSize: 'var(--at-text-lg)' }}>$1.84M</span>
                </div>
              </div>
              <div>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Outstanding</span>
                  <span className="at-text-strong">$252K</span>
                </div>
              </div>
              <div className="at-progress at-progress--success" style={{ marginBlockStart: 'var(--at-space-2)' }}>
                <div className="at-progress__bar" style={{ width: '88%' }} />
              </div>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-text-muted">Target</span>
                <span className="at-text-muted">$2.09M</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top performers table + Today's timetable */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__title">Top Performers</div>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Grade</th>
                    <th className="at-num">Avg. Score</th>
                    <th>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {PERFORMERS.map((p) => (
                    <tr key={p.name}>
                      <td>
                        <div className="at-cluster">
                          <div className="at-avatar at-avatar--sm" style={p.bg ? { background: p.bg, color: p.color } : undefined}>{p.letter}</div>
                          <span className="at-text-strong">{p.name}</span>
                        </div>
                      </td>
                      <td>{p.grade}</td>
                      <td className="at-num">{p.score}</td>
                      <td><span className={`at-badge at-badge--${p.rankKind}`}>{p.rank}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Today's Timetable</div>
            </div>
            <div className="at-list">
              {TIMETABLE.map((t) => (
                <div key={t.subject} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{t.subject}</span>
                    <span className={`at-badge at-badge--${t.kind}`}>{t.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notices (timeline) + Recent Admissions (table) */}
        <div className="at-row">
          <div className="at-col-5 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Notices</div>
                <div className="at-eyebrow">Latest announcements</div>
              </div>
              <button className="at-btn at-btn--ghost at-btn--sm at-press">Board</button>
            </div>
            <div className="at-timeline">
              {NOTICES.map((n) => (
                <div key={n.strong} className="at-timeline__item">
                  <span className="at-timeline__dot" />
                  <div>
                    <div className="at-text-strong">{n.body}</div>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{n.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="at-col-7 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div>
                <div className="at-chart__title">Recent Admissions</div>
                <div className="at-eyebrow">New student enrollments</div>
              </div>
              <button className="at-btn at-btn--ghost at-btn--sm at-press">View all</button>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table" style={{ whiteSpace: 'nowrap' }}>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Grade</th>
                    <th>Guardian</th>
                    <th>Enrolled</th>
                    <th>Fees</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ADMISSIONS.map((a) => (
                    <tr key={a.id}>
                      <td>
                        <div className="at-cluster" style={{ gap: 'var(--at-space-3)', flexWrap: 'nowrap' }}>
                          <div className="at-avatar at-avatar--sm" style={a.bg ? { background: a.bg, color: a.fg } : undefined}>{a.letter}</div>
                          <div>
                            <div className="at-text-strong">{a.name}</div>
                            <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{a.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>{a.grade}</td>
                      <td>{a.guardian}</td>
                      <td className="at-num">{a.enrolled}</td>
                      <td><span className={`at-badge at-badge--${a.feesKind}`}>{a.fees}</span></td>
                      <td><span className={`at-badge at-badge--${a.statusKind}`}>{a.status}</span></td>
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
