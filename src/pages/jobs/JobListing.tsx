/*
 * Hactex React — Jobs List (jobs/job-listing).
 * Filter sidebar + open
 * positions list. The keyword + location filters drive a useState/useMemo
 * search over the demo postings.
 */
import { useMemo, useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

interface Job {
  id: number;
  letter: string;
  bg: string;
  color?: string;
  title: string;
  posted: string;
  company: string; // "Northwind Labs · Remote (EU)"
  type: string;
  typeKind: string; // accent | warning
  level: string;
  skills: string[];
  salary: string;
  applicants: string;
}

const JOBS: Job[] = [
  { id: 1, letter: 'N', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', title: 'Senior Product Designer', posted: '2d ago', company: 'Northwind Labs · Remote (EU)', type: 'Full-time', typeKind: 'accent', level: 'Senior', skills: ['Design Systems', 'Figma', 'A11y'], salary: '$95K – $120K', applicants: 'per year · 38 applicants' },
  { id: 2, letter: 'H', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', title: 'Staff Frontend Engineer', posted: '4d ago', company: 'Helios Cloud · Berlin, DE', type: 'Full-time', typeKind: 'accent', level: 'Lead / Staff', skills: ['TypeScript', 'React', 'Vite'], salary: '$130K – $170K', applicants: 'per year · 64 applicants' },
  { id: 3, letter: 'L', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', title: 'Product Marketing Manager', posted: '1w ago', company: 'Lumen Brands · Austin, US', type: 'Full-time', typeKind: 'accent', level: 'Mid', skills: ['GTM', 'Positioning'], salary: '$78K – $96K', applicants: 'per year · 21 applicants' },
  { id: 4, letter: 'V', bg: 'var(--at-warning)', color: 'var(--at-on-warning)', title: 'Backend Engineer (Contract)', posted: '3d ago', company: 'Vela Systems · Remote (Global)', type: 'Contract', typeKind: 'warning', level: 'Mid', skills: ['Go', 'Postgres', 'gRPC'], salary: '$70K – $90K', applicants: 'per year · 47 applicants' },
  { id: 5, letter: 'N', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', title: 'UX Research Lead', posted: '5d ago', company: 'Northwind Labs · London, UK', type: 'Full-time', typeKind: 'accent', level: 'Lead / Staff', skills: ['Discovery', 'Synthesis'], salary: '$105K – $135K', applicants: 'per year · 19 applicants' },
  { id: 6, letter: 'Q', bg: 'var(--at-danger)', color: 'var(--at-on-danger)', title: 'Account Executive', posted: '6d ago', company: 'Quill & Co. · Lisbon, PT', type: 'Full-time', typeKind: 'accent', level: 'Mid', skills: ['SaaS', 'Negotiation'], salary: '$60K – $85K', applicants: 'per year · 33 applicants' },
];

const DEPARTMENTS = [
  ['Engineering', '18'],
  ['Design', '7'],
  ['Product', '5'],
  ['Marketing', '6'],
  ['Sales', '8'],
  ['Operations', '4'],
] as const;

const EMPLOYMENT_TYPES = ['Full-time · 31', 'Part-time · 6', 'Contract · 8', 'Internship · 3'];

export default function JobListing(): React.JSX.Element {
  const [q, setQ] = useState('');
  const [location, setLocation] = useState('Any location');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return JOBS.filter((j) => {
      const matchesQ =
        !needle ||
        j.title.toLowerCase().includes(needle) ||
        j.company.toLowerCase().includes(needle) ||
        j.level.toLowerCase().includes(needle) ||
        j.skills.some((s) => s.toLowerCase().includes(needle));
      const matchesLoc = location === 'Any location' || j.company.includes(location);
      return matchesQ && matchesLoc;
    });
  }, [q, location]);

  return (
    <>
      <PageHead
        title="Jobs List"
        subtitle="48 open postings · 1,284 applicants this month · 6 closing this week."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Export</button>
            <button className="at-btn at-btn--primary at-press">Post a job</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
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
            </div>
            <div>
              <label className="at-form-label">Keyword</label>
              <input
                className="at-input"
                type="search"
                placeholder="Title, skill, team…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <div>
              <label className="at-form-label">Location</label>
              <select
                className="at-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>Any location</option>
                <option>Remote</option>
                <option>Berlin, DE</option>
                <option>London, UK</option>
                <option>Austin, US</option>
                <option>Lisbon, PT</option>
              </select>
            </div>
            <div>
              <div className="at-form-label">Employment type</div>
              <div className="at-stack" style={{ gap: 'var(--at-space-2)' }}>
                {EMPLOYMENT_TYPES.map((t) => (
                  <label key={t} className="at-check">
                    <input type="checkbox" /> {t}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="at-form-label">Department</div>
              <div
                className="at-stack"
                style={{ gap: 'var(--at-space-1)', fontSize: 'var(--at-text-sm)' }}
              >
                {DEPARTMENTS.map(([name, count]) => (
                  <div key={name} className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span>{name}</span>
                    <span className="at-text-muted">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-form-label" style={{ margin: 0 }}>Min. salary</span>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>$0K+</span>
              </div>
              <div className="at-progress" style={{ marginBlockStart: 'var(--at-space-2)' }}>
                <div className="at-progress__bar" style={{ width: '10%' }} />
              </div>
            </div>
          </div>

          {/* Open positions */}
          <div className="at-col-9 at-card" style={{ overflow: 'hidden' }}>
            <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
              <div>
                <div className="at-chart__title">Open positions</div>
                <div className="at-eyebrow">{filtered.length} of 48 postings match</div>
              </div>
              <div className="at-cluster">
                <select className="at-select">
                  <option>Relevance</option>
                  <option>Newest</option>
                  <option>Highest salary</option>
                  <option>Most applicants</option>
                </select>
              </div>
            </div>
            <div
              className="at-stack"
              style={{ gap: 'var(--at-space-3)', padding: '0 var(--at-space-5) var(--at-space-5)' }}
            >
              {filtered.map((j) => (
                <div key={j.id} className="at-card at-press" style={{ padding: 'var(--at-space-4)' }}>
                  <div className="at-cluster" style={{ alignItems: 'flex-start' }}>
                    <div
                      className="at-avatar"
                      style={{ background: j.bg, color: j.color, ...(j.color ? { color: j.color } : {}) }}
                    >
                      {j.letter}
                    </div>
                    <div style={{ flex: '1 1 auto' }}>
                      <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                        <span className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)' }}>
                          {j.title}
                        </span>
                        <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                          {j.posted}
                        </span>
                      </div>
                      <div
                        className="at-text-muted"
                        style={{ fontSize: 'var(--at-text-sm)', marginBlockStart: 'var(--at-space-1)' }}
                      >
                        {j.company}
                      </div>
                      <div
                        className="at-cluster"
                        style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-3)' }}
                      >
                        <span className={`at-badge at-badge--${j.typeKind}`}>{j.type}</span>
                        <span className="at-badge at-badge--neutral">{j.level}</span>
                        {j.skills.map((s) => (
                          <span key={s} className="at-badge at-badge--flat">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ textAlign: 'end' }}>
                      <div className="at-text-strong">{j.salary}</div>
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                        {j.applicants}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="at-cluster"
              style={{
                justifyContent: 'space-between',
                padding: 'var(--at-space-4) var(--at-space-5)',
                borderBlockStart: '2px solid var(--at-ink)',
              }}
            >
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                Showing {filtered.length} of 48 postings
              </span>
              <div className="at-pagination">
                <button className="at-pagination__btn is-active">1</button>
                <button className="at-pagination__btn">2</button>
                <button className="at-pagination__btn">3</button>
                <button className="at-pagination__btn">6</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
