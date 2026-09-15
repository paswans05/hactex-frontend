/*
 * Hactex React — CRM Leads.
 * Built with the shared component classes, inline token
 * styles, and demo figures.
 */
import { PageHead } from '../../components/shell/PageHead';

const KPIS = [
  { label: 'New', value: '24', delta: '▲ 18%' },
  { label: 'Contacted', value: '17', delta: '▲ 9%' },
  { label: 'Qualified', value: '11', delta: '▲ 12%' },
  { label: 'Converted', value: '7', delta: '▲ 6%' },
];

const LEADS = [
  { letter: 'J', name: 'Jordan Avery', bg: undefined, color: undefined, role: 'Ops Director · Vantage Retail', score: '92', source: 'Referral', status: 'Qualified', statusKind: 'success', assigned: 'Maya Lindqvist', assignedKind: '', date: 'Jun 26' },
  { letter: 'P', name: 'Priya Anand', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', role: 'Head of IT · Solstice Bank', score: '88', source: 'Website', status: 'Contacted', statusKind: 'info', assigned: 'Tomás Herrera', assignedKind: 'at-nowrap', date: 'Jun 25' },
  { letter: 'M', name: 'Marcus Webb', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', role: 'Founder · Tidal Apps', score: '81', source: 'Event', status: 'Qualified', statusKind: 'success', assigned: 'Ava Sutton', assignedKind: 'at-nowrap', date: 'Jun 24' },
  { letter: 'E', name: 'Elena Vasquez', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', role: 'VP Marketing · Brightpath', score: '76', source: 'Webinar', status: 'New', statusKind: 'neutral', assigned: 'Unassigned', assignedKind: 'at-text-muted', date: 'Jun 27' },
  { letter: 'T', name: 'Tobias Frank', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', role: 'CTO · Greycliff', score: '69', source: 'Cold outreach', status: 'Contacted', statusKind: 'info', assigned: 'Devon Okafor', assignedKind: 'at-nowrap', date: 'Jun 23' },
  { letter: 'H', name: 'Hana Suzuki', bg: undefined, color: undefined, role: 'Procurement · Kaiyo Trading', score: '64', source: 'Website', status: 'New', statusKind: 'neutral', assigned: 'Unassigned', assignedKind: 'at-text-muted', date: 'Jun 27' },
  { letter: 'L', name: 'Liam Doherty', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', role: 'Sales Lead · Foundry Co', score: '58', source: 'Paid ads', status: 'Contacted', statusKind: 'info', assigned: 'Ava Sutton', assignedKind: 'at-nowrap', date: 'Jun 22' },
  { letter: 'N', name: 'Nina Kovač', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', role: 'Operations · Adriatic Foods', score: '52', source: 'Referral', status: 'Qualified', statusKind: 'success', assigned: 'Maya Lindqvist', assignedKind: 'at-nowrap', date: 'Jun 21' },
];

export default function Leads(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Leads"
        subtitle="59 inbound leads this month — 31% qualification rate, avg score 68."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Export</button>
            <button className="at-btn at-btn--primary at-press">New lead</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {KPIS.map((k) => (
            <div key={k.label} className="at-col-3 at-card at-kpi">
              <div className="at-kpi__label">{k.label}</div>
              <div className="at-kpi__value">{k.value}</div>
              <div className="at-kpi__delta at-kpi__delta--up">{k.delta}</div>
            </div>
          ))}
        </div>

        <div className="at-row" style={{ alignItems: 'flex-start' }}>
          <div className="at-col-8 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div>
                <div className="at-chart__title">All Leads</div>
                <div className="at-eyebrow">12 of 59 shown</div>
              </div>
              <select className="at-select" style={{ minWidth: 150 }}>
                <option>All sources</option>
                <option>Website</option>
                <option>Referral</option>
                <option>Cold outreach</option>
                <option>Event</option>
                <option>Paid ads</option>
                <option>Webinar</option>
              </select>
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
                    <th className="at-nowrap">Lead</th>
                    <th className="at-num">Score</th>
                    <th>Source</th>
                    <th>Status</th>
                    <th>Assigned</th>
                    <th className="at-nowrap">Added</th>
                  </tr>
                </thead>
                <tbody>
                  {LEADS.map((l) => (
                    <tr key={l.name}>
                      <td>
                        <div className="at-cluster">
                          <div
                            className="at-avatar at-avatar--sm"
                            style={{
                              ...(l.bg ? { background: l.bg, color: l.color } : null),
                              ...(l.color ? { color: l.color } : null),
                            }}
                          >
                            {l.letter}
                          </div>
                          <div>
                            <div className="at-text-strong at-nowrap">{l.name}</div>
                            <div className="at-text-muted at-nowrap" style={{ fontSize: 'var(--at-text-xs)' }}>
                              {l.role}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="at-num at-text-strong">{l.score}</td>
                      <td>{l.source}</td>
                      <td><span className={`at-badge at-badge--${l.statusKind}`}>{l.status}</span></td>
                      <td className={l.assignedKind}>{l.assigned}</td>
                      <td className="at-num at-nowrap">{l.date}</td>
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
                Showing 1–8 of 59
              </span>
              <div className="at-pagination">
                <button className="at-pagination__btn is-active">1</button>
                <button className="at-pagination__btn">2</button>
                <button className="at-pagination__btn">3</button>
              </div>
            </div>
          </div>

          <div
            className="at-col-4 at-card at-stack"
            style={{ padding: 'var(--at-space-5)', gap: 'var(--at-space-4)' }}
          >
            <div>
              <div className="at-chart__title">New lead</div>
              <div className="at-eyebrow">Capture a lead in seconds</div>
            </div>
            <label className="at-form-label">Full name</label>
            <input className="at-input" type="text" placeholder="Jordan Avery" />
            <label className="at-form-label">Company</label>
            <input className="at-input" type="text" placeholder="Acme Inc." />
            <label className="at-form-label">Email</label>
            <input className="at-input" type="email" placeholder="jordan@acme.com" />
            <label className="at-form-label">Source</label>
            <select className="at-select">
              <option>Website</option>
              <option>Referral</option>
              <option>Cold outreach</option>
              <option>Event</option>
              <option>Paid ads</option>
              <option>Webinar</option>
            </select>
            <label className="at-form-label">Assign to</label>
            <select className="at-select">
              <option>Unassigned</option>
              <option>Maya Lindqvist</option>
              <option>Devon Okafor</option>
              <option>Ava Sutton</option>
            </select>
            <button className="at-btn at-btn--primary at-btn--block at-press">Create lead</button>
          </div>
        </div>
      </div>
    </>
  );
}
