/*
 * Hactex React — Crypto transactions.
 * Built with the shared component classes, inline
 * token styles, and demo figures. The search box filters rows via useState +
 * useMemo; the type/status selects are presentational.
 */
import { useState, useMemo } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const KPIS = [
  { label: 'Transactions', value: '248', delta: '▲ 12', dir: 'up', valueStyle: null as React.CSSProperties | null },
  { label: 'Inflow', value: '+$42,180', delta: '▲ 8.1%', dir: 'up', valueStyle: { color: 'var(--at-success-text)' } as React.CSSProperties },
  { label: 'Outflow', value: '−$28,640', delta: '▼ 3.4%', dir: 'down', valueStyle: null as React.CSSProperties | null },
  { label: 'Fees Paid', value: '$214.80', delta: '▲ this month', dir: 'up', valueStyle: null as React.CSSProperties | null },
];

const TXNS = [
  { type: 'Receive', typeKind: 'success', glyph: '₿', chartVar: '--at-chart-1', name: 'Bitcoin', sym: 'BTC', amount: '+0.0240', amountColor: 'var(--at-success-text)', price: '$67,840', value: '$1,628.16', fee: '$0.00', hash: '0x9af3…21d4', date: 'Jun 27 · 06:10', status: 'Completed', statusKind: 'success' },
  { type: 'Send', typeKind: 'danger', glyph: 'Ξ', chartVar: '--at-chart-2', name: 'Ethereum', sym: 'ETH', amount: '−1.2000', amountColor: undefined, price: '$3,512.00', value: '$4,214.40', fee: '$2.84', hash: '0x71b0…c812', date: 'Jun 26 · 19:42', status: 'Completed', statusKind: 'success' },
  { type: 'Buy', typeKind: 'info', glyph: '◎', chartVar: '--at-chart-3', name: 'Solana', sym: 'SOL', amount: '+12.500', amountColor: 'var(--at-success-text)', price: '$184.20', value: '$2,302.50', fee: '$11.28', hash: '0x4cd9…3e90', date: 'Jun 26 · 11:08', status: 'Completed', statusKind: 'success' },
  { type: 'Stake', typeKind: 'accent', glyph: 'Ξ', chartVar: '--at-chart-2', name: 'Ethereum', sym: 'ETH', amount: '−2.0000', amountColor: undefined, price: '$3,512.00', value: '$7,024.00', fee: '$1.92', hash: '0x88e2…d335', date: 'Jun 25 · 09:30', status: 'Pending', statusKind: 'warning' },
  { type: 'Sell', typeKind: 'warning', glyph: '▲', chartVar: '--at-chart-5', name: 'Avalanche', sym: 'AVAX', amount: '−20.000', amountColor: undefined, price: '$38.10', value: '$762.00', fee: '$3.74', hash: '0x2fa7…4c08', date: 'Jun 24 · 15:55', status: 'Completed', statusKind: 'success' },
  { type: 'Receive', typeKind: 'success', glyph: '$', chartVar: '--at-chart-4', name: 'Tether', sym: 'USDT', amount: '+1,500.00', amountColor: 'var(--at-success-text)', price: '$1.00', value: '$1,500.00', fee: '$0.00', hash: '0xb19c…f661', date: 'Jun 23 · 08:02', status: 'Failed', statusKind: 'danger' },
  { type: 'Buy', typeKind: 'info', glyph: '₿', chartVar: '--at-chart-1', name: 'Bitcoin', sym: 'BTC', amount: '+0.0500', amountColor: 'var(--at-success-text)', price: '$66,420', value: '$3,321.00', fee: '$16.28', hash: '0x6e0f…8d44', date: 'Jun 22 · 14:18', status: 'Completed', statusKind: 'success' },
  { type: 'Send', typeKind: 'danger', glyph: '◎', chartVar: '--at-chart-3', name: 'Solana', sym: 'SOL', amount: '−8.0000', amountColor: undefined, price: '$181.40', value: '$1,451.20', fee: '$0.06', hash: '0xa3d7…b220', date: 'Jun 21 · 22:47', status: 'Completed', statusKind: 'success' },
  { type: 'Receive', typeKind: 'success', glyph: 'A', chartVar: '--at-chart-4', name: 'Cardano', sym: 'ADA', amount: '+4,200.00', amountColor: 'var(--at-success-text)', price: '$0.4480', value: '$1,881.60', fee: '$0.00', hash: '0xc92f…7e50', date: 'Jun 20 · 10:33', status: 'Completed', statusKind: 'success' },
  { type: 'Sell', typeKind: 'warning', glyph: 'Ξ', chartVar: '--at-chart-2', name: 'Ethereum', sym: 'ETH', amount: '−0.7500', amountColor: undefined, price: '$3,480.00', value: '$2,610.00', fee: '$1.28', hash: '0x05ba…88d1', date: 'Jun 19 · 17:09', status: 'Pending', statusKind: 'warning' },
  { type: 'Stake', typeKind: 'accent', glyph: '◎', chartVar: '--at-chart-3', name: 'Solana', sym: 'SOL', amount: '−30.000', amountColor: undefined, price: '$179.80', value: '$5,394.00', fee: '$0.04', hash: '0x7d3e…2b47', date: 'Jun 18 · 12:55', status: 'Completed', statusKind: 'success' },
  { type: 'Buy', typeKind: 'info', glyph: '▲', chartVar: '--at-chart-5', name: 'Avalanche', sym: 'AVAX', amount: '+40.000', amountColor: 'var(--at-success-text)', price: '$39.40', value: '$1,576.00', fee: '$7.72', hash: '0xe14a…3c99', date: 'Jun 17 · 09:01', status: 'Completed', statusKind: 'success' },
];

