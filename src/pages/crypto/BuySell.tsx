/*
 * Hactex React — Crypto Buy & Sell.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Buy/Sell is a controlled tab; the pay amount
 * is a controlled input.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const RECENT_ORDERS = [
  { letter: 'B', chartVar: '--at-chart-1', action: 'Bought BTC', date: 'Jun 27 · 06:10', amount: '0.0250', status: 'Filled', statusKind: 'success' },
  { letter: 'E', chartVar: '--at-chart-2', action: 'Sold ETH', date: 'Jun 26 · 19:42', amount: '1.2000', status: 'Filled', statusKind: 'success' },
  { letter: 'S', chartVar: '--at-chart-3', action: 'Bought SOL', date: 'Jun 26 · 11:08', amount: '12.500', status: 'Pending', statusKind: 'warning' },
];

export default function BuySell(): React.JSX.Element {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const [pay, setPay] = useState('500.00');

  return (
    <>
      <PageHead
        title="Buy & Sell"
        subtitle="Instantly convert between cash and crypto at live market rates."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Action</button>
            <button className="at-btn at-btn--primary at-press">Primary</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* Pay With (buy/sell order form) */}
          <div className="at-col-7 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Pay With</div>
                <div className="at-eyebrow">Buy or sell crypto</div>
              </div>
              <div className="at-segment" style={{ flex: '1 1 auto' }}>
                <button
                  className={`at-segment__btn${mode === 'buy' ? ' is-active' : ''}`}
                  onClick={() => setMode('buy')}
                >
                  Buy
                </button>
                <button
                  className={`at-segment__btn${mode === 'sell' ? ' is-active' : ''}`}
                  onClick={() => setMode('sell')}
                >
                  Sell
                </button>
              </div>
            </div>

            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div>
                <label className="at-form-label">You pay</label>
                <div style={{ display: 'flex', gap: 'var(--at-space-3)', alignItems: 'stretch' }}>
                  <input
                    className="at-input at-num"
                    type="text"
                    inputMode="decimal"
                    value={pay}
                    onChange={(e) => setPay(e.target.value)}
                    style={{ flex: '1 1 auto', fontSize: 'var(--at-text-lg)', fontWeight: 600 }}
                  />
                  <select className="at-select" style={{ flex: '0 0 130px' }}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
                <div className="at-cluster" style={{ gap: 'var(--at-space-2)', marginTop: 'var(--at-space-3)' }}>
                  <button className="at-btn at-btn--outline at-btn--sm">$100</button>
                  <button className="at-btn at-btn--outline at-btn--sm">$500</button>
                  <button className="at-btn at-btn--outline at-btn--sm">$1,000</button>
                  <button className="at-btn at-btn--outline at-btn--sm">$5,000</button>
                </div>
              </div>

              {/* swap glyph */}
              <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                <span
                  aria-hidden="true"
                  style={{
                    display: 'inline-flex',
                    width: 38,
                    height: 38,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--at-radius-pill, 999px)',
                    background: 'var(--at-surface)',
                    border: '2px solid var(--at-ink)',
                    color: 'var(--at-accent-text)',
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 4l0 16" />
                    <path d="M5 8l2 -4l2 4" />
                    <path d="M17 4l0 16" />
                    <path d="M15 16l2 4l2 -4" />
                  </svg>
                </span>
              </div>

              {/* You receive */}
              <div>
                <label className="at-form-label">You receive</label>
                <div style={{ display: 'flex', gap: 'var(--at-space-3)', alignItems: 'stretch' }}>
                  <div
                    className="at-num"
                    style={{
                      flex: '1 1 auto',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 var(--at-space-4)',
                      border: '2px solid var(--at-ink)',
                      borderRadius: 'var(--at-radius-md)',
                      background: 'var(--at-surface)',
                      minHeight: 54,
                      fontSize: 'var(--at-text-lg)',
                      fontWeight: 600,
                      color: 'var(--at-text-strong)',
                    }}
                  >
                    0.007360
                  </div>
                  <select className="at-select" style={{ flex: '0 0 168px' }}>
                    <option value="BTC">Bitcoin · BTC</option>
                    <option value="ETH">Ethereum · ETH</option>
                    <option value="SOL">Solana · SOL</option>
                    <option value="ADA">Cardano · ADA</option>
                  </select>
                </div>
              </div>
            </div>

            {/* summary */}
            <div
              className="at-stack"
              style={{
                gap: 'var(--at-space-3)',
                padding: 'var(--at-space-4)',
                borderRadius: 'var(--at-radius-md)',
                background: 'var(--at-surface)',
                marginBlockStart: 'var(--at-space-5)',
              }}
            >
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-cluster at-text-muted" style={{ gap: 'var(--at-space-2)', fontSize: 'var(--at-text-sm)' }}>
                  Rate
                  <span className="at-badge at-badge--success">Live</span>
                </span>
                <b className="at-num">1 BTC = $67,940.00</b>
              </div>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>Hactex fee (0.49%)</span>
                <b className="at-num">$2.45</b>
              </div>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>Network fee</span>
                <b className="at-num">$1.20</b>
              </div>
              <div style={{ height: 2, background: 'var(--at-ink)', opacity: 0.15, marginBlock: 'var(--at-space-1)' }} />
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-text-strong" style={{ fontWeight: 600 }}>Total</span>
                <b className="at-num at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>$503.65</b>
              </div>
            </div>

            <button className="at-btn at-btn--primary at-btn--block" style={{ marginBlockStart: 'var(--at-space-4)' }}>
              {mode === 'buy' ? 'Buy BTC' : 'Sell BTC'}
            </button>
          </div>

          {/* Recent Orders */}
          <div className="at-col-5 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)', paddingBlockEnd: 'var(--at-space-3)' }}>
              <div className="at-chart__title">Recent Orders</div>
              <button className="at-btn at-btn--ghost at-btn--sm">All</button>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th className="at-num">Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ORDERS.map((o) => (
                    <tr key={`${o.action}-${o.date}`}>
                      <td>
                        <div className="at-cluster">
                          <div
                            className="at-avatar at-avatar--sm"
                            style={{
                              background: `color-mix(in oklab, var(${o.chartVar}) 18%, transparent)`,
                              color: `var(${o.chartVar}-text)`,
                            }}
                          >
                            {o.letter}
                          </div>
                          <span className="at-text-strong">
                            {o.action}{' '}
                            <span className="at-text-muted" style={{ fontWeight: 400 }}>{o.date}</span>
                          </span>
                        </div>
                      </td>
                      <td className="at-num at-text-strong">{o.amount}</td>
                      <td><span className={`at-badge at-badge--${o.statusKind}`}>{o.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
