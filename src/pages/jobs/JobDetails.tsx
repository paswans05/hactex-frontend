/*
 * Hactex React — Job Details (jobs/job-details).
 * Header card, full job
 * description, apply sidebar, company card, and at-a-glance facts.
 */
import { PageHead } from '../../components/shell/PageHead';

const RESPONSIBILITIES = [
  "Lead the design of core workspace surfaces — navigation, dashboards, and the token-driven theming system.",
  "Run discovery — interviews, journey mapping, and concept testing — and turn insight into shippable bets.",
  "Contribute to and steward the design system, ensuring WCAG 2.2 AA across light and dark themes.",
  "Mentor two mid-level designers and raise the craft bar through critique and pairing.",
];

const REQUIREMENTS = [
  { strong: '6+ years', text: ' designing complex SaaS or developer products, with a portfolio that shows shipped work.' },
  { strong: null, html: 'Fluency in ', emphasis: 'Figma', text: ', component-driven design, and design-token systems.' },
  { strong: null, text: 'A real accessibility practice — you can reason about contrast, focus order, and semantics.' },
  { strong: null, text: 'Comfortable working async across European time zones with strong written communication.' },
];

const SKILLS = ['Design Systems', 'Figma', 'Accessibility', 'Prototyping', 'UX Research', 'Design Tokens'];

const BENEFITS = [
  { badge: '★', kind: 'success', text: 'Fully remote, async-first' },
  { badge: '$', kind: 'info', text: 'Equity + annual bonus' },
  { badge: '◷', kind: 'neutral', text: '30 days paid leave' },
  { badge: '✎', kind: 'warning', text: '$2K yearly learning budget' },
];

