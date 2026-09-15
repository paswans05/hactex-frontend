/*
 * Hactex React — Search Companies (jobs/companies).
 * Search bar, filter sidebar,
 * and company cards. The company/domain + industry inputs drive a
 * useState/useMemo filter over the demo companies.
 */
import { useMemo, useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

interface Company {
  id: number;
  letter: string;
  bg: string;
  color?: string;
  name: string;
  domain: string;
  blurb: string;
  badges: string[];
  open: string;
  rating: string;
  hq: string;
}

const COMPANIES: Company[] = [
  {
    id: 1,
    letter: 'N',
    bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)',
    name: 'Northwind Labs',
    domain: 'northwind.io',
    blurb:
      'Analytics platform helping product teams ship with confidence. Strong design-system culture and a remote-first team across the EU.',
    badges: ['SaaS', '240 staff', 'Remote-first'],
    open: '18',
    rating: '4.7 ★',
    hq: 'Berlin, DE',
  },
  {
    id: 2,
    letter: 'B',
    bg: 'var(--at-warning)', color: 'var(--at-on-warning)',
    name: 'Brightline Capital',
    domain: 'brightline.co',
    blurb:
      'Mid-market lending infrastructure with a sharp go-to-market team. Hiring across sales, risk, and platform engineering this quarter.',
    badges: ['Fintech', '118 staff'],
    open: '9',
    rating: '4.4 ★',
    hq: 'New York, US',
  },
  {
    id: 3,
    letter: 'M',
    bg: 'var(--at-lime)',
    color: 'var(--at-on-lime)',
    name: 'Meridian Health',
    domain: 'meridianhealth.org',
    blurb:
      'Clinical-risk prediction at scale. Mission-driven org pairing rigorous data science with a genuinely supportive engineering culture.',
    badges: ['Healthcare', '512 staff', 'Remote-first'],
    open: '24',
    rating: '4.6 ★',
    hq: 'Remote · US',
  },
  {
    id: 4,
    letter: 'L',
    bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)',
    name: 'Loop Robotics',
    domain: 'looprobotics.com',
    blurb:
      'Warehouse automation hardware + software. Tight-knit robotics team solving gnarly real-world problems with elegant control systems.',
    badges: ['Manufacturing', '340 staff'],
    open: '12',
    rating: '4.5 ★',
    hq: 'Tokyo, JP',
  },
];

const INDUSTRIES = ['SaaS · 64', 'Fintech · 42', 'E-commerce · 38', 'Healthcare · 21', 'Manufacturing · 18', 'Agency · 15'];
const SIZES = ['Startup (1–50) · 44', 'Mid (51–500) · 180', 'Large (500+) · 88'];

export default function Companies(): React.JSX.Element {
  const [q, setQ] = useState('');
  const [industry, setIndustry] = useState('Any industry');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return COMPANIES.filter((c) => {
      const matchesQ =
        !needle ||
        c.name.toLowerCase().includes(needle) ||
        c.domain.toLowerCase().includes(needle);
      const industryKey = industry.split(' ')[0].toLowerCase();
      const matchesIndustry =
        industry === 'Any industry' ||
        c.badges.some((b) => b.toLowerCase() === industryKey);
      return matchesQ && matchesIndustry;
    });
  }, [q, industry]);

  return (
    <>
      <PageHead
        title="Search Companies"
        subtitle="312 companies hiring now — 1,284 open roles across 38 industries."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Followed (12)</button>
            <button className="at-btn at-btn--primary at-press">Create alert</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        {/* Search bar */}
        <div className="at-card at-row" style={{ padding: 'var(--at-space-5)' }}>
          <div className="at-col-6">
            <label className="at-form-label">Company or domain</label>
            <input
              className="at-input"
              type="search"
              placeholder="e.g. Northwind, fintech…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="at-col-4">
            <label className="at-form-label">Industry</label>
            <select
              className="at-select"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option>Any industry</option>
              <option>SaaS</option>
              <option>Fintech</option>
              <option>E-commerce</option>
              <option>Healthcare</option>
              <option>Manufacturing</option>
              <option>Agency</option>
            </select>
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
              <div className="at-form-label">Industry</div>
              <div className="at-stack" style={{ gap: 'var(--at-space-2)' }}>
                {INDUSTRIES.map((i) => (
                  <label key={i} className="at-check">
                    <input type="checkbox" /> {i}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="at-form-label">Company size</div>
              <div className="at-stack" style={{ gap: 'var(--at-space-2)' }}>
                {SIZES.map((s) => (
                  <label key={s} className="at-check">
                    <input type="checkbox" /> {s}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-form-label" style={{ margin: 0 }}>Min. open roles</span>
                <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>0+</span>
              </div>
              <div className="at-progress" style={{ marginBlockStart: 'var(--at-space-2)' }}>
                <div className="at-progress__bar" style={{ width: '5%' }} />
              </div>
            </div>
            <div>
              <div className="at-form-label">Min. rating</div>
              <div className="at-stack" style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-2)' }}>
                <label className="at-check"><input type="radio" name="rating" /> Any rating</label>
                <label className="at-check"><input type="radio" name="rating" /> 4.0★ &amp; up</label>
                <label className="at-check"><input type="radio" name="rating" /> 4.5★ &amp; up</label>
              </div>
            </div>
            <label className="at-check">
              <input type="checkbox" /> Remote-first only
            </label>
          </div>

          {/* Results */}
          <div className="at-col-9 at-stack" style={{ gap: 'var(--at-space-4)' }}>
            <div
              className="at-cluster"
              style={{ justifyContent: 'space-between', padding: '0 var(--at-space-1)' }}
            >
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                <b className="at-text-strong">{filtered.length}</b> companies match
              </span>
              <div className="at-cluster">
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Sort</span>
                <select className="at-select">
                  <option>Most open roles</option>
                  <option>Highest rated</option>
                  <option>Recently added</option>
                  <option>A–Z</option>
                </select>
              </div>
            </div>

            <div className="at-row">
              {filtered.map((c) => (
                <div key={c.id} className="at-col-6 at-card at-press" style={{ padding: 'var(--at-space-5)' }}>
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
                        <span className="at-badge at-badge--info">Verified</span>
                      </div>
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{c.domain}</div>
                    </div>
                  </div>
                  <p
                    className="at-text-muted"
                    style={{ fontSize: 'var(--at-text-sm)', lineHeight: 1.5, marginBlockStart: 'var(--at-space-3)' }}
                  >
                    {c.blurb}
                  </p>
                  <div className="at-cluster" style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-3)' }}>
                    {c.badges.map((b) => (
                      <span key={b} className="at-badge at-badge--neutral">{b}</span>
                    ))}
                  </div>
                  <div className="at-row" style={{ marginBlockStart: 'var(--at-space-4)' }}>
                    <div className="at-col-4">
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Open</div>
                      <div className="at-text-strong" style={{ color: 'var(--at-accent-text)' }}>{c.open}</div>
                    </div>
                    <div className="at-col-4">
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Rating</div>
                      <div className="at-text-strong">{c.rating}</div>
                    </div>
                    <div className="at-col-4">
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>HQ</div>
                      <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{c.hq}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="at-cluster"
              style={{ justifyContent: 'space-between', padding: 'var(--at-space-4) var(--at-space-5)' }}
            >
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                Showing 1–{filtered.length} of 12
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
