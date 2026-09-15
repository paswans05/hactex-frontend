/*
 * Hactex React — eCommerce Orders.
 * Built with the shared component classes, inline
 * token styles, and demo figures. The search box filters orders by id/customer
 * via useState + useMemo; the status segment is presentational.
 */
import { useMemo, useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const KPIS = [
  { label: 'TOTAL ORDERS', value: '1,284', delta: '▲ 8.6%', dir: 'up' },
  { label: 'REVENUE', value: '$264,910', delta: '▲ 12.1%', dir: 'up' },
  { label: 'AVG. ORDER VALUE', value: '$206.31', delta: '▲ 2.4%', dir: 'up' },
  { label: 'FULFILLED RATE', value: '94.2%', delta: '▼ 1.3%', dir: 'down' },
];

const ORDERS = [
  { id: '#TX-10241', letter: 'J', name: 'Jacob Smith', bg: undefined, color: undefined, date: 'Nov 6, 2025', method: 'Visa •• 4242', amount: '$249.00', status: 'Paid', statusKind: 'success' },
  { id: '#TX-10240', letter: 'E', name: 'Emma Lee', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', date: 'Nov 5, 2025', method: 'PayPal', amount: '$399.00', status: 'Pending', statusKind: 'warning' },
  { id: '#TX-10239', letter: 'O', name: 'Olivia Brown', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', date: 'Nov 4, 2025', method: 'Mastercard •• 8810', amount: '$199.00', status: 'Refunded', statusKind: 'danger' },
  { id: '#TX-10238', letter: 'N', name: 'Noah Wilson', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', date: 'Nov 4, 2025', method: 'Visa •• 1192', amount: '$149.00', status: 'Paid', statusKind: 'success' },
  { id: '#TX-10237', letter: 'A', name: 'Ava Martinez', bg: undefined, color: undefined, date: 'Nov 3, 2025', method: 'Apple Pay', amount: '$320.00', status: 'Paid', statusKind: 'success' },
];

const EYE_PATH = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />';

export default function Orders(): React.JSX.Element {
  const [q, setQ] = useState('');
  const filtered = useMemo(
    () => ORDERS.filter((o) => `${o.id} ${o.name}`.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <>
      <PageHead
        title="Orders"
        subtitle="All customer orders, filterable by status."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Export CSV</button>
            <a href="#" className="at-btn at-btn--primary at-press">+ New Order</a>
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

        {/* Filter bar */}
        <div className="at-card at-cluster" style={{ padding: 'var(--at-space-5)', alignItems: 'center' }}>
          <div className="at-search" style={{ flex: '1 1 240px', height: 'var(--at-control-sm)', boxShadow: 'none' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search orders…"
              style={{ flex: 1, border: 'none', background: 'transparent', font: 'inherit', color: 'inherit', outline: 'none', minWidth: 0 }}
            />
          </div>
          <div className="at-segment">
            <button className="at-segment__btn is-active">All</button>
            <button className="at-segment__btn">Paid</button>
            <button className="at-segment__btn">Pending</button>
            <button className="at-segment__btn">Refunded</button>
          </div>
        </div>

        {/* Orders table */}
        <div className="at-card" style={{ overflow: 'hidden' }}>
          <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
            <table className="at-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Method</th>
                  <th className="at-num">Amount</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id}>
                    <td className="at-mono">{o.id}</td>
                    <td>
                      <div className="at-cluster">
                        <div className="at-avatar at-avatar--sm" style={{ ...(o.bg ? { background: o.bg, color: o.color } : null), ...(o.color ? { color: o.color } : null) }}>{o.letter}</div>
                        <span className="at-text-strong">{o.name}</span>
                      </div>
                    </td>
                    <td>{o.date}</td>
                    <td>{o.method}</td>
                    <td className="at-num">{o.amount}</td>
                    <td><span className={`at-badge at-badge--${o.statusKind}`}>{o.status}</span></td>
                    <td>
                      <a href="#" className="at-icon-btn" aria-label="View">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }} dangerouslySetInnerHTML={{ __html: EYE_PATH }} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
          <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
            Showing 1–{filtered.length} of 1,847 orders
          </span>
          <div className="at-pagination">
            <button className="at-pagination__btn" aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className="at-pagination__btn is-active">1</button>
            <button className="at-pagination__btn">2</button>
            <button className="at-pagination__btn">3</button>
            <span style={{ padding: '0 4px', color: 'var(--at-text-muted)' }}>…</span>
            <button className="at-pagination__btn">370</button>
            <button className="at-pagination__btn" aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
