/*
 * Hactex React — CRM Customers (Contacts).
 * Built with the shared component classes, inline token
 * styles, and demo figures. Search input is presentational.
 */
import { PageHead } from '../../components/shell/PageHead';

const CONTACTS = [
  { letter: 'M', name: 'Maya Lindqvist', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', role: 'CFO', company: 'Northwind Labs', email: 'maya.l@northwind.io', lifecycle: 'Customer', lifecycleKind: 'success', last: 'Replied · 2h' },
  { letter: 'T', name: 'Tomás Herrera', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', role: 'VP Sales', company: 'Brightline Capital', email: 'tomas@brightline.co', lifecycle: 'Opportunity', lifecycleKind: 'info', last: 'Call · 5h' },
  { letter: 'A', name: 'Ava Sutton', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', role: 'Head of Ops', company: 'Crate & Co', email: 'ava@crateco.com', lifecycle: 'Customer', lifecycleKind: 'success', last: 'Demo · 1d' },
  { letter: 'N', name: 'Dr. Nadia Haddad', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', role: 'Procurement Lead', company: 'Meridian Health', email: 'n.haddad@meridianhealth.org', lifecycle: 'Opportunity', lifecycleKind: 'info', last: 'Note · 1d' },
  { letter: 'L', name: 'Lena Brandt', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', role: 'Creative Director', company: 'Studioform', email: 'lena@studioform.de', lifecycle: 'Lead', lifecycleKind: 'neutral', last: 'Opened · 2d' },
  { letter: 'D', name: 'Daniel Cho', bg: undefined, color: undefined, role: 'Product Lead', company: 'Loop Robotics', email: 'daniel@looprobotics.com', lifecycle: 'Customer', lifecycleKind: 'success', last: 'Won · 3d' },
  { letter: 'G', name: 'Greta Hoffmann', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', role: 'Buyer', company: 'Pulse Media', email: 'greta.h@pulse.media', lifecycle: 'Subscriber', lifecycleKind: 'accent', last: 'Form · 4d' },
  { letter: 'H', name: 'Henry Whitlock', bg: undefined, color: undefined, role: 'Procurement', company: 'Harbor Freight Co', email: 'henry@harborfreight.co', lifecycle: 'Opportunity', lifecycleKind: 'info', last: 'Call · 5d' },
];

export default function Customers(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Contacts"
        subtitle="12 people across 128 accounts — 42 active this week."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Import</button>
            <button className="at-btn at-btn--primary at-press">New contact</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row" style={{ alignItems: 'flex-start' }}>
          <div className="at-col-8 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div>
                <div className="at-chart__title">All Contacts</div>
                <div className="at-eyebrow">12 of 12 shown</div>
              </div>
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
                <span>Search name or company…</span>
              </div>
            </div>
            <div
              className="at-table-wrap"
              style={{
                border: 'none',
                borderRadius: 0,
                borderBlockStart: '2px solid var(--at-ink)',
              }}
            >
              <table className="at-table">
                <thead>
                  <tr>
                    <th className="at-nowrap">Name</th>
                    <th className="at-nowrap">Company</th>
                    <th>Email</th>
                    <th>Lifecycle</th>
                    <th className="at-nowrap">Last</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTACTS.map((c) => (
                    <tr key={c.name}>
                      <td>
                        <div className="at-cluster">
                          <div
                            className="at-avatar at-avatar--sm"
                            style={{
                              ...(c.bg ? { background: c.bg, color: c.color } : null),
                              ...(c.color ? { color: c.color } : null),
                            }}
                          >
                            {c.letter}
                          </div>
                          <div>
                            <div className="at-text-strong at-nowrap">{c.name}</div>
                            <div className="at-text-muted at-nowrap" style={{ fontSize: 'var(--at-text-xs)' }}>
                              {c.role}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="at-nowrap">{c.company}</td>
                      <td className="at-text-muted">{c.email}</td>
                      <td><span className={`at-badge at-badge--${c.lifecycleKind}`}>{c.lifecycle}</span></td>
                      <td className="at-nowrap">{c.last}</td>
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
              }}
            >
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                Showing 1–8 of 12
              </span>
              <div className="at-pagination">
                <button className="at-pagination__btn is-active">1</button>
                <button className="at-pagination__btn">2</button>
              </div>
            </div>
          </div>

          <div
            className="at-col-4 at-card at-stack"
            style={{ padding: 'var(--at-space-5)', gap: 'var(--at-space-4)' }}
          >
            <div>
              <div className="at-chart__title">New contact</div>
              <div className="at-eyebrow">Add someone to your CRM</div>
            </div>
            <div>
              <label className="at-form-label">First name</label>
              <input className="at-input" type="text" placeholder="Jane" />
            </div>
            <div>
              <label className="at-form-label">Last name</label>
              <input className="at-input" type="text" placeholder="Cooper" />
            </div>
            <div>
              <label className="at-form-label">Email</label>
              <input className="at-input" type="email" placeholder="jane@northwind.io" />
            </div>
            <div>
              <label className="at-form-label">Company</label>
              <input className="at-input" type="text" placeholder="Northwind Labs" />
            </div>
            <div>
              <label className="at-form-label">Lifecycle</label>
              <select className="at-select">
                <option>Lead</option>
                <option>Opportunity</option>
                <option>Customer</option>
                <option>Subscriber</option>
              </select>
            </div>
            <button className="at-btn at-btn--primary at-btn--block at-press">
              Create contact
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
