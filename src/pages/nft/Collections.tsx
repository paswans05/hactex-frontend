/*
 * Hactex React — NFT collections.
 * Built with the shared component classes, inline
 * token styles, and demo figures. The filter sidebar + collection-card grid are
 * preserved verbatim; the verified switch and search input use useState, and
 * the grid filters via useMemo.
 */
import { useState, useMemo } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const CATEGORIES = [
  { name: 'Art', count: '12', checked: true },
  { name: 'Collectibles', count: '9', checked: true },
  { name: 'Gaming', count: '7', checked: false },
  { name: 'Generative', count: '5', checked: false },
];

type Collection = {
  banner: string;
  avatar: string;
  name: string;
  verified: boolean;
  by: string;
  floor: string;
  volume: string;
};

const COLLECTIONS: Collection[] = [
  { banner: 'linear-gradient(135deg, color-mix(in oklab, var(--at-chart-2) 70%, transparent), color-mix(in oklab, var(--at-chart-1) 55%, transparent))', avatar: 'linear-gradient(135deg, var(--at-chart-2), var(--at-chart-1))', name: 'Quiet Forms', verified: true, by: 'Mira Aoki', floor: '2.40 ETH', volume: '418.6 ETH' },
  { banner: 'linear-gradient(120deg, color-mix(in oklab, var(--at-chart-3) 70%, transparent), color-mix(in oklab, var(--at-chart-6) 55%, transparent))', avatar: 'linear-gradient(135deg, var(--at-chart-3), var(--at-chart-6))', name: 'Pixel Nomads', verified: true, by: 'Vortex Labs', floor: '0.78 ETH', volume: '312.1 ETH' },
  { banner: 'linear-gradient(150deg, color-mix(in oklab, var(--at-chart-1) 70%, transparent), color-mix(in oklab, var(--at-chart-5) 55%, transparent))', avatar: 'linear-gradient(135deg, var(--at-chart-1), var(--at-chart-5))', name: 'Chrome Spirits', verified: true, by: 'Nova Reyes', floor: '1.42 ETH', volume: '286.4 ETH' },
  { banner: 'linear-gradient(125deg, color-mix(in oklab, var(--at-chart-6) 70%, transparent), color-mix(in oklab, var(--at-chart-2) 55%, transparent))', avatar: 'linear-gradient(135deg, var(--at-chart-6), var(--at-chart-2))', name: 'Solar Beasts', verified: false, by: 'Kojima.eth', floor: '0.32 ETH', volume: '194.7 ETH' },
  { banner: 'linear-gradient(140deg, color-mix(in oklab, var(--at-chart-1) 70%, transparent), color-mix(in oklab, var(--at-chart-2) 55%, transparent))', avatar: 'linear-gradient(135deg, var(--at-chart-1), var(--at-chart-2))', name: 'Echo Wardens', verified: true, by: 'Nova Reyes', floor: '3.10 ETH', volume: '158.2 ETH' },
  { banner: 'linear-gradient(165deg, color-mix(in oklab, var(--at-chart-5) 70%, transparent), color-mix(in oklab, var(--at-chart-3) 55%, transparent))', avatar: 'linear-gradient(135deg, var(--at-chart-5), var(--at-chart-3))', name: 'Aurora Genesis', verified: true, by: 'Vortex Labs', floor: '2.05 ETH', volume: '122.9 ETH' },
];

