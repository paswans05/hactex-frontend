/*
 * Hactex React — eCommerce Sellers.
 * Built with the shared component classes, inline
 * token styles, and demo figures. The search box filters sellers by store/owner
 * via useState + useMemo; the segment is presentational.
 */
import { useMemo, useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const KPIS = [
  { label: 'TOTAL SELLERS', value: '128', delta: '▲ 4.8%', dir: 'up' },
  { label: 'ACTIVE', value: '119', delta: '▲ 2.1%', dir: 'up' },
  { label: 'AVG. RATING', value: '4.6', delta: 'out of 5', dir: undefined },
  { label: 'TOTAL REVENUE', value: '$2.41M', delta: '▲ 11.3%', dir: 'up' },
];

const SELLERS = [
  { letter: 'L', store: 'Lumière Studio', bg: undefined, color: undefined, owner: 'Élise Moreau', category: 'Lighting', rating: '4.9 ★', products: 86, revenue: '$412,800', joined: 'Mar 2021', status: 'Active', statusKind: 'success' },
  { letter: 'N', store: 'Northwind Furniture', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', owner: 'Henrik Sørensen', category: 'Furniture', rating: '4.8 ★', products: 142, revenue: '$689,400', joined: 'Jan 2020', status: 'Active', statusKind: 'success' },
  { letter: 'C', store: 'Clayhouse Ceramics', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', owner: 'Mei-Ling Chen', category: 'Drinkware', rating: '4.7 ★', products: 54, revenue: '$248,600', joined: 'Sep 2021', status: 'Active', statusKind: 'success' },
  { letter: 'P', store: 'Paperleaf Goods', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', owner: 'Tobias Werner', category: 'Stationery', rating: '4.6 ★', products: 118, revenue: '$156,200', joined: 'Nov 2022', status: 'Active', statusKind: 'success' },
  { letter: 'F', store: 'Flaxen Textiles', bg: undefined, color: undefined, owner: 'Mateo Rossi', category: 'Textiles', rating: '4.4 ★', products: 64, revenue: '$132,400', joined: 'Jun 2026', status: 'Pending', statusKind: 'warning' },
  { letter: 'D', store: 'Driftwood Decor', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', owner: 'Camila Rossi', category: 'Furniture', rating: '4.2 ★', products: 88, revenue: '$97,800', joined: 'Aug 2023', status: 'Suspended', statusKind: 'danger' },
  { letter: 'I', store: 'Inkwell Press', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', owner: 'Devon Okafor', category: 'Stationery', rating: '4.7 ★', products: 96, revenue: '$211,900', joined: 'Dec 2020', status: 'Active', statusKind: 'success' },
];

export default function Sellers(): React.JSX.Element {
  const [q, setQ] = useState('');
  const filtered = useMemo(
    () => SELLERS.filter((s) => `${s.store} ${s.owner}`.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <>
      <PageHead
        title="Sellers"
        subtitle="Browse and manage sellers."
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
              placeholder="Search sellers…"
              style={{ flex: 1, border: 'none', background: 'transparent', font: 'inherit', color: 'inherit', outline: 'none', minWidth: 0 }}
            />
          </div>
          <div className="at-segment">
            <button className="at-segment__btn is-active">All</button>
            <button className="at-segment__btn">Active</button>
            <button className="at-segment__btn">Pending</button>
            <button className="at-segment__btn">Suspended</button>
          </div>
        </div>

        {/* Sellers table */}
        <div className="at-card" style={{ overflow: 'hidden' }}>
          <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
            <table className="at-table">
              <thead>
                <tr>
                  <th>Store</th>
                  <th>Owner</th>
                  <th>Category</th>
                  <th className="at-num">Rating</th>
                  <th className="at-num">Products</th>
                  <th className="at-num">Revenue</th>
                  <th>Joined</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.store}>
                    <td>
                      <div className="at-cluster">
                        <div className="at-avatar at-avatar--sm" style={{ ...(s.bg ? { background: s.bg, color: s.color } : null), ...(s.color ? { color: s.color } : null) }}>{s.letter}</div>
                        <span className="at-text-strong">{s.store}</span>
                      </div>
                    </td>
                    <td>{s.owner}</td>
                    <td>{s.category}</td>
                    <td className="at-num">{s.rating}</td>
                    <td className="at-num">{s.products}</td>
                    <td className="at-num">{s.revenue}</td>
                    <td>{s.joined}</td>
                    <td><span className={`at-badge at-badge--${s.statusKind}`}>{s.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
          <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
            Showing 1–{filtered.length} of 128 sellers
          </span>
          <div className="at-pagination">
            <button className="at-pagination__btn is-active">1</button>
            <button className="at-pagination__btn">2</button>
            <button className="at-pagination__btn">3</button>
            <span style={{ padding: '0 4px', color: 'var(--at-text-muted)' }}>…</span>
            <button className="at-pagination__btn">19</button>
          </div>
        </div>
      </div>
    </>
  );
}
