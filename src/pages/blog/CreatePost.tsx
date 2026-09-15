/*
 * Hactex React — Blog post editor (blog/create-post).
 * Built with the shared component classes, inline
 * token styles, and demo copy. A two-column blog editor — title/slug/excerpt,
 * cover dropzone, body + toolbar, search & social preview on the left; publish
 * status, organize, and a publish-readiness checklist on the right. Text inputs
 * with live char counts, status radios, and the two publish switches are
 * controlled via useState.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

type Status = 'draft' | 'published' | 'scheduled';

// Body toolbar buttons (kept verbatim from HTML). `H` is bold/display-weight.
const TOOLBAR_GROUPS: { items: { label: string; strong?: boolean }[]; sepAfter?: boolean }[] = [
  {
    items: [{ label: 'H', strong: true }],
    sepAfter: true,
  },
  {
    items: [{ label: 'B' }, { label: 'I' }, { label: '</>' }],
    sepAfter: true,
  },
  {
    items: [{ label: '• List' }, { label: '" Quote' }, { label: 'Link' }, { label: 'Image' }],
  },
];

const CHECKLIST = [
  { label: 'Title is set', done: true },
  { label: 'Excerpt written', done: true },
  { label: 'Cover image added', done: false },
  { label: 'Category selected', done: false },
  { label: 'At least one tag', done: false },
  { label: 'Body has content', done: false },
];

export default function CreatePost(): React.JSX.Element {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [alt, setAlt] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [tags, setTags] = useState('Design Tokens,CSS Variables');
  const [status, setStatus] = useState<Status>('draft');
  const [feature, setFeature] = useState(false);
  const [allowComments, setAllowComments] = useState(true);

  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  const readMin = Math.max(1, Math.round(wordCount / 200));

  return (
    <>
      <PageHead
        title="New Post"
        subtitle="Write your article, set a cover &amp; category, then publish to the blog."
        actions={
          <button className="at-btn at-btn--outline at-press">Back to blog</button>
        }
      />

      <div className="at-row" style={{ gap: 'var(--at-space-6)', alignItems: 'start' }}>
        {/* ───────── LEFT COLUMN (8) ───────── */}
        <div
          className="at-col-8"
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--at-space-6)', minWidth: 0 }}
        >
          {/* TITLE & SLUG */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
              <div>
                <label className="at-form-label" htmlFor="b-title">
                  Title <span className="at-text-danger">*</span>
                </label>
                <input
                  id="b-title"
                  type="text"
                  className="at-input"
                  placeholder="A clear, compelling headline"
                  maxLength={120}
                  style={{
                    fontFamily: 'var(--at-font-display)',
                    fontSize: 'var(--at-text-lg)',
                    fontWeight: 600,
                  }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p
                  className="at-text-muted"
                  style={{ fontSize: 'var(--at-text-sm)', marginTop: 'var(--at-space-1)' }}
                >
                  <span className="at-num">{title.length}</span> / 120 — strong titles are specific and
                  promise a payoff.
                </p>
              </div>
              <div>
                <label className="at-form-label" htmlFor="b-slug">
                  URL slug
                </label>
                <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                  <span
                    className="at-num"
                    style={{
                      color: 'var(--at-text-muted)',
                      fontFamily: 'var(--at-font-mono)',
                      fontSize: 'var(--at-text-xs)',
                      paddingInline: 'var(--at-space-3)',
                      alignSelf: 'stretch',
                      display: 'inline-flex',
                      alignItems: 'center',
                      border: 'var(--at-border-w-sm) solid var(--at-border)',
                      borderRadius: 'var(--at-radius-sm)',
                      background: 'var(--at-surface-subtle)',
                    }}
                  >
                    /blog/
                  </span>
                  <input
                    id="b-slug"
                    type="text"
                    className="at-input at-num"
                    placeholder="your-post-slug"
                    style={{ fontFamily: 'var(--at-font-mono)' }}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
                <p
                  className="at-text-muted"
                  style={{ fontSize: 'var(--at-text-sm)', marginTop: 'var(--at-space-1)' }}
                >
                  Auto-generated from the title — edit for a custom link.
                </p>
              </div>
              <div>
                <label className="at-form-label" htmlFor="b-excerpt">
                  Excerpt
                </label>
                <textarea
                  id="b-excerpt"
                  className="at-textarea"
                  rows={2}
                  placeholder="A one-or-two-line summary shown on cards, search and social previews."
                  maxLength={180}
                  style={{ minHeight: 64 }}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
                <p
                  className="at-text-muted"
                  style={{ fontSize: 'var(--at-text-sm)', marginTop: 'var(--at-space-1)' }}
                >
                  <span className="at-num">{excerpt.length}</span> / 180 characters
                </p>
              </div>
            </div>
          </div>

          {/* COVER IMAGE */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Cover image</div>
                <div className="at-eyebrow">Shown at the top of the article and on listing cards.</div>
              </div>
            </div>
            {/* empty dropzone */}
            <div
              style={{
                border: '2px dashed var(--at-border)',
                borderRadius: 'var(--at-radius-md)',
                padding: 'var(--at-space-6)',
                textAlign: 'center',
                background: 'var(--at-surface-subtle)',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  width: 32,
                  height: 32,
                  color: 'var(--at-text-muted)',
                  margin: '0 auto var(--at-space-2)',
                }}
              >
                <path d="M15 8h.01" />
                <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12" />
                <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
                <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
              </svg>
              <div className="at-text-strong">Click to upload or drag &amp; drop</div>
              <small className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                PNG, JPG or WEBP up to 5 MB · 16:9 recommended
              </small>
            </div>
            <div style={{ marginTop: 'var(--at-space-4)' }}>
              <label className="at-form-label" htmlFor="b-alt">
                Alt text
              </label>
              <input
                id="b-alt"
                type="text"
                className="at-input"
                placeholder="Describe the image for screen readers"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
              />
            </div>
          </div>

          {/* BODY */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Body</div>
                <div className="at-eyebrow">The full article. Use the toolbar to format.</div>
              </div>
              <span
                className="at-num at-text-muted"
                style={{ fontFamily: 'var(--at-font-mono)', fontSize: 'var(--at-text-xs)' }}
              >
                {wordCount} words · {readMin} min read
              </span>
            </div>
            {/* toolbar */}
            <div
              className="at-cluster"
              style={{
                gap: 2,
                padding: 6,
                border: '1px solid var(--at-border)',
                borderBottom: 0,
                borderRadius: 'var(--at-radius-sm) var(--at-radius-sm) 0 0',
                background: 'var(--at-surface-subtle)',
                flexWrap: 'wrap',
              }}
            >
              {TOOLBAR_GROUPS.map((g, gi) => (
                <span key={gi} className="at-cluster" style={{ gap: 2 }}>
                  {g.items.map((b) => (
                    <button key={b.label} className="at-btn at-btn--ghost at-btn--sm">
                      {b.strong ? (
                        <span style={{ fontFamily: 'var(--at-font-display)', fontWeight: 700 }}>
                          {b.label}
                        </span>
                      ) : (
                        b.label
                      )}
                    </button>
                  ))}
                  {g.sepAfter && (
                    <span style={{ width: 1, background: 'var(--at-border)', margin: '2px 4px' }} />
                  )}
                </span>
              ))}
            </div>
            <textarea
              id="b-body"
              className="at-textarea"
              rows={14}
              placeholder="Start writing your story… A strong opening earns the next paragraph — lead with the payoff, then explain how you got there."
              style={{
                borderRadius: '0 0 var(--at-radius-sm) var(--at-radius-sm)',
                minHeight: 340,
                lineHeight: 1.7,
              }}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          {/* SEARCH & SOCIAL PREVIEW */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Search &amp; social preview</div>
                <div className="at-eyebrow">How this post appears in search results and shares.</div>
              </div>
            </div>
            <div
              className="at-stack"
              style={{
                gap: 'var(--at-space-5)',
                padding: 'var(--at-space-4)',
                border: '1px solid var(--at-border)',
                borderRadius: 'var(--at-radius-md)',
                background: 'var(--at-surface-subtle)',
                marginBlockEnd: 'var(--at-space-5)',
              }}
            >
              <span
                className="at-num at-text-muted"
                style={{ fontFamily: 'var(--at-font-mono)', fontSize: 'var(--at-text-xs)' }}
              >
                atelier.blog › blog › {slug || 'your-post-slug'}
              </span>
              <span
                className="at-text-accent"
                style={{ fontSize: 'var(--at-text-sm)', fontWeight: 500 }}
              >
                {metaTitle || title || 'Your post title'}
              </span>
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', lineHeight: 1.4 }}>
                {metaDesc || excerpt || 'Your meta description appears here. Aim for 120–155 characters.'}
              </span>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
              <div>
                <label className="at-form-label" htmlFor="b-metatitle">
                  Meta title
                </label>
                <input
                  id="b-metatitle"
                  type="text"
                  className="at-input"
                  placeholder="Defaults to the post title"
                  maxLength={70}
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
                <p
                  className="at-text-muted"
                  style={{ fontSize: 'var(--at-text-sm)', marginTop: 'var(--at-space-1)' }}
                >
                  <span className="at-num">{metaTitle.length}</span> / 70
                </p>
              </div>
              <div>
                <label className="at-form-label" htmlFor="b-metadesc">
                  Meta description
                </label>
                <textarea
                  id="b-metadesc"
                  className="at-textarea"
                  rows={2}
                  placeholder="A concise summary for search engines"
                  maxLength={160}
                  style={{ minHeight: 64 }}
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                />
                <p
                  className="at-text-muted"
                  style={{ fontSize: 'var(--at-text-sm)', marginTop: 'var(--at-space-1)' }}
                >
                  <span className="at-num">{metaDesc.length}</span> / 160
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ───────── RIGHT RAIL (4) ───────── */}
        <aside
          className="at-col-4"
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--at-space-6)', minWidth: 0 }}
        >
          {/* PUBLISH */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Publish</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {([
                {
                  key: 'draft' as const,
                  title: 'Draft',
                  desc: 'Only visible to your team',
                  dot: 'var(--at-text-muted)',
                },
                {
                  key: 'published' as const,
                  title: 'Published',
                  desc: 'Live on the blog immediately',
                  dot: 'var(--at-success)',
                },
                {
                  key: 'scheduled' as const,
                  title: 'Scheduled',
                  desc: 'Goes live at a set time',
                  dot: 'var(--at-warning)',
                },
              ]).map((s) => (
                <label
                  key={s.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--at-space-3)',
                    cursor: 'pointer',
                    borderRadius: 'var(--at-radius-md)',
                    padding: 'var(--at-space-3) var(--at-space-4)',
                    border: status === s.key ? '1.5px solid var(--at-accent)' : '1.5px solid var(--at-border)',
                    background: status === s.key ? 'var(--at-accent-wash)' : 'var(--at-surface)',
                  }}
                >
                  <input
                    type="radio"
                    name="b-status"
                    checked={status === s.key}
                    onChange={() => setStatus(s.key)}
                  />
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      flex: 'none',
                      background: s.dot,
                    }}
                  />
                  <span style={{ flex: '1 1 auto' }}>
                    <span
                      className="at-text-strong"
                      style={{ display: 'block', fontSize: 'var(--at-text-sm)' }}
                    >
                      {s.title}
                    </span>
                    <span
                      className="at-text-muted"
                      style={{ display: 'block', fontSize: 'var(--at-text-xs)' }}
                    >
                      {s.desc}
                    </span>
                  </span>
                </label>
              ))}
            </div>

            <div className="at-divider" style={{ marginBlock: 'var(--at-space-4)' }} />

            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <label className="at-check" style={{ gap: 'var(--at-space-3)' }}>
                <button
                  type="button"
                  className={`at-switch${feature ? ' is-on' : ''}`}
                  onClick={() => setFeature((v) => !v)}
                >
                  <span className="at-switch__thumb" />
                </button>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>
                    Feature on homepage
                  </span>
                  <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                    Pins this post to the top of the blog.
                  </span>
                </span>
              </label>
              <label className="at-check" style={{ gap: 'var(--at-space-3)' }}>
                <button
                  type="button"
                  className={`at-switch${allowComments ? ' is-on' : ''}`}
                  onClick={() => setAllowComments((v) => !v)}
                >
                  <span className="at-switch__thumb" />
                </button>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>
                    Allow comments
                  </span>
                  <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                    Readers can respond below the article.
                  </span>
                </span>
              </label>
            </div>
          </div>

          {/* ORGANIZE */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Organize</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
              <div>
                <label className="at-form-label" htmlFor="b-category">
                  Category <span className="at-text-danger">*</span>
                </label>
                <select id="b-category" className="at-select">
                  <option value="">Select a category</option>
                  <option value="eng">Engineering</option>
                  <option value="design">Design</option>
                  <option value="product">Product</option>
                  <option value="growth">Growth</option>
                  <option value="culture">Culture</option>
                </select>
              </div>
              <div>
                <label className="at-form-label" htmlFor="b-author">
                  Author
                </label>
                <select id="b-author" className="at-select">
                  <option value="devon">Devon Okafor</option>
                  <option value="lena">Lena Brandt</option>
                  <option value="priya">Priya Nair</option>
                  <option value="marcus">Marcus Reid</option>
                  <option value="ava">Ava Sutton</option>
                </select>
              </div>
              <div>
                <label className="at-form-label" htmlFor="b-tags">
                  Tags
                </label>
                <div
                  className="at-cluster"
                  style={{
                    gap: 'var(--at-space-2)',
                    flexWrap: 'wrap',
                    padding: 'var(--at-space-2)',
                    border: 'var(--at-border-w-sm) solid var(--at-border)',
                    borderRadius: 'var(--at-radius-sm)',
                    background: 'var(--at-surface)',
                    alignItems: 'center',
                  }}
                >
                  {tags
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((t) => (
                      <span key={t} className="at-badge at-badge--accent">
                        {t}
                      </span>
                    ))}
                  <input
                    id="b-tags"
                    type="text"
                    placeholder="Add a tag…"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    style={{
                      border: 0,
                      outline: 'none',
                      flex: '1 1 80px',
                      minWidth: 80,
                      background: 'transparent',
                    }}
                  />
                </div>
                <p
                  className="at-text-muted"
                  style={{ fontSize: 'var(--at-text-sm)', marginTop: 'var(--at-space-1)' }}
                >
                  Press Enter or comma to add. Helps readers discover this post.
                </p>
              </div>
            </div>
          </div>

          {/* READY TO PUBLISH? */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Ready to publish?</div>
            </div>
            <div className="at-list">
              {CHECKLIST.map((c) => (
                <div key={c.label} className="at-list__item">
                  <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                    <span className={c.done ? 'at-text-success' : 'at-text-muted'}>
                      {c.done ? '✓' : '○'}
                    </span>
                    <span
                      className={c.done ? 'at-text-strong' : 'at-text-muted'}
                      style={{ fontSize: 'var(--at-text-sm)' }}
                    >
                      {c.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* sticky action bar */}
      <div
        className="at-card at-cluster"
        style={{
          justifyContent: 'space-between',
          gap: 'var(--at-space-3)',
          flexWrap: 'wrap',
          padding: 'var(--at-space-5)',
          marginTop: 'var(--at-space-6)',
        }}
      >
        <span
          className="at-cluster at-text-muted"
          style={{ gap: 'var(--at-space-2)', fontSize: 'var(--at-text-sm)' }}
        >
          <span>●</span>
          <span>Draft autosaved · just now</span>
        </span>
        <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
          <button className="at-btn at-btn--ghost at-press">Preview</button>
          <button className="at-btn at-btn--outline at-press">Save draft</button>
          <button className="at-btn at-btn--primary at-press">Publish post</button>
        </div>
      </div>
    </>
  );
}
