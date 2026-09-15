/*
 * Hactex React — Crypto wallet.
 * Built with the shared component classes, inline token
 * styles, and demo figures. Allocation donut uses <ApexChart>.
 */
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const ALLOC = [46, 28, 16, 7, 3];
const ALLOC_LABELS = ['Bitcoin', 'Ethereum', 'Solana', 'Tether', 'Avalanche'];

const ALLOC_LEGEND = [
  { name: 'Bitcoin', pct: '46%', color: 'var(--at-chart-1-text)' },
  { name: 'Ethereum', pct: '28%', color: 'var(--at-chart-2-text)' },
  { name: 'Solana', pct: '16%', color: 'var(--at-chart-3-text)' },
  { name: 'Tether', pct: '7%', color: 'var(--at-chart-4-text)' },
  { name: 'Avalanche', pct: '3%', color: 'var(--at-chart-5-text)' },
];

const HOLDINGS = [
  { letter: 'B', chartVar: '--at-chart-1', name: 'Bitcoin', sym: 'BTC', balance: '0.586', price: '$67,840', change: '+2.1%', changeColor: 'var(--at-success-text)', value: '$39,754' },
  { letter: 'E', chartVar: '--at-chart-2', name: 'Ethereum', sym: 'ETH', balance: '6.892', price: '$3,512', change: '+3.7%', changeColor: 'var(--at-success-text)', value: '$24,205' },
  { letter: 'S', chartVar: '--at-chart-3', name: 'Solana', sym: 'SOL', balance: '74.50', price: '$184.20', change: '+18.2%', changeColor: 'var(--at-success-text)', value: '$13,723' },
  { letter: 'T', chartVar: '--at-chart-4', name: 'Tether', sym: 'USDT', balance: '5,988', price: '$1.00', change: '0.0%', changeColor: 'var(--at-text-muted)', value: '$5,988' },
  { letter: 'A', chartVar: '--at-chart-5', name: 'Avalanche', sym: 'AVAX', balance: '68.30', price: '$38.10', change: '−2.4%', changeColor: 'var(--at-danger-text)', value: '$2,602' },
];

const TRANSACTIONS = [
  { type: 'Receive', typeKind: 'success', asset: 'Bitcoin · BTC', amount: '+0.0240', amountColor: 'var(--at-success-text)', value: '$1,628.16', date: 'Jun 27 · 06:10', status: 'Completed', statusKind: 'success' },
  { type: 'Send', typeKind: 'danger', asset: 'Ethereum · ETH', amount: '−1.2000', amountColor: undefined, value: '$4,214.40', date: 'Jun 26 · 19:42', status: 'Completed', statusKind: 'success' },
  { type: 'Buy', typeKind: 'info', asset: 'Solana · SOL', amount: '+12.500', amountColor: 'var(--at-success-text)', value: '$2,302.50', date: 'Jun 26 · 11:08', status: 'Completed', statusKind: 'success' },
  { type: 'Stake', typeKind: 'warning', asset: 'Ethereum · ETH', amount: '−2.0000', amountColor: undefined, value: '$7,024.00', date: 'Jun 25 · 09:30', status: 'Pending', statusKind: 'warning' },
  { type: 'Sell', typeKind: 'danger', asset: 'Avalanche · AVAX', amount: '−20.000', amountColor: undefined, value: '$762.00', date: 'Jun 24 · 15:55', status: 'Completed', statusKind: 'success' },
  { type: 'Receive', typeKind: 'success', asset: 'Tether · USDT', amount: '+1,500.00', amountColor: 'var(--at-success-text)', value: '$1,500.00', date: 'Jun 23 · 08:02', status: 'Failed', statusKind: 'danger' },
];

