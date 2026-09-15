/*
 * Hactex React — HR & Payroll dashboard.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  { label: 'Total Employees', value: '1,284', delta: '▲ 2.4%', dir: 'up' },
  { label: 'Attendance Rate', value: '96.2%', delta: '▲ 0.6%', dir: 'up' },
  { label: 'Turnover Rate', value: '7.8%', delta: '▼ 1.2% (favourable)', dir: 'up' },
  { label: 'Diversity', value: '52%', delta: '▲ 1.8%', dir: 'up' },
];

const HEADCOUNT_CATEGORIES = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const HEADCOUNT_SERIES = [
  { name: 'Joiners', data: [18, 22, 16, 24, 20, 28, 26, 22, 30, 24, 18, 26] },
  { name: 'Leavers', data: [8, 10, 12, 9, 11, 8, 10, 7, 12, 9, 8, 11] },
];

const DEPT_SERIES = [32, 24, 18, 14, 12];
const DEPT_LABELS = ['Engineering', 'Sales', 'Operations', 'Design', 'Support'];

const ATTEND_CATEGORIES = ['W1', 'W2', 'W3', 'W4'];
const ATTEND_SERIES = [
  { name: 'Present', data: [1180, 1192, 1175, 1204] },
  { name: 'Late', data: [42, 38, 48, 30] },
  { name: 'Absent', data: [62, 54, 61, 40] },
];

const PAYROLL = [
  { label: 'Gross payroll', value: '$6.42M', strong: 'value' },
  { label: 'Bonuses', value: '$284K', strong: 'normal' },
  { label: 'Benefits', value: '$1.18M', strong: 'normal' },
  { label: 'Taxes', value: '$1.92M', strong: 'normal' },
];

const LEAVE = [
  { name: 'Devon Okafor', date: 'Jul 30 – Aug 4', kind: 'accent' },
  { name: 'Lena Brandt', date: 'Aug 12 – Aug 20', kind: 'secondary' },
  { name: 'Tomás Herrera', date: 'Sep 02 – Sep 06', kind: 'tertiary' },
  { name: 'Priya Nair', date: 'Sep 16 – Sep 18', kind: 'neutral' },
];

const HIRES = [
  { letter: 'A', name: 'Ava Sutton', bg: undefined, role: 'Product Designer', dept: 'Design', start: 'Jul 24' },
  { letter: 'M', name: 'Marcus Reed', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', role: 'Backend Engineer', dept: 'Engineering', start: 'Jul 22' },
  { letter: 'N', name: 'Nadia Klein', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', role: 'Account Executive', dept: 'Sales', start: 'Jul 18' },
  { letter: 'J', name: 'Jonas Berg', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', role: 'DevOps Engineer', dept: 'Engineering', start: 'Jul 15' },
];

const DIVERSITY = [
  { label: 'Women', pct: '47%', width: '47%', variant: 'at-progress--warning' },
  { label: 'Men', pct: '51%', width: '51%', variant: 'at-progress--info' },
  { label: 'Non-binary / other', pct: '2%', width: '2%', variant: '' },
];

const CELEBRATIONS = [
  { letter: 'C', name: 'Camila Rossi', note: 'Birthday today', badge: 'Today', kind: 'accent', chartVar: '--at-chart-4', today: true },
  { letter: 'D', name: 'Devon Okafor', note: '5 years · Jun 28', badge: '5 yrs', kind: 'warning', chartVar: '--at-warning', today: false },
  { letter: 'L', name: 'Lena Brandt', note: 'Birthday Jun 30', badge: 'in 3d', kind: 'neutral', chartVar: '--at-chart-2', today: false },
  { letter: 'M', name: 'Marcus Lee', note: '2 years · Jul 1', badge: '2 yrs', kind: 'warning', chartVar: '--at-success', today: false },
];

export const SLUG = 'dashboards/hr';

export default function Hr(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="HR & Payroll"
        subtitle="Headcount, attendance & payroll — this month."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">This month</button>
            <button className="at-btn at-btn--primary at-press">+ Employee</button>
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

        {/* Headcount trend + By department */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Headcount Trend</div>
                <div className="at-eyebrow">Joiners vs. leavers · monthly</div>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={300}
              legend
              series={HEADCOUNT_SERIES}
              categories={HEADCOUNT_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head"><div className="at-chart__title">By Department</div></div>
            <ApexChart
              type="donut"
              height={300}
              legend
              series={DEPT_SERIES}
              labels={DEPT_LABELS}
              centerLabel="Staff"
              centerValue="248"
            />
          </div>
        </div>

        {/* Attendance overview + Payroll summary */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Attendance Overview</div>
                <div className="at-eyebrow">Weekly breakdown</div>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={280}
              stacked
              legend
              series={ATTEND_SERIES}
              categories={ATTEND_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Payroll Summary</div>
              <div className="at-eyebrow">This month</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {PAYROLL.map((p) => (
                <div key={p.label} className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">{p.label}</span>
                  <span className={p.strong === 'value' ? 'at-kpi__value' : 'at-text-strong'} style={p.strong === 'value' ? { fontSize: 'var(--at-text-lg)' } : undefined}>{p.value}</span>
                </div>
              ))}
              <div className="at-cluster" style={{ justifyContent: 'space-between', borderBlockStart: '2px solid var(--at-ink)', paddingBlockStart: 'var(--at-space-3)' }}>
                <span className="at-text-strong">Net</span><span className="at-kpi__value">$3.04M</span>
              </div>
              <button className="at-btn at-btn--dark at-press at-btn--block">Run payroll</button>
            </div>
          </div>
        </div>

        {/* Leave requests + Recent hires */}
        <div className="at-row">
          <div className="at-col-5 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Leave Requests</div>
              <span className="at-badge at-badge--warning">4 pending</span>
            </div>
            <div className="at-list">
              {LEAVE.map((l) => (
                <div key={l.name} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{l.name}</span>
                    <span className={`at-badge at-badge--${l.kind}`}>{l.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="at-col-7 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__title">Recent Hires</div>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Start</th>
                  </tr>
                </thead>
                <tbody>
                  {HIRES.map((h) => (
                    <tr key={h.name}>
                      <td>
                        <div className="at-cluster">
                          <div className="at-avatar at-avatar--sm" style={h.bg ? { background: h.bg, color: h.color } : undefined}>{h.letter}</div>
                          <span className="at-text-strong">{h.name}</span>
                        </div>
                      </td>
                      <td>{h.role}</td>
                      <td>{h.dept}</td>
                      <td>{h.start}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Diversity + Celebrations + Employee of the Month */}
        <div className="at-row">
          {/* Diversity */}
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Diversity</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              {DIVERSITY.map((d) => (
                <div key={d.label}>
                  <div className="at-cluster" style={{ justifyContent: 'space-between', marginBlockEnd: 6 }}>
                    <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{d.label}</span>
                    <b className="at-num at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{d.pct}</b>
                  </div>
                  <div className={`at-progress ${d.variant}`}>
                    <div className="at-progress__bar" style={{ width: d.width }}></div>
                  </div>
                </div>
              ))}
              <hr className="at-divider" style={{ border: 0, borderTop: 'var(--at-border)' }} />
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>Avg. tenure</span>
                <b className="at-num at-text-strong">3.8 yrs</b>
              </div>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>Median age</span>
                <b className="at-num at-text-strong">32</b>
              </div>
            </div>
          </div>

          {/* Celebrations */}
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Celebrations</div>
            </div>
            <div className="at-list">
              {CELEBRATIONS.map((c) => (
                <div key={c.name} className="at-list__item">
                  <div className="at-cluster" style={{ gap: 'var(--at-space-3)', flex: 1 }}>
                    <div className="at-avatar at-avatar--sm" style={{ background: `color-mix(in oklab, var(${c.chartVar}) 18%, transparent)`, color: `var(${c.chartVar}-text)` }}>{c.letter}</div>
                    <div>
                      <div className="at-text-strong">{c.name}</div>
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{c.note}</div>
                    </div>
                  </div>
                  <span className={`at-badge at-badge--${c.kind}`}>
                    {c.today && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: 12, height: 12 }}
                      >
                        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
                        <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
                        <path d="M2 21h20" />
                        <path d="M7 8v3" />
                        <path d="M12 8v3" />
                        <path d="M17 8v3" />
                        <path d="M7 4h.01" />
                        <path d="M12 4h.01" />
                        <path d="M17 4h.01" />
                      </svg>
                    )}
                    {c.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Employee of the Month */}
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)', textAlign: 'center' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)', justifyContent: 'center' }}>
              <div>
                <div className="at-eyebrow" style={{ textAlign: 'center' }}>Recognition</div>
                <div className="at-chart__title">Employee of the Month</div>
              </div>
            </div>
            <div className="at-avatar at-avatar--xl" style={{ background: 'linear-gradient(135deg, var(--at-accent), var(--at-chart-3))', marginInline: 'auto' }}>D</div>
            <div style={{ marginBlock: 'var(--at-space-3) var(--at-space-2)' }}>
              <div className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>Devon Okafor</div>
              <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>Senior Engineer · Engineering</div>
            </div>
            <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', margin: '0 0 var(--at-space-3)' }}>
              Shipped the new billing pipeline 2 weeks early and mentored 4 new hires.
            </p>
            <div className="at-cluster" style={{ gap: 'var(--at-space-5)', justifyContent: 'center', marginTop: 'var(--at-space-2)' }}>
              <div>
                <div className="at-num at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>98%</div>
                <small className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Goals</small>
              </div>
              <div>
                <div className="at-num at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>5.0</div>
                <small className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Peer rating</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
