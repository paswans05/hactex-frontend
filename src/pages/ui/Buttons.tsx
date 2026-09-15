/*
 * Hactex React — Buttons UI page.
 * Built with the shared component classes, inline token
 * styles, and demo figures. Static markup, no component state.
 */
import { PageHead } from '../../components/shell/PageHead';

export default function Buttons(): React.JSX.Element {
  return (
    <>
      <style>{`@keyframes at-spin { to { transform: rotate(360deg); } }`}</style>

      <PageHead
        title="Buttons"
        subtitle="Trigger actions with the Bold Press button system."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Secondary</button>
            <button className="at-btn at-btn--primary at-press">Primary</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* 1. Variants */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Variants</div>
                <div className="at-eyebrow">Core button styles</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
              <button className="at-btn at-btn--primary at-press">Primary</button>
              <button className="at-btn at-btn--dark at-press">Dark</button>
              <button className="at-btn at-btn--outline at-press">Outline</button>
              <button className="at-btn at-btn--ghost at-press">Ghost</button>
            </div>
          </div>

          {/* 2. Pill buttons */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Pill buttons</div>
                <div className="at-eyebrow">Fully rounded edges</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
              <button className="at-btn at-btn--primary at-press" style={{ borderRadius: '999px' }}>
                Primary
              </button>
              <button className="at-btn at-btn--outline at-press" style={{ borderRadius: '999px' }}>
                Outline
              </button>
              <button className="at-btn at-btn--ghost at-press" style={{ borderRadius: '999px' }}>
                Ghost
              </button>
            </div>
          </div>

          {/* 3. Tones */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Tones</div>
                <div className="at-eyebrow">Colored semantic variants</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
              <button className="at-btn at-press" style={{ background: 'var(--at-success)', color: 'var(--at-on-success)' }}>
                Success
              </button>
              <button className="at-btn at-press" style={{ background: 'var(--at-warning)', color: 'var(--at-on-warning)' }}>
                Warning
              </button>
              <button className="at-btn at-press" style={{ background: 'var(--at-danger)', color: 'var(--at-on-danger)' }}>
                Danger
              </button>
              <button className="at-btn at-press" style={{ background: 'var(--at-info)', color: 'var(--at-on-info)' }}>
                Info
              </button>
            </div>
          </div>

          {/* 4. Sizes */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Sizes</div>
                <div className="at-eyebrow">Small, medium, large</div>
              </div>
            </div>
            <div className="at-cluster" style={{ alignItems: 'center', gap: 'var(--at-space-3)' }}>
              <button className="at-btn at-btn--primary at-btn--sm at-press">Small</button>
              <button className="at-btn at-btn--primary at-press">Medium</button>
              <button className="at-btn at-btn--primary at-btn--lg at-press">Large</button>
            </div>
          </div>

          {/* 5. Leading & trailing icons */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Leading &amp; trailing icons</div>
                <div className="at-eyebrow">Icons paired with labels</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
              <button className="at-btn at-btn--primary at-press">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New item
              </button>
              <button className="at-btn at-btn--outline at-press">
                Continue
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>

          {/* 6. Icon-only */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Icon-only</div>
                <div className="at-eyebrow">Square icon buttons</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
              <button className="at-btn at-btn--primary at-btn--icon at-press" aria-label="Search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              <button className="at-btn at-btn--outline at-btn--icon at-press" aria-label="Settings">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </button>
              <button className="at-btn at-btn--ghost at-btn--icon at-press" aria-label="Trash">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>

          {/* 7. Loading state */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Loading state</div>
                <div className="at-eyebrow">Pending actions</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
              <button className="at-btn at-btn--primary at-press" disabled>
                <span className="at-spinner" style={{ width: '14px', height: '14px', border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'at-spin 0.7s linear infinite' }} />
                Saving…
              </button>
              <button className="at-btn at-btn--outline at-press" disabled>
                <span className="at-spinner" style={{ width: '14px', height: '14px', border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'at-spin 0.7s linear infinite' }} />
                Loading…
              </button>
            </div>
          </div>

          {/* 8. Block & disabled */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Block &amp; disabled</div>
                <div className="at-eyebrow">Full width and inactive</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <button className="at-btn at-btn--primary at-btn--block at-press">Block button</button>
              <button className="at-btn at-btn--primary at-press" disabled>Disabled</button>
            </div>
          </div>

          {/* 9. Variant × tone matrix */}
          <div className="at-col-12 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Variant × tone matrix</div>
                <div className="at-eyebrow">Every variant across every tone</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                <button className="at-btn at-btn--primary at-press">Primary</button>
                <button className="at-btn at-btn--dark at-press">Dark</button>
                <button className="at-btn at-btn--outline at-press">Outline</button>
                <button className="at-btn at-btn--ghost at-press">Ghost</button>
                <button className="at-btn at-press" style={{ background: 'var(--at-success)', color: 'var(--at-on-success)' }}>
                  Success
                </button>
                <button className="at-btn at-press" style={{ background: 'var(--at-warning)', color: 'var(--at-on-warning)' }}>
                  Warning
                </button>
                <button className="at-btn at-press" style={{ background: 'var(--at-danger)', color: 'var(--at-on-danger)' }}>
                  Danger
                </button>
                <button className="at-btn at-press" style={{ background: 'var(--at-info)', color: 'var(--at-on-info)' }}>
                  Info
                </button>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                <button className="at-btn at-btn--primary at-btn--sm at-press">Small</button>
                <button className="at-btn at-btn--primary at-press">Medium</button>
                <button className="at-btn at-btn--primary at-btn--lg at-press">Large</button>
                <button className="at-btn at-btn--primary at-press" style={{ borderRadius: '999px' }}>
                  Pill
                </button>
                <button className="at-btn at-btn--primary at-btn--block at-press" style={{ maxWidth: '240px' }}>
                  Block
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
