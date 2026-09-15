/*
 * Hactex React — eCommerce Products.
 * Built with the shared component classes, inline
 * token styles, and demo figures. The search box filters the products table by
 * name via useState + useMemo; the filter sidebar and segment are presentational.
 */
import { useMemo, useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const CATEGORIES = [
  { name: 'Lighting', count: 34 },
  { name: 'Desk', count: 52 },
  { name: 'Drinkware', count: 28 },
  { name: 'Stationery', count: 46 },
  { name: 'Tech accessories', count: 38 },
];

const PRODUCTS = [
  { letter: 'A', name: 'Aperture Desk Lamp', bg: undefined, color: undefined, sku: 'APG-0001', category: 'Lighting', price: '$129.00', stock: 84, sales: 412, status: 'In stock', statusKind: 'success' },
  { letter: 'B', name: 'Brass Task Light', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', sku: 'APG-0008', category: 'Lighting', price: '$182.00', stock: 22, sales: 356, status: 'Bestseller', statusKind: 'accent' },
  { letter: 'M', name: 'Matte Ceramic Mug', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', sku: 'APG-0003', category: 'Drinkware', price: '$24.00', stock: 312, sales: 298, status: 'In stock', statusKind: 'success' },
  { letter: 'W', name: 'Walnut Monitor Riser', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', sku: 'APG-0004', category: 'Desk', price: '$96.00', stock: 41, sales: 241, status: 'In stock', statusKind: 'success' },
  { letter: 'C', name: 'Cork Desk Mat', bg: undefined, color: undefined, sku: 'APG-0007', category: 'Desk', price: '$38.00', stock: 0, sales: 142, status: 'Out of stock', statusKind: 'danger' },
  { letter: 'A', name: 'Anodized Bottle 750ml', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', sku: 'APG-0011', category: 'Drinkware', price: '$34.00', stock: 9, sales: 209, status: 'Low stock', statusKind: 'warning' },
];

const SORTS = ['Featured', 'Best-selling', 'Price: Low to High', 'Top-rated'];

export default function Products(): React.JSX.Element {
  const [q, setQ] = useState('');
  const filtered = useMemo(
    () => PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <>
      <PageHead
        title="Products"
        subtitle="Browse and manage products."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Action</button>
            <button className="at-btn at-btn--primary at-press">Primary</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* Filter sidebar */}
          <div className="at-col-3 at-card" style={{ padding: 'var(--at-space-5)', alignSelf: 'start' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Filters</div>
                <div className="at-eyebrow">Refine product list</div>
              </div>
              <button className="at-btn at-btn--ghost at-btn--sm">Clear</button>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div>
                <div className="at-form-label">Category</div>
                <div className="at-list">
                  {CATEGORIES.map((c) => (
                    <div key={c.name} className="at-list__item">
                      <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                        <span className="at-text-strong">{c.name}</span>
                        <span className="at-text-muted at-mono" style={{ fontSize: 'var(--at-text-xs)' }}>{c.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="at-cluster" style={{ justifyContent: 'space-between', marginBlockEnd: 'var(--at-space-2)' }}>
                  <span className="at-form-label" style={{ margin: 0 }}>Max price</span>
                  <span className="at-text-muted at-mono" style={{ fontSize: 'var(--at-text-xs)' }}>$0 – $250</span>
                </div>
                <div className="at-progress">
                  <div className="at-progress__bar" style={{ width: '80%' }} />
                </div>
              </div>
              <div>
                <div className="at-form-label">Availability</div>
                <label className="at-check"><input type="checkbox" defaultChecked /> In stock</label>
                <label className="at-check"><input type="checkbox" /> Low stock</label>
                <label className="at-check"><input type="checkbox" /> On sale</label>
              </div>
              <div>
                <div className="at-form-label">Rating</div>
                <label className="at-check"><input type="radio" name="rating" defaultChecked /> 4★ &amp; up</label>
                <label className="at-check"><input type="radio" name="rating" /> 3★ &amp; up</label>
              </div>
            </div>
          </div>

          {/* Table column */}
          <div className="at-col-9 at-stack" style={{ gap: 'var(--at-space-5)' }}>
            <div className="at-card at-cluster" style={{ padding: 'var(--at-space-5)', alignItems: 'center' }}>
              <div className="at-search" style={{ flex: '1 1 240px', boxShadow: 'none' }}>
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
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products…"
                  style={{ flex: 1, border: 'none', background: 'transparent', font: 'inherit', color: 'inherit', outline: 'none', minWidth: 0 }}
                />
              </div>
              <select className="at-select" style={{ maxWidth: 220 }}>
                {SORTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <div className="at-segment">
                <button className="at-segment__btn is-active">All</button>
                <button className="at-segment__btn">Active</button>
                <button className="at-segment__btn">Archived</button>
              </div>
            </div>

            <div className="at-card" style={{ overflow: 'hidden' }}>
              <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
                <table className="at-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>SKU</th>
                      <th>Category</th>
                      <th className="at-num">Price</th>
                      <th className="at-num">Stock</th>
                      <th className="at-num">Sales</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p) => (
                      <tr key={p.sku}>
                        <td>
                          <div className="at-cluster">
                            <div
                              className="at-avatar at-avatar--sm"
                              style={{ ...(p.bg ? { background: p.bg, color: p.color } : null), ...(p.color ? { color: p.color } : null) }}
                            >
                              {p.letter}
                            </div>
                            <span className="at-text-strong">{p.name}</span>
                          </div>
                        </td>
                        <td className="at-mono">{p.sku}</td>
                        <td>{p.category}</td>
                        <td className="at-num">{p.price}</td>
                        <td className="at-num">{p.stock}</td>
                        <td className="at-num">{p.sales}</td>
                        <td><span className={`at-badge at-badge--${p.statusKind}`}>{p.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                Showing 1–{filtered.length} of 248 products
              </span>
              <div className="at-pagination">
                <button className="at-pagination__btn is-active">1</button>
                <button className="at-pagination__btn">2</button>
                <button className="at-pagination__btn">3</button>
                <span style={{ padding: '0 4px', color: 'var(--at-text-muted)' }}>…</span>
                <button className="at-pagination__btn">42</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