const SIMILAR = [
  { letter: 'U', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', title: 'UX Research Lead', company: 'Northwind Labs · London, UK', salary: '$105K – $135K' },
  { letter: 'D', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', title: 'Design Systems Engineer', company: 'Helios Cloud · Remote (EU)', salary: '$120K – $150K' },
  { letter: 'P', bg: 'var(--at-warning)', color: 'var(--at-on-warning)', title: 'Senior Product Manager', company: 'Vela Systems · Berlin, DE', salary: '$110K – $140K' },
];

const BULLET_STYLE = {
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  background: 'var(--at-text-muted)',
} as const;

export default function JobDetails(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Senior Product Designer"
        subtitle="Northwind Labs · Design · Posted Jun 24, 2026 · 38 applicants."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">All jobs</button>
            <button className="at-btn at-btn--outline at-press">Save</button>
            <button className="at-btn at-btn--primary at-press">Apply now</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        {/* Header card */}
        <div
          className="at-card at-cluster"
          style={{ padding: 'var(--at-space-5)', gap: 'var(--at-space-5)', alignItems: 'flex-start' }}
        >
          <div className="at-avatar at-avatar--xl" style={{ background: 'var(--at-secondary)', color: 'var(--at-on-secondary)' }}>N</div>
          <div style={{ flex: '1 1 auto' }}>
            <h2 className="at-page-head__title" style={{ margin: 0 }}>Senior Product Designer</h2>
            <div
              className="at-cluster"
              style={{ gap: 'var(--at-space-3)', marginBlockStart: 'var(--at-space-2)' }}
            >
              <span className="at-text-strong">Northwind Labs</span>
              <span className="at-badge at-badge--success">Actively hiring</span>
            </div>
          </div>
        </div>

        <div className="at-row" style={{ alignItems: 'flex-start' }}>
          {/* Main column */}
          <div className="at-col-8 at-stack" style={{ gap: 'var(--at-space-5)' }}>
            <div
              className="at-card at-stack"
              style={{ padding: 'var(--at-space-5)', gap: 'var(--at-space-5)' }}
            >
              <div>
                <h3 className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>About the role</h3>
                <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', lineHeight: 1.7 }}>
                  We're looking for a Senior Product Designer to shape the next generation of
                  Northwind's design platform. You'll own end-to-end product flows — from early
                  discovery and prototyping to polished, accessible production UI — partnering
                  daily with PMs and engineers across the Surface team. This is a high-ownership
                  role where your design decisions ship to 40,000+ teams.
                </p>
              </div>

              <div>
                <h3 className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>What you'll do</h3>
                <div className="at-stack" style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-2)' }}>
                  {RESPONSIBILITIES.map((r) => (
                    <div key={r} className="at-cluster">
                      <span className="at-badge at-badge--success">✓</span>
                      <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>Requirements</h3>
                <div className="at-stack" style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-2)' }}>
                  {REQUIREMENTS.map((req, i) => (
                    <div key={i} className="at-cluster">
                      <span style={BULLET_STYLE} />
                      <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                        {req.strong && <b className="at-text-strong">{req.strong}</b>}
                        {req.strong && req.text}
                        {!req.strong && req.html}
                        {!req.strong && req.emphasis && <b className="at-text-strong">{req.emphasis}</b>}
                        {!req.strong && req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>Skills</h3>
                <div className="at-cluster" style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-2)' }}>
                  {SKILLS.map((s) => (
                    <span key={s} className="at-badge at-badge--accent">{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>Benefits &amp; perks</h3>
                <div className="at-row" style={{ gap: 'var(--at-space-3)', marginBlockStart: 'var(--at-space-2)' }}>
                  {BENEFITS.map((b) => (
                    <div key={b.text} className="at-col-6 at-cluster">
                      <span className={`at-badge at-badge--${b.kind}`}>{b.badge}</span>
                      <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Similar roles */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">Similar roles</div>
                <button className="at-btn at-btn--ghost at-btn--sm">View all</button>
              </div>
              <div className="at-list">
                {SIMILAR.map((s) => (
                  <div key={s.title} className="at-list__item">
                    <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                      <div className="at-cluster">
                        <div
                          className="at-avatar at-avatar--sm"
                          style={{ background: s.bg, color: s.color, ...(s.color ? { color: s.color } : {}) }}
                        >
                          {s.letter}
                        </div>
                        <div>
                          <div className="at-text-strong">{s.title}</div>
                          <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                            {s.company}
                          </div>
                        </div>
                      </div>
                      <span className="at-text-strong">{s.salary}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar column */}
          <div className="at-col-4 at-stack" style={{ gap: 'var(--at-space-5)' }}>
            {/* Apply card */}
            <div
              className="at-card at-stack"
              style={{
                padding: 'var(--at-space-5)',
                gap: 'var(--at-space-3)',
                borderBlockStart: '4px solid var(--at-accent)',
              }}
            >
              <div className="at-chart__title">Apply — Senior Product Designer</div>
              <div>
                <div className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>$95K – $120K</div>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                  Base salary · per year
                </div>
              </div>
              <div className="at-divider"></div>
              <div>
                <div
                  className="at-cluster"
                  style={{ justifyContent: 'space-between', marginBlockEnd: 'var(--at-space-1)' }}
                >
                  <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>Applicants</span>
                  <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>38 / 60</span>
                </div>
                <div className="at-progress">
                  <div className="at-progress__bar" style={{ width: '63%' }} />
                </div>
              </div>
              <button className="at-btn at-btn--primary at-btn--block at-press">Apply for this job</button>
              <button className="at-btn at-btn--outline at-btn--block at-press">Save for later</button>
            </div>

            {/* About company */}
            <div className="at-card at-stack" style={{ padding: 'var(--at-space-5)', gap: 'var(--at-space-4)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">About Northwind Labs</div>
              </div>
              <div className="at-cluster">
                <div className="at-avatar" style={{ background: 'var(--at-secondary)', color: 'var(--at-on-secondary)' }}>N</div>
                <div>
                  <div className="at-text-strong">Northwind Labs</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                    Developer tools · Series B
                  </div>
                </div>
              </div>
              <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', lineHeight: 1.6 }}>
                Northwind builds the workspace platform trusted by modern product teams.
                Remote-first, 140 people across 18 countries.
              </p>
              <div className="at-row">
                <div
                  className="at-col-6 at-cluster"
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 'var(--at-space-3)',
                    border: '1px solid var(--at-ink)',
                  }}
                >
                  <div className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>140</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Employees</div>
                </div>
                <div
                  className="at-col-6 at-cluster"
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 'var(--at-space-3)',
                    border: '1px solid var(--at-ink)',
                  }}
                >
                  <div className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>12</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Open roles</div>
                </div>
              </div>
              <button className="at-btn at-btn--outline at-btn--block at-press">View company profile</button>
            </div>

            {/* At a glance */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">At a glance</div>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-3)', fontSize: 'var(--at-text-sm)' }}>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Job ID</span>
                  <span className="at-text-strong">JOB-120</span>
                </div>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Posted</span>
                  <span className="at-text-strong">Jun 24, 2026</span>
                </div>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Closes</span>
                  <span className="at-text-strong">Jul 22, 2026</span>
                </div>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Visa sponsorship</span>
                  <span className="at-badge at-badge--success">Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
