/*
 * Hactex React — Starter page.
 * Built with the shared component classes, inline token
 * styles, and demo text. The empty-state + state-variant cards + loading
 * skeletons are preserved verbatim. Skeleton rows are extracted into a const.
 */
import { PageHead } from '../../components/shell/PageHead';

const STATE_VARIANTS = [
  {
    glyph: '+',
    bg: 'var(--at-accent-wash)',
    color: 'var(--at-accent-text)',
    title: 'First-run',
    meta: 'CTA to create the first record',
  },
  {
    glyph: '≡',
    bg: 'color-mix(in oklab, var(--at-chart-1) 18%, transparent)',
    color: 'var(--at-chart-1-text)',
    title: 'Filtered-empty',
    meta: '"Clear filters" secondary action',
  },
  {
    glyph: null, // search svg
    bg: 'color-mix(in oklab, var(--at-chart-2) 18%, transparent)',
    color: 'var(--at-chart-2-text)',
    title: 'Search-empty',
    meta: 'No matches + spelling tips',
  },
  {
    glyph: '!',
    bg: 'color-mix(in oklab, var(--at-danger) 18%, transparent)',
    color: 'var(--at-danger-text)',
    title: 'Error-empty',
    meta: '"Retry" action after a failure',
  },
] as const;

const SKELETONS = [
  { primary: '80%', secondary: '55%' },
  { primary: '70%', secondary: '45%' },
  { primary: '85%', secondary: '60%' },
] as const;

const skeletonCellStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--at-space-3)',
  padding: 'var(--at-space-3)',
  border: 'var(--at-border-w-sm) solid var(--at-border)',
  borderRadius: 'var(--at-radius-md)',
};

export default function Starter(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Starter Page"
        subtitle="A blank scaffold with the standard page shell — drop your content into the marked region below."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">View docs</button>
            <button className="at-btn at-btn--primary at-press">New item</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row" style={{ alignItems: 'stretch' }}>
          {/* Canonical empty-state (untitled) */}
          <div className="at-col-8 at-card" style={{ paddingBlock: 'var(--at-space-10)' }}>
            <div
              style={{
                maxWidth: '420px',
                marginInline: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 'var(--at-space-5)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'relative',
                  display: 'grid',
                  placeItems: 'center',
                  width: '128px',
                  height: '128px',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 50% 40%, var(--at-accent-wash), transparent 70%)',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '1px dashed var(--at-border-strong)',
                  }}
                />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: '56px', height: '56px', color: 'var(--at-text-muted)' }}
                >
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M5 21v-16a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                  <path d="M12 11l0 6" stroke="var(--at-accent)" />
                  <path d="M9 14l3 -3l3 3" stroke="var(--at-accent)" />
                </svg>
              </span>
              <div>
                <div
                  className="at-text-strong"
                  style={{ fontFamily: 'var(--at-font-display)', fontSize: 'var(--at-text-lg)' }}
                >
                  Nothing here yet
                </div>
                <p
                  className="at-text-muted"
                  style={{
                    fontSize: 'var(--at-text-sm)',
                    marginBlockStart: 'var(--at-space-2)',
                    lineHeight: 1.55,
                  }}
                >
                  This is the canonical empty-state pattern reused across every list, table and feed.
                  Create your first item to get going.
                </p>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-3)', justifyContent: 'center' }}>
                <button className="at-btn at-btn--primary at-press">Create item</button>
                <a href="#" className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                  or import from a file
                </a>
              </div>
            </div>
          </div>

          {/* State Variants (titled card #1) */}
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">State Variants</div>
                <div className="at-eyebrow">One pattern, four contexts</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {STATE_VARIANTS.map((v) => (
                <div key={v.title} className="at-cluster" style={{ gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
                  <span
                    className="at-avatar at-avatar--xs"
                    style={{ background: v.bg, color: v.color }}
                  >
                    {v.glyph === null ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: '12px', height: '12px' }}
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    ) : (
                      v.glyph
                    )}
                  </span>
                  <div>
                    <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{v.title}</div>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{v.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Loading Skeleton (titled card #2) */}
        <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
          <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
            <div>
              <div className="at-chart__title">Loading Skeleton</div>
              <div className="at-eyebrow">Reserve layout while async data resolves — no content shift</div>
            </div>
            <span className="at-badge at-badge--neutral">Loading…</span>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 'var(--at-space-4)',
            }}
          >
            {SKELETONS.map((s, i) => (
              <div key={i} style={skeletonCellStyle}>
                <span
                  className="at-skeleton"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--at-radius-md)',
                    flex: '0 0 auto',
                  }}
                />
                <div
                  style={{
                    flex: '1 1 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--at-space-2)',
                  }}
                >
                  <span
                    className="at-skeleton"
                    style={{ width: s.primary, height: '10px', borderRadius: 'var(--at-radius-pill)' }}
                  />
                  <span
                    className="at-skeleton"
                    style={{ width: s.secondary, height: '10px', borderRadius: 'var(--at-radius-pill)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
