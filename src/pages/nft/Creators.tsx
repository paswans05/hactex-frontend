/*
 * Hactex React — NFT creators directory (nft/creators).
 * Built with the shared component classes, inline token
 * styles, and demo figures. A sticky filter sidebar + creator card grid. The
 * specialty checkboxes, search input, and verified switch are controlled; the
 * grid filters via useMemo.
 */
import { useState, useMemo } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const SPECIALTIES = [
  { name: 'Generative', count: '212', checked: true },
  { name: 'Illustration', count: '348', checked: true },
  { name: 'Photography', count: '164', checked: false },
  { name: '3D & Motion', count: '98', checked: false },
  { name: 'Music', count: '76', checked: false },
];

type Creator = {
  initials: string;
  gradient: string;
  name: string;
  verified: boolean;
  meta: string;
  volume: string;
  followers: string;
  following: boolean;
};

const CREATORS: Creator[] = [
  { initials: 'MA', gradient: 'linear-gradient(135deg, var(--at-chart-1), var(--at-chart-5))', name: 'Mira Aoki', verified: true, meta: 'Generative · Quiet Forms', volume: '418.6', followers: '24.1K', following: false },
  { initials: 'VL', gradient: 'linear-gradient(135deg, var(--at-chart-3), var(--at-chart-6))', name: 'Vortex Labs', verified: true, meta: 'Generative · Pixel Nomads', volume: '312.1', followers: '18.6K', following: false },
  { initials: 'NR', gradient: 'linear-gradient(135deg, var(--at-chart-5), var(--at-chart-1))', name: 'Nova Reyes', verified: true, meta: 'Illustration · Chrome Spirits', volume: '286.4', followers: '15.2K', following: true },
  { initials: 'HS', gradient: 'linear-gradient(135deg, var(--at-chart-1), var(--at-chart-2))', name: 'Helio Studio', verified: true, meta: '3D & Motion · Relief Press', volume: '224.7', followers: '12.8K', following: false },
  { initials: 'K', gradient: 'linear-gradient(135deg, var(--at-chart-6), var(--at-chart-2))', name: 'Kojima.eth', verified: false, meta: 'Illustration · Solar Beasts', volume: '194.7', followers: '9.4K', following: false },
  { initials: 'AG', gradient: 'linear-gradient(135deg, var(--at-chart-5), var(--at-chart-3))', name: 'Aurora Guild', verified: true, meta: 'Photography · Aurora Genesis', volume: '122.9', followers: '7.1K', following: false },
];