export default function Transactions(): React.JSX.Element {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return TXNS;
    return TXNS.filter(
      (t) => t.name.toLowerCase().includes(needle) || t.sym.toLowerCase().includes(needle) || t.hash.toLowerCase().includes(needle),
    );
  }, [q]);

  return (
    <>
      <PageHead
        title="Transactions"
        subtitle="Every wallet movement — buys, sells, sends, receives and staking."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Action</button>
            <button className="at-btn at-btn--primary at-press">Primary</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        {/* KPI row */}
        <div className="at-row">
          {KPIS.map((k) => (
            <div key={k.label} className="at-col-3 at-card at-kpi">
              <div className="at-kpi__label">{k.label}</div>
              <div className="at-kpi__value" style={k.valueStyle ?? undefined}>{k.value}</div>
              <div className={`at-kpi__delta at-kpi__delta--${k.dir}`}>{k.delta}</div>
            </div>
          ))}
        </div>

        {/* All Transactions table */}
        <div className="at-card" style={{ overflow: 'hidden' }}>
          <div
            className="at-chart__head"
            style={{
              padding: 'var(--at-space-5)',
              paddingBlockEnd: 'var(--at-space-3)',
              flexWrap: 'wrap',
              gap: 'var(--at-space-3)',
            }}
          >
            <div>
              <div className="at-chart__title">All Transactions</div>
              <div className="at-eyebrow at-num">12 of 248 shown</div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-2)', flexWrap: 'wrap' }}>
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
                <input
                  type="text"
                  placeholder="Search asset or hash…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', minWidth: 160 }}
                />
              </div>
              <select className="at-select">
                <option>All types</option>
                <option>Buy</option>
                <option>Sell</option>
                <option>Send</option>
                <option>Receive</option>
                <option>Stake</option>
              </select>
              <select className="at-select">
                <option>All statuses</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
            </div>
          </div>
          <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
            <table className="at-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Asset</th>
                  <th className="at-num">Amount</th>
                  <th className="at-num">Price</th>
                  <th className="at-num">Value</th>
                  <th className="at-num">Fee</th>
                  <th>Tx Hash</th>
                  <th className="at-num">Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.hash}>
                    <td><span className={`at-badge at-badge--${t.typeKind}`}>{t.type}</span></td>
                    <td>
                      <div className="at-cluster">
                        <div
                          className="at-avatar at-avatar--xs"
                          style={{
                            background: `color-mix(in oklab, var(${t.chartVar}) 18%, transparent)`,
                            color: `var(${t.chartVar}-text)`,
                          }}
                        >
                          {t.glyph}
                        </div>
                        <span className="at-text-strong">
                          {t.name} <span className="at-text-muted" style={{ fontWeight: 400 }}>{t.sym}</span>
                        </span>
                      </div>
                    </td>
                    <td className="at-num" style={t.amountColor ? { color: t.amountColor } : undefined}>{t.amount}</td>
                    <td className="at-num at-text-muted">{t.price}</td>
                    <td className="at-num at-text-strong">{t.value}</td>
                    <td className="at-num at-text-muted">{t.fee}</td>
                    <td>
                      <code className="at-num at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{t.hash}</code>
                    </td>
                    <td className="at-num at-text-muted">{t.date}</td>
                    <td><span className={`at-badge at-badge--${t.statusKind}`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="at-cluster"
            style={{
              justifyContent: 'space-between',
              padding: 'var(--at-space-4) var(--at-space-5)',
              flexWrap: 'wrap',
              gap: 'var(--at-space-3)',
            }}
          >
            <span className="at-text-muted at-num" style={{ fontSize: 'var(--at-text-xs)' }}>
              Showing 12 of 248 transactions
            </span>
            <div className="at-pagination">
              <button className="at-pagination__btn is-active">1</button>
              <button className="at-pagination__btn">2</button>
              <button className="at-pagination__btn">3</button>
              <button className="at-pagination__btn">21</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
