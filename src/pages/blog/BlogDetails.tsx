/*
 * Hactex React — Blog article detail (blog/blog-details).
 * Built with the shared component classes, inline
 * token styles, and demo copy. A full article layout — hero, body, author card,
 * comments, plus a sidebar of engagement / TOC / related posts. Mostly static
 * markup; the new-comment textarea is controlled.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const TOC = [
  { num: '01', title: 'The problem with literal colors', active: true },
  { num: '02', title: 'Three layers, one direction', active: false },
  { num: '03', title: 'What we measured afterward', active: false },
];

const RELATED_POSTS = [
  {
    gradient:
      'linear-gradient(135deg, color-mix(in oklab, var(--at-chart-2) 55%, transparent), color-mix(in oklab, var(--at-chart-3) 45%, transparent))',
    title: 'The quiet craft of empty states',
    meta: 'Jun 22 · 5 min',
  },
  {
    gradient:
      'linear-gradient(135deg, color-mix(in oklab, var(--at-chart-1) 55%, transparent), color-mix(in oklab, var(--at-chart-5) 45%, transparent))',
    title: 'Caching at the edge without losing your mind',
    meta: 'Jun 08 · 9 min',
  },
  {
    gradient:
      'linear-gradient(135deg, color-mix(in oklab, var(--at-chart-6) 55%, transparent), color-mix(in oklab, var(--at-chart-3) 45%, transparent))',
    title: 'Pricing pages that respect the reader',
    meta: 'Jun 05 · 5 min',
  },
];

const TAGS = ['Design Tokens', 'CSS Variables', 'Dark Mode', 'Accessibility', 'Theming'];

export default function BlogDetails(): React.JSX.Element {
  const [comment, setComment] = useState('');

  return (
    <>
      <PageHead
        title="Designing a token-driven theming engine"
        subtitle={
          <>
            Engineering · Published <span className="at-num">Jun 26, 2026</span> ·{' '}
            <span className="at-num">9</span> min read.
          </>
        }
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">All posts</button>
            <button className="at-btn at-btn--primary at-press">Edit</button>
          </>
        }
      />

      <div className="at-row" style={{ gap: 'var(--at-space-6)', alignItems: 'start' }}>
        {/* ───────── ARTICLE BODY (8) ───────── */}
        <div
          className="at-col-8"
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--at-space-6)', minWidth: 0 }}
        >
          {/* cover image */}
          <div className="at-card" style={{ overflow: 'hidden' }}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '21 / 9',
                background:
                  'linear-gradient(135deg, color-mix(in oklab, var(--at-chart-2) 45%, var(--at-accent)), color-mix(in oklab, var(--at-chart-1) 55%, transparent))',
              }}
            >
              <span
                className="at-badge at-badge--accent"
                style={{
                  position: 'absolute',
                  top: 'var(--at-space-4)',
                  insetInlineStart: 'var(--at-space-4)',
                }}
              >
                Engineering
              </span>
            </div>
          </div>

          {/* article body */}
          <article className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div
              className="at-stack"
              style={{ gap: 'var(--at-space-5)', fontSize: 'var(--at-text-sm)', lineHeight: 1.78 }}
            >
              <p className="at-text-strong" style={{ fontSize: 'var(--at-text-lg)', lineHeight: 1.7 }}>
                Eighteen months ago our front-end carried <b>fourteen</b> hand-maintained color
                stylesheets — one per theme, plus a fork for dark mode. Every brand tweak meant a
                fourteen-file pull request. Today a single CSS variable swap re-themes the entire
                product. This is how we got there.
              </p>

              <h2
                className="at-text-strong"
                style={{
                  fontFamily: 'var(--at-font-display)',
                  fontSize: 'var(--at-text-xl)',
                  lineHeight: 1.25,
                  marginTop: 'var(--at-space-2)',
                }}
              >
                The problem with literal colors
              </h2>
              <p>
                The original system hard-coded hex values directly in components. A button knew its
                color. When design shipped a new accent, we hunted those literals across the
                codebase. Dark mode doubled the surface area, and contrast bugs slipped through on
                every release.
              </p>
              <p>
                The fix was a layer of <b>role tokens</b>: semantic names that point at raw stops.
                Components reference roles only — never stops — so swapping the underlying palette
                re-themes everything at once.
              </p>

              <h2
                className="at-text-strong"
                style={{
                  fontFamily: 'var(--at-font-display)',
                  fontSize: 'var(--at-text-xl)',
                  lineHeight: 1.25,
                  marginTop: 'var(--at-space-2)',
                }}
              >
                Three layers, one direction
              </h2>
              <p>
                We settled on a strict one-way dependency: primitives feed roles, roles feed
                components. Nothing reaches back up the chain.
              </p>
              <ul
                className="at-stack"
                style={{ listStyle: 'none', padding: 0, margin: 0, gap: 'var(--at-space-3)' }}
              >
                <li className="at-cluster" style={{ gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
                  <span
                    style={{
                      flex: 'none',
                      marginTop: 8,
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--at-accent)',
                    }}
                  />
                  <span>
                    <b className="at-text-strong">Primitives</b> — the raw scale. Never referenced by
                    components.
                  </span>
                </li>
                <li className="at-cluster" style={{ gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
                  <span
                    style={{
                      flex: 'none',
                      marginTop: 8,
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--at-chart-1)',
                    }}
                  />
                  <span>
                    <b className="at-text-strong">Roles</b> — semantic aliases that resolve per theme.
                  </span>
                </li>
                <li className="at-cluster" style={{ gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
                  <span
                    style={{
                      flex: 'none',
                      marginTop: 8,
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--at-chart-2)',
                    }}
                  />
                  <span>
                    <b className="at-text-strong">Components</b> — consume roles exclusively. One
                    stylesheet, every theme.
                  </span>
                </li>
              </ul>

              <h2
                className="at-text-strong"
                style={{
                  fontFamily: 'var(--at-font-display)',
                  fontSize: 'var(--at-text-xl)',
                  lineHeight: 1.25,
                  marginTop: 'var(--at-space-2)',
                }}
              >
                What we measured afterward
              </h2>
              <p>
                The migration paid for itself within a quarter. A new accent now ships in minutes,
                dark mode is guaranteed-correct by construction, and our contrast regressions dropped
                to zero because the role layer enforces accessible pairings centrally.
              </p>

              {/* tags */}
              <div
                className="at-cluster"
                style={{
                  gap: 'var(--at-space-2)',
                  flexWrap: 'wrap',
                  paddingTop: 'var(--at-space-4)',
                  borderTop: '1px solid var(--at-border)',
                }}
              >
                <span
                  className="at-text-muted"
                  style={{
                    fontSize: 'var(--at-text-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginInlineEnd: 'var(--at-space-1)',
                  }}
                >
                  Tags
                </span>
                {TAGS.map((t) => (
                  <span key={t} className="at-badge at-badge--accent">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* author bio */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div
              className="at-cluster"
              style={{ gap: 'var(--at-space-4)', alignItems: 'flex-start', flexWrap: 'wrap' }}
            >
              <span
                className="at-avatar at-avatar--xl"
                style={{
                  background: 'color-mix(in oklab, var(--at-chart-1) 22%, transparent)',
                  color: 'var(--at-chart-1-text)',
                  flex: 'none',
                }}
              >
                DO
              </span>
              <div style={{ flex: '1 1 240px', minWidth: 0 }}>
                <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                  <h3 className="at-text-strong">Devon Okafor</h3>
                  <span className="at-badge at-badge--accent">Staff Engineer</span>
                </div>
                <p
                  className="at-text-muted"
                  style={{
                    fontSize: 'var(--at-text-sm)',
                    lineHeight: 1.65,
                    marginTop: 'var(--at-space-2)',
                  }}
                >
                  Devon leads the design-systems guild and has spent the last decade making
                  front-ends boringly reliable. Writes about CSS architecture, performance and the
                  unglamorous work that keeps products fast.
                </p>
                <div
                  className="at-cluster"
                  style={{ gap: 'var(--at-space-2)', marginTop: 'var(--at-space-3)' }}
                >
                  <button className="at-btn at-btn--outline at-btn--sm at-press">Follow</button>
                </div>
              </div>
            </div>
          </div>

          {/* COMMENTS */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Comments</div>
                <div className="at-eyebrow">3 responses</div>
              </div>
            </div>

            {/* new comment */}
            <form style={{ display: 'flex', gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
              <span
                className="at-avatar at-avatar--sm"
                style={{ background: 'var(--at-accent-wash)', color: 'var(--at-accent-text)', flex: 'none' }}
              >
                You
              </span>
              <div style={{ flex: '1 1 auto' }}>
                <textarea
                  className="at-textarea"
                  rows={2}
                  placeholder="Add to the discussion…"
                  style={{ minHeight: 64 }}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div
                  className="at-cluster"
                  style={{ justifyContent: 'flex-end', marginTop: 'var(--at-space-2)' }}
                >
                  <button className="at-btn at-btn--primary at-btn--sm">Post comment</button>
                </div>
              </div>
            </form>

            <div className="at-divider" style={{ marginBlock: 'var(--at-space-5)' }} />

            {/* comment list */}
            <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
              {/* comment 1 */}
              <div style={{ display: 'flex', gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
                <span
                  className="at-avatar at-avatar--sm"
                  style={{
                    background: 'color-mix(in oklab, var(--at-chart-5) 22%, transparent)',
                    color: 'var(--at-chart-5-text)',
                    flex: 'none',
                  }}
                >
                  PN
                </span>
                <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                  <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                    <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>
                      Priya Nair
                    </span>
                    <span
                      className="at-num at-text-muted"
                      style={{ fontFamily: 'var(--at-font-mono)', fontSize: 'var(--at-text-xs)' }}
                    >
                      2h ago
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--at-text-sm)', lineHeight: 1.6, marginTop: 4 }}>
                    This mirrors our migration almost exactly. The hardest part was getting buy-in to
                    ban raw hex in code review — once linting enforced it, the rest followed naturally.
                  </p>
                  <div
                    className="at-cluster at-text-muted"
                    style={{ gap: 'var(--at-space-4)', marginTop: 6, fontSize: 'var(--at-text-xs)' }}
                  >
                    <button
                      className="at-cluster at-text-accent"
                      style={{ gap: 5, background: 'none', border: 0, cursor: 'pointer' }}
                    >
                      <span>♥</span>
                      <span className="at-num">24</span>
                    </button>
                    <button
                      style={{ background: 'none', border: 0, cursor: 'pointer', color: 'inherit' }}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>

              {/* comment 2 */}
              <div style={{ display: 'flex', gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
                <span
                  className="at-avatar at-avatar--sm"
                  style={{
                    background: 'color-mix(in oklab, var(--at-chart-6) 22%, transparent)',
                    color: 'var(--at-chart-6-text)',
                    flex: 'none',
                  }}
                >
                  MR
                </span>
                <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                  <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                    <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>
                      Marcus Reid
                    </span>
                    <span
                      className="at-num at-text-muted"
                      style={{ fontFamily: 'var(--at-font-mono)', fontSize: 'var(--at-text-xs)' }}
                    >
                      5h ago
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--at-text-sm)', lineHeight: 1.6, marginTop: 4 }}>
                    Curious how you handle one-off marketing pages that genuinely need a bespoke
                    color. Do you allow an escape hatch or push everything through the role layer?
                  </p>
                  <div
                    className="at-cluster at-text-muted"
                    style={{ gap: 'var(--at-space-4)', marginTop: 6, fontSize: 'var(--at-text-xs)' }}
                  >
                    <button
                      className="at-cluster"
                      style={{ gap: 5, background: 'none', border: 0, cursor: 'pointer', color: 'inherit' }}
                    >
                      <span>♥</span>
                      <span className="at-num">11</span>
                    </button>
                    <button
                      style={{ background: 'none', border: 0, cursor: 'pointer', color: 'inherit' }}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>

              {/* comment 3 (with nested reply) */}
              <div style={{ display: 'flex', gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
                <span
                  className="at-avatar at-avatar--sm"
                  style={{
                    background: 'color-mix(in oklab, var(--at-chart-2) 22%, transparent)',
                    color: 'var(--at-chart-2-text)',
                    flex: 'none',
                  }}
                >
                  LB
                </span>
                <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                  <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                    <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>
                      Lena Brandt
                    </span>
                    <span
                      className="at-num at-text-muted"
                      style={{ fontFamily: 'var(--at-font-mono)', fontSize: 'var(--at-text-xs)' }}
                    >
                      1d ago
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--at-text-sm)', lineHeight: 1.6, marginTop: 4 }}>
                    The three-layer one-way dependency is the whole game. We added a build check that
                    fails if components.css references a primitive directly. Zero regressions since.
                  </p>
                  <div
                    className="at-cluster at-text-muted"
                    style={{ gap: 'var(--at-space-4)', marginTop: 6, fontSize: 'var(--at-text-xs)' }}
                  >
                    <button
                      className="at-cluster at-text-accent"
                      style={{ gap: 5, background: 'none', border: 0, cursor: 'pointer' }}
                    >
                      <span>♥</span>
                      <span className="at-num">38</span>
                    </button>
                    <button
                      style={{ background: 'none', border: 0, cursor: 'pointer', color: 'inherit' }}
                    >
                      Reply
                    </button>
                  </div>

                  {/* nested reply */}
                  <div
                    style={{
                      display: 'flex',
                      gap: 'var(--at-space-3)',
                      alignItems: 'flex-start',
                      marginTop: 'var(--at-space-4)',
                      paddingInlineStart: 'var(--at-space-4)',
                      borderInlineStart: '2px solid var(--at-border)',
                    }}
                  >
                    <span
                      className="at-avatar at-avatar--xs"
                      style={{
                        background: 'color-mix(in oklab, var(--at-accent) 22%, transparent)',
                        color: 'var(--at-accent-text)',
                        flex: 'none',
                      }}
                    >
                      DO
                    </span>
                    <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                      <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                        <span className="at-text-strong" style={{ fontSize: 'var(--at-text-xs)' }}>
                          Devon Okafor
                        </span>
                        <span
                          className="at-badge at-badge--neutral"
                          style={{ fontSize: 'var(--at-text-xs)' }}
                        >
                          Author
                        </span>
                        <span
                          className="at-num at-text-muted"
                          style={{ fontFamily: 'var(--at-font-mono)', fontSize: 'var(--at-text-xs)' }}
                        >
                          20h ago
                        </span>
                      </div>
                      <p
                        className="at-text-muted"
                        style={{ fontSize: 'var(--at-text-sm)', lineHeight: 1.6, marginTop: 4 }}
                      >
                        Great point — we added exactly that lint rule in v2. One weekend of setup,
                        years of dividends.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ───────── SIDEBAR (4) ───────── */}
        <aside
          className="at-col-4"
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--at-space-6)', minWidth: 0 }}
        >
          {/* engagement */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--at-space-3)',
                textAlign: 'center',
                marginBlockEnd: 'var(--at-space-4)',
              }}
            >
              <div>
                <div
                  className="at-text-strong at-num"
                  style={{ fontFamily: 'var(--at-font-mono)', fontSize: 'var(--at-text-sm)' }}
                >
                  12.4K
                </div>
                <div
                  className="at-text-muted"
                  style={{
                    fontSize: 'var(--at-text-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Reads
                </div>
              </div>
              <div>
                <div
                  className="at-text-strong at-num"
                  style={{ fontFamily: 'var(--at-font-mono)', fontSize: 'var(--at-text-sm)' }}
                >
                  486
                </div>
                <div
                  className="at-text-muted"
                  style={{
                    fontSize: 'var(--at-text-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Likes
                </div>
              </div>
              <div>
                <div
                  className="at-text-strong at-num"
                  style={{ fontFamily: 'var(--at-font-mono)', fontSize: 'var(--at-text-sm)' }}
                >
                  38
                </div>
                <div
                  className="at-text-muted"
                  style={{
                    fontSize: 'var(--at-text-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Replies
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--at-space-3)' }}>
              <button className="at-btn at-btn--primary at-btn--block">Like</button>
              <button className="at-btn at-btn--outline at-btn--block">Share</button>
            </div>
          </div>

          {/* IN THIS ARTICLE */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">In this article</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {TOC.map((t) => (
                <a
                  key={t.num}
                  href="#"
                  className={`at-cluster ${t.active ? 'at-text-accent' : 'at-text-muted'}`}
                  style={{ textDecoration: 'none', gap: 'var(--at-space-2)' }}
                >
                  <span
                    className="at-num"
                    style={{
                      fontFamily: 'var(--at-font-mono)',
                      fontSize: 'var(--at-text-xs)',
                      color: t.active ? undefined : 'var(--at-text-muted)',
                    }}
                  >
                    {t.num}
                  </span>
                  <span
                    className={t.active ? 'at-text-strong' : undefined}
                    style={{ fontSize: 'var(--at-text-sm)' }}
                  >
                    {t.title}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* RELATED POSTS */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Related posts</div>
              <a href="#" className="at-btn at-btn--ghost at-btn--sm" style={{ textDecoration: 'none' }}>
                More →
              </a>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {RELATED_POSTS.map((p) => (
                <a
                  key={p.title}
                  href="#"
                  className="at-cluster"
                  style={{ gap: 'var(--at-space-3)', flexWrap: 'nowrap', textDecoration: 'none' }}
                >
                  <span
                    style={{
                      flex: 'none',
                      width: 56,
                      height: 56,
                      borderRadius: 'var(--at-radius-md)',
                      background: p.gradient,
                    }}
                  />
                  <span style={{ minWidth: 0 }}>
                    <span
                      className="at-text-strong"
                      style={{ display: 'block', fontSize: 'var(--at-text-sm)', lineHeight: 1.35 }}
                    >
                      {p.title}
                    </span>
                    <span
                      className="at-num at-text-muted"
                      style={{ fontFamily: 'var(--at-font-mono)', fontSize: 'var(--at-text-xs)' }}
                    >
                      {p.meta}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
