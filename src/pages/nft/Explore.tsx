/*
 * Hactex React — NFT marketplace explore.
 * Built with the shared component classes, inline token
 * styles, and demo figures. The filter sidebar + grid of NFT tiles are
 * preserved verbatim; the verified switch and search input use useState, and
 * the grid filters via useMemo.
 */
import { useState, useMemo } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const CATEGORIES = [
  { name: 'Art', count: '2,840', checked: false },
  { name: 'Collectibles', count: '1,920', checked: true },
  { name: 'Gaming', count: '1,460', checked: false },
  { name: 'Photography', count: '980', checked: false },
  { name: 'Music', count: '720', checked: false },
  { name: 'Generative', count: '500', checked: false },
];

type Tile = {
  gradient: string;
  badge: string | null;
  badgeKind: string;
  avatarBg: string;
  collection: string;
  verified: boolean;
  title: string;
  label: string;
  price: string;
  likes: string;
};

const TILES: Tile[] = [
  { gradient: 'linear-gradient(135deg, color-mix(in oklab, var(--at-chart-2) 78%, transparent), color-mix(in oklab, var(--at-chart-1) 60%, transparent))', badge: '06:12:40', badgeKind: 'neutral', avatarBg: 'linear-gradient(135deg, var(--at-chart-2), var(--at-chart-1))', collection: 'Quiet Forms', verified: true, title: 'Quiet Forms #001', label: 'Current bid', price: '2.40 ETH', likes: '184' },
  { gradient: 'linear-gradient(120deg, color-mix(in oklab, var(--at-chart-1) 78%, transparent), color-mix(in oklab, var(--at-chart-5) 60%, transparent))', badge: null, badgeKind: 'neutral', avatarBg: 'linear-gradient(135deg, var(--at-chart-1), var(--at-chart-5))', collection: 'Relief Press', verified: true, title: 'Relief #014', label: 'Price', price: '1.85 ETH', likes: '142' },
  { gradient: 'linear-gradient(150deg, color-mix(in oklab, var(--at-chart-3) 78%, transparent), color-mix(in oklab, var(--at-chart-6) 60%, transparent))', badge: '00:42:18', badgeKind: 'neutral', avatarBg: 'linear-gradient(135deg, var(--at-chart-3), var(--at-chart-6))', collection: 'Pixel Nomads', verified: true, title: 'Neon Drifter #218', label: 'Current bid', price: '3.80 ETH', likes: '309' },
  { gradient: 'linear-gradient(165deg, color-mix(in oklab, var(--at-chart-6) 78%, transparent), color-mix(in oklab, var(--at-chart-3) 60%, transparent))', badge: 'New', badgeKind: 'accent', avatarBg: 'linear-gradient(135deg, var(--at-chart-6), var(--at-chart-3))', collection: 'Solar Beasts', verified: false, title: 'Solar Beast #088', label: 'Price', price: '0.92 ETH', likes: '96' },
  { gradient: 'linear-gradient(140deg, color-mix(in oklab, var(--at-chart-5) 78%, transparent), color-mix(in oklab, var(--at-chart-1) 60%, transparent))', badge: '01:14:05', badgeKind: 'neutral', avatarBg: 'linear-gradient(135deg, var(--at-chart-5), var(--at-chart-1))', collection: 'Chrome Spirits', verified: true, title: 'Chrome Spirit #44', label: 'Current bid', price: '2.10 ETH', likes: '221' },
  { gradient: 'linear-gradient(130deg, color-mix(in oklab, var(--at-chart-1) 78%, transparent), color-mix(in oklab, var(--at-chart-2) 60%, transparent))', badge: null, badgeKind: 'neutral', avatarBg: 'linear-gradient(135deg, var(--at-chart-1), var(--at-chart-2))', collection: 'Echo Wardens', verified: true, title: 'Glyph Engine #07', label: 'Price', price: '5.40 ETH', likes: '412' },
  { gradient: 'linear-gradient(155deg, color-mix(in oklab, var(--at-chart-2) 78%, transparent), color-mix(in oklab, var(--at-chart-3) 60%, transparent))', badge: null, badgeKind: 'neutral', avatarBg: 'linear-gradient(135deg, var(--at-chart-2), var(--at-chart-3))', collection: 'Relief Press', verified: true, title: 'Bone Field #102', label: 'Price', price: '1.10 ETH', likes: '78' },
  { gradient: 'linear-gradient(125deg, color-mix(in oklab, var(--at-chart-6) 78%, transparent), color-mix(in oklab, var(--at-chart-2) 60%, transparent))', badge: '02:31:40', badgeKind: 'neutral', avatarBg: 'linear-gradient(135deg, var(--at-chart-6), var(--at-chart-2))', collection: 'Solar Beasts', verified: false, title: 'Iron Bloom #99', label: 'Current bid', price: '1.70 ETH', likes: '133' },
];

