/*
 * Hactex React — Crypto exchange (BTC/USDT spot).
 * Built with the shared component classes, inline
 * token styles, and demo figures. Price chart uses <ApexChart> (area); the
 * order-book rows are extracted into typed arrays.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const PRICE_CATEGORIES = ['Jun 19', 'Jun 20', 'Jun 21', 'Jun 22', 'Jun 23', 'Jun 24', 'Jun 25', 'Jun 26', 'Jun 27', 'Jun 28', 'Jun 29'];
const PRICE_SERIES = [
  { name: 'BTC/USDT', data: [64210, 64800, 63500, 65200, 66100, 65800, 66900, 67300, 66500, 67120, 67840] },
];

const MARKETS = [
  { glyph: '₿', chartVar: '--at-chart-1', pair: 'BTC', quote: '/USDT', price: '67,840', chg: '+2.1%', chgColor: 'var(--at-success-text)' },
  { glyph: 'Ξ', chartVar: '--at-chart-2', pair: 'ETH', quote: '/USDT', price: '3,512', chg: '+3.7%', chgColor: 'var(--at-success-text)' },
  { glyph: '◎', chartVar: '--at-chart-3', pair: 'SOL', quote: '/USDT', price: '184.20', chg: '+18.2%', chgColor: 'var(--at-success-text)' },
  { glyph: '▲', chartVar: '--at-chart-5', pair: 'AVAX', quote: '/USDT', price: '38.10', chg: '−2.4%', chgColor: 'var(--at-danger-text)' },
  { glyph: 'A', chartVar: '--at-chart-4', pair: 'ADA', quote: '/USDT', price: '0.452', chg: '+1.3%', chgColor: 'var(--at-success-text)' },
  { glyph: '●', chartVar: '--at-danger', pair: 'DOT', quote: '/USDT', price: '6.94', chg: '−0.8%', chgColor: 'var(--at-danger-text)' },
];

const ASKS = [
  { price: '68,142.0', amount: '1.842', total: '125.5K', width: '78%' },
  { price: '68,058.5', amount: '0.926', total: '63.0K', width: '62%' },
  { price: '67,964.0', amount: '0.612', total: '41.6K', width: '48%' },
  { price: '67,902.5', amount: '0.388', total: '26.3K', width: '34%' },
  { price: '67,861.0', amount: '0.204', total: '13.8K', width: '22%' },
];

const BIDS = [
  { price: '67,818.5', amount: '0.296', total: '20.1K', width: '26%' },
  { price: '67,762.0', amount: '0.524', total: '35.5K', width: '40%' },
  { price: '67,690.5', amount: '0.718', total: '48.6K', width: '55%' },
  { price: '67,604.0', amount: '1.084', total: '73.3K', width: '71%' },
  { price: '67,540.5', amount: '1.962', total: '132.5K', width: '88%' },
];

const TRADES = [
  { side: 'Buy', sideColor: 'var(--at-success-text)', price: '67,840.20', priceColor: 'var(--at-success-text)', amount: '0.1842', total: '12,496.16', time: '14:32:08' },
  { side: 'Sell', sideColor: 'var(--at-danger-text)', price: '67,838.50', priceColor: 'var(--at-danger-text)', amount: '0.0512', total: '3,473.33', time: '14:32:05' },
  { side: 'Buy', sideColor: 'var(--at-success-text)', price: '67,841.00', priceColor: 'var(--at-success-text)', amount: '0.9020', total: '61,192.58', time: '14:31:58' },
  { side: 'Buy', sideColor: 'var(--at-success-text)', price: '67,835.75', priceColor: 'var(--at-success-text)', amount: '0.0246', total: '1,668.76', time: '14:31:51' },
  { side: 'Sell', sideColor: 'var(--at-danger-text)', price: '67,830.10', priceColor: 'var(--at-danger-text)', amount: '0.3380', total: '22,926.57', time: '14:31:44' },
  { side: 'Buy', sideColor: 'var(--at-success-text)', price: '67,832.40', priceColor: 'var(--at-success-text)', amount: '0.1500', total: '10,174.86', time: '14:31:39' },
];

function OrderRow({ row, colorVar }: { row: { price: string; amount: string; total: string; width: string }; colorVar: string }): React.JSX.Element {
  return (
    <div
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 'var(--at-space-2)',
        paddingBlock: 3,
        fontSize: 'var(--at-text-xs)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          insetBlock: 0,
          insetInlineEnd: 0,
          width: row.width,
          background: `color-mix(in oklab, var(${colorVar}) 12%, transparent)`,
        }}
      />
      <span style={{ position: 'relative', color: `var(${colorVar}-text)` }}>{row.price}</span>
      <span style={{ position: 'relative', textAlign: 'end' }}>{row.amount}</span>
      <span style={{ position: 'relative', textAlign: 'end' }} className="at-text-muted">{row.total}</span>
    </div>
  );
}

export default function Exchange(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Exchange"
        subtitle="BTC / USDT spot market · live order book & depth."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Action</button>
            <button className="at-btn at-btn--primary at-press">Primary</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row" style={{ alignItems: 'stretch' }}>
          {/* Markets */}
          <div className="at-col-3 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Markets</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div className="at-search" style={{ boxShadow: 'none' }}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 14, height: 14 }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>Search pair…</span>
              </div>
              <div className="at-segment">
                <button className="at-segment__btn is-active">USDT</button>
                <button className="at-segment__btn">BTC</button>
                <button className="at-segment__btn">ETH</button>
              </div>
              <ul className="at-list" style={{ margin: 0 }}>
                {MARKETS.map((m, i) => (
                  <li
                    key={m.pair}
                    className="at-list__item"
                    style={i === 0 ? { background: 'var(--at-accent-wash)', borderRadius: 'var(--at-radius-sm)' } : undefined}
                  >
                    <span className="at-cluster">
                      <div
                        className="at-avatar at-avatar--xs"
                        style={{
                          background: `color-mix(in oklab, var(${m.chartVar}) 18%, transparent)`,
                          color: `var(${m.chartVar}-text)`,
                        }}
                      >
                        {m.glyph}
                      </div>
                      <span className="at-text-strong">
                        {m.pair} <span className="at-text-muted" style={{ fontWeight: 400 }}>{m.quote}</span>
                      </span>
                    </span>
                    <span style={{ textAlign: 'end' }}>
                      <span className="at-num at-text-strong" style={{ display: 'block', fontSize: 'var(--at-text-sm)' }}>{m.price}</span>
                      <span className="at-num" style={{ fontSize: 'var(--at-text-xs)', color: m.chgColor }}>{m.chg}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Price Chart (area) */}
          <div className="at-col-6 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Price Chart</div>
                <div className="at-eyebrow">BTC / USDT</div>
              </div>
              <div className="at-segment">
                <button className="at-segment__btn">15m</button>
                <button className="at-segment__btn">1H</button>
                <button className="at-segment__btn is-active">1D</button>
                <button className="at-segment__btn">1W</button>
              </div>
            </div>
            <ApexChart
              type="area"
              height={320}
              series={PRICE_SERIES}
              categories={PRICE_CATEGORIES}
            />
          </div>

          {/* Order Book */}
          <div className="at-col-3 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Order Book</div>
            </div>
            <div className="at-num" style={{ fontSize: 'var(--at-text-xs)' }}>
              {/* header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 'var(--at-space-2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBlockEnd: 'var(--at-space-2)',
                }}
                className="at-text-muted"
              >
                <span>Price</span>
                <span style={{ textAlign: 'end' }}>Amount</span>
                <span style={{ textAlign: 'end' }}>Total</span>
              </div>
              {/* asks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {ASKS.map((r) => (
                  <OrderRow key={r.price} row={r} colorVar="--at-danger" />
                ))}
              </div>
              {/* spread / last */}
              <div
                className="at-cluster"
                style={{
                  justifyContent: 'space-between',
                  paddingBlock: 'var(--at-space-3)',
                  marginBlock: 'var(--at-space-2)',
                  borderBlock: '2px solid var(--at-ink)',
                }}
              >
                <span className="at-num" style={{ fontSize: 'var(--at-text-lg)', fontWeight: 700, color: 'var(--at-success-text)' }}>
                  67,840.2
                </span>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Spread 0.06%</span>
              </div>
              {/* bids */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {BIDS.map((r) => (
                  <OrderRow key={r.price} row={r} colorVar="--at-success" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Trades (full width) */}
        <div className="at-card" style={{ overflow: 'hidden' }}>
          <div className="at-chart__head" style={{ padding: 'var(--at-space-5)', paddingBlockEnd: 'var(--at-space-3)' }}>
            <div>
              <div className="at-chart__title">Recent Trades</div>
              <div className="at-eyebrow">BTC / USDT market</div>
            </div>
            <button className="at-btn at-btn--ghost at-btn--sm">My history</button>
          </div>
          <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
            <table className="at-table">
              <thead>
                <tr>
                  <th>Side</th>
                  <th className="at-num">Price (USDT)</th>
                  <th className="at-num">Amount (BTC)</th>
                  <th className="at-num">Total (USDT)</th>
                  <th className="at-num">Time</th>
                </tr>
              </thead>
              <tbody>
                {TRADES.map((t) => (
                  <tr key={t.time}>
                    <td><span style={{ color: t.sideColor, fontWeight: 600 }}>{t.side}</span></td>
                    <td className="at-num" style={{ color: t.priceColor }}>{t.price}</td>
                    <td className="at-num">{t.amount}</td>
                    <td className="at-num at-text-strong">{t.total}</td>
                    <td className="at-num at-text-muted">{t.time}</td>
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
