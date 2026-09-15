/*
 * Hactex React — CRM dashboard.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  { label: 'Open Deals', value: '312', delta: '▲ 7.0%', dir: 'up' },
  { label: 'Pipeline Value', value: '$1.24M', delta: '▲ 11.5%', dir: 'up' },
  { label: 'Win Rate', value: '24.6%', delta: '▲ 1.9%', dir: 'up' },
  { label: 'New Leads (30D)', value: '1,180', delta: '▲ 8.3%', dir: 'up' },
];

const STAGE_CATEGORIES = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Won'];
const STAGE_SERIES = [{ name: 'Deals', data: [420, 312, 198, 128, 78] }];

const SOURCE_SERIES = [38, 24, 20, 11, 7];
const SOURCE_LABELS = ['Inbound', 'Referral', 'Outbound', 'Events', 'Partner'];

const FORECAST_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const FORECAST_SERIES = [
  { name: 'Committed', data: [180, 210, 205, 242, 268, 284] },
  { name: 'Best-case', data: [240, 278, 290, 320, 352, 396] },
];

const ACTIVITIES = [
  { title: 'Call — Aurora Labs', time: '10:30', kind: 'accent' },
  { title: 'Demo — Nimbus Inc.', time: '12:00', kind: 'secondary' },
  { title: 'Follow-up — Vela Co.', time: '14:15', kind: 'tertiary' },
  { title: 'Send proposal — Quill', time: '16:00', kind: 'neutral' },
];

const REPS = [
  { letter: 'D', name: 'Devon Okafor', meta: '$284K · 42 deals', width: '92%', variant: '', bg: undefined },
  { letter: 'L', name: 'Lena Brandt', meta: '$241K · 38 deals', width: '78%', variant: 'at-progress--warning', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)' },
  { letter: 'T', name: 'Tomás Herrera', meta: '$198K · 31 deals', width: '64%', variant: 'at-progress--info', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)' },
  { letter: 'P', name: 'Priya Nair', meta: '$162K · 27 deals', width: '52%', variant: 'at-progress--danger', bg: 'var(--at-lime)', color: 'var(--at-on-lime)' },
];

const DEALS = [
  { deal: 'Aurora Cloud', company: 'Aurora Labs', owner: 'Devon Okafor', value: '$48,000', stage: 'Won', kind: 'success' },
  { deal: 'Nimbus Platform', company: 'Nimbus Inc.', owner: 'Lena Brandt', value: '$32,500', stage: 'Negotiation', kind: 'warning' },
  { deal: 'Vela Analytics', company: 'Vela Co.', owner: 'Tomás Herrera', value: '$21,800', stage: 'Proposal', kind: 'info' },
  { deal: 'Quill Workspace', company: 'Quill', owner: 'Priya Nair', value: '$14,200', stage: 'Qualified', kind: 'secondary' },
  { deal: 'Ember Suite', company: 'Ember', owner: 'Devon Okafor', value: '$9,600', stage: 'Lost', kind: 'danger' },
];

const ACTIVITY = [
  { title: 'Tomás moved Vela to Negotiation', meta: '12m ago' },
  { title: 'Devon closed Aurora Cloud', meta: '$48,000 · 1h ago' },
  { title: 'Priya created Quill deal', meta: '3h ago' },
  { title: 'Lena logged a call with Nimbus', meta: 'Yesterday' },
];

export const SLUG = 'dashboards/crm';

export default function Crm(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="CRM"
        subtitle="Pipeline, leads & deal velocity — this quarter."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Export</button>
            <button className="at-btn at-btn--primary at-press">+ New deal</button>
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

        {/* Deals by Stage + Lead Source */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Deals by Stage</div>
                <div className="at-eyebrow">Pipeline funnel</div>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={300}
              color="--at-accent"
              series={STAGE_SERIES}
              categories={STAGE_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head"><div className="at-chart__title">Lead Source</div></div>
            <ApexChart
              type="donut"
              height={300}
              legend
              series={SOURCE_SERIES}
              labels={SOURCE_LABELS}
              centerLabel="Leads"
              centerValue="1,840"
            />
          </div>
        </div>

        {/* Revenue forecast + Sales target */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Revenue Forecast</div>
                <div className="at-eyebrow">Committed vs. best-case · 6 months</div>
              </div>
              <div className="at-segment">
                <button className="at-segment__btn is-active">Committed</button>
                <button className="at-segment__btn">Best-case</button>
              </div>
            </div>
            <ApexChart
              type="area"
              height={280}
              legend
              series={FORECAST_SERIES}
              categories={FORECAST_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head"><div className="at-chart__title">Sales Target</div></div>
            <ApexChart
              type="donut"
              height={280}
              legend
              series={[78, 22]}
              labels={['Attained', 'Remaining']}
              centerLabel="Target"
              centerValue="78%"
            />
            <div className="at-cluster" style={{ justifyContent: 'center', paddingBlockEnd: 'var(--at-space-4)' }}>
              <span className="at-kpi__value" style={{ fontSize: 'var(--at-text-2xl)' }}>78%</span>
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>of quarterly quota</span>
            </div>
          </div>
        </div>

        {/* Activities due + Top sales reps */}
        <div className="at-row">
          <div className="at-col-5 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Activities Due</div>
              <div className="at-eyebrow">Today</div>
            </div>
            <div className="at-list">
              {ACTIVITIES.map((a) => (
                <div key={a.title} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{a.title}</span>
                    <span className={`at-badge at-badge--${a.kind}`}>{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="at-col-7 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Top Sales Reps</div>
              <div className="at-eyebrow">By closed revenue</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {REPS.map((r) => (
                <div key={r.name}>
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <div className="at-cluster">
                      <div className="at-avatar at-avatar--sm" style={r.bg ? { background: r.bg, color: r.color } : undefined}>{r.letter}</div>
                      <span className="at-text-strong">{r.name}</span>
                    </div>
                    <span className="at-text-muted">{r.meta}</span>
                  </div>
                  <div className={`at-progress ${r.variant}`} style={{ marginBlockStart: 'var(--at-space-2)' }}>
                    <div className="at-progress__bar" style={{ width: r.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent deals table + Recent activity */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__title">Recent Deals</div>
              <a href="#" className="at-btn at-btn--ghost at-btn--sm">View all →</a>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Deal</th>
                    <th>Company</th>
                    <th>Owner</th>
                    <th className="at-num">Value</th>
                    <th>Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {DEALS.map((d) => (
                    <tr key={d.deal}>
                      <td className="at-text-strong">{d.deal}</td>
                      <td>{d.company}</td>
                      <td>{d.owner}</td>
                      <td className="at-num">{d.value}</td>
                      <td><span className={`at-badge at-badge--${d.kind}`}>{d.stage}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Recent Activity</div>
            </div>
            <div className="at-timeline">
              {ACTIVITY.map((a) => (
                <div key={a.title} className="at-timeline__item">
                  <span className="at-timeline__dot"></span>
                  <div className="at-text-strong">{a.title}</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{a.meta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
