/*
 * Hactex React — eCommerce Invoices.
 * Built with the shared component classes, inline
 * token styles, and demo figures. The search box filters invoices by id/client
 * via useState + useMemo; the segment is presentational.
 */
import { useMemo, useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const KPIS = [
  { label: 'OUTSTANDING', value: '$42,180', delta: '▼ 5.4%', dir: 'down' },
  { label: 'OVERDUE', value: '$18,240', delta: '▼ 3 invoices', dir: 'down' },
  { label: 'PAID · 30 DAYS', value: '$128,940', delta: '▲ 9.1%', dir: 'up' },
  { label: 'DRAFTS', value: '5', delta: 'awaiting send', dir: undefined },
];

const INVOICES = [
  { id: '#INV-2026-0142', letter: 'R', client: 'Rossi Hactex Ltda.', bg: undefined, color: undefined, issued: 'Jun 24, 2026', due: 'Jul 08, 2026', amount: '$4,820.00', status: 'Unpaid', statusKind: 'warning' },
  { id: '#INV-2026-0141', letter: 'N', client: 'Northwind Furniture', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', issued: 'Jun 22, 2026', due: 'Jul 06, 2026', amount: '$12,640.00', status: 'Paid', statusKind: 'success' },
  { id: '#INV-2026-0140', letter: 'C', client: 'Clayhouse Ceramics', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', issued: 'Jun 18, 2026', due: 'Jun 25, 2026', amount: '$3,180.00', status: 'Overdue · 3d', statusKind: 'danger' },
  { id: '#INV-2026-0139', letter: 'V', client: 'Voltic Supply Co.', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', issued: 'Jun 15, 2026', due: 'Jun 29, 2026', amount: '$7,420.00', status: 'Paid', statusKind: 'success' },
  { id: '#INV-2026-0138', letter: 'P', client: 'Paperleaf Goods', bg: undefined, color: undefined, issued: 'Jun 12, 2026', due: 'Jun 19, 2026', amount: '$2,340.00', status: 'Overdue · 9d', statusKind: 'danger' },
  { id: '#INV-2026-0135', letter: 'S', client: 'Slate & Pine', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', issued: 'Jun 05, 2026', due: '—', amount: '$3,270.00', status: 'Draft', statusKind: 'neutral' },
  { id: '#INV-2026-0133', letter: 'L', client: 'Lumière Studio', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', issued: 'May 28, 2026', due: 'Jun 11, 2026', amount: '$6,120.00', status: 'Paid', statusKind: 'success' },
];

export default function Invoices(): React.JSX.Element {
  const [q, setQ] = useState('');
  const filtered = useMemo(
    () => INVOICES.filter((inv) => `${inv.id} ${inv.client}`.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <>
      <PageHead
        title="Invoices"
        subtitle="Browse and manage invoices."
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
              <div
                className={`at-kpi__delta${k.dir ? ` at-kpi__delta--${k.dir}` : ''}`}
                style={k.dir ? undefined : { color: 'var(--at-text-muted)' }}
              >
                {k.delta}
              </div>
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
              placeholder="Search invoices…"
              style={{ flex: 1, border: 'none', background: 'transparent', font: 'inherit', color: 'inherit', outline: 'none', minWidth: 0 }}
            />
          </div>
          <div className="at-segment">
            <button className="at-segment__btn is-active">All</button>
            <button className="at-segment__btn">Unpaid</button>
            <button className="at-segment__btn">Overdue</button>
            <button className="at-segment__btn">Paid</button>
          </div>
        </div>

        {/* Invoices table */}
        <div className="at-card" style={{ overflow: 'hidden' }}>
          <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
            <table className="at-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Client</th>
                  <th>Issued</th>
                  <th>Due</th>
                  <th className="at-num">Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv) => (
                  <tr key={inv.id}>
                    <td className="at-mono">{inv.id}</td>
                    <td>
                      <div className="at-cluster">
                        <div className="at-avatar at-avatar--sm" style={{ ...(inv.bg ? { background: inv.bg, color: inv.color } : null), ...(inv.color ? { color: inv.color } : null) }}>{inv.letter}</div>
                        <span className="at-text-strong">{inv.client}</span>
                      </div>
                    </td>
                    <td>{inv.issued}</td>
                    <td>{inv.due}</td>
                    <td className="at-num">{inv.amount}</td>
                    <td><span className={`at-badge at-badge--${inv.statusKind}`}>{inv.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
          <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
            Showing 1–{filtered.length} of 142 invoices
          </span>
          <div className="at-pagination">
            <button className="at-pagination__btn is-active">1</button>
            <button className="at-pagination__btn">2</button>
            <button className="at-pagination__btn">3</button>
            <span style={{ padding: '0 4px', color: 'var(--at-text-muted)' }}>…</span>
            <button className="at-pagination__btn">21</button>
          </div>
        </div>
      </div>
    </>
  );
}
