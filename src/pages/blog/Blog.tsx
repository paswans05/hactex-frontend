/*
 * Hactex React — Blog list (blog/blog).
 * Search/filter bar + table + pagination.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const SEGMENTS = ['All', 'Active', 'Archived'] as const;

const ROWS = [
  { av: 'A', bg: undefined, name: 'Item Alpha', cat: 'Category A', date: 'Nov 6, 2025', amount: '$1,240.00', status: 'Active', kind: 'success' },
  { av: 'B', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', name: 'Item Beta', cat: 'Category B', date: 'Nov 5, 2025', amount: '$3,890.00', status: 'Pending', kind: 'warning' },
  { av: 'G', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', name: 'Item Gamma', cat: 'Category A', date: 'Nov 4, 2025', amount: '$672.50', status: 'Failed', kind: 'danger' },
  { av: 'D', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', name: 'Item Delta', cat: 'Category C', date: 'Nov 3, 2025', amount: '$2,100.00', status: 'Active', kind: 'success' },
];

export default function Blog(): React.JSX.Element {
  const [seg, setSeg] = useState(0);
  return (
    <>
      <PageHead
        title="Blog"
        subtitle="Browse and manage blog."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Action</button>
            <button className="at-btn at-btn--primary at-press">Primary</button>
          </>
        }
      />
      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-card at-cluster" style={{ padding: 'var(--at-space-5)' }}>
          <div className="at-search" style={{ flex: '1 1 240px', boxShadow: 'none' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <span>Search blog…</span>
          </div>
          <div className="at-segment">
            {SEGMENTS.map((s, i) => (
              <button key={s} className={`at-segment__btn${seg === i ? ' is-active' : ''}`} onClick={() => setSeg(i)}>{s}</button>
            ))}
          </div>
        </div>
        <div className="at-card" style={{ overflow: 'hidden' }}>
          <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
            <table className="at-table">
              <thead><tr><th>Name</th><th>Category</th><th>Date</th><th className="at-num">Amount</th><th>Status</th></tr></thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.name}>
                    <td><div className="at-cluster"><div className="at-avatar at-avatar--sm" style={{ background: r.bg, color: r.color }}>{r.av}</div><span className="at-text-strong">{r.name}</span></div></td>
                    <td>{r.cat}</td>
                    <td>{r.date}</td>
                    <td className="at-num">{r.amount}</td>
                    <td><span className={`at-badge at-badge--${r.kind}`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
          <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>Showing 1–4 of 128</span>
          <div className="at-pagination">
            <button className="at-pagination__btn is-active">1</button>
            <button className="at-pagination__btn">2</button>
            <button className="at-pagination__btn">3</button>
          </div>
        </div>
      </div>
    </>
  );
}
