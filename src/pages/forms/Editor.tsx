/*
 * Hactex React — Rich-text editor surfaces.
 * Built with the shared component classes, inline token
 * styles. The editable surface is a contenteditable demo; document fields are
 * controlled and the source view toggles between HTML and Markdown.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

export default function Editor(): React.JSX.Element {
  const [title, setTitle] = useState('Designing for both light and dark');
  const [slug, setSlug] = useState('designing-for-light-and-dark');
  const [excerpt, setExcerpt] = useState(
    'A field guide to token-driven theming that ships dark mode from a single source of truth.',
  );
  const [view, setView] = useState<'html' | 'md'>('html');

  return (
    <>
      <PageHead
        title="Editor"
        subtitle="Rich-text and code editing surfaces — WYSIWYG chrome and a source view."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Save draft</button>
            <button className="at-btn at-btn--primary at-press">Publish</button>
          </>
        }
      />

      <div className="at-row">
        {/* Article body (main editor) */}
        <div className="at-col-8 at-card" style={{ padding: 'var(--at-space-5)' }}>
          <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
            <div>
              <div className="at-chart__title">Article body</div>
              <div className="at-eyebrow">Format with the toolbar — output is sanitized HTML</div>
            </div>
            <span className="at-text-muted at-mono" style={{ fontSize: 'var(--at-text-xs)' }}>
              248 words · ~1 min read
            </span>
          </div>
          {/* toolbar */}
          <div
            className="at-segment"
            style={{ flexWrap: 'wrap', gap: 'var(--at-space-1)', marginBlockEnd: 'var(--at-space-3)' }}
          >
            <button type="button" className="at-btn at-btn--ghost at-btn--sm at-press">
              <strong>B</strong>
            </button>
            <button type="button" className="at-btn at-btn--ghost at-btn--sm at-press">
              <em>I</em>
            </button>
            <button type="button" className="at-btn at-btn--ghost at-btn--sm at-press">
              <u>U</u>
            </button>
            <button type="button" className="at-btn at-btn--ghost at-btn--sm at-press">
              <s>S</s>
            </button>
            <span
              style={{ width: '1px', background: 'var(--at-ink)', alignSelf: 'stretch', opacity: 0.2 }}
            />
            <button type="button" className="at-btn at-btn--ghost at-btn--sm at-press">
              • List
            </button>
            <button type="button" className="at-btn at-btn--ghost at-btn--sm at-press">
              1. List
            </button>
            <span
              style={{ width: '1px', background: 'var(--at-ink)', alignSelf: 'stretch', opacity: 0.2 }}
            />
            <button type="button" className="at-btn at-btn--ghost at-btn--sm at-press">
              Link
            </button>
            <button type="button" className="at-btn at-btn--ghost at-btn--sm at-press">
              Image
            </button>
            <button type="button" className="at-btn at-btn--ghost at-btn--sm at-press">
              &lt;/&gt;
            </button>
          </div>
          {/* editable surface */}
          <div
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            style={{
              minHeight: '320px',
              padding: 'var(--at-space-5)',
              background: 'var(--at-surface)',
              border: '2px solid var(--at-ink)',
              borderRadius: 'var(--at-radius-md)',
              lineHeight: 1.7,
              outline: 'none',
            }}
          >
            <h2 style={{ margin: '0 0 0.5em' }}>Designing for both light and dark</h2>
            <p style={{ margin: '0 0 1em' }}>
              A resilient interface earns its <strong>contrast</strong> from role tokens, not
              hard-coded hex. When every color resolves through a semantic variable, flipping the theme
              becomes a one-attribute change.
            </p>
            <blockquote
              style={{
                margin: '0 0 1em',
                paddingInlineStart: 'var(--at-space-4)',
                borderInlineStart: '3px solid var(--at-accent)',
                color: 'var(--at-text-muted)',
                fontStyle: 'italic',
              }}
            >
              The fastest way to ship a dark mode is to never write a literal color in the first place.
            </blockquote>
            <ul style={{ margin: 0, paddingInlineStart: '1.25em' }}>
              <li>Surfaces and borders read on both light and dark canvases.</li>
              <li>Numerics stay tabular for clean column alignment.</li>
              <li>Decorative icons are hidden from assistive tech.</li>
            </ul>
          </div>
          <div
            className="at-cluster"
            style={{ justifyContent: 'space-between', marginBlockStart: 'var(--at-space-3)' }}
          >
            <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
              Autosaved 12s ago
            </span>
            <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
              Sanitized HTML · paste cleaned automatically
            </span>
          </div>
        </div>

        {/* Sidebar: Document + Statistics */}
        <div className="at-col-4 at-stack" style={{ gap: 'var(--at-space-5)' }}>
          {/* Document meta */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Document</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
              <div>
                <label className="at-form-label">Title</label>
                <input
                  className="at-input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="at-form-label">Slug</label>
                <div className="at-input-group">
                  <span className="at-input-group__addon at-input-group__addon--prefix">/blog/</span>
                  <input
                    className="at-input"
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="at-form-label">Excerpt</label>
                <textarea
                  className="at-textarea"
                  rows={3}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
                <div className="at-form-hint">Used for previews &amp; meta description · {excerpt.length} / 160</div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Statistics</div>
            </div>
            <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
              {([
                { label: 'Words', value: '248' },
                { label: 'Characters', value: '1,486' },
                { label: 'Read time', value: '1m' },
                { label: 'Headings', value: '1' },
              ]).map((s) => (
                <div key={s.label} className="at-col-6">
                  <div
                    className="at-text-muted"
                    style={{
                      fontSize: 'var(--at-text-xs)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {s.label}
                  </div>
                  <div className="at-text-strong at-mono" style={{ fontSize: 'var(--at-text-lg)' }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Source view (full width) */}
        <div className="at-col-12 at-card" style={{ padding: 'var(--at-space-5)' }}>
          <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
            <div>
              <div className="at-chart__title">Source view</div>
              <div className="at-eyebrow">
                Edit the underlying markup directly with syntax highlighting
              </div>
            </div>
            <div className="at-segment">
              <button
                type="button"
                className={`at-segment__btn${view === 'html' ? ' is-active' : ''}`}
                onClick={() => setView('html')}
              >
                HTML
              </button>
              <button
                type="button"
                className={`at-segment__btn${view === 'md' ? ' is-active' : ''}`}
                onClick={() => setView('md')}
              >
                Markdown
              </button>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              background: 'var(--at-surface)',
              border: '2px solid var(--at-ink)',
              borderRadius: 'var(--at-radius-md)',
              overflow: 'hidden',
              fontFamily: 'var(--at-font-mono, monospace)',
              fontSize: 'var(--at-text-sm)',
              lineHeight: 1.7,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                flex: '0 0 auto',
                padding: 'var(--at-space-4)',
                textAlign: 'end',
                color: 'var(--at-text-muted)',
                borderInlineEnd: '1px solid var(--at-ink)',
                opacity: 0.6,
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <div key={n}>{n}</div>
              ))}
            </div>
            <pre
              style={{
                margin: 0,
                padding: 'var(--at-space-4)',
                whiteSpace: 'pre',
                overflowX: 'auto',
                flex: 1,
              }}
            >
              {view === 'html'
                ? `<article class="post">
  <h2>Designing for both light and dark</h2>
  <p>A resilient interface earns its <strong>contrast</strong>
  from role tokens, not hard-coded hex.</p>
  <blockquote>
    The fastest way to ship dark mode is to never
    write a literal color in the first place.
  </blockquote>
</article>`
                : `## Designing for both light and dark

A resilient interface earns its **contrast** from role
tokens, not hard-coded hex.

> The fastest way to ship dark mode is to never write a
> literal color in the first place.`}
            </pre>
          </div>
          <div
            className="at-cluster"
            style={{ justifyContent: 'space-between', marginBlockStart: 'var(--at-space-3)' }}
          >
            <span className="at-text-muted at-mono" style={{ fontSize: 'var(--at-text-xs)' }}>
              Ln 3, Col 18 · spaces: 2
            </span>
            <span className="at-text-muted at-mono" style={{ fontSize: 'var(--at-text-xs)' }}>
              {view === 'html' ? 'text/html · UTF-8' : 'text/markdown · UTF-8'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
