/*
 * Hactex React — Typography UI page.
 * Built with the shared component classes, inline token
 * styles, and demo figures. Static markup, no component state.
 */
import { PageHead } from '../../components/shell/PageHead';

const SCALE = [
  { tag: '2xs', size: 'var(--at-text-2xs)' },
  { tag: 'xs', size: 'var(--at-text-xs)' },
  { tag: 'sm', size: 'var(--at-text-sm)' },
  { tag: 'base', size: 'var(--at-text-base)' },
  { tag: 'md', size: 'var(--at-text-md)' },
  { tag: 'lg', size: 'var(--at-text-lg)' },
];

const CODE_BLOCK = `const atelier = {
  border: '2px solid var(--at-ink)',
  shadow: '4px 4px 0 var(--at-ink)',
  press: true,
}`;

export default function Typography(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Typography"
        subtitle="Scale, rhythm and voice for the written word."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Export</button>
            <button className="at-btn at-btn--primary at-press">Style guide</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* 1. Type scale */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Type scale</div>
                <div className="at-eyebrow">2xs through xl</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-2)' }}>
              {SCALE.map((s) => (
                <div key={s.tag} className="at-cluster" style={{ gap: 'var(--at-space-3)', alignItems: 'baseline' }}>
                  <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', minWidth: '32px' }}>{s.tag}</span>
                  <span style={{ fontSize: s.size }}>The quick brown fox</span>
                </div>
              ))}
              <div className="at-cluster" style={{ gap: 'var(--at-space-3)', alignItems: 'baseline' }}>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', minWidth: '32px' }}>xl</span>
                <span style={{ fontSize: 'var(--at-text-xl)', fontWeight: 700 }}>The quick brown fox</span>
              </div>
            </div>
          </div>

          {/* 2. Typefaces */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Typefaces</div>
                <div className="at-eyebrow">Sans and mono</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBlockEnd: 'var(--at-space-1)' }}>
                  Sans · Display
                </div>
                <div style={{ fontSize: 'var(--at-text-lg)', fontWeight: 700 }}>
                  Hactex Bold Press
                </div>
                <div style={{ fontSize: 'var(--at-text-sm)', marginBlockStart: 'var(--at-space-1)' }}>
                  Used for headings, labels and editorial copy.
                </div>
              </div>
              <div>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBlockEnd: 'var(--at-space-1)' }}>
                  Mono · Data
                </div>
                <div style={{ fontFamily: 'var(--at-mono, ui-monospace, SFMono-Regular, Menlo, monospace)', fontSize: 'var(--at-text-lg)', fontWeight: 600 }}>
                  $748,204.12
                </div>
                <div style={{ fontSize: 'var(--at-text-sm)', fontFamily: 'var(--at-mono, ui-monospace, SFMono-Regular, Menlo, monospace)', marginBlockStart: 'var(--at-space-1)' }}>
                  0xA1B2 · C3D4 · E5F6
                </div>
              </div>
            </div>
          </div>

          {/* 3. Headings */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Headings</div>
                <div className="at-eyebrow">h1 through h6</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-1)' }}>
              {/* No inline sizes. This card documents the heading ladder, so
                  it has to RENDER the ladder — every size and weight here
                  comes from base.css. They used to be hardcoded rem values
                  (2/1.5/1.25/1.125/1rem), which meant retuning the scale
                  moved all 115 pages and left this one card asserting the
                  old numbers. Only the margin reset stays; the stack owns
                  the spacing between rows. */}
              <h1 style={{ margin: 0 }}>Heading level 1</h1>
              <h2 style={{ margin: 0 }}>Heading level 2</h2>
              <h3 style={{ margin: 0 }}>Heading level 3</h3>
              <h4 style={{ margin: 0 }}>Heading level 4</h4>
              <h5 style={{ margin: 0 }}>Heading level 5</h5>
              <h6 style={{ margin: 0 }}>Heading level 6</h6>
            </div>
          </div>

          {/* 4. Lead & body */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Lead &amp; body</div>
                <div className="at-eyebrow">Intro and paragraph copy</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <p style={{ fontSize: 'var(--at-text-lg)', fontWeight: 600, margin: 0 }}>
                A well-set lead paragraph draws the reader into the page and sets the editorial tone for everything that follows.
              </p>
              <p className="at-text-muted" style={{ margin: 0 }}>
                Body copy is set at a comfortable reading size with generous measure. Keep sentences short and paragraphs focused so that the eye can move steadily down the page without fatigue.
              </p>
            </div>
          </div>

          {/* 5. Inline elements */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Inline elements</div>
                <div className="at-eyebrow">Emphasis within text</div>
              </div>
            </div>
            <p style={{ margin: 0 }}>
              You can use <strong>strong importance</strong>, <em>emphasized italics</em>,
              <code style={{ fontFamily: 'var(--at-mono, ui-monospace, monospace)', background: 'var(--at-surface)', padding: '1px 4px', border: '1px solid var(--at-ink)' }}>inline code</code>, and
              <mark style={{ background: 'color-mix(in oklab, var(--at-lime) 60%, transparent)', padding: '1px 4px' }}>highlighted text</mark>
              to add structure within a sentence. Links like
              <a href="#" style={{ color: 'var(--at-accent-text)', textDecoration: 'underline' }}>this one</a>
              draw attention.
            </p>
          </div>

          {/* 6. Blockquote */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Blockquote</div>
                <div className="at-eyebrow">Quoted passages</div>
              </div>
            </div>
            <blockquote style={{ margin: 0, padding: 'var(--at-space-4)', borderInlineStart: '4px solid var(--at-ink)', background: 'var(--at-surface)' }}>
              <p style={{ margin: 0, fontSize: 'var(--at-text-lg)', fontWeight: 600 }}>
                Design is not just what it looks like and feels like. Design is how it works.
              </p>
              <footer style={{ marginBlockStart: 'var(--at-space-2)', fontSize: 'var(--at-text-sm)' }} className="at-text-muted">
                — Steve Jobs
              </footer>
            </blockquote>
          </div>

          {/* 7. Lists */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Lists</div>
                <div className="at-eyebrow">Unordered and ordered</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-5)', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBlockEnd: 'var(--at-space-2)' }}>
                  Unordered
                </div>
                <ul style={{ margin: 0, paddingInlineStart: 'var(--at-space-5)' }}>
                  <li>Thick ink borders</li>
                  <li>Hard offset shadows</li>
                  <li>Mechanical press feel</li>
                </ul>
              </div>
              <div style={{ flex: 1 }}>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBlockEnd: 'var(--at-space-2)' }}>
                  Ordered
                </div>
                <ol style={{ margin: 0, paddingInlineStart: 'var(--at-space-5)' }}>
                  <li>Read the brief</li>
                  <li>Sketch the layout</li>
                  <li>Ship the build</li>
                </ol>
              </div>
            </div>
          </div>

          {/* 8. Code block */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Code block</div>
                <div className="at-eyebrow">Preformatted source</div>
              </div>
            </div>
            <pre style={{ margin: 0, padding: 'var(--at-space-4)', background: 'var(--at-ink-strong)', color: 'var(--at-paper)', border: '2px solid var(--at-ink)', overflowX: 'auto', fontFamily: 'var(--at-mono, ui-monospace, SFMono-Regular, Menlo, monospace)', fontSize: 'var(--at-text-sm)' }}>
              <code>{CODE_BLOCK}</code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
