/*
 * Hactex React — CRM Deals.
 * Built with the shared component classes, inline token
 * styles, and demo figures. Segment + search bar are presentational.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const DEALS = [
  { letter: 'A', name: 'Item Alpha', bg: undefined, color: undefined, category: 'Category A', date: 'Nov 6, 2025', amount: '$1,240.00', status: 'Active', statusKind: 'success' },
  { letter: 'B', name: 'Item Beta', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', category: 'Category B', date: 'Nov 5, 2025', amount: '$3,890.00', status: 'Pending', statusKind: 'warning' },
  { letter: 'G', name: 'Item Gamma', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', category: 'Category A', date: 'Nov 4, 2025', amount: '$672.50', status: 'Failed', statusKind: 'danger' },
  { letter: 'D', name: 'Item Delta', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', category: 'Category C', date: 'Nov 3, 2025', amount: '$2,100.00', status: 'Active', statusKind: 'success' },
];

const TABS = ['All', 'Active', 'Archived'];

export default function Deals(): React.JSX.Element {
  const [tab, setTab] = useState(0);

  return (
    <>
      <PageHead
        title="Deals"
        subtitle="Browse and manage deals."
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
            <span>Search deals…</span>
          </div>
          <div className="at-segment">
            {TABS.map((t, i) => (
              <button
                key={t}
                className={`at-segment__btn${tab === i ? ' is-active' : ''}`}
                onClick={() => setTab(i)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="at-card" style={{ overflow: 'hidden' }}>
          <div className="at-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
            <table className="at-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th className="at-num">Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {DEALS.map((d) => (
                  <tr key={d.name}>
                    <td>
                      <div className="at-cluster">
                        <div
                          className="at-avatar at-avatar--sm"
                          style={{
                            ...(d.bg ? { background: d.bg, color: d.color } : null),
                            ...(d.color ? { color: d.color } : null),
                          }}
                        >
                          {d.letter}
                        </div>
                        <span className="at-text-strong">{d.name}</span>
                      </div>
                    </td>
                    <td>{d.category}</td>
                    <td>{d.date}</td>
                    <td className="at-num">{d.amount}</td>
                    <td><span className={`at-badge at-badge--${d.statusKind}`}>{d.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
          <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
            Showing 1–4 of 128
          </span>
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