export default function Creators(): React.JSX.Element {
  const [checked, setChecked] = useState(SPECIALTIES.map((s) => s.checked));
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return CREATORS.filter((c) => {
      // specialty: if any boxes are ticked, the creator's first specialty
      // word must be among the checked ones. (Matches demo data: meta leads
      // with the specialty name, e.g. "Generative · Quiet Forms".)
      const activeSpecialties = SPECIALTIES.filter((_, i) => checked[i]).map((s) => s.name);
      if (activeSpecialties.length > 0) {
        const creatorSpecialty = c.meta.split(' · ')[0];
        if (!activeSpecialties.includes(creatorSpecialty)) return false;
      }
      if (verifiedOnly && !c.verified) return false;
      if (needle && !c.name.toLowerCase().includes(needle) && !c.meta.toLowerCase().includes(needle)) {
        return false;
      }
      return true;
    });
  }, [checked, verifiedOnly, q]);

  return (
    <>
      <PageHead
        title="Creators"
        subtitle={
          <>
            <span className="at-num">1,240</span> verified artists —{' '}
            <span className="at-num">38.2K</span> ETH in lifetime volume.
          </>
        }
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Sort by followers</button>
            <button className="at-btn at-btn--primary at-press">Become a creator</button>
          </>
        }
      />

      <div className="at-row" style={{ alignItems: 'start' }}>
        {/* ───────── FILTERS ───────── */}
        <div
          className="at-col-3 at-card"
          style={{ padding: 'var(--at-space-5)', position: 'sticky', top: 'var(--at-space-6)' }}
        >
          <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
            <div>
              <div className="at-chart__title">Filters</div>
            </div>
            <button
              className="at-btn at-btn--ghost at-btn--sm"
              onClick={() => {
                setChecked(SPECIALTIES.map(() => false));
                setVerifiedOnly(false);
              }}
            >
              Reset
            </button>
          </div>

          <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
            {/* specialty */}
            <div>
              <div className="at-form-label" style={{ marginBlockEnd: 'var(--at-space-2)' }}>
                Specialty
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-1)' }}>
                {SPECIALTIES.map((s, i) => (
                  <label
                    key={s.name}
                    className="at-check"
                    style={{
                      gap: 'var(--at-space-2)',
                      minHeight: 30,
                      justifyContent: 'space-between',
                    }}
                  >
                    <span className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                      <input
                        type="checkbox"
                        checked={checked[i]}
                        onChange={(e) =>
                          setChecked((prev) => prev.map((v, idx) => (idx === i ? e.target.checked : v)))
                        }
                      />
                      <span>{s.name}</span>
                    </span>
                    <span
                      className="at-num"
                      style={{
                        fontFamily: 'var(--at-font-mono)',
                        fontSize: 'var(--at-text-xs)',
                        color: 'var(--at-text-muted)',
                      }}
                    >
                      {s.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* min followers */}
            <div>
              <div
                className="at-cluster"
                style={{ justifyContent: 'space-between', marginBlockEnd: 'var(--at-space-2)' }}
              >
                <span className="at-form-label">Min followers</span>
                <span
                  className="at-num"
                  style={{
                    fontFamily: 'var(--at-font-mono)',
                    fontSize: 'var(--at-text-xs)',
                    color: 'var(--at-text-muted)',
                  }}
                >
                  5,000+
                </span>
              </div>
              <div className="at-progress">
                <div className="at-progress__bar" style={{ width: '60%' }} />
              </div>
            </div>

            {/* chain */}
            <div>
              <div className="at-form-label" style={{ marginBlockEnd: 'var(--at-space-2)' }}>
                Chain
              </div>
              <select className="at-select" aria-label="Filter by chain">
                <option value="">All chains</option>
                <option value="eth">Ethereum</option>
                <option value="sol">Solana</option>
                <option value="poly">Polygon</option>
              </select>
            </div>

            {/* verified toggle */}
            <label className="at-check" style={{ gap: 'var(--at-space-3)' }}>
              <button
                type="button"
                className={`at-switch${verifiedOnly ? ' is-on' : ''}`}
                onClick={() => setVerifiedOnly((v) => !v)}
              >
                <span className="at-switch__thumb" />
              </button>
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>
                  Verified only
                </span>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                  Blue-check creators
                </span>
              </span>
            </label>
          </div>
        </div>

        {/* ───────── CREATOR GRID (9) ───────── */}
        <div
          className="at-col-9"
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--at-space-5)' }}
        >
          {/* toolbar */}
          <div className="at-card at-cluster" style={{ padding: 'var(--at-space-5)' }}>
            <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: 'absolute',
                  insetInlineStart: 11,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 16,
                  height: 16,
                  color: 'var(--at-text-muted)',
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                className="at-input"
                placeholder="Search creators…"
                style={{ paddingInlineStart: 36 }}
                aria-label="Search creators"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <div className="at-segment">
              <button className="at-segment__btn is-active">Trending</button>
              <button className="at-segment__btn">Top</button>
              <button className="at-segment__btn">New</button>
            </div>
            <span
              className="at-num at-text-muted"
              style={{ fontFamily: 'var(--at-font-mono)', fontSize: 'var(--at-text-sm)' }}
            >
              <b className="at-text-strong">{filtered.length}</b> creators
            </span>
          </div>

          {/* CREATOR GRID */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 'var(--at-space-4)',
            }}
          >
            {filtered.map((c) => (
              <article
                key={c.name}
                className="at-card at-press"
                style={{
                  padding: 'var(--at-space-5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--at-space-3)',
                  textAlign: 'center',
                }}
              >
                <span
                  className="at-avatar at-avatar--xl"
                  style={{ background: c.gradient, alignSelf: 'center' }}
                >
                  {c.initials}
                </span>
                <div>
                  <div className="at-cluster" style={{ gap: 'var(--at-space-2)', justifyContent: 'center' }}>
                    <span className="at-text-strong">{c.name}</span>
                    {c.verified && <span className="at-badge at-badge--accent">✓</span>}
                  </div>
                  <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                    {c.meta}
                  </span>
                </div>
                <div
                  className="at-cluster"
                  style={{
                    justifyContent: 'space-around',
                    paddingTop: 'var(--at-space-3)',
                    borderTop: '1px solid var(--at-border)',
                  }}
                >
                  <span>
                    <span
                      className="at-text-strong at-num"
                      style={{ fontFamily: 'var(--at-font-mono)', display: 'block' }}
                    >
                      {c.volume}
                    </span>
                    <span
                      className="at-text-muted"
                      style={{
                        fontSize: 'var(--at-text-xs)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Volume
                    </span>
                  </span>
                  <span>
                    <span
                      className="at-text-strong at-num"
                      style={{ fontFamily: 'var(--at-font-mono)', display: 'block' }}
                    >
                      {c.followers}
                    </span>
                    <span
                      className="at-text-muted"
                      style={{
                        fontSize: 'var(--at-text-xs)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Followers
                    </span>
                  </span>
                </div>
                <button
                  className={`at-btn at-btn--sm at-btn--block ${c.following ? 'at-btn--outline' : 'at-btn--primary'
                    }`}
                >
                  {c.following ? 'Following' : 'Follow'}
                </button>
              </article>
            ))}
          </div>

          {/* load more */}
          <div className="at-cluster" style={{ justifyContent: 'center' }}>
            <button className="at-btn at-btn--outline at-press">Load more</button>
          </div>
        </div>
      </div>
    </>
  );
}
