/*
 * Hactex React — Widgets gallery.
 * Built with the shared component classes, inline token styles,
 * and demo figures. Chart widgets use <ApexChart>; data is verbatim from the HTML.
 * This is a top-level page (slug "widgets"), so shell imports resolve one level up.
 */
import { PageHead } from '../components/shell/PageHead';
import { ApexChart } from '../components/charts/ApexChart';

const KPIS = [
  { label: 'Revenue', value: '$748.2K', delta: '▲ 12.4%' },
  { label: 'Orders', value: '1,248', delta: '▲ 8.1%' },
  { label: 'New customers', value: '3,920', delta: '▲ 78% of goal' },
];

const SESSIONS_SERIES = [
  { name: 'Sessions', data: [6100, 6800, 6400, 7500, 8200, 7800, 8600] },
];

const DEVICE_SERIES = [58, 34, 8];
const DEVICE_LABELS = ['Desktop', 'Mobile', 'Tablet'];

const ORDERS_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const ORDERS_SERIES = [{ name: 'Orders', data: [820, 910, 880, 1010, 1120, 1248] }];

const TOP_PRODUCTS = [
  { letter: 'M', name: 'Matte Ceramic Mug', meta: 'Drinkware · 540 sold', price: '$24', bg: undefined },
  { letter: 'G', name: 'Grid Notebook A5', meta: 'Stationery · 331 sold', price: '$16', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)' },
  { letter: 'A', name: 'Aperture Desk Lamp', meta: 'Lighting · 212 sold', price: '$129', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)' },
  { letter: 'F', name: 'Felt Laptop Sleeve 14"', meta: 'Tech · 97 sold', price: '$44', bg: 'var(--at-success)', color: 'var(--at-on-success)' },
];

const ACTIVITY = [
  { title: 'Devon Okafor closed TSK-241', meta: '8m ago' },
  { title: 'Tomás Herrera moved a deal to Negotiation', meta: '12m ago' },
  { title: 'Lena Brandt uploaded illustrations', meta: '18m ago' },
  { title: 'Priya Nair exported the weekly report', meta: '1h ago' },
];

const STORAGE = [
  { label: 'Documents', size: '28 GB', pct: 45, variant: '' },
  { label: 'Media', size: '21 GB', pct: 34, variant: 'at-progress--info' },
  { label: 'Backups', size: '13.4 GB', pct: 21, variant: 'at-progress--warning' },
];

const RATING_ROWS = [
  { star: '5', pct: 72 },
  { star: '4', pct: 18 },
  { star: '3', pct: 7 },
];

const SERVICES = [
  { label: 'API', pct: '99.98%', kind: 'success' },
  { label: 'Dashboard', pct: '100%', kind: 'success' },
  { label: 'Webhooks', pct: '97.2%', kind: 'warning' },
  { label: 'Search', pct: '99.91%', kind: 'success' },
];

