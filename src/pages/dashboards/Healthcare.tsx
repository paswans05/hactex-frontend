/*
 * Hactex React — Healthcare dashboard.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  { label: 'Total Patients', value: '8,940', delta: '▲ 3.2%', dir: 'up' },
  { label: 'Appointments Today', value: '142', delta: '▲ 5.0%', dir: 'up' },
  { label: 'Avg. Wait Time', value: '18m', delta: '▼ 9.0% (good)', dir: 'up' },
  { label: 'Bed Occupancy', value: '82%', delta: '▲ 1.4%', dir: 'up' },
];

const VISITS_CATEGORIES = ['1', '3', '5', '7', '9', '11', '13'];
const VISITS_SERIES = [{ name: 'Visits', data: [128, 142, 135, 151, 148, 162, 158, 171, 168, 164, 178, 182, 176, 189] }];

const DEPT_SERIES = [32, 24, 18, 16, 10];
const DEPT_LABELS = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'General'];

const APPTS = [
  { letter: 'M', name: 'Maria Olsen', bg: undefined, dept: 'Cardiology', doctor: 'Dr. Reyes', time: '09:00', status: 'Checked-in', kind: 'success' },
  { letter: 'J', name: 'James Hall', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', dept: 'Neurology', doctor: 'Dr. Singh', time: '09:30', status: 'Waiting', kind: 'warning' },
  { letter: 'P', name: 'Patricia Green', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', dept: 'Pediatrics', doctor: 'Dr. Cohen', time: '10:00', status: 'Scheduled', kind: 'info' },
  { letter: 'R', name: 'Robert Bell', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', dept: 'Orthopedics', doctor: 'Dr. Nakamura', time: '10:30', status: 'Checked-in', kind: 'success' },
  { letter: 'L', name: 'Linda King', bg: undefined, dept: 'General', doctor: 'Dr. Reyes', time: '11:00', status: 'Canceled', kind: 'danger' },
];

const DOCTORS = [
  { name: 'Dr. Reyes', status: 'Available', kind: 'success' },
  { name: 'Dr. Singh', status: 'In surgery', kind: 'warning' },
  { name: 'Dr. Cohen', status: 'Available', kind: 'success' },
  { name: 'Dr. Nakamura', status: 'Off today', kind: 'neutral' },
];

const BEDS = [
  { ward: 'Cardiology', count: '42 / 48', width: '88%', variant: 'at-progress--warning' },
  { ward: 'Neurology', count: '28 / 40', width: '70%', variant: 'at-progress--success' },
  { ward: 'Pediatrics', count: '36 / 44', width: '82%', variant: 'at-progress--warning' },
  { ward: 'Orthopedics', count: '18 / 32', width: '56%', variant: 'at-progress--danger' },
];

const REVENUE = [
  { service: 'Consultations', val: '$84,200', kind: 'accent' },
  { service: 'Diagnostics', val: '$62,480', kind: 'secondary' },
  { service: 'Surgeries', val: '$148,900', kind: 'tertiary' },
  { service: 'Pharmacy', val: '$31,240', kind: 'lime' },
];

const FLOW_CATEGORIES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const FLOW_SERIES = [
  { name: 'Admissions', data: [34, 42, 38, 46, 40, 29, 24] },
  { name: 'Discharges', data: [28, 36, 40, 33, 44, 31, 26] },
];

const SCHEDULE = [
  { time: '09:00', patient: 'Marcus Reed', meta: 'Dr. Patel · Cardiology · Room 204' },
  { time: '09:45', patient: 'Ivy Tran', meta: 'Dr. Osei · Pediatrics · Room 112' },
  { time: '10:30', patient: 'Hannah Cole', meta: 'Dr. Lin · Neurology · Room 308' },
  { time: '11:15', patient: 'Owen Hart', meta: 'Dr. Vega · Orthopedics · Room 215' },
];

export const SLUG = 'dashboards/healthcare';

export default function Healthcare(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Healthcare"
        subtitle="Patients, appointments & ward status — today."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Today</button>
            <button className="at-btn at-btn--primary at-press">+ Appointment</button>
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

        {/* Patient visits + By department */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Patient Visits</div>
                <div className="at-eyebrow">Daily admissions · 14 days</div>
              </div>
            </div>
            <ApexChart
              type="area"
              height={300}
              color="--at-accent"
              series={VISITS_SERIES}
              categories={VISITS_CATEGORIES}
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
              centerLabel="Patients"
              centerValue="1,840"
            />
          </div>
        </div>

        {/* Recent appointments + Doctor availability */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__title">Recent Appointments</div>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Department</th>
                    <th>Doctor</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {APPTS.map((a) => (
                    <tr key={a.name}>
                      <td>
                        <div className="at-cluster">
                          <div className="at-avatar at-avatar--sm" style={a.bg ? { background: a.bg, color: a.color } : undefined}>{a.letter}</div>
                          <span className="at-text-strong">{a.name}</span>
                        </div>
                      </td>
                      <td>{a.dept}</td>
                      <td>{a.doctor}</td>
                      <td>{a.time}</td>
                      <td><span className={`at-badge at-badge--${a.kind}`}>{a.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Doctor Availability</div>
            </div>
            <div className="at-list">
              {DOCTORS.map((d) => (
                <div key={d.name} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{d.name}</span>
                    <span className={`at-badge at-badge--${d.kind}`}>{d.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bed occupancy + Revenue by service */}
        <div className="at-row">
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Bed Occupancy by Ward</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {BEDS.map((b) => (
                <div key={b.ward}>
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{b.ward}</span>
                    <span className="at-text-muted">{b.count}</span>
                  </div>
                  <div className={`at-progress ${b.variant}`} style={{ marginBlockStart: 'var(--at-space-2)' }}>
                    <div className="at-progress__bar" style={{ width: b.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Revenue by Service</div>
              <div className="at-eyebrow">This month</div>
            </div>
            <div className="at-list">
              {REVENUE.map((r) => (
                <div key={r.service} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{r.service}</span>
                    <span className={`at-badge at-badge--${r.kind}`}>{r.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Admissions & Discharges + Today's Schedule */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Admissions &amp; Discharges</div>
                <div className="at-eyebrow">Daily patient flow this week</div>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={300}
              legend
              series={FLOW_SERIES}
              categories={FLOW_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Today's Schedule</div>
                <div className="at-eyebrow">Upcoming appointments</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {SCHEDULE.map((s) => (
                <div key={s.time} className="at-cluster" style={{ gap: 'var(--at-space-3)', flexWrap: 'nowrap', alignItems: 'flex-start' }}>
                  <span className="at-num" style={{ fontSize: 'var(--at-text-sm)', color: 'var(--at-accent-text)', minWidth: 48, fontWeight: 600 }}>{s.time}</span>
                  <div style={{ flex: '1 1 auto', minWidth: 0, borderLeft: '2px solid var(--at-border)', paddingLeft: 'var(--at-space-3)' }}>
                    <div className="at-text-strong">{s.patient}</div>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{s.meta}</div>
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
