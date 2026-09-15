/*
 * Hactex React — ApexCharts area family.
 * Built with the shared component classes, inline token
 * styles, and demo series. Each data-at-chart div becomes a typed <ApexChart>.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const REVENUE_CATEGORIES = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const REVENUE_SERIES = [
  { name: 'Revenue', data: [42100, 48300, 45200, 53400, 57100, 55600, 62400, 60200, 68900, 72300, 70100, 74820] },
];

const PAYOUT_CATEGORIES = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];
const PAYOUT_SERIES = [
  { name: 'Payouts', data: [38200, 41500, 39800, 44600, 42900, 48100, 52300] },
];

const SUBS_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const SUBS_SERIES = [
  { name: 'Pro', data: [1240, 1310, 1290, 1380, 1420, 1490, 1560] },
  { name: 'Team', data: [620, 680, 710, 760, 820, 890, 940] },
];

const CHANNEL_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const CHANNEL_SERIES = [
  { name: 'Direct', data: [16200, 18400, 17100, 20300, 22100, 21400, 24600] },
  { name: 'Organic', data: [11400, 12600, 13200, 14100, 15600, 16200, 17800] },
  { name: 'Referral', data: [5400, 6100, 5800, 6600, 7200, 7000, 7900] },
  { name: 'Paid', data: [3100, 3400, 3300, 3900, 4200, 4000, 4600] },
];

const CASHFLOW_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const CASHFLOW_SERIES = [
  { name: 'Cash flow', data: [4200, 3800, -1200, 5400, 2100, -2600, 4800] },
];

export default function Apex(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Area Charts"
        subtitle="ApexCharts area family — basic, gradient, stacked, spline and negative variants."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Export all</button>
            <button className="at-btn at-btn--primary at-press">New chart</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Monthly Revenue</div>
                <div className="at-eyebrow">Basic · single tint</div>
              </div>
              <div className="at-segment">
                <button className="at-segment__btn is-active">Chart</button>
                <button className="at-segment__btn">Table</button>
              </div>
            </div>
            <ApexChart type="area" height={330} series={REVENUE_SERIES} categories={REVENUE_CATEGORIES} />
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">When to use area</div>
                <div className="at-eyebrow">Quick reference</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-cluster" style={{ gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
                <span
                  className="at-avatar at-avatar--sm"
                  style={{ background: 'var(--at-accent-wash)', color: 'var(--at-accent-text)' }}
                >
                  ▲
                </span>
                <div>
                  <div className="at-text-strong">Show volume over time</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                    The filled area emphasises magnitude of a single metric.
                  </div>
                </div>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
                <span
                  className="at-avatar at-avatar--sm"
                  style={{ background: 'var(--at-surface)', color: 'var(--at-secondary-text)' }}
                >
                  ▤
                </span>
                <div>
                  <div className="at-text-strong">Stack parts of a whole</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                    Stacked areas read composition without losing the total.
                  </div>
                </div>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
                <span
                  className="at-avatar at-avatar--sm"
                  style={{ background: 'var(--at-surface)', color: 'var(--at-tertiary-text)' }}
                >
                  〜
                </span>
                <div>
                  <div className="at-text-strong">Smooth the noise</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                    Spline curves soften jagged sampling for a calmer read.
                  </div>
                </div>
              </div>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                  Recommended fill opacity
                </span>
                <span className="at-badge at-badge--neutral">8–14%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="at-row">
          <div className="at-col-6 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Payout Volume</div>
                <div className="at-eyebrow">Gradient fill</div>
              </div>
              <button className="at-btn at-btn--ghost at-btn--sm">Options</button>
            </div>
            <ApexChart type="area" height={280} series={PAYOUT_SERIES} categories={PAYOUT_CATEGORIES} />
          </div>
          <div className="at-col-6 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Active Subscriptions</div>
                <div className="at-eyebrow">Smooth · spline</div>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-4)' }}>
                <span className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                  <i
                    style={{
                      width: '9px',
                      height: '9px',
                      borderRadius: '3px',
                      background: 'var(--at-chart-1)',
                      display: 'inline-block',
                    }}
                  />
                  <small className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                    Pro
                  </small>
                </span>
                <span className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                  <i
                    style={{
                      width: '9px',
                      height: '9px',
                      borderRadius: '3px',
                      background: 'var(--at-chart-2)',
                      display: 'inline-block',
                    }}
                  />
                  <small className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                    Team
                  </small>
                </span>
              </div>
            </div>
            <ApexChart
              type="area"
              height={280}
              legend
              series={SUBS_SERIES}
              categories={SUBS_CATEGORIES}
            />
          </div>
        </div>
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Revenue by Channel</div>
                <div className="at-eyebrow">Stacked · parts of a whole</div>
              </div>
              <div className="at-segment">
                <button className="at-segment__btn is-active">Stacked</button>
                <button className="at-segment__btn">100%</button>
              </div>
            </div>
            <ApexChart
              type="area"
              height={320}
              stacked
              legend
              series={CHANNEL_SERIES}
              categories={CHANNEL_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Net Cash Flow</div>
                <div className="at-eyebrow">Negative values</div>
              </div>
            </div>
            <ApexChart type="area" height={280} series={CASHFLOW_SERIES} categories={CASHFLOW_CATEGORIES} />
            <div className="at-cluster" style={{ justifyContent: 'space-between', marginTop: 'var(--at-space-3)' }}>
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                Net this quarter
              </span>
              <b style={{ color: 'var(--at-success-text)' }}>$18,940</b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
