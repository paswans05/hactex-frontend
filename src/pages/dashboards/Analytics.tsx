/*
 * Hactex React — Analytics dashboard.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  { label: 'Sessions', value: '128,400', delta: '▲ 8.7%', dir: 'up' },
  { label: 'Unique Visitors', value: '74,210', delta: '▲ 5.3%', dir: 'up' },
  { label: 'Bounce Rate', value: '41.2%', delta: '▼ 2.1% (improved)', dir: 'up' },
  { label: 'Avg. Session Duration', value: '3m 12s', delta: '▲ 0.4%', dir: 'up' },
];

const AUDIENCE_CATEGORIES = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const AUDIENCE_SERIES = [
  { name: 'New', data: [8200, 9100, 8800, 9400, 10200, 9800, 10600, 11200, 10800, 11400, 12100, 11800] },
  { name: 'Returning', data: [2100, 2400, 2200, 2600, 2800, 2700, 3100, 3200, 3000, 3300, 3500, 3400] },
];

const CHANNELS_SERIES = [42, 24, 16, 11, 7];
const CHANNELS_LABELS = ['Organic', 'Direct', 'Social', 'Referral', 'Paid'];

const FUNNEL_CATEGORIES = ['Visited', 'Viewed product', 'Added to cart', 'Began checkout', 'Purchased'];
const FUNNEL_SERIES = [{ name: 'Users', data: [74210, 58900, 41200, 22800, 9400] }];

const DEVICE_SERIES = [56, 37, 7];
const DEVICE_LABELS = ['Desktop', 'Mobile', 'Tablet'];

const TOP_PAGES = [
  { page: '/home', views: '41,820', time: '1m 48s', bounce: '38.4%' },
  { page: '/pricing', views: '28,640', time: '2m 36s', bounce: '29.7%' },
  { page: '/blog/atelier-2', views: '19,210', time: '4m 02s', bounce: '22.1%' },
  { page: '/docs/getting-started', views: '15,008', time: '3m 19s', bounce: '18.6%' },
  { page: '/login', views: '11,742', time: '5m 51s', bounce: '14.2%' },
];

const RIGHT_NOW = [
  { page: '/home', count: '412' },
  { page: '/pricing', count: '288' },
  { page: '/docs', count: '197' },
  { page: '/blog', count: '146' },
];

const REFERRERS = [
  { name: 'google.com', pct: '42%', kind: 'accent' },
  { name: '(direct)', pct: '24%', kind: 'secondary' },
  { name: 'twitter.com', pct: '16%', kind: 'tertiary' },
  { name: 'reddit.com', pct: '11%', kind: 'lime' },
  { name: 'linkedin.com', pct: '7%', kind: 'neutral' },
];

const EVENTS = [
  { title: 'Goal completed — Sign Up', meta: 'value $42 · 2m ago' },
  { title: 'Add to cart', meta: '/pricing · 5m ago' },
  { title: 'Page view', meta: '/docs · 9m ago' },
  { title: 'Session started', meta: 'organic · 12m ago' },
];

export const SLUG = 'dashboards/analytics';

export default function Analytics(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Analytics"
        subtitle="Audience, acquisition & behavior — last 30 days vs. prior period."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Last 30 days</button>
            <button className="at-btn at-btn--primary at-press">Export report</button>
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

        {/* Audience overview + Traffic channels */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Audience Overview</div>
                <div className="at-eyebrow">Sessions · new vs. returning</div>
              </div>
              <div className="at-segment">
                <button className="at-segment__btn is-active">Monthly</button>
                <button className="at-segment__btn">Weekly</button>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={300}
              stacked
              legend
              series={AUDIENCE_SERIES}
              categories={AUDIENCE_CATEGORIES}
            />
          </div>

          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div className="at-chart__title">Traffic Channels</div>
            </div>
            <ApexChart
              type="donut"
              height={300}
              legend
              series={CHANNELS_SERIES}
              labels={CHANNELS_LABELS}
              centerLabel="Visits"
              centerValue="48.2K"
            />
          </div>
        </div>

        {/* Conversion funnel + Sessions by device */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Conversion Funnel</div>
                <div className="at-eyebrow">Visitors → purchasers</div>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={280}
              horizontal
              values
              track
              color="--at-chart-1"
              series={FUNNEL_SERIES}
              categories={FUNNEL_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div className="at-chart__title">Sessions by Device</div>
            </div>
            <ApexChart
              type="donut"
              height={280}
              legend
              series={DEVICE_SERIES}
              labels={DEVICE_LABELS}
              centerLabel="Sessions"
              centerValue="54.2K"
            />
          </div>
        </div>

        {/* Top pages table + Right now list */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__title">Top Pages</div>
              <a href="#" className="at-btn at-btn--ghost at-btn--sm">View all →</a>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Page</th>
                    <th className="at-num">Views</th>
                    <th className="at-num">Avg. Time</th>
                    <th className="at-num">Bounce</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_PAGES.map((p) => (
                    <tr key={p.page}>
                      <td className="at-text-strong">{p.page}</td>
                      <td className="at-num">{p.views}</td>
                      <td className="at-num at-text-muted">{p.time}</td>
                      <td className="at-num at-text-muted">{p.bounce}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Right Now</div>
              <span className="at-badge at-badge--success"><span className="at-dot"></span> Live</span>
            </div>
            <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', marginBlockEnd: 'var(--at-space-2)' }}>
              Active users on site
            </div>
            <div className="at-kpi__value" style={{ fontSize: 'var(--at-text-3xl)', marginBlockEnd: 'var(--at-space-4)' }}>
              1,284
            </div>
            <div className="at-list">
              {RIGHT_NOW.map((r) => (
                <div key={r.page} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{r.page}</span>
                    <span className="at-text-muted">{r.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top referrers + Recent events */}
        <div className="at-row">
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Top Referrers</div>
            </div>
            <div className="at-list">
              {REFERRERS.map((r) => (
                <div key={r.name} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{r.name}</span>
                    <span className={`at-badge at-badge--${r.kind}`}>{r.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Recent Events</div>
            </div>
            <div className="at-timeline">
              {EVENTS.map((e) => (
                <div key={e.title} className="at-timeline__item">
                  <span className="at-timeline__dot"></span>
                  <div className="at-text-strong">{e.title}</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{e.meta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
