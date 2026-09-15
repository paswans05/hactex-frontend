/*
 * Hactex React — Data tables.
 * Built with the shared component classes, inline
 * token styles, and demo rows. Search filters across name/email/location; column
 * headers toggle sort asc/desc, all client-side via useState.
 */
import { useMemo, useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

type Status = 'Active' | 'Idle' | 'Churn' | 'New';

interface Row {
  letter: string;
  name: string;
  email: string;
  segment: string;
  segmentKind: string;
  location: string;
  orders: number;
  lifetime: number;
  last: string;
  status: Status;
  statusKind: string;
  bg?: string;
  color?: string;
}

const ROWS: Row[] = [
  { letter: 'C', name: 'Camila Rossi', email: 'camila.rossi@mailbox.test', segment: 'VIP', segmentKind: 'accent', location: 'Lisbon', orders: 18, lifetime: 6180, last: '3h ago', status: 'Active', statusKind: 'success' },
  { letter: 'O', name: 'Olivia Penrose', email: 'o.penrose@meadowmail.test', segment: 'VIP', segmentKind: 'accent', location: 'Bristol', orders: 21, lifetime: 5980, last: '12h ago', status: 'Active', statusKind: 'success', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)' },
  { letter: 'E', name: 'Erik Lindqvist', email: 'erik.l@ridgeline.test', segment: 'Wholesale', segmentKind: 'info', location: 'Malmö', orders: 24, lifetime: 5240, last: '2d ago', status: 'Active', statusKind: 'success', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)' },
  { letter: 'N', name: 'Nadia Haddad', email: 'nadia.h@harbor.test', segment: 'VIP', segmentKind: 'accent', location: 'Marseille', orders: 16, lifetime: 4720, last: '6h ago', status: 'Active', statusKind: 'success', bg: 'var(--at-accent)', color: 'var(--at-on-accent)' },
  { letter: 'Y', name: 'Yuki Tanaka', email: 'yuki.tanaka@brightmail.test', segment: 'Returning', segmentKind: 'neutral', location: 'Osaka', orders: 11, lifetime: 2870, last: '10h ago', status: 'Active', statusKind: 'success', bg: 'var(--at-success)', color: 'var(--at-on-success)' },
  { letter: 'S', name: 'Sofia Marchetti', email: 'sofia.m@harbor.test', segment: 'Returning', segmentKind: 'neutral', location: 'Milan', orders: 9, lifetime: 2110, last: '1d ago', status: 'Active', statusKind: 'success' },
  { letter: 'H', name: 'Henry Whitlock', email: 'h.whitlock@postoak.test', segment: 'Returning', segmentKind: 'neutral', location: 'Leeds', orders: 7, lifetime: 1840, last: '5h ago', status: 'Active', statusKind: 'success', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)' },
  { letter: 'R', name: 'Rahul Menon', email: 'rahul.menon@northstreet.test', segment: 'Returning', segmentKind: 'neutral', location: 'Pune', orders: 6, lifetime: 1490, last: '1d ago', status: 'Idle', statusKind: 'warning', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)' },
  { letter: 'G', name: 'Greta Hoffmann', email: 'greta.h@postoak.test', segment: 'Churn-risk', segmentKind: 'danger', location: 'Hamburg', orders: 4, lifetime: 640, last: '30d ago', status: 'Churn', statusKind: 'danger', bg: 'var(--at-danger)', color: 'var(--at-on-danger)' },
  { letter: 'M', name: 'Mateo Alvarez', email: 'mateo.a@mailbox.test', segment: 'New', segmentKind: 'lime', location: 'Bogotá', orders: 2, lifetime: 210, last: '2d ago', status: 'New', statusKind: 'info', bg: 'var(--at-accent)', color: 'var(--at-on-accent)' },
];

type SortKey = 'name' | 'email' | 'segment' | 'location' | 'orders' | 'lifetime' | 'last' | 'status';

const COLS: { key: SortKey; label: string; num?: boolean; init?: 'asc' | 'desc' }[] = [
  { key: 'name', label: 'Customer ↓' },
  { key: 'email', label: 'Email' },
  { key: 'segment', label: 'Segment ↑' },
  { key: 'location', label: 'Location' },
  { key: 'orders', label: 'Orders', num: true },
  { key: 'lifetime', label: 'Lifetime ↓', num: true, init: 'desc' },
  { key: 'last', label: 'Last order' },
  { key: 'status', label: 'Status' },
];

export default function DataTables(): React.JSX.Element {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('lifetime');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? ROWS.filter((r) =>
        [r.name, r.email, r.location].some((f) => f.toLowerCase().includes(q)),
      )
      : ROWS;
    const sorted = [...base].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      let cmp = 0;
      if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
      else cmp = String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return sorted;
  }, [query, sortKey, sortDir]);

  const toggleSort = (key: SortKey): void => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const arrowFor = (key: SortKey): string => {
    if (key !== sortKey) return '';
    return sortDir === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <>
      <PageHead
        title="Data Table"
        subtitle="A full-feature table — global search, sortable headers, per-page paging and status badges — all client-side."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Export</button>
            <button className="at-btn at-btn--primary at-press">Add customer</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-card" style={{ overflow: 'hidden' }}>
          <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
            <div>
              <div className="at-chart__title">Customers</div>
              <div className="at-eyebrow">
                {filtered.length} record{filtered.length === 1 ? '' : 's'} · sorted by{' '}
                {sortKey[0].toUpperCase()}
                {sortKey.slice(1)} ({sortDir})
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
              <div className="at-search" style={{ boxShadow: 'none' }}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: '14px', height: '14px' }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  className="at-input"
                  type="search"
                  placeholder="Search name, email, location…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ border: 'none', boxShadow: 'none', padding: 0 }}
                  aria-label="Search customers"
                />
              </div>
              <select className="at-select at-btn--sm" aria-label="Rows per page" defaultValue="10 / page">
                <option>10 / page</option>
                <option>25 / page</option>
                <option>50 / page</option>
              </select>
            </div>
          </div>
          <div
            className="at-table-wrap"
            style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}
          >
            <table className="at-table">
              <thead>
                <tr>
                  <th style={{ width: '38px' }}>
                    <input type="checkbox" aria-label="Select all" />
                  </th>
                  {COLS.map((c) => (
                    <th
                      key={c.key}
                      className={c.num ? 'at-num' : undefined}
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                      onClick={() => toggleSort(c.key)}
                    >
                      {c.label.replace(/\s*[↑↓]\s*$/, '')}
                      {arrowFor(c.key) || (c.init ? ` ${c.init === 'asc' ? '↑' : '↓'}` : '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.email}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div className="at-cluster">
                        <div
                          className="at-avatar at-avatar--sm"
                          style={r.bg ? { background: r.bg, color: r.color, ...(r.color ? { color: r.color } : {}) } : undefined}
                        >
                          {r.letter}
                        </div>
                        <span className="at-text-strong">{r.name}</span>
                      </div>
                    </td>
                    <td className="at-text-muted">{r.email}</td>
                    <td>
                      {/* Lime is the one segment tone light enough to need its
                          foreground named — the badge's own ink would sit at
                          about 2:1 on it. */}
                      <span
                        className={`at-badge at-badge--${r.segmentKind}`}
                        style={r.segmentKind === 'lime' ? { color: 'var(--at-text-strong)' } : undefined}
                      >
                        {r.segment}
                      </span>
                    </td>
                    <td>{r.location}</td>
                    <td className="at-num">{r.orders}</td>
                    <td className="at-num at-text-strong">${r.lifetime.toLocaleString()}</td>
                    <td className="at-text-muted">{r.last}</td>
                    <td>
                      <span className={`at-badge at-badge--${r.statusKind}`}>{r.status}</span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="at-text-muted" style={{ textAlign: 'center', padding: 'var(--at-space-5)' }}>
                      No customers match &quot;{query}&quot;.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div
            className="at-cluster"
            style={{
              justifyContent: 'space-between',
              padding: 'var(--at-space-4) var(--at-space-5)',
              borderBlockStart: '1px solid var(--at-ink)',
            }}
          >
            <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
              Showing 1–{filtered.length} of {ROWS.length}
            </span>
            <div className="at-pagination">
              <button className="at-pagination__btn">‹</button>
              <button className="at-pagination__btn is-active">1</button>
              <button className="at-pagination__btn">2</button>
              <button className="at-pagination__btn">›</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