export default function Collections(): React.JSX.Element {
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [cats, setCats] = useState(CATEGORIES.map((c) => c.checked));
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return COLLECTIONS.filter((c) => {
      if (verifiedOnly && !c.verified) return false;
      if (needle && !c.name.toLowerCase().includes(needle) && !c.by.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [verifiedOnly, q]);

  return (
    <>
      <PageHead
        title="Collections"
        subtitle={
          <>
            <span className="at-num">36</span> collections —{' '}
            <span className="at-num">8,420</span> items minted across Ethereum, Solana and Polygon.
          </>
        }
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Sort by volume</button>
            <button className="at-btn at-btn--primary at-press">Create collection</button>
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
            {/* chain */}
            <div>
              <div className="at-form-label" style={{ marginBlockEnd: 'var(--at-space-2)' }}>Chain</div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-2)', flexWrap: 'wrap' }}>
                <span className="at-badge at-badge--accent">Ethereum</span>
                <span className="at-badge at-badge--neutral">Solana</span>
                <span className="at-badge at-badge--neutral">Polygon</span>
              </div>
            </div>

            {/* volume range */}
            <div>
              <div className="at-cluster" style={{ justifyContent: 'space-between', marginBlockEnd: 'var(--at-space-2)' }}>
                <span className="at-form-label">Min volume (ETH)</span>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-2)', flexWrap: 'nowrap' }}>
                <input className="at-input at-num" inputMode="decimal" placeholder="Min" style={{ fontFamily: 'var(--at-font-mono)' }} aria-label="Minimum volume" />
                <span className="at-text-muted">–</span>
                <input className="at-input at-num" inputMode="decimal" placeholder="Max" style={{ fontFamily: 'var(--at-font-mono)' }} aria-label="Maximum volume" />
              </div>
            </div>

            {/* category */}
            <div>
              <div className="at-form-label" style={{ marginBlockEnd: 'var(--at-space-2)' }}>Category</div>
              <div className="at-stack" style={{ gap: 'var(--at-space-1)' }}>
                {CATEGORIES.map((c, i) => (
                  <label key={c.name} className="at-check" style={{ gap: 'var(--at-space-2)', minHeight: 30, justifyContent: 'space-between' }}>
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

            {/* sort */}
            <div>
              <div className="at-form-label" style={{ marginBlockEnd: 'var(--at-space-2)' }}>Sort</div>
              <select className="at-select" aria-label="Sort collections">
                <option value="volume">Highest volume</option>
                <option value="floor">Lowest floor</option>
                <option value="newest">Newest</option>
                <option value="owners">Most owners</option>
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
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Blue-check collections</span>
              </span>
            </label>
          </div>
        </div>

        {/* COLLECTION GRID */}
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
                placeholder="Search collections…"
                style={{ paddingInlineStart: 36 }}
                aria-label="Search collections"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <span className="at-num at-text-muted" style={{ fontFamily: 'var(--at-font-mono)', fontSize: 'var(--at-text-sm)' }}>
              <b className="at-text-strong">{filtered.length}</b> collections
            </span>
          </div>

          {/* COLLECTION GRID */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 'var(--at-space-4)',
            }}
          >
            {filtered.map((c) => (
              <article key={c.name} className="at-card at-press" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ aspectRatio: '3 / 1', background: c.banner }} />
                <div style={{ padding: 'var(--at-space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--at-space-3)' }}>
                  <div className="at-cluster" style={{ gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
                    <span
                      className="at-avatar at-avatar--lg"
                      style={{
                        background: c.avatar,
                        flex: 'none',
                        marginTop: 'calc(-1 * var(--at-space-5))',
                        border: '2px solid var(--at-surface)',
                      }}
                    />
                    <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                      <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                        <span className="at-text-strong at-truncate">{c.name}</span>
                        {c.verified && <span className="at-badge at-badge--accent">✓</span>}
                      </div>
                      <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>by {c.by}</span>
                    </div>
                  </div>
                  <div
                    className="at-cluster"
                    style={{
                      justifyContent: 'space-between',
                      paddingTop: 'var(--at-space-3)',
                      borderTop: '1px solid var(--at-border)',
                    }}
                  >
                    <span>
                      <span className="at-text-muted" style={{ display: 'block', fontSize: 'var(--at-text-xs)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Floor</span>
                      <span className="at-text-strong at-num" style={{ fontFamily: 'var(--at-font-mono)' }}>{c.floor}</span>
                    </span>
                    <span style={{ textAlign: 'right', marginInlineStart: 'auto' }}>
                      <span className="at-text-muted" style={{ display: 'block', fontSize: 'var(--at-text-xs)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Volume</span>
                      <span className="at-text-strong at-num" style={{ fontFamily: 'var(--at-font-mono)' }}>{c.volume}</span>
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
