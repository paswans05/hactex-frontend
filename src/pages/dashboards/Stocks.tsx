/*
 * Hactex React — Stocks & Trading dashboard.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Charts use <ApexChart>; the declarative
 * data-at-chart-* attributes become typed props.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const KPIS = [
  { label: 'Portfolio Value', value: '$248,300', delta: '▲ 1.9% today', dir: 'up' },
  { label: "Today's P / L", value: '+$4,610', delta: '▲ 1.9%', dir: 'up' },
  { label: "Day's Best", value: 'AAPL', delta: '▲ 3.4%', dir: 'up' },
  { label: 'Buying Power', value: '$32,480', delta: '▲ 0.0%', dir: 'up' },
];

const PRICE_CATEGORIES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const PRICE_SERIES = [{ name: 'AAPL', data: [182, 184, 181, 186, 188, 187, 191, 193, 190, 194, 196, 199] }];

const SECTOR_SERIES = [38, 22, 18, 12, 10];
const SECTOR_LABELS = ['Technology', 'Healthcare', 'Financials', 'Energy', 'Consumer'];

const VOLUME_SERIES = [{ name: 'Volume', data: [48, 52, 44, 58, 62, 54, 66, 72, 68, 74, 82, 88] }];

const HOLDINGS = [
  { symbol: 'AAPL', shares: '320', price: '$199.00', value: '$63,680', today: '+3.4%', todayClass: 'at-text-success' },
  { symbol: 'MSFT', shares: '180', price: '$412.00', value: '$74,160', today: '+1.2%', todayClass: 'at-text-success' },
  { symbol: 'GOOGL', shares: '240', price: '$168.50', value: '$40,440', today: '−0.8%', todayClass: 'at-text-danger' },
  { symbol: 'JNJ', shares: '410', price: '$152.00', value: '$62,320', today: '+0.4%', todayClass: 'at-text-success' },
];

const WATCHLIST = [
  { sym: 'NVDA', val: '+$8.40', kind: 'success' },
  { sym: 'TSLA', val: '−$2.10', kind: 'danger' },
  { sym: 'AMZN', val: '+$1.80', kind: 'success' },
  { sym: 'META', val: '−$0.20', kind: 'neutral' },
];

const NEWS = [
  { title: 'Fed holds rates steady, signals one cut in Q4', meta: 'Reuters · 12m ago' },
  { title: 'Nvidia tops $3T as AI demand stays red-hot', meta: 'Bloomberg · 48m ago' },
  { title: 'Apple unveils on-device AI at WWDC keynote', meta: 'CNBC · 2h ago' },
  { title: 'Oil slips as OPEC+ weighs supply boost', meta: 'WSJ · 3h ago' },
];

export const SLUG = 'dashboards/stocks';

export default function Stocks(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Stocks & Trading"
        subtitle="Portfolio, holdings & market action — today."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">1D</button>
            <button className="at-btn at-btn--primary at-press">Trade</button>
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

        {/* Apple price + Allocation by sector */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Apple Inc.</div>
                <div className="at-eyebrow">AAPL · daily</div>
              </div>
              <span className="at-badge at-badge--success">▲ 3.4%</span>
            </div>
            <ApexChart
              type="area"
              height={300}
              color="--at-accent"
              series={PRICE_SERIES}
              categories={PRICE_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div className="at-chart__title">Allocation by Sector</div>
            </div>
            <ApexChart
              type="donut"
              height={300}
              legend
              series={SECTOR_SERIES}
              labels={SECTOR_LABELS}
              centerLabel="Portfolio"
              centerValue="$128.4K"
            />
          </div>
        </div>

        {/* Volume bars + Order ticket */}
        <div className="at-row">
          <div className="at-col-8 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Volume</div>
                <div className="at-eyebrow">AAPL shares traded</div>
              </div>
            </div>
            <ApexChart
              type="bar"
              height={240}
              color="--at-tertiary"
              series={VOLUME_SERIES}
              categories={PRICE_CATEGORIES}
            />
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Order Ticket</div>
            </div>
            <div className="at-segment" style={{ marginBlockEnd: 'var(--at-space-4)' }}>
              <button className="at-segment__btn is-active">Buy</button>
              <button className="at-segment__btn">Sell</button>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div>
                <label className="at-eyebrow" style={{ display: 'block', marginBlockEnd: 'var(--at-space-2)' }}>Symbol</label>
                <input className="at-input" type="text" defaultValue="AAPL" />
              </div>
              <div>
                <label className="at-eyebrow" style={{ display: 'block', marginBlockEnd: 'var(--at-space-2)' }}>Shares</label>
                <input className="at-input" type="text" defaultValue="25" />
              </div>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-text-muted">Market price</span>
                <span className="at-text-strong">$199.00</span>
              </div>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-text-muted">Estimated cost</span>
                <span className="at-kpi__value" style={{ fontSize: 'var(--at-text-lg)' }}>$4,975.00</span>
              </div>
              <button className="at-btn at-btn--primary at-press at-btn--block">Buy AAPL</button>
            </div>
          </div>
        </div>

        {/* Holdings + Watchlist */}
        <div className="at-row">
          <div className="at-col-8 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__title">Holdings</div>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Shares</th>
                    <th className="at-num">Price</th>
                    <th className="at-num">Value</th>
                    <th className="at-num">Today</th>
                  </tr>
                </thead>
                <tbody>
                  {HOLDINGS.map((h) => (
                    <tr key={h.symbol}>
                      <td className="at-text-strong">{h.symbol}</td>
                      <td>{h.shares}</td>
                      <td className="at-num">{h.price}</td>
                      <td className="at-num">{h.value}</td>
                      <td className="at-num"><span className={h.todayClass}>{h.today}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Watchlist</div>
            </div>
            <div className="at-list">
              {WATCHLIST.map((w) => (
                <div key={w.sym} className="at-list__item">
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-strong">{w.sym}</span>
                    <span className={`at-badge at-badge--${w.kind}`}>{w.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market News */}
        <div className="at-row">
          <div className="at-col-12 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Market News</div>
              <button className="at-btn at-btn--ghost at-btn--sm at-press">More</button>
            </div>
            <div className="at-list">
              {NEWS.map((n) => (
                <div key={n.title} className="at-list__item" style={{ alignItems: 'flex-start' }}>
                  <div>
                    <div className="at-text-strong">{n.title}</div>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', marginTop: 2 }}>{n.meta}</div>
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
