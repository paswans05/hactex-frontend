/*
 * Hactex React — Search Candidates (jobs/candidates).
 * Search bar, filter sidebar,
 * and candidate cards. The role/skill/name + location inputs drive a
 * useState/useMemo filter over the demo profiles.
 */
import { useMemo, useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

interface Candidate {
  id: number;
  letter: string;
  bg: string;
  color?: string;
  name: string;
  role: string;
  location: string;
  summary: string;
  skills: string[];
  rating: string;
  active: string;
  match: string; // "94"
}

const CANDIDATES: Candidate[] = [
  {
    id: 1,
    letter: 'E',
    bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)',
    name: 'Elena Mwangi',
    role: 'Senior Frontend Engineer',
    location: 'Nairobi, KE · Remote · 8 yrs exp',
    summary:
      "Builds accessible design-system layers for analytics products. Led the React migration for a 40-person engineering org.",
    skills: ['React', 'TypeScript', 'Design Systems', 'GraphQL'],
    rating: '★ 4.9',
    active: 'Active 2h ago',
    match: '94',
  },
  {
    id: 2,
    letter: 'P',
    bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)',
    name: 'Priya Nair',
    role: 'Staff Data Scientist',
    location: 'Remote · US · 11 yrs exp',
    summary:
      'Leads modeling for clinical-risk prediction. Mentors a small team, owns rigorous experiment design, and ships models that hold up in production.',
    skills: ['Python', 'ML', 'Causal Inference', 'SQL'],
    rating: '★ 5.0',
    active: 'Active 4h ago',
    match: '96',
  },
  {
    id: 3,
    letter: 'C',
    bg: 'var(--at-lime)',
    color: 'var(--at-on-lime)',
    name: 'Camila Rossi',
    role: 'Backend Engineer (Go)',
    location: 'São Paulo, BR · Remote · 6 yrs exp',
    summary:
      'Builds event-driven backends with clean APIs and thoughtful tests. Genuinely enjoys distributed-systems puzzles and pairing junior engineers up.',
    skills: ['Go', 'PostgreSQL', 'gRPC', 'Kafka'],
    rating: '★ 4.8',
    active: 'Active 1h ago',
    match: '89',
  },
  {
    id: 4,
    letter: 'T',
    bg: 'var(--at-warning)', color: 'var(--at-on-warning)',
    name: 'Theo Nakamura',
    role: 'DevOps Engineer',
    location: 'Remote · Global · 9 yrs exp',
    summary:
      'Keeps multi-region Kubernetes estates calm and cheap. Pragmatic about automation, allergic to snowflake infra, and a steady hand during incidents.',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Go'],
    rating: '★ 4.7',
    active: 'Active 5h ago',
    match: '88',
  },
];

const TOP_SKILLS = ['React · 1,204', 'Figma · 986', 'Python · 842', 'Kubernetes · 511', 'UX Research · 403'];
const AVAILABILITY = ['Immediate · 421', '2 weeks · 880', '1 month · 1,640', 'Passive · 5,479'];

