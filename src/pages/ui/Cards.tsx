/*
 * Hactex React — Cards UI page.
 * Built with the shared component classes, inline token
 * styles, and demo figures. Charts use <ApexChart> — one area trend plus the
 * KPI sparkline row.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  { label: 'Total Revenue', value: '$748.2K', delta: '▲ 12.4%', dir: 'up' },
  { label: 'Orders', value: '3,921', delta: '▲ 5.2%', dir: 'up' },
  { label: 'Avg. order value', value: '$190.82', delta: '▼ 1.1%', dir: 'down' },
  { label: 'Customers', value: '12,486', delta: '▲ 8.7%', dir: 'up' },
];

const SPARK_KPIS = [
  {
    label: 'Total products',
    value: '1,204',
    badge: '▲ 2.0%',
    badgeKind: 'success',
    color: '--at-chart-1',
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
    label: 'Orders',
    value: '3,921',
    badge: '▲ 5.2%',
    badgeKind: 'success',
    color: '--at-chart-2',
    paths: [
      'M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0',
      'M15 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0',
      'M17 17h-11v-14h-2',
      'M6 5l14 1l-1 7h-13',
    ],
    series: [{ name: 'Orders', data: [3180, 3320, 3245, 3410, 3388, 3560, 3495, 3672, 3740, 3688, 3846, 3921] }],
  },
  {
    label: 'Avg. order value',
    value: '$190.82',
    badge: '▼ 1.1%',
    badgeKind: 'danger',
    color: '--at-chart-3',
    paths: [
      'M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0',
      'M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1',
      'M12 7v10',
    ],
    series: [{ name: 'AOV', data: [196.4, 199.1, 194.8, 201.6, 197.2, 203.4, 198.9, 195.6, 199.8, 193.7, 192.9, 190.82] }],
  },
  {
    label: 'Customers',
    value: '12,486',
    badge: '▲ 8.7%',
    badgeKind: 'success',
    color: '--at-chart-4',
    paths: [
      'M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0',
      'M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2',
      'M16 3.13a4 4 0 0 1 0 7.75',
      'M21 21v-2a4 4 0 0 0 -3 -3.85',
    ],
    series: [{ name: 'Customers', data: [10240, 10580, 10410, 10920, 11180, 11040, 11460, 11720, 11590, 12010, 12280, 12486] }],
  },
];

const REVENUE_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const REVENUE_SERIES = [
  { name: 'Revenue', data: [120, 180, 140, 210, 260, 240, 310, 290, 340, 400, 380, 460] },
];

const ORDERS = [
  { name: 'Acme Corp', amount: '$1,240', kind: 'success', status: 'Paid' },
  { name: 'Globex LLC', amount: '$860', kind: 'warning', status: 'Pending' },
  { name: 'Initech', amount: '$2,150', kind: 'success', status: 'Paid' },
  { name: 'Umbrella Co', amount: '$540', kind: 'danger', status: 'Failed' },
];

export default function Cards(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Cards"
        subtitle="The foundational surface for grouping content."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Export</button>
            <button className="at-btn at-btn--primary at-press">New report</button>
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

        {/* KPI row · with sparkline —————————————————————————————————
            The same .at-kpi card carrying its own trend line: an icon tile and
            a delta pill on the head row, then a bare smooth stroke under the
            value. `sparkline` tells the apex wrapper to drop the axes, grid and
            padding; the curve and the round cap are already the wrapper's
            cartesian defaults. height={56} sizes the plate — see
            .at-kpi__sparkline in components.css §4 for why it lives here rather
            than in the stylesheet. tooltip={false} because the plate carries no
            axis or scale: a hover readout of an unlabelled point is noise, and
            the card already states the number it is trending toward. */}
        <div className="at-row">
          {SPARK_KPIS.map((k) => (
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

        {/* Titled cards row */}
        <div className="at-row">
          {/* Revenue Trend */}
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Revenue Trend</div>
                <div className="at-eyebrow">Monthly performance</div>
              </div>
              <div className="at-segment">
                <button className="at-segment__btn is-active">Month</button>
                <button className="at-segment__btn">Year</button>
              </div>
            </div>
            <ApexChart
              type="area"
              height={300}
              series={REVENUE_SERIES}
              categories={REVENUE_CATEGORIES}
            />
          </div>

          {/* Order summary */}
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Order summary</div>
                <div className="at-eyebrow">Latest transactions</div>
              </div>
            </div>
            <div className="at-list">
              {ORDERS.map((o) => (
                <div key={o.name} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{o.name}</span>
                    <span className="at-cluster" style={{ gap: 'var(--at-space-2)', alignItems: 'center' }}>
                      <span className="at-text-strong">{o.amount}</span>
                      <span className={`at-badge at-badge--${o.kind}`}>{o.status}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scale — usage */}
        <div className="at-row">
          <div className="at-col-12 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Scale — usage</div>
                <div className="at-eyebrow">
                  The same card scales from compact KPI to full feature
                </div>
              </div>
            </div>
            <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-col-3" style={{ border: '2px solid var(--at-ink)', padding: 'var(--at-space-3)', background: 'var(--at-surface)' }}>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Mini
                </div>
                <div className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)', marginBlockStart: 'var(--at-space-1)' }}>
                  12,408
                </div>
              </div>
              <div className="at-col-3" style={{ border: '2px solid var(--at-ink)', padding: 'var(--at-space-4)', background: 'var(--at-surface)' }}>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Standard
                </div>
                <div className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)', marginBlockStart: 'var(--at-space-1)' }}>
                  $48.2K
                </div>
                <div className="at-progress" style={{ marginBlockStart: 'var(--at-space-2)' }}>
                  <div className="at-progress__bar" style={{ width: '64%' }} />
                </div>
              </div>
              <div className="at-col-3" style={{ border: '2px solid var(--at-ink)', padding: 'var(--at-space-5)', background: 'var(--at-surface)' }}>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Comfortable
                </div>
                <div className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)', marginBlockStart: 'var(--at-space-1)' }}>
                  +18.4%
                </div>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginBlockStart: 'var(--at-space-1)' }}>
                  vs last period
                </div>
              </div>
              <div className="at-col-3" style={{ border: '2px solid var(--at-ink)', padding: 'var(--at-space-5)', background: 'var(--at-ink-strong)', color: 'var(--at-paper)' }}>
                <div style={{ fontSize: 'var(--at-text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.8 }}>
                  Inverted
                </div>
                <div style={{ fontSize: 'var(--at-text-lg)', fontWeight: 700, marginBlockStart: 'var(--at-space-1)' }}>
                  98.9%
                </div>
                <div style={{ fontSize: 'var(--at-text-sm)', opacity: 0.85, marginBlockStart: 'var(--at-space-1)' }}>
                  uptime SLA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
