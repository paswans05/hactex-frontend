/*
 * Hactex React — Sales dashboard (the default '/' page).
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';
import { getUser } from '../../lib/auth';

const KPIS = [
  {
    label: 'Total Revenue',
    value: '$748.2K',
    badge: '▲ 12.4%',
    badgeKind: 'success',
    color: '--at-chart-1',
    paths: [
      'M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12',
      'M20 12v4h-4a2 2 0 0 1 0 -4h4',
    ],
    series: [{ name: 'Revenue', data: [612, 638, 624, 661, 679, 668, 694, 712, 703, 729, 741, 748.2] }],
  },
  {
    label: 'Total Customers',
    value: '3,920',
    badge: '▼ 3.1%',
    badgeKind: 'danger',
    color: '--at-chart-2',
    paths: [
      'M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0',
      'M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2',
      'M16 3.13a4 4 0 0 1 0 7.75',
      'M21 21v-2a4 4 0 0 0 -3 -3.85',
    ],
    series: [{ name: 'Customers', data: [4210, 4180, 4225, 4148, 4102, 4130, 4066, 4021, 4048, 3975, 3941, 3920] }],
  },
  {
    label: 'Total Products',
    value: '1,204',
    badge: '▲ 5.7%',
    badgeKind: 'success',
    color: '--at-chart-3',
    paths: [
      'M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5',
      'M12 12l8 -4.5',
      'M12 12l0 9',
      'M12 12l-8 -4.5',
      'M16 5.25l-8 4.5',
    ],
    series: [{ name: 'Products', data: [1042, 1058, 1039, 1074, 1096, 1081, 1118, 1147, 1129, 1163, 1188, 1204] }],
  },
  {
    label: 'Total Transactions',
    value: '9,812',
    badge: '▼ 1.4%',
    badgeKind: 'danger',
    color: '--at-chart-4',
    paths: [
      'M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2m4 -14h6m-6 4h6m-2 4h2',
    ],
    series: [{ name: 'Transactions', data: [10240, 10180, 10310, 10120, 10060, 10145, 9980, 9925, 9968, 9880, 9846, 9812] }],
  },
];

const SALES_CATEGORIES = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const SALES_SERIES = [
  { name: 'This period', data: [42000, 48000, 51000, 47000, 55000, 61000, 67000, 72000, 68000, 74000, 64000, 71000] },
  { name: 'Previous period', data: [38000, 41000, 44000, 42000, 48000, 52000, 56000, 60000, 58000, 62000, 54000, 59000] },
];

const DEVICES = [58, 34, 8];
const DEVICE_LABELS = ['Desktop', 'Mobile', 'Tablet'];

const TOP_PRODUCTS = [
  { letter: 'B', name: 'Brass Task Light', meta: 'Lighting · 412 sold', price: '$182', bg: undefined },
  { letter: 'A', name: 'Aperture Desk Lamp', meta: 'Lighting · 356 sold', price: '$129', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)' },
  { letter: 'M', name: 'Matte Ceramic Mug', meta: 'Drinkware · 298 sold', price: '$24', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)' },
  { letter: 'W', name: 'Walnut Monitor Riser', meta: 'Desk · 241 sold', price: '$96', bg: 'var(--at-lime)', color: 'var(--at-on-lime)' },
];

const TRAFFIC = [
  { label: 'Direct', pct: 38, variant: '' },
  { label: 'Organic search', pct: 27, variant: 'at-progress--info' },
  { label: 'Referral', pct: 14, variant: 'at-progress--success' },
  { label: 'Social', pct: 9, variant: 'at-progress--warning' },
  { label: 'Email', pct: 7, variant: 'at-progress--danger' },
  { label: 'Paid', pct: 5, variant: 'at-progress--warning' },
];

const ACTIVITY = [
  { title: 'New order #AX-10428', meta: 'Camila Rossi · $312.00 · 2m ago' },
  { title: 'Refund processed', meta: 'Sofia Lindqvist · $218.50 · 18m ago' },
  { title: 'Low-stock alert', meta: 'Glass Decanter · 2 left · 41m ago' },
  { title: 'Payout sent to bank', meta: '•••• 7045 · $12,480 · 2h ago' },
  { title: 'New customer registered', meta: 'daniel.cho@mail.com · 3h ago' },
];

const TXNS = [
  { letter: 'C', name: 'Camila Rossi', bg: undefined, cat: 'Stripe', catKind: 'accent', catText: 'Order payment', date: 'Jun 12', amount: '+$312.00', status: 'Completed', statusKind: 'success' },
  { letter: 'L', name: 'Linear', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', cat: 'Subscription', catKind: 'secondary', catText: 'Software', date: 'Jun 11', amount: '−$84.00', status: 'Completed', statusKind: 'success' },
  { letter: 'H', name: 'Henry Whitlock', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', cat: 'Stripe', catKind: 'accent', catText: 'Order payment', date: 'Jun 12', amount: '+$129.00', status: 'Completed', statusKind: 'success' },
  { letter: 'G', name: 'Payroll — June', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', cat: 'Gusto', catKind: 'warning', catText: 'Payroll', date: 'Jun 10', amount: '−$4,210.00', status: 'Pending', statusKind: 'warning' },
  { letter: 'A', name: 'Aiko Tanaka', bg: undefined, cat: 'Stripe', catKind: 'accent', catText: 'Order payment', date: 'Jun 10', amount: '+$486.40', status: 'Completed', statusKind: 'success' },
];

export const SLUG = 'dashboards/sales';

export default function Sales(): React.JSX.Element {
  const user = getUser();
  const userName = user?.name || 'Administrator';
  const roleName = user?.role || 'Admin';

  return (
    <>
      <PageHead
        title={
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Sales Dashboard</span>
            <span className="at-badge at-badge--accent" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
              {roleName}
            </span>
            <span className="at-badge at-badge--success" style={{ fontSize: '11px' }}>
              ● Authenticated
            </span>
          </span>
        }
        subtitle={`Welcome back, ${userName}. Here is your live operations and revenue overview.`}
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Export</button>
            <button className="at-btn at-btn--primary at-press">+ New Order</button>
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
                <span className={`at-badge at-badge--${k.badgeKind}`}>{k.badge}</span>
              </div>
              <div className="at-kpi__label">{k.label}</div>
              <div className="at-kpi__value">{k.value}</div>
              <ApexChart
                className="at-kpi__sparkline"
                type="line"
                sparkline
                tooltip={false}
                height={56}
                color={k.color}
                series={k.series}
              />
            </div>
          ))}
        </div>

        {/* Sales Statistics + Total Balance */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Sales Statistics</div>
                <div className="at-eyebrow">Performance · Monthly revenue vs. previous period</div>
              </div>
              <div className="at-segment">
                <button className="at-segment__btn">Week</button>
                <button className="at-segment__btn is-active">Month</button>
                <button className="at-segment__btn">Year</button>
              </div>
            </div>
            <ApexChart
              type="area"
              height={260}
              legend
              series={SALES_SERIES}
              categories={SALES_CATEGORIES}
            />
          </div>

          {/* Total Balance · ink plate — see components.css §4b.
              A flat ink field with canvas type and one accent chip, in
              place of the old accent→olive gradient. Actions and the
              income split sit on the card's own paper below the plate,
              so nothing here needs an on-accent override. */}
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Total Balance</div>
              <div className="at-segment">
                <button className="at-segment__btn is-active">USD</button>
                <button className="at-segment__btn">GBP</button>
                <button className="at-segment__btn">EUR</button>
              </div>
            </div>
            <div className="at-balance">
              <div className="at-balance__top">
                <span className="at-balance__brand">Hactex</span>
                <svg
                  className="at-balance__mark"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 10h18" />
                  <path d="M7 15h.01" />
                  <path d="M11 15h2" />
                  <path d="M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2" />
                </svg>
              </div>
              <span className="at-balance__chip" aria-hidden="true" />
              <div className="at-balance__body">
                <div className="at-balance__label">Available balance</div>
                <div className="at-balance__value">$48,210.00</div>
                <div className="at-balance__number">4921&nbsp;&nbsp;••••&nbsp;&nbsp;••••&nbsp;&nbsp;7045</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-4)' }}>
              <button className="at-btn at-btn--sm at-btn--primary at-press">Send</button>
              <button className="at-btn at-btn--sm at-btn--outline at-press">Request</button>
            </div>
            <div className="at-cluster" style={{ justifyContent: 'space-between', marginBlockStart: 'var(--at-space-4)', paddingBlockStart: 'var(--at-space-4)', borderBlockStart: 'var(--at-border-w-sm) solid var(--at-border)' }}>
              <div>
                <div className="at-kpi__label">Income</div>
                <div className="at-num at-text-strong">+$12,480</div>
              </div>
              <div>
                <div className="at-kpi__label">Spend</div>
                <div className="at-num at-text-strong">$5,210</div>
              </div>
              <div>
                <div className="at-kpi__label">Saved</div>
                <div className="at-num at-text-strong">$7,270</div>
              </div>
            </div>
          </div>
        </div>

        {/* Session By Device + Top Selling Products */}
        <div className="at-row">
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div className="at-chart__title">Session By Device</div>
            </div>
            <ApexChart
              type="donut"
              height={280}
              legend
              series={DEVICES}
              labels={DEVICE_LABELS}
              centerLabel="Sessions"
              centerValue="54.2K"
            />
          </div>
          <div className="at-col-8 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Top Selling Products</div>
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
                  <span className="at-num at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>{p.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Source + Recent Activity */}
        <div className="at-row">
          <div className="at-col-5 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Traffic Source</div>
              <a href="#" className="at-btn at-btn--ghost at-btn--sm">Report</a>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {TRAFFIC.map((t) => (
                <div key={t.label}>
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{t.label}</span>
                    <span className="at-num at-text-muted">{t.pct}%</span>
                  </div>
                  <div className={`at-progress ${t.variant}`} style={{ marginBlockStart: 'var(--at-space-2)' }}>
                    <div className="at-progress__bar" style={{ width: `${t.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="at-col-7 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Recent Activity</div>
                <div className="at-eyebrow">Team &amp; system events</div>
              </div>
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

        {/* Recent Transactions table */}
        <div className="at-card" style={{ overflow: 'hidden' }}>
          <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
            <div>
              <div className="at-chart__title">Recent Transactions</div>
              <div className="at-eyebrow">Latest payments &amp; payouts</div>
            </div>
            <a href="#" className="at-btn at-btn--ghost at-btn--sm">View all →</a>
          </div>
          <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
            <table className="at-table">
              <thead>
                <tr>
                  <th>Merchant</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th className="at-num">Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {TXNS.map((t) => (
                  <tr key={t.name}>
                    <td>
                      <div className="at-cluster">
                        <div className="at-avatar at-avatar--sm" style={t.bg ? { background: t.bg, color: t.color } : undefined}>{t.letter}</div>
                        <span className="at-text-strong">{t.name}</span>
                      </div>
                    </td>
                    <td><span className={`at-badge at-badge--inline at-badge--${t.catKind}`}>{t.cat}</span> {t.catText}</td>
                    <td>{t.date}</td>
                    <td className="at-num">{t.amount}</td>
                    <td><span className={`at-badge at-badge--${t.statusKind}`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
