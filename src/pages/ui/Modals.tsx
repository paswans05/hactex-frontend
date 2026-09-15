/*
 * Hactex React — Modals UI page.
 * Built with the shared component classes, inline token
 * styles, and demo figures. The source renders static dialog previews (no
 * overlay), so this page is static markup.
 */
import { PageHead } from '../../components/shell/PageHead';

const TERMS = [
  'Welcome to Hactex. By accessing or using the service you agree to these terms. Please read them carefully.',
  '1. Acceptance of terms. Your use of the platform constitutes agreement to the terms outlined herein and any future revisions.',
  '2. Use of service. You agree to use the service lawfully and not to misuse, reverse engineer, or disrupt it.',
  '3. Intellectual property. All content, trademarks and software remain the property of their respective owners.',
  '4. Termination. We may suspend or terminate access for violations of these terms at any time.',
];

export default function Modals(): React.JSX.Element {
  return (
    <>
      <PageHead
        title="Modals"
        subtitle="Overlay dialogs for focused, blocking interactions."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Docs</button>
            <button className="at-btn at-btn--primary at-press">New dialog</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* 1. Dialog sizes */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Dialog sizes</div>
                <div className="at-eyebrow">Small, medium, large, full</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div style={{ border: '2px solid var(--at-ink)', padding: 'var(--at-space-3)', maxWidth: '280px' }}>
                <div className="at-text-strong">Small dialog</div>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginBlock: 'var(--at-space-2)' }}>
                  Compact prompt for a single decision.
                </div>
                <div className="at-cluster" style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-3)', justifyContent: 'flex-end' }}>
                  <button className="at-btn at-btn--ghost at-btn--sm">Cancel</button>
                  <button className="at-btn at-btn--primary at-btn--sm at-press">Confirm</button>
                </div>
              </div>
              <div style={{ border: '2px solid var(--at-ink)', padding: 'var(--at-space-4)', maxWidth: '440px' }}>
                <div className="at-text-strong">Medium dialog</div>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginBlock: 'var(--at-space-2)' }}>
                  The default size — fits most forms and confirmations.
                </div>
                <div className="at-cluster" style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-3)', justifyContent: 'flex-end' }}>
                  <button className="at-btn at-btn--ghost at-btn--sm">Cancel</button>
                  <button className="at-btn at-btn--primary at-btn--sm at-press">Save</button>
                </div>
              </div>
              <div style={{ border: '2px solid var(--at-ink)', padding: 'var(--at-space-5)' }}>
                <div className="at-text-strong">Large / full dialog</div>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginBlock: 'var(--at-space-2)' }}>
                  For multi-step wizards and content-heavy flows.
                </div>
                <div className="at-cluster" style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-3)', justifyContent: 'flex-end' }}>
                  <button className="at-btn at-btn--ghost at-btn--sm">Back</button>
                  <button className="at-btn at-btn--primary at-btn--sm at-press">Next →</button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Destructive confirm */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Destructive confirm</div>
                <div className="at-eyebrow">High-stakes irreversible action</div>
              </div>
            </div>
            <div style={{ border: '2px solid var(--at-danger)', padding: 'var(--at-space-5)', maxWidth: '440px', background: 'color-mix(in oklab, var(--at-danger) 6%, transparent)' }}>
              <div className="at-cluster" style={{ gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
                <span style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--at-danger)', color: 'var(--at-on-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>!</span>
                <div>
                  <div className="at-text-strong">Delete workspace?</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginBlockStart: 'var(--at-space-2)' }}>
                    This permanently removes 248 projects, 12 members, and all associated data. This action cannot be undone.
                  </div>
                </div>
              </div>
              <label className="at-check" style={{ marginBlockStart: 'var(--at-space-3)', fontSize: 'var(--at-text-sm)' }}>
                <input type="checkbox" /> I understand this is irreversible
              </label>
              <div className="at-cluster" style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-4)', justifyContent: 'flex-end' }}>
                <button className="at-btn at-btn--ghost at-press">Cancel</button>
                <button className="at-btn at-press" style={{ background: 'var(--at-danger)', color: 'var(--at-on-danger)' }}>
                  Delete forever
                </button>
              </div>
            </div>
          </div>

          {/* 3. Form dialog */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Form dialog</div>
                <div className="at-eyebrow">Capture input inline</div>
              </div>
            </div>
            <div style={{ border: '2px solid var(--at-ink)', padding: 'var(--at-space-5)', maxWidth: '440px' }}>
              <div className="at-cluster" style={{ justifyContent: 'space-between', marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-text-strong">Create project</div>
                <button className="at-btn at-btn--ghost at-btn--icon at-btn--sm" aria-label="Close">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
                <div>
                  <label className="at-form-label">Project name</label>
                  <input className="at-input" type="text" placeholder="Acme redesign" />
                </div>
                <div>
                  <label className="at-form-label">Visibility</label>
                  <select className="at-select">
                    <option>Private</option>
                    <option>Team</option>
                    <option>Public</option>
                  </select>
                </div>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-4)', justifyContent: 'flex-end' }}>
                <button className="at-btn at-btn--ghost at-press">Cancel</button>
                <button className="at-btn at-btn--primary at-press">Create project</button>
              </div>
            </div>
          </div>

          {/* 4. Long-content dialog */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Long-content dialog</div>
                <div className="at-eyebrow">Scrollable body region</div>
              </div>
            </div>
            <div style={{ border: '2px solid var(--at-ink)', maxWidth: '440px', overflow: 'hidden' }}>
              <div style={{ padding: 'var(--at-space-4)', borderBlockEnd: '2px solid var(--at-ink)', background: 'var(--at-surface)' }}>
                <div className="at-text-strong">Terms of service</div>
              </div>
              <div style={{ padding: 'var(--at-space-4)', maxHeight: '140px', overflowY: 'auto' }}>
                {TERMS.map((p, i) => (
                  <p key={i} className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginBlockEnd: i === TERMS.length - 1 ? undefined : 'var(--at-space-2)' }}>
                    {p}
                  </p>
                ))}
              </div>
              <div style={{ padding: 'var(--at-space-4)', borderBlockStart: '2px solid var(--at-ink)', background: 'var(--at-surface)' }} className="at-cluster at-cluster--end">
                <button className="at-btn at-btn--ghost at-press">Decline</button>
                <button className="at-btn at-btn--primary at-press">I agree</button>
              </div>
            </div>
          </div>

          {/* 5. Centered, top-aligned & success */}
          <div className="at-col-12 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Centered, top-aligned &amp; success</div>
                <div className="at-eyebrow">Position and positive feedback</div>
              </div>
            </div>
            <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-col-4" style={{ border: '2px solid var(--at-ink)', padding: 'var(--at-space-4)', background: 'var(--at-surface)' }}>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBlockEnd: 'var(--at-space-2)' }}>
                  Centered
                </div>
                <div className="at-text-strong" style={{ marginBlockEnd: 'var(--at-space-1)' }}>
                  Vertically centered
                </div>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                  Appears at viewport center — best for confirmations and short prompts.
                </div>
              </div>
              <div className="at-col-4" style={{ border: '2px solid var(--at-ink)', padding: 'var(--at-space-4)', background: 'var(--at-surface)' }}>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBlockEnd: 'var(--at-space-2)' }}>
                  Top-aligned
                </div>
                <div className="at-text-strong" style={{ marginBlockEnd: 'var(--at-space-1)' }}>
                  Docked to top
                </div>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                  Anchored near the top — ideal for long content and tall forms.
                </div>
              </div>
              <div className="at-col-4" style={{ border: '2px solid var(--at-success)', padding: 'var(--at-space-4)', background: 'color-mix(in oklab, var(--at-success) 10%, transparent)', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--at-success)', color: 'var(--at-on-success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBlockEnd: 'var(--at-space-3)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="at-text-strong">Payment successful</div>
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginBlockStart: 'var(--at-space-1)' }}>
                  Your subscription is now active.
                </div>
                <button className="at-btn at-btn--primary at-btn--sm at-press" style={{ marginBlockStart: 'var(--at-space-3)' }}>
                  View receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
