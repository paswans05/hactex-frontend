/*
 * Hactex React — eCommerce dashboard.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props. The KPI sparklines use the
 * `sparkline` prop.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  {
    label: 'Total Sales',
    value: '$142,800',
    delta: '▲ 9.8%',
    color: '--at-chart-1',
    paths: [
      'M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304',
      'M9 11v-5a3 3 0 0 1 6 0v5',
    ],
    series: [{ name: 'Sales', data: [118400, 122900, 120600, 126800, 129400, 127100, 132500, 136200, 134800, 138900, 141200, 142800] }],
  },
  {
    label: 'Orders',
    value: '4,612',
    delta: '▲ 4.5%',
    color: '--at-chart-2',
    paths: [
      'M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0',
      'M15 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0',
      'M17 17h-11v-14h-2',
      'M6 5l14 1l-1 7h-13',
    ],
    series: [{ name: 'Orders', data: [3980, 4085, 4021, 4160, 4212, 4178, 4290, 4355, 4318, 4442, 4560, 4612] }],
  },
  {
    label: 'Avg. Order Value',
    value: '$30.96',
    delta: '▲ 1.2%',
    color: '--at-chart-3',
    paths: [
      'M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0',
      'M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1',
      'M12 7v10',
    ],
    series: [{ name: 'AOV', data: [29.4, 29.8, 29.6, 30.1, 30.4, 30.2, 30.5, 30.7, 30.6, 30.8, 30.9, 30.96] }],
  },
  {
    label: 'Cart Abandonment',
    value: '68.4%',
    // Falling abandonment is a win, so the pill is success even though the
    // arrow points down.
    delta: '▼ 1.8%',
    color: '--at-chart-4',
    paths: [
      'M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0',
      'M17 17a2 2 0 1 0 2 2',
      'M17 17h-11v-11',
      'M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7',
      'M3 3l18 18',
    ],
    series: [{ name: 'Abandonment', data: [71.2, 70.8, 71.5, 70.4, 70.9, 70.1, 69.7, 70.2, 69.4, 69.1, 68.8, 68.4] }],
  },
];

const REV_CATEGORIES = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const REV_SERIES = [
  { name: 'Revenue', data: [9200, 9800, 10400, 11200, 12800, 11600, 13400, 14200, 13800, 14900, 16100, 15400] },
  { name: 'Orders', data: [310, 338, 352, 384, 421, 388, 432, 461, 448, 482, 512, 494] },
];

const CATEGORY_SERIES = [34, 27, 21, 12, 6];
const CATEGORY_LABELS = ['Apparel', 'Electronics', 'Home', 'Beauty', 'Other'];

const CHANNELS = [
  { name: 'Online store', val: '$68,480 · 48%', kind: 'accent' },
  { name: 'Marketplace', val: '$31,240 · 22%', kind: 'secondary' },
  { name: 'POS / Retail', val: '$22,860 · 16%', kind: 'tertiary' },
  { name: 'Wholesale', val: '$20,220 · 14%', kind: 'lime' },
];

const INVENTORY = [
  { label: 'In stock', count: '2,648', width: '82%', variant: '' },
  { label: 'Low stock', count: '384', width: '12%', variant: 'at-progress--warning' },
  { label: 'Out of stock', count: '178', width: '6%', variant: 'at-progress--danger' },
];

const TOP_PRODUCTS = [
  { letter: 'B', name: 'Brass Task Light', meta: 'Lighting · 412 sold', price: '$182', bg: undefined },
  { letter: 'A', name: 'Aperture Desk Lamp', meta: 'Lighting · 356 sold', price: '$129', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)' },
  { letter: 'M', name: 'Matte Ceramic Mug', meta: 'Drinkware · 298 sold', price: '$24', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)' },
  { letter: 'W', name: 'Walnut Monitor Riser', meta: 'Desk · 241 sold', price: '$96', bg: 'var(--at-lime)', color: 'var(--at-on-lime)' },
];

const LOW_STOCK = [
  { name: 'Linen Tote', note: '4 left', kind: 'danger' },
  { name: 'Oak Coaster Set', note: '9 left', kind: 'warning' },
  { name: 'Cotton Throw', note: '11 left', kind: 'warning' },
  { name: 'Glass Decanter', note: '2 left', kind: 'danger' },
];

const ORDERS = [
  { id: '#AX-10428', letter: 'C', name: 'Camila Rossi', bg: undefined, items: '3 items', date: 'Jun 12', amount: '$312.00', status: 'Delivered', statusKind: 'success' },
  { id: '#AX-10427', letter: 'H', name: 'Henry Whitlock', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', items: '1 item', date: 'Jun 12', amount: '$129.00', status: 'Shipped', statusKind: 'info' },
  { id: '#AX-10426', letter: 'A', name: 'Aiko Tanaka', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', items: '5 items', date: 'Jun 11', amount: '$486.40', status: 'Processing', statusKind: 'warning' },
  { id: '#AX-10425', letter: 'M', name: 'Mateo Alvarez', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', items: '2 items', date: 'Jun 11', amount: '$84.00', status: 'Delivered', statusKind: 'success' },
  { id: '#AX-10424', letter: 'S', name: 'Sofia Lindqvist', bg: undefined, items: '4 items', date: 'Jun 10', amount: '$218.50', status: 'Refunded', statusKind: 'danger' },
  { id: '#AX-10423', letter: 'D', name: 'Daniel Cho', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', items: '1 item', date: 'Jun 10', amount: '$38.00', status: 'Delivered', statusKind: 'success' },
];

const TOP_CUSTOMERS = [
  { letter: 'C', name: 'Camila Rossi', orders: '28 orders', spend: '$4,210', width: '100%', variant: '', chartVar: '--at-chart-1' },
  { letter: 'A', name: 'Aiko Tanaka', orders: '22 orders', spend: '$3,684', width: '87%', variant: 'at-progress--info', chartVar: '--at-chart-2' },
  { letter: 'S', name: 'Sofia Lindqvist', orders: '19 orders', spend: '$2,940', width: '70%', variant: 'at-progress--warning', chartVar: '--at-chart-3' },
];

export const SLUG = 'dashboards/ecommerce';

export default function Ecommerce(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="eCommerce"
        subtitle="Store performance, orders & merchandising — last 30 days."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Last 30 days</button>
            <button className="at-btn at-btn--primary at-press">+ Add product</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        {/* KPI row · with sparkline — see ui/cards.html for the pattern.
            Icon tile + delta pill on the head row, then a bare smooth
            stroke under the value. tooltip={false}: the plate has no axis
            or scale, so a hover readout of an unlabelled point is noise. */}
        <div className="at-row">
          {KPIS.map((k) => (
            <div key={k.label} className="at-col-3 at-card at-kpi">
              <div className="at-kpi__head">
                <span className="at-kpi__icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {k.paths.map((d, i) => (
                      <path key={i} d={d} />
                    ))}
                  </svg>
                </span>
                <span className="at-badge at-badge--success">{k.delta}</span>
              </div>
              <div className="at-kpi__label">{k.label}</div>
              <div className="at-kpi__value">{k.value}</div>
              <ApexChart
                className="at-kpi__sparkline"
                type="line"
                height={56}
                sparkline
                tooltip={false}
                color={k.color}
                series={k.series}
              />
            </div>
          ))}
        </div>

        {/* Revenue & Orders + Sales by Category */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Revenue &amp; Orders</div>
                <div className="at-eyebrow">Monthly revenue vs. order volume</div>
              </div>
              <div className="at-segment">
                <button className="at-segment__btn is-active">Monthly</button>
                <button className="at-segment__btn">Weekly</button>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={300}
              legend
              series={REV_SERIES}
              categories={REV_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div className="at-chart__title">Sales by Category</div>
            </div>
            <ApexChart
              type="donut"
              height={300}
              legend
              series={CATEGORY_SERIES}
              labels={CATEGORY_LABELS}
              centerLabel="Orders"
              centerValue="12.4K"
            />
          </div>
        </div>

        {/* Sales by Channel + Inventory Status */}
        <div className="at-row">
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Sales by Channel</div>
            </div>
            <div className="at-list">
              {CHANNELS.map((c) => (
                <div key={c.name} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{c.name}</span>
                    <span className={`at-badge at-badge--${c.kind}`}>{c.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Inventory Status</div>
              <div className="at-eyebrow">3,210 SKUs tracked</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {INVENTORY.map((i) => (
                <div key={i.label}>
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{i.label}</span>
                    <span className="at-text-muted">{i.count}</span>
                  </div>
                  <div className={`at-progress ${i.variant}`} style={{ marginBlockStart: 'var(--at-space-2)' }}>
                    <div className="at-progress__bar" style={{ width: i.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top products + Low-stock alerts */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Top Products</div>
              <a href="#" className="at-btn at-btn--ghost at-btn--sm">View all →</a>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {TOP_PRODUCTS.map((p) => (
                <div key={p.name} className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <div className="at-cluster">
                    <div className="at-avatar at-avatar--sm" style={p.bg ? { background: p.bg, color: p.color } : undefined}>{p.letter}</div>
                    <div>
                      <div className="at-text-strong">{p.name}</div>
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{p.meta}</div>
                    </div>
                  </div>
                  <span className="at-kpi__value" style={{ fontSize: 'var(--at-text-lg)' }}>{p.price}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Low-Stock Alerts</div>
              <a href="#" className="at-btn at-btn--ghost at-btn--sm">Restock</a>
            </div>
            <div className="at-list">
              {LOW_STOCK.map((l) => (
                <div key={l.name} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{l.name}</span>
                    <span className={`at-badge at-badge--${l.kind}`}>{l.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent orders table */}
        <div className="at-card" style={{ overflow: 'hidden' }}>
          <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__title">Recent Orders</div>
            <a href="#" className="at-btn at-btn--ghost at-btn--sm">All orders →</a>
          </div>
          <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
            <table className="at-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th className="at-num">Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o) => (
                  <tr key={o.id}>
                    <td className="at-text-strong">{o.id}</td>
                    <td>
                      <div className="at-cluster">
                        <div className="at-avatar at-avatar--sm" style={o.bg ? { background: o.bg, color: o.color } : undefined}>{o.letter}</div>
                        <div>
                          <div className="at-text-strong">{o.name}</div>
                          <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{o.items}</div>
                        </div>
                      </div>
                    </td>
                    <td>{o.date}</td>
                    <td className="at-num">{o.amount}</td>
                    <td><span className={`at-badge at-badge--${o.statusKind}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Customers */}
        <div className="at-row">
          <div className="at-col-12 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Top Customers</div>
                <div className="at-eyebrow">By lifetime spend</div>
              </div>
              <button className="at-btn at-btn--ghost at-btn--sm at-press">View all</button>
            </div>
            <div className="at-list">
              {TOP_CUSTOMERS.map((c) => (
                <div key={c.name} className="at-list__item">
                  <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
                    <div className="at-avatar at-avatar--sm" style={{ background: `color-mix(in oklab, var(${c.chartVar}) 22%, transparent)`, color: `var(${c.chartVar}-text)` }}>{c.letter}</div>
                    <div>
                      <div className="at-text-strong">{c.name}</div>
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{c.orders}</div>
                    </div>
                  </div>
                  <div className="at-cluster" style={{ flex: 1, justifyContent: 'flex-end', gap: 'var(--at-space-4)' }}>
                    <div className={`at-progress ${c.variant}`} style={{ maxWidth: 180, flex: 1, marginInlineEnd: 'var(--at-space-3)' }}>
                      <div className="at-progress__bar" style={{ width: c.width }}></div>
                    </div>
                    <span className="at-num at-text-strong">{c.spend}</span>
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