export default function Widgets(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Widgets"
        subtitle="A widget gallery — stat cards, charts, lists, timelines, goals and meters."
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        {/* KPI row (3 cards) */}
        <div className="at-row">
          {KPIS.map((k) => (
            <div key={k.label} className="at-col-4 at-card at-kpi">
              <div className="at-kpi__label">{k.label}</div>
              <div className="at-kpi__value">{k.value}</div>
              <div className="at-kpi__delta at-kpi__delta--up">{k.delta}</div>
            </div>
          ))}
        </div>

        {/* Chart widgets (3 titled): Sessions, By device, Orders / month */}
        <div className="at-row">
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Sessions</div>
                <div className="at-eyebrow">Last 7 days</div>
              </div>
              <span className="at-kpi__delta at-kpi__delta--up" style={{ fontSize: 'var(--at-text-sm)' }}>
                ▲ 6.4%
              </span>
            </div>
            <div className="at-chart__head" style={{ paddingBlockEnd: 0 }}>
              <div className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>54.2K</div>
            </div>
            <ApexChart type="area" height={120} series={SESSIONS_SERIES} />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">By device</div>
                <div className="at-eyebrow">Share of sessions</div>
              </div>
            </div>
            <ApexChart
              type="donut"
              height={180}
              legend
              series={DEVICE_SERIES}
              labels={DEVICE_LABELS}
              centerLabel="Sessions"
              centerValue="54.2K"
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Orders / month</div>
                <div className="at-eyebrow">Jan – Jun</div>
              </div>
              <span className="at-badge at-badge--neutral">1,248</span>
            </div>
            <ApexChart type="bar" height={160} series={ORDERS_SERIES} categories={ORDERS_CATEGORIES} />
          </div>
        </div>

        {/* List widgets (2 titled): Top products, Activity */}
        <div className="at-row">
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Top products</div>
                <div className="at-eyebrow">By units sold</div>
              </div>
              <button className="at-btn at-btn--ghost at-btn--sm">All</button>
            </div>
            <div className="at-list">
              {TOP_PRODUCTS.map((p) => (
                <div key={p.name} className="at-list__item">
                  <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
                    <div
                      className="at-avatar at-avatar--sm"
                      style={p.bg ? { background: p.bg, color: p.color } : undefined}
                    >
                      {p.letter}
                    </div>
                    <div style={{ flex: '1 1 auto' }}>
                      <div className="at-text-strong">{p.name}</div>
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                        {p.meta}
                      </div>
                    </div>
                    <span className="at-text-strong">{p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Activity</div>
                <div className="at-eyebrow">Across the workspace</div>
              </div>
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

        {/* Goals & meters (4 titled): Monthly target, Storage, Rating, System status */}
        <div className="at-row">
          <div className="at-col-3 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Monthly target</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>72%</div>
              <div className="at-progress" style={{ marginTop: 'var(--at-space-3)' }}>
                <div className="at-progress__bar" style={{ width: '72%' }} />
              </div>
              <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginTop: 'var(--at-space-3)' }}>
                <span className="at-text-strong">$540K</span> of $750K
              </p>
            </div>
          </div>

          <div className="at-col-3 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Storage</div>
                <div className="at-eyebrow">62.4 GB of 100 GB</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              {STORAGE.map((s) => (
                <div key={s.label}>
                  <div
                    className="at-cluster"
                    style={{ justifyContent: 'space-between', marginBlockEnd: '6px' }}
                  >
                    <span style={{ fontSize: 'var(--at-text-sm)' }}>{s.label}</span>
                    <b className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{s.size}</b>
                  </div>
                  <div className={`at-progress ${s.variant}`}>
                    <div className="at-progress__bar" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="at-col-3 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Rating</div>
                <div className="at-eyebrow">Aperture Desk Lamp</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
              <div className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)', lineHeight: 1 }}>
                4.7
              </div>
              <div>
                <div style={{ color: 'var(--at-warning-text)', letterSpacing: '2px' }}>★★★★½</div>
                <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginTop: '4px' }}>
                  212 reviews
                </p>
              </div>
            </div>
            <div className="at-divider" style={{ margin: 'var(--at-space-4) 0' }} />
            <div className="at-stack" style={{ gap: '6px' }}>
              {RATING_ROWS.map((r) => (
                <div key={r.star} className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                  <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', width: '8px' }}>
                    {r.star}
                  </span>
                  <div className="at-progress" style={{ flex: 1 }}>
                    <div className="at-progress__bar" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="at-col-3 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">System status</div>
                <div className="at-eyebrow">All services</div>
              </div>
              <span className="at-badge at-badge--success">Operational</span>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {SERVICES.map((s) => (
                <div key={s.label} className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 'var(--at-text-sm)' }}>{s.label}</span>
                  <span className={`at-badge at-badge--${s.kind}`}>{s.pct}</span>
                </div>
              ))}
              <div className="at-divider" style={{ margin: 'var(--at-space-1) 0' }} />
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                  Avg. uptime · 90 days
                </span>
                <b style={{ color: 'var(--at-success-text)', fontSize: 'var(--at-text-sm)' }}>99.6%</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
