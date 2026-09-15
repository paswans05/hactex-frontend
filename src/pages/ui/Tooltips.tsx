/*
 * Hactex React — Tooltips UI page.
 * Built with the shared component classes, inline token
 * styles, and demo figures. Static markup (the .at-tip CSS-hover system is
 * preserved via a <style> tag; data-tip attributes stay kebab-case in JSX).
 */
import { PageHead } from '../../components/shell/PageHead';

export default function Tooltips(): React.JSX.Element {
  return (
    <>
      <style>{`
        .at-tip {
          position: relative;
          display: inline-flex;
          align-items: center;
          cursor: help;
          border-bottom: 2px dotted var(--at-ink);
          font-weight: 600;
        }
        .at-tip::before,
        .at-tip::after {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.12s ease;
          z-index: 20;
        }
        .at-tip::before {
          content: attr(data-tip);
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--at-ink-strong);
          color: var(--at-paper);
          padding: 4px 8px;
          font-size: var(--at-text-xs);
          font-weight: 600;
          white-space: nowrap;
          border: 2px solid var(--at-ink);
        }
        .at-tip--right::before {
          bottom: auto;
          left: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
        }
        .at-tip--left::before {
          bottom: auto;
          left: auto;
          right: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
        }
        .at-tip--bottom::before {
          bottom: auto;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
        }
        .at-tip--outline::before {
          background: var(--at-paper);
          color: var(--at-text-strong);
        }
        .at-tip--accent::before {
          background: var(--at-accent);
          color: var(--at-on-accent);
          border-color: var(--at-ink);
        }
        .at-tip:hover::before,
        .at-tip:focus-within::before {
          opacity: 1;
        }
        .at-tip--rich {
          border-bottom: 2px dotted var(--at-ink);
          cursor: help;
        }
        .at-tip__rich {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          width: 220px;
          background: var(--at-ink-strong);
          color: var(--at-paper);
          padding: var(--at-space-3);
          border: 2px solid var(--at-ink);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.12s ease;
          z-index: 20;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .at-tip--rich:hover .at-tip__rich {
          opacity: 1;
        }
        .at-tip__rich-title {
          font-weight: 700;
        }
        .at-tip__rich-body {
          font-size: var(--at-text-xs);
          opacity: 0.9;
        }
        .at-tip__rich-keys {
          display: flex;
          gap: 4px;
          margin-block-start: 2px;
        }
        .at-tip__rich-keys kbd {
          font-size: var(--at-text-xs);
          background: var(--at-paper);
          color: var(--at-text-strong);
          padding: 1px 6px;
          border: 1px solid var(--at-paper);
          font-family: inherit;
        }
        .at-tip-grid {
          overflow: visible;
        }
      `}</style>

      <PageHead
        title="Tooltips"
        subtitle="Contextual hints that appear on hover or focus."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Docs</button>
            <button className="at-btn at-btn--primary at-press">New</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* 1. Placements */}
          <div className="at-col-6 at-card at-tip-grid" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Placements</div>
                <div className="at-eyebrow">Top, right, bottom, left</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-5)', justifyContent: 'center', padding: 'var(--at-space-5)' }}>
              <span className="at-tip" data-tip="Tooltip on top">Top</span>
              <span className="at-tip at-tip--right" data-tip="Tooltip on right">Right</span>
              <span className="at-tip at-tip--bottom" data-tip="Tooltip on bottom">Bottom</span>
              <span className="at-tip at-tip--left" data-tip="Tooltip on left">Left</span>
            </div>
          </div>

          {/* 2. Variants */}
          <div className="at-col-6 at-card at-tip-grid" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Variants</div>
                <div className="at-eyebrow">Inverted, outline, accent</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-5)', justifyContent: 'center', padding: 'var(--at-space-5)' }}>
              <span className="at-tip" data-tip="Inverted (dark)">Inverted</span>
              <span className="at-tip at-tip--outline" data-tip="Outlined bubble">Outline</span>
              <span className="at-tip at-tip--accent" data-tip="Accent emphasis">Accent</span>
            </div>
          </div>

          {/* 3. Icon-only controls */}
          <div className="at-col-6 at-card at-tip-grid" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Icon-only controls</div>
                <div className="at-eyebrow">Labels on icon buttons</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-4)', justifyContent: 'center', padding: 'var(--at-space-5)' }}>
              <span className="at-tip at-tip--bottom" data-tip="Search">
                <button className="at-btn at-btn--outline at-btn--icon at-press" aria-label="Search">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </span>
              <span className="at-tip at-tip--bottom" data-tip="Download">
                <button className="at-btn at-btn--outline at-btn--icon at-press" aria-label="Download">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              </span>
              <span className="at-tip at-tip--bottom" data-tip="Help">
                <button className="at-btn at-btn--outline at-btn--icon at-press" aria-label="Help">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </button>
              </span>
            </div>
          </div>

          {/* 4. Rich tooltip */}
          <div className="at-col-6 at-card at-tip-grid" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Rich tooltip</div>
                <div className="at-eyebrow">Title, body and shortcut</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-4)', justifyContent: 'center', padding: 'var(--at-space-5)' }}>
              <span className="at-tip at-tip--rich">
                Hover for details
                <span className="at-tip__rich">
                  <span className="at-tip__rich-title">Quick add</span>
                  <span className="at-tip__rich-body">Create a new item from anywhere without leaving the current view.</span>
                  <span className="at-tip__rich-keys"><kbd>⌘</kbd> <kbd>N</kbd></span>
                </span>
              </span>
            </div>
          </div>

          {/* 5. Native */}
          <div className="at-col-12 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Native</div>
                <div className="at-eyebrow">Browser title attribute</div>
              </div>
            </div>
            <p className="at-text-muted" style={{ marginBlockEnd: 'var(--at-space-4)' }}>
              The simplest tooltip — no JavaScript, styled by the browser. Useful for zero-dependency hints on static elements.
            </p>
            <div className="at-cluster" style={{ gap: 'var(--at-space-4)' }}>
              <button className="at-btn at-btn--outline at-press" title="Saves the current document to disk">
                Save file
              </button>
              <button className="at-btn at-btn--outline at-press" title="Sends a copy to the clipboard">
                Copy
              </button>
              <span className="at-text-strong">Hover this word for a native tooltip</span>
              <a href="#" style={{ color: 'var(--at-accent-text)', textDecoration: 'underline' }} title="Follow this link to the help center">
                Help center
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
