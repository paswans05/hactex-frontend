/*
 * Hactex React — Crypto dashboard.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props. Sparklines use the
 * `sparkline` prop. Route-scoped watchlist CSS is emitted via a <style> block.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  { label: 'Portfolio Value', value: '$86,420', delta: '▲ 4.8% (24h)', dir: 'up' },
  { label: '24h Profit / Loss', value: '+$3,940', delta: '▲ 4.8%', dir: 'up' },
  { label: 'Best Performer', value: 'SOL', delta: '▲ 18.2%', dir: 'up' },
  { label: 'Available Balance', value: '$12,300', delta: '▼ 1.1%', dir: 'down' },
];

const PERF_CATEGORIES = ['1', '5', '9', '13', '17', '21', '25', '29'];
const PERF_SERIES = [{ name: 'Value', data: [72400, 73100, 71800, 74600, 76200, 75800, 78100, 79900, 81200, 80600, 84200, 83800, 86420] }];

const ALLOC_SERIES = [46, 28, 16, 10];
const ALLOC_LABELS = ['Bitcoin', 'Ethereum', 'Solana', 'Tether'];

const BTC_CATEGORIES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const BTC_SERIES = [{ name: 'BTC', data: [58400, 59100, 61200, 60800, 62400, 64100, 63800, 66200, 67400, 66900, 69100, 71200] }];

const HOLDINGS = [
  { asset: '₿ Bitcoin', holdings: '0.5621', value: '$40,034', change: '+3.2%', changeClass: 'at-text-success' },
  { asset: 'Ξ Ethereum', holdings: '9.8400', value: '$24,200', change: '+2.1%', changeClass: 'at-text-success' },
  { asset: '◎ Solana', holdings: '82.50', value: '$13,826', change: '+18.2%', changeClass: 'at-text-success' },
  { asset: '₮ Tether', holdings: '12,300', value: '$12,300', change: '0.0%', changeClass: 'at-text-muted' },
];

const WATCHLIST = [
  { sym: '₳', name: 'Cardano', ticker: 'ADA', chartVar: '--at-chart-2', color: '--at-success', series: [{ name: 'ADA', data: [0.441, 0.438, 0.445, 0.449, 0.447, 0.451, 0.452] }], price: '$0.452', pill: '▲ 1.3%', pillKind: 'up' },
  { sym: '●', name: 'Polkadot', ticker: 'DOT', chartVar: '--at-chart-5', color: '--at-danger', series: [{ name: 'DOT', data: [7.01, 7.05, 6.99, 6.94, 6.96, 6.9, 6.94] }], price: '$6.94', pill: '▼ 0.8%', pillKind: 'down' },
  { sym: '⬡', name: 'Chainlink', ticker: 'LINK', chartVar: '--at-chart-3', color: '--at-success', series: [{ name: 'LINK', data: [14.1, 14.3, 14.25, 14.5, 14.62, 14.7, 14.82] }], price: '$14.82', pill: '▲ 5.4%', pillKind: 'up' },
  { sym: '◈', name: 'Polygon', ticker: 'MATIC', chartVar: '--at-warning', color: '--at-success', series: [{ name: 'MATIC', data: [0.708, 0.712, 0.71, 0.715, 0.722, 0.725, 0.728] }], price: '$0.728', pill: '▲ 2.9%', pillKind: 'up' },
  { sym: 'Ł', name: 'Litecoin', ticker: 'LTC', chartVar: '--at-success', color: '--at-danger', series: [{ name: 'LTC', data: [85.2, 85.0, 84.8, 84.95, 84.6, 84.3, 84.1] }], price: '$84.10', pill: '▼ 1.2%', pillKind: 'down' },
];

export const SLUG = 'dashboards/crypto';

export default function Crypto(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Crypto"
        subtitle="Portfolio, holdings & market action — 24h view."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">24h</button>
            <button className="at-btn at-btn--primary at-press">Buy / Sell</button>
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

        {/* Portfolio performance + Asset allocation */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Portfolio Performance</div>
                <div className="at-eyebrow">Value · 30 days</div>
              </div>
              <div className="at-segment">
                <button className="at-segment__btn">7D</button>
                <button className="at-segment__btn is-active">30D</button>
                <button className="at-segment__btn">1Y</button>
              </div>
            </div>
            <ApexChart
              type="area"
              height={300}
              color="--at-success"
              series={PERF_SERIES}
              categories={PERF_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div className="at-chart__title">Asset Allocation</div>
            </div>
            <ApexChart
              type="donut"
              height={300}
              legend
              series={ALLOC_SERIES}
              labels={ALLOC_LABELS}
              centerLabel="Portfolio"
              centerValue="$84.2K"
            />
          </div>
        </div>

        {/* Bitcoin price + Trade widget */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Bitcoin Price</div>
                <div className="at-eyebrow">BTC / USD · daily</div>
              </div>
              <span className="at-badge at-badge--success">▲ 3.2%</span>
            </div>
            <ApexChart
              type="area"
              height={280}
              color="--at-secondary"
              series={BTC_SERIES}
              categories={BTC_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Trade</div>
            </div>
            <div className="at-segment" style={{ marginBlockEnd: 'var(--at-space-4)' }}>
              <button className="at-segment__btn is-active">Buy</button>
              <button className="at-segment__btn">Sell</button>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div>
                <label className="at-eyebrow" style={{ display: 'block', marginBlockEnd: 'var(--at-space-2)' }}>Amount (BTC)</label>
                <input className="at-input" type="text" defaultValue="0.045" />
              </div>
              <div>
                <label className="at-eyebrow" style={{ display: 'block', marginBlockEnd: 'var(--at-space-2)' }}>At price (USD)</label>
                <input className="at-input" type="text" defaultValue="71,200.00" />
              </div>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-text-muted">Total</span>
                <span className="at-kpi__value" style={{ fontSize: 'var(--at-text-lg)' }}>$3,204.00</span>
              </div>
              <button className="at-btn at-btn--primary at-press at-btn--block">Buy BTC</button>
            </div>
          </div>
        </div>

        {/* Holdings + Fear & Greed */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__title">Holdings</div>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Holdings</th>
                    <th className="at-num">Value</th>
                    <th className="at-num">24h</th>
                  </tr>
                </thead>
                <tbody>
                  {HOLDINGS.map((h) => (
                    <tr key={h.asset}>
                      <td className="at-text-strong">{h.asset}</td>
                      <td>{h.holdings}</td>
                      <td className="at-num">{h.value}</td>
                      <td className="at-num"><span className={h.changeClass}>{h.change}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div className="at-chart__title">Fear &amp; Greed</div>
            </div>
            <ApexChart
              type="donut"
              height={220}
              series={[72, 28]}
              labels={['Greed', 'Remaining']}
            />
            <div className="at-cluster" style={{ justifyContent: 'center', paddingBlockEnd: 'var(--at-space-4)' }}>
              <span className="at-kpi__value" style={{ fontSize: 'var(--at-text-2xl)' }}>72</span>
              <span className="at-badge at-badge--success">Greed</span>
            </div>
          </div>
        </div>

        {/* Watchlist */}
        <div className="at-row">
          <div className="at-col-12 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Watchlist</div>
                <div className="at-eyebrow">Tracking · 5 assets · 7d</div>
              </div>
              <button className="at-btn at-btn--ghost at-btn--icon at-btn--sm at-press" aria-label="Add to watchlist">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 5l0 14" />
                  <path d="M5 12l14 0" />
                </svg>
              </button>
            </div>
            <div className="at-list">
              {WATCHLIST.map((w) => (
                <div key={w.ticker} className="at-list__item at-crypto-watch__row">
                  <div className="at-cluster" style={{ gap: 'var(--at-space-3)', minWidth: 0 }}>
                    <div
                      className="at-avatar at-avatar--square at-avatar--sm"
                      style={{ background: `color-mix(in oklab, var(${w.chartVar}) 18%, transparent)`, color: `var(${w.chartVar}-text)` }}
                    >
                      {w.sym}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div className="at-text-strong">{w.name}</div>
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{w.ticker}</div>
                    </div>
                  </div>
                  <ApexChart
                    className="at-crypto-watch__spark"
                    type="area"
                    height={36}
                    sparkline
                    color={w.color}
                    series={w.series}
                  />
                  <div className="at-cluster" style={{ gap: 'var(--at-space-2)', justifyContent: 'flex-end' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div className="at-num at-text-strong">{w.price}</div>
                      <span className={`at-crypto-pill at-crypto-pill--${w.pillKind}`}>{w.pill}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        [data-at-route='dashboards/crypto'] .at-crypto-watch__row {
          display: flex;
          align-items: center;
          gap: var(--at-space-4);
        }
        [data-at-route='dashboards/crypto'] .at-crypto-watch__row > .at-cluster:first-child {
          flex: 1 1 auto;
          min-width: 0;
        }
        [data-at-route='dashboards/crypto'] .at-crypto-watch__spark {
          flex: 0 0 96px;
          width: 96px;
          height: 36px;
          min-height: 0;
        }
        [data-at-route='dashboards/crypto'] .at-crypto-watch__spark .apexcharts-canvas {
          max-width: 100%;
        }
        [data-at-route='dashboards/crypto'] .at-crypto-watch__row > .at-cluster:last-child {
          flex: 0 0 auto;
        }
        @media (max-width: 640px) {
          [data-at-route='dashboards/crypto'] .at-crypto-watch__spark {
            display: none;
          }
        }
        [data-at-route='dashboards/crypto'] .at-crypto-pill {
          display: inline-flex;
          align-items: center;
          gap: var(--at-space-1);
          padding: 1px var(--at-space-2);
          margin-block-start: 2px;
          font-size: var(--at-text-2xs);
          font-weight: var(--at-weight-2xs);
          font-family: var(--at-font-mono);
          line-height: 1.4;
          border-radius: var(--at-radius-pill);
        }
        [data-at-route='dashboards/crypto'] .at-crypto-pill--up {
          color: var(--at-success-text);
          background: color-mix(in oklab, var(--at-success) 14%, transparent);
        }
        [data-at-route='dashboards/crypto'] .at-crypto-pill--down {
          color: var(--at-danger-text);
          background: color-mix(in oklab, var(--at-danger) 14%, transparent);
        }
      `}</style>
    </>
  );
}
