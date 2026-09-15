/*
 * Hactex React — eCommerce Customers.
 * Built with the shared component classes, inline
 * token styles, and demo figures. The search box filters customers by name/email
 * via useState + useMemo; the segment is presentational.
 */
import { useMemo, useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const KPIS = [
  { label: 'TOTAL CUSTOMERS', value: '5,914', delta: '▲ 6.2%', dir: 'up' },
  { label: 'NEW · 30 DAYS', value: '312', delta: '▲ 11.8%', dir: 'up' },
  { label: 'RETURNING RATE', value: '64.5%', delta: '▲ 3.4%', dir: 'up' },
  { label: 'AVG. LIFETIME VALUE', value: '$1,284', delta: '▼ 1.1%', dir: 'down' },
];

const CUSTOMERS = [
  { letter: 'C', name: 'Camila Rossi', email: 'camila.rossi@outlook.com', bg: undefined, color: undefined, location: 'São Paulo, BR', orders: 42, spent: '$8,914.50', ltv: '$11,480', last: 'Jun 24, 2026', status: 'VIP', statusKind: 'accent' },
  { letter: 'H', name: 'Henry Whitlock', email: 'h.whitlock@fastmail.com', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', location: 'Manchester, UK', orders: 18, spent: '$3,240.00', ltv: '$4,120', last: 'Jun 27, 2026', status: 'Active', statusKind: 'success' },
  { letter: 'A', name: 'Amelia Hart', email: 'amelia.hart@gmail.com', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', location: 'Portland, US', orders: 12, spent: '$2,186.75', ltv: '$2,980', last: 'Jun 27, 2026', status: 'Active', statusKind: 'success' },
  { letter: 'M', name: 'Marcus Lindqvist', email: 'm.lindqvist@telia.se', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', location: 'Stockholm, SE', orders: 27, spent: '$5,602.30', ltv: '$7,240', last: 'Jun 18, 2026', status: 'VIP', statusKind: 'accent' },
  { letter: 'P', name: 'Priya Nair', email: 'priya.nair@proton.me', bg: undefined, color: undefined, location: 'Austin, US', orders: 9, spent: '$1,148.00', ltv: '$1,560', last: 'Jun 25, 2026', status: 'Active', statusKind: 'success' },
  { letter: 'L', name: 'Lena Brandt', email: 'lena.brandt@web.de', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', location: 'Berlin, DE', orders: 2, spent: '$264.40', ltv: '$310', last: 'Jun 24, 2026', status: 'New', statusKind: 'info' },
  { letter: 'S', name: 'Sofia Marchetti', email: 's.marchetti@libero.it', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', location: 'Milan, IT', orders: 33, spent: '$6,740.00', ltv: '$8,910', last: 'Jun 22, 2026', status: 'VIP', statusKind: 'accent' },
];

export default function Customers(): React.JSX.Element {
  const [q, setQ] = useState('');
  const filtered = useMemo(
    () => CUSTOMERS.filter((c) => `${c.name} ${c.email}`.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <>
      <PageHead
        title="Customers"
        subtitle="Browse and manage customers."
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
              <div className="at-kpi__value">{k.value}</div>
              <div className={`at-kpi__delta at-kpi__delta--${k.dir}`}>{k.delta}</div>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div className="at-card at-cluster" style={{ padding: 'var(--at-space-5)', alignItems: 'center' }}>
          <div className="at-search" style={{ flex: '1 1 240px', boxShadow: 'none' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search customers…"
              style={{ flex: 1, border: 'none', background: 'transparent', font: 'inherit', color: 'inherit', outline: 'none', minWidth: 0 }}
            />
          </div>
          <div className="at-segment">
            <button className="at-segment__btn is-active">All</button>
            <button className="at-segment__btn">VIP</button>
            <button className="at-segment__btn">Active</button>
            <button className="at-segment__btn">New</button>
          </div>
        </div>

        {/* Customers table */}
        <div className="at-card" style={{ overflow: 'hidden' }}>
          <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
            <table className="at-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Location</th>
                  <th className="at-num">Orders</th>
                  <th className="at-num">Spent</th>
                  <th className="at-num">LTV</th>
                  <th>Last order</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.email}>
                    <td>
                      <div className="at-cluster">
                        <div className="at-avatar at-avatar--sm" style={{ ...(c.bg ? { background: c.bg, color: c.color } : null), ...(c.color ? { color: c.color } : null) }}>{c.letter}</div>
                        <div>
                          <div className="at-text-strong">{c.name}</div>
                          <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{c.location}</td>
                    <td className="at-num">{c.orders}</td>
                    <td className="at-num">{c.spent}</td>
                    <td className="at-num">{c.ltv}</td>
                    <td>{c.last}</td>
                    <td><span className={`at-badge at-badge--${c.statusKind}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
          <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
            Showing 1–{filtered.length} of 5,914 customers
          </span>
          <div className="at-pagination">
            <button className="at-pagination__btn is-active">1</button>
            <button className="at-pagination__btn">2</button>
            <button className="at-pagination__btn">3</button>
            <span style={{ padding: '0 4px', color: 'var(--at-text-muted)' }}>…</span>
            <button className="at-pagination__btn">845</button>
          </div>
        </div>
      </div>
    </>
  );
}