export default function Wallet(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Wallet"
        subtitle="Browse and manage wallet."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Action</button>
            <button className="at-btn at-btn--primary at-press">Primary</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* Total Balance (ink bank plate) */}
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Total Balance</div>
                <div className="at-eyebrow">Main wallet</div>
              </div>
              <div className="at-segment">
                <button className="at-segment__btn is-active">USD</button>
                <button className="at-segment__btn">BTC</button>
              </div>
            </div>
            {/* Ink plate — see components.css §4b. Replaced a 135°
                accent→olive gradient: color in this language is flat,
                and the two tokens met in a muddy middle. */}
            <div className="at-balance">
              <div className="at-balance__top">
                <span className="at-balance__brand">Hactex Wallet</span>
                <span className="at-badge at-badge--neutral">Secured</span>
              </div>
              <span className="at-balance__chip" aria-hidden="true" />
              <div className="at-balance__body">
                <div className="at-balance__label">Total value</div>
                <div className="at-balance__value">$86,420.55</div>
                <div className="at-balance__meta">
                  <span>+$3,940.18 (4.8%)</span><span>24h</span>
                </div>
              </div>
            </div>
            {/* balance split */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--at-space-3)',
                textAlign: 'center',
                marginBlockStart: 'var(--at-space-4)',
              }}
            >
              <div>
                <small className="at-text-muted" style={{ display: 'block', fontSize: 'var(--at-text-xs)', marginBlockEnd: 2 }}>Available</small>
                <b className="at-num">$78,432</b>
              </div>
              <div>
                <small className="at-text-muted" style={{ display: 'block', fontSize: 'var(--at-text-xs)', marginBlockEnd: 2 }}>Staked</small>
                <b className="at-num" style={{ color: 'var(--at-chart-2-text)' }}>$5,988</b>
              </div>
              <div>
                <small className="at-text-muted" style={{ display: 'block', fontSize: 'var(--at-text-xs)', marginBlockEnd: 2 }}>In orders</small>
                <b className="at-num" style={{ color: 'var(--at-chart-1-text)' }}>$2,000</b>
              </div>
            </div>
          </div>

          {/* Allocation (donut) */}
          <div className="at-col-4 at-card at-chart">
            <div className="at-chart__head">
              <div>
                <div className="at-chart__title">Allocation</div>
                <div className="at-eyebrow">Split across 5 assets</div>
              </div>
              <div className="at-segment">
                <button className="at-segment__btn">7D</button>
                <button className="at-segment__btn is-active">30D</button>
                <button className="at-segment__btn">1Y</button>
              </div>
            </div>
            <ApexChart
              type="donut"
              height={220}
              series={ALLOC}
              labels={ALLOC_LABELS}
              legend
              centerLabel="Portfolio"
              centerValue="$84.2K"
            />
            <ul className="at-list" style={{ margin: 0, marginBlockStart: 'var(--at-space-3)' }}>
              {ALLOC_LEGEND.map((a) => (
                <li key={a.name} className="at-list__item">
                  <span className="at-cluster">
                    <i
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: 3,
                        background: a.color,
                        display: 'inline-block',
                      }}
                    />
                    <span className="at-text-strong">{a.name}</span>
                  </span>
                  <span className="at-num at-text-strong">{a.pct}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Holdings (table) */}
          <div className="at-col-4 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)', paddingBlockEnd: 'var(--at-space-3)' }}>
              <div>
                <div className="at-chart__title">Holdings</div>
                <div className="at-eyebrow">Balances &amp; 24h movement</div>
              </div>
              <button className="at-btn at-btn--ghost at-btn--sm">Market</button>
            </div>
            <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th className="at-num">Balance</th>
                    <th className="at-num">Price</th>
                    <th className="at-num">24h</th>
                    <th className="at-num">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {HOLDINGS.map((h) => (
                    <tr key={h.name}>
                      <td>
                        <div className="at-cluster">
                          <div
                            className="at-avatar at-avatar--sm"
                            style={{
                              background: `color-mix(in oklab, var(${h.chartVar}) 18%, transparent)`,
                              color: `var(${h.chartVar}-text)`,
                            }}
                          >
                            {h.letter}
                          </div>
                          <span className="at-text-strong">
                            {h.name} <span className="at-text-muted" style={{ fontWeight: 400 }}>{h.sym}</span>
                          </span>
                        </div>
                      </td>
                      <td className="at-num at-text-muted">{h.balance}</td>
                      <td className="at-num">{h.price}</td>
                      <td className="at-num" style={{ color: h.changeColor }}>{h.change}</td>
                      <td className="at-num at-text-strong">{h.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Transactions (full width) */}
        <div className="at-card" style={{ overflow: 'hidden' }}>
          <div className="at-chart__head" style={{ padding: 'var(--at-space-5)', paddingBlockEnd: 'var(--at-space-3)' }}>
            <div>
              <div className="at-chart__title">Recent Transactions</div>
              <div className="at-eyebrow">Last 6 wallet movements</div>
            </div>
            <button className="at-btn at-btn--ghost at-btn--sm">View all</button>
          </div>
          <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
            <table className="at-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Asset</th>
                  <th className="at-num">Amount</th>
                  <th className="at-num">Value</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((t) => (
                  <tr key={`${t.asset}-${t.date}`}>
                    <td><span className={`at-badge at-badge--${t.typeKind}`}>{t.type}</span></td>
                    <td>{t.asset}</td>
                    <td className="at-num" style={t.amountColor ? { color: t.amountColor } : undefined}>{t.amount}</td>
                    <td className="at-num at-text-strong">{t.value}</td>
                    <td className="at-num at-text-muted">{t.date}</td>
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