export default function Explore(): React.JSX.Element {
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [cats, setCats] = useState(CATEGORIES.map((c) => c.checked));
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return TILES.filter((t) => {
      if (verifiedOnly && !t.verified) return false;
      if (needle && !t.title.toLowerCase().includes(needle) && !t.collection.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [verifiedOnly, q]);

  return (
    <>
      <PageHead
        title="Marketplace"
        subtitle={
          <>
            Browse <span className="at-num">8,420</span> items across{' '}
            <span className="at-num">36</span> collections — floor up{' '}
            <span className="at-num">6.2%</span> today.
          </>
        }
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">0.000 ETH</button>
            <button className="at-btn at-btn--primary at-press">Create NFT</button>
          </>
        }
      />

      <div className="at-row" style={{ alignItems: 'start' }}>
        {/* Filters */}
        <div
          className="at-col-3 at-card"
          style={{ padding: 'var(--at-space-5)', position: 'sticky', top: 'var(--at-space-6)' }}
        >
          <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
            <div>
              <div className="at-chart__title">Filters</div>
            </div>
            <button className="at-btn at-btn--ghost at-btn--sm">Reset</button>
          </div>

          <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
            {/* status */}
            <div>
              <div className="at-form-label" style={{ marginBlockEnd: 'var(--at-space-2)' }}>Status</div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-2)', flexWrap: 'wrap' }}>
                <span className="at-badge at-badge--accent">Buy now</span>
                <span className="at-badge at-badge--neutral">On auction</span>
                <span className="at-badge at-badge--neutral">New</span>
              </div>
            </div>

            {/* price range */}
            <div>
              <div className="at-cluster" style={{ justifyContent: 'space-between', marginBlockEnd: 'var(--at-space-2)' }}>
                <span className="at-form-label">Price range (ETH)</span>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-2)', flexWrap: 'nowrap' }}>
                <input
                  className="at-input at-num"
                  inputMode="decimal"
                  placeholder="Min"
                  style={{ fontFamily: 'var(--at-font-mono)' }}
                  aria-label="Minimum price"
                />
                <span className="at-text-muted">–</span>
                <input
                  className="at-input at-num"
                  inputMode="decimal"
                  placeholder="Max"
                  style={{ fontFamily: 'var(--at-font-mono)' }}
                  aria-label="Maximum price"
                />
              </div>
            </div>

            {/* category chips */}
            <div>
              <div className="at-form-label" style={{ marginBlockEnd: 'var(--at-space-2)' }}>Category</div>
              <div className="at-stack" style={{ gap: 'var(--at-space-1)' }}>
                {CATEGORIES.map((c, i) => (
                  <label
                    key={c.name}
                    className="at-check"
                    style={{ gap: 'var(--at-space-2)', minHeight: 30, justifyContent: 'space-between' }}
                  >
                    <span className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                      <input
                        type="checkbox"
                        checked={cats[i]}
                        onChange={(e) => setCats((prev) => prev.map((v, idx) => (idx === i ? e.target.checked : v)))}
                      />
                      <span>{c.name}</span>
                    </span>
                    <span className="at-num" style={{ fontFamily: 'var(--at-font-mono)', fontSize: 'var(--at-text-xs)', color: 'var(--at-text-muted)' }}>
                      {c.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* chain */}
            <div>
              <div className="at-form-label" style={{ marginBlockEnd: 'var(--at-space-2)' }}>Chain</div>
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
                className={`at-switch${verifiedOnly ? ' is-on' : ''}`}
                onClick={() => setVerifiedOnly((v) => !v)}
                type="button"
              >
                <span className="at-switch__thumb" />
              </button>
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>Verified only</span>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Hide unverified creators</span>
              </span>
            </label>
          </div>
        </div>

        {/* GRID */}
        <div className="at-col-9" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--at-space-5)' }}>
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
                placeholder="Search items, collections, creators…"
                style={{ paddingInlineStart: 36 }}
                aria-label="Search marketplace"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <select className="at-select" aria-label="Sort items" style={{ minWidth: 160 }}>
              <option value="recent">Recently listed</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="ending">Ending soon</option>
              <option value="likes">Most liked</option>
            </select>
            <div className="at-segment" aria-label="Grid density">
              <button className="at-segment__btn is-active">Grid</button>
              <button className="at-segment__btn">Compact</button>
            </div>
          </div>

          {/* result count */}
          <div className="at-cluster" style={{ justifyContent: 'space-between', gap: 'var(--at-space-3)' }}>
            <span className="at-num" style={{ fontFamily: 'var(--at-font-mono)', fontSize: 'var(--at-text-sm)', color: 'var(--at-text-muted)' }}>
              <b className="at-text-strong">{filtered.length}</b> items
            </span>
            <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
              <span className="at-badge at-badge--accent">Collectibles</span>
            </div>
          </div>

          {/* TILE GRID */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: 'var(--at-space-4)',
            }}
          >
            {filtered.map((t) => (
              <article
                key={t.title}
                className="at-card at-press"
                style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <div
                  style={{
                    aspectRatio: '1 / 1',
                    display: 'block',
                    position: 'relative',
                    background: t.gradient,
                  }}
                >
                  {t.badge && (
                    <span
                      className={`at-badge at-badge--${t.badgeKind}`}
                      style={{ position: 'absolute', top: 'var(--at-space-3)', insetInlineStart: 'var(--at-space-3)' }}
                    >
                      {t.badge}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    padding: 'var(--at-space-3) var(--at-space-4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--at-space-2)',
                    flex: '1 1 auto',
                  }}
                >
                  <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                    <span className="at-avatar at-avatar--xs" style={{ background: t.avatarBg, flex: 'none' }} />
                    <span className="at-text-muted at-truncate" style={{ fontSize: 'var(--at-text-xs)' }}>
                      {t.collection}
                    </span>
                    {t.verified && <span className="at-badge at-badge--accent">✓</span>}
                  </div>
                  <a href="#" className="at-text-strong at-truncate" style={{ textDecoration: 'none' }}>
                    {t.title}
                  </a>
                  <div
                    className="at-cluster"
                    style={{
                      justifyContent: 'space-between',
                      marginTop: 'auto',
                      paddingTop: 'var(--at-space-2)',
                      borderTop: '1px solid var(--at-border)',
                    }}
                  >
                    <span style={{ minWidth: 0 }}>
                      <span
                        className="at-text-muted"
                        style={{
                          display: 'block',
                          fontSize: 'var(--at-text-xs)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {t.label}
                      </span>
                      <span className="at-text-strong at-num" style={{ fontFamily: 'var(--at-font-mono)' }}>
                        {t.price}
                      </span>
                    </span>
                    <span className="at-cluster at-text-muted" style={{ gap: 4, fontSize: 'var(--at-text-xs)' }}>
                      <span>♥</span>
                      <span className="at-num">{t.likes}</span>
                    </span>
                  </div>
                </div>
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