export default function Candidates(): React.JSX.Element {
  const [q, setQ] = useState('');
  const [loc, setLoc] = useState('');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const place = loc.trim().toLowerCase();
    return CANDIDATES.filter((c) => {
      const matchesQ =
        !needle ||
        c.name.toLowerCase().includes(needle) ||
        c.role.toLowerCase().includes(needle) ||
        c.skills.some((s) => s.toLowerCase().includes(needle));
      const matchesLoc = !place || c.location.toLowerCase().includes(place);
      return matchesQ && matchesLoc;
    });
  }, [q, loc]);

  return (
    <>
      <PageHead
        title="Search Candidates"
        subtitle="8,420 profiles in your talent pool — 126 new this week, 38 shortlisted."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Shortlist (38)</button>
            <button className="at-btn at-btn--primary at-press">Bulk message</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        {/* Search bar */}
        <div className="at-card at-row" style={{ padding: 'var(--at-space-5)' }}>
          <div className="at-col-6">
            <label className="at-form-label">Role, skill or name</label>
            <input
              className="at-input"
              type="search"
              placeholder="e.g. React, Product Designer, Maya…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="at-col-4">
            <label className="at-form-label">Location</label>
            <input
              className="at-input"
              type="text"
              placeholder="City, country or Remote"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
            />
          </div>
          <div className="at-col-2" style={{ alignSelf: 'flex-end' }}>
            <button className="at-btn at-btn--primary at-btn--block at-press">Search</button>
          </div>
        </div>

        <div className="at-row" style={{ alignItems: 'flex-start' }}>
          {/* Filters sidebar */}
          <div
            className="at-col-3 at-card at-stack"
            style={{
              padding: 'var(--at-space-5)',
              gap: 'var(--at-space-4)',
              alignSelf: 'flex-start',
              position: 'sticky',
              top: 'var(--at-space-5)',
            }}
          >
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Filters</div>
              <button className="at-btn at-btn--ghost at-btn--sm">Reset</button>
            </div>
            <div>
              <div className="at-form-label">Top skills</div>
              <div className="at-stack" style={{ gap: 'var(--at-space-2)' }}>
                {TOP_SKILLS.map((s) => (
                  <label key={s} className="at-check">
                    <input type="checkbox" /> {s}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="at-form-label">Availability</div>
              <div className="at-stack" style={{ gap: 'var(--at-space-2)' }}>
                {AVAILABILITY.map((a) => (
                  <label key={a} className="at-check">
                    <input type="checkbox" /> {a}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-form-label" style={{ margin: 0 }}>Min. experience</span>
                <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>0+ yrs</span>
              </div>
              <div className="at-progress" style={{ marginBlockStart: 'var(--at-space-2)' }}>
                <div className="at-progress__bar" style={{ width: '5%' }} />
              </div>
            </div>
            <div>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-form-label" style={{ margin: 0 }}>Min. match score</span>
                <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>0%</span>
              </div>
              <div className="at-progress" style={{ marginBlockStart: 'var(--at-space-2)' }}>
                <div className="at-progress__bar" style={{ width: '5%' }} />
              </div>
            </div>
            <div>
              <label className="at-form-label">Preferred work mode</label>
              <select className="at-select">
                <option>Any mode</option>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
              </select>
            </div>
            <label className="at-check">
              <input type="checkbox" /> Open to work only
            </label>
          </div>

          {/* Results */}
          <div className="at-col-9 at-stack" style={{ gap: 'var(--at-space-4)' }}>
            <div
              className="at-cluster"
              style={{ justifyContent: 'space-between', padding: '0 var(--at-space-1)' }}
            >
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                <b className="at-text-strong">{filtered.length}</b> candidates match
              </span>
              <div className="at-cluster">
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Sort</span>
                <select className="at-select">
                  <option>Best match</option>
                  <option>Recently active</option>
                  <option>Most experience</option>
                  <option>Top rated</option>
                </select>
              </div>
            </div>

            {filtered.map((c) => (
              <div key={c.id} className="at-card at-press" style={{ padding: 'var(--at-space-5)' }}>
                <div className="at-cluster" style={{ alignItems: 'flex-start' }}>
                  <div
                    className="at-avatar at-avatar--lg"
                    style={{ background: c.bg, color: c.color, ...(c.color ? { color: c.color } : {}) }}
                  >
                    {c.letter}
                  </div>
                  <div style={{ flex: '1 1 auto' }}>
                    <div className="at-cluster">
                      <span className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>{c.name}</span>
                      <span className="at-badge at-badge--success">Open</span>
                    </div>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>{c.role}</div>
                    <div
                      className="at-text-muted"
                      style={{ fontSize: 'var(--at-text-xs)', marginBlockStart: 'var(--at-space-1)' }}
                    >
                      {c.location}
                    </div>
                    <p
                      className="at-text-muted"
                      style={{ fontSize: 'var(--at-text-sm)', lineHeight: 1.5, marginBlockStart: 'var(--at-space-3)' }}
                    >
                      {c.summary}
                    </p>
                    <div className="at-cluster" style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-3)' }}>
                      {c.skills.map((s) => (
                        <span key={s} className="at-badge at-badge--neutral">{s}</span>
                      ))}
                    </div>
                    <div
                      className="at-cluster"
                      style={{
                        gap: 'var(--at-space-3)',
                        marginBlockStart: 'var(--at-space-3)',
                        paddingBlockStart: 'var(--at-space-3)',
                        borderBlockStart: '1px solid var(--at-ink)',
                      }}
                    >
                      <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{c.rating}</span>
                      <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{c.active}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'end', minWidth: '148px' }}>
                    <div className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>{c.match}%</div>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Match</div>
                    <div className="at-progress" style={{ marginBlockStart: 'var(--at-space-2)' }}>
                      <div className="at-progress__bar" style={{ width: `${c.match}%` }} />
                    </div>
                    <div className="at-stack" style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-3)' }}>
                      <button className="at-btn at-btn--primary at-btn--sm at-btn--block at-press">Shortlist</button>
                      <button className="at-btn at-btn--outline at-btn--sm at-btn--block at-press">View profile</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div
              className="at-cluster"
              style={{ justifyContent: 'space-between', padding: 'var(--at-space-4) var(--at-space-5)' }}
            >
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                Showing 1–{filtered.length} of 10
              </span>
              <div className="at-pagination">
                <button className="at-pagination__btn is-active">1</button>
                <button className="at-pagination__btn">2</button>
                <button className="at-pagination__btn">3</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
