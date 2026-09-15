/*
 * Hactex React — Jobs & Recruitment dashboard.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  { label: 'Open Positions', value: '58', delta: '▲ 4.0%', dir: 'up' },
  { label: 'Applications (30D)', value: '2,940', delta: '▲ 11.0%', dir: 'up' },
  { label: 'Time to Hire', value: '24d', delta: '▼ 8.0% (good)', dir: 'up' },
  { label: 'Offer Acceptance', value: '78%', delta: '▲ 2.5%', dir: 'up' },
];

const FUNNEL_CATEGORIES = ['Applied', 'Screened', 'Interview', 'Offer', 'Hired'];
const FUNNEL_SERIES = [{ name: 'Candidates', data: [2940, 1180, 460, 96, 72] }];

const SOURCE_SERIES = [42, 28, 18, 12];
const SOURCE_LABELS = ['Job boards', 'Referrals', 'Agency', 'Direct'];

const DEPT_CATEGORIES = ['Engineering', 'Sales', 'Design', 'Marketing', 'Support', 'Ops'];
const DEPT_SERIES = [{ name: 'Openings', data: [18, 12, 9, 8, 6, 5] }];

const APP_CATEGORIES = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
const APP_SERIES = [{ name: 'Applications', data: [480, 520, 610, 580, 690, 720, 810, 940] }];

const APPLICANTS = [
  { letter: 'E', name: 'Elena Morales', bg: undefined, role: 'Frontend Engineer', stage: 'Offer', kind: 'success', applied: 'Jun 12' },
  { letter: 'R', name: 'Raj Kothari', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', role: 'Data Analyst', stage: 'Interview', kind: 'info', applied: 'Jun 11' },
  { letter: 'C', name: 'Chiara Ferrari', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', role: 'Product Manager', stage: 'Screening', kind: 'warning', applied: 'Jun 10' },
  { letter: 'A', name: 'Amara Osei', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', role: 'UX Researcher', stage: 'Applied', kind: 'secondary', applied: 'Jun 10' },
  { letter: 'L', name: 'Liam Patterson', bg: undefined, role: 'Backend Engineer', stage: 'Hired', kind: 'success', applied: 'Jun 9' },
];

const INTERVIEWS = [
  { title: 'Elena Morales — Final', meta: '10:00 · Frontend' },
  { title: 'Raj Kothari — Technical', meta: '13:30 · Data' },
  { title: 'Chiara Ferrari — Intro', meta: '15:00 · Product' },
  { title: 'Amara Osei — Portfolio', meta: '16:30 · UX' },
];

const REQUISITIONS = [
  { title: 'Senior Frontend Engineer', dept: 'Engineering', loc: 'Remote · EU', applicants: '214', posted: '3d ago', status: 'Open', kind: 'success' },
  { title: 'Product Designer', dept: 'Design', loc: 'Hybrid · NYC', applicants: '96', posted: '5d ago', status: 'Open', kind: 'success' },
  { title: 'Account Executive', dept: 'Sales', loc: 'On-site · London', applicants: '142', posted: '1w ago', status: 'Closing soon', kind: 'warning' },
  { title: 'Data Analyst', dept: 'Data', loc: 'Remote · Global', applicants: '187', posted: '2w ago', status: 'On hold', kind: 'neutral' },
];

export const SLUG = 'dashboards/jobs';

export default function Jobs(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Jobs & Recruitment"
        subtitle="Pipeline, applications & time-to-hire — this quarter."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">This quarter</button>
            <button className="at-btn at-btn--primary at-press">+ Requisition</button>
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

        {/* Hiring funnel + Source of hire */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Hiring Funnel</div>
                <div className="at-eyebrow">Applied → hired</div>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={300}
              color="--at-accent"
              series={FUNNEL_SERIES}
              categories={FUNNEL_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head"><div className="at-chart__title">Source of Hire</div></div>
            <ApexChart
              type="donut"
              height={300}
              legend
              series={SOURCE_SERIES}
              labels={SOURCE_LABELS}
              centerLabel="Hires"
              centerValue="240"
            />
          </div>
        </div>

        {/* Openings by department + Quarterly target */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Openings by Department</div>
                <div className="at-eyebrow">Active requisitions</div>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={280}
              color="--at-secondary"
              series={DEPT_SERIES}
              categories={DEPT_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div className="at-chart__title">Quarterly Target</div>
            </div>
            <ApexChart
              type="donut"
              height={220}
              series={[80, 20]}
              labels={['Filled', 'Remaining']}
              centerLabel="Target"
              centerValue="80%"
            />
            <div className="at-cluster" style={{ justifyContent: 'center', paddingBlockEnd: 'var(--at-space-4)' }}>
              <span className="at-kpi__value" style={{ fontSize: 'var(--at-text-2xl)' }}>80%</span>
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>of hiring target</span>
            </div>
          </div>
        </div>

        {/* Recent applicants table + Interviews today */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__title">Recent Applicants</div>
              <a href="#" className="at-btn at-btn--ghost at-btn--sm">View all →</a>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Role</th>
                    <th>Stage</th>
                    <th>Applied</th>
                  </tr>
                </thead>
                <tbody>
                  {APPLICANTS.map((a) => (
                    <tr key={a.name}>
                      <td>
                        <div className="at-cluster">
                          <div className="at-avatar at-avatar--sm" style={a.bg ? { background: a.bg, color: a.color } : undefined}>{a.letter}</div>
                          <span className="at-text-strong">{a.name}</span>
                        </div>
                      </td>
                      <td>{a.role}</td>
                      <td><span className={`at-badge at-badge--${a.kind}`}>{a.stage}</span></td>
                      <td>{a.applied}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Interviews Today</div>
            </div>
            <div className="at-timeline">
              {INTERVIEWS.map((i) => (
                <div key={i.title} className="at-timeline__item">
                  <span className="at-timeline__dot"></span>
                  <div className="at-text-strong">{i.title}</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{i.meta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Applications trend + Open requisitions */}
        <div className="at-row">
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Applications Trend</div>
                <div className="at-eyebrow">New applications per week</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-3)', alignItems: 'baseline', marginBlockEnd: 'var(--at-space-2)' }}>
              <div className="at-kpi__value">2,940</div>
              <span className="at-kpi__delta at-kpi__delta--up">▲ 11.0%</span>
            </div>
            <ApexChart
              type="area"
              height={150}
              color="--at-accent"
              series={APP_SERIES}
              categories={APP_CATEGORIES}
            />
          </div>
          <div className="at-col-8 at-card" style={{ padding: 0 }}>
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Open Requisitions</div>
                <div className="at-eyebrow">Active job postings &amp; applicant volume</div>
              </div>
              <button className="at-btn at-btn--ghost at-btn--sm at-press">Manage jobs</button>
            </div>
            <div className="at-table-wrap">
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Department</th>
                    <th>Location</th>
                    <th className="at-num">Applicants</th>
                    <th>Posted</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {REQUISITIONS.map((r) => (
                    <tr key={r.title}>
                      <td className="at-text-strong">{r.title}</td>
                      <td>{r.dept}</td>
                      <td>{r.loc}</td>
                      <td className="at-num">{r.applicants}</td>
                      <td>{r.posted}</td>
                      <td><span className={`at-badge at-badge--${r.kind}`}>{r.status}</span></td>
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
