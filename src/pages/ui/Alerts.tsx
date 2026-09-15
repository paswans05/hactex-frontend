/*
 * Hactex React — Alerts UI page.
 * Built with the shared component classes, inline token
 * styles, and demo figures. The "Actions & dismissible" card uses useState
 * show flags rendered conditionally.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

export default function Alerts(): React.JSX.Element {
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(true);

  return (
    <>
      <PageHead
        title="Alerts"
        subtitle="Contextual feedback messages for inline and page-level notices."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Mute</button>
            <button className="at-btn at-btn--primary at-press">New broadcast</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* 1. Soft alerts */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Soft alerts</div>
                <div className="at-eyebrow">Tinted backgrounds, tonal text</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div className="at-cluster" style={{ gap: 'var(--at-space-3)', padding: 'var(--at-space-3) var(--at-space-4)', border: '2px solid var(--at-success)', background: 'color-mix(in oklab, var(--at-success) 14%, transparent)' }}>
                <span style={{ color: 'var(--at-success-text)', fontWeight: 700 }}>✓</span>
                <div>
                  <div className="at-text-strong">Payment received</div>
                  <div style={{ fontSize: 'var(--at-text-sm)' }}>
                    Invoice #1042 has been paid in full.
                  </div>
                </div>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-3)', padding: 'var(--at-space-3) var(--at-space-4)', border: '2px solid var(--at-warning)', background: 'color-mix(in oklab, var(--at-warning) 14%, transparent)' }}>
                <span style={{ color: 'var(--at-warning-text)', fontWeight: 700 }}>!</span>
                <div>
                  <div className="at-text-strong">Storage almost full</div>
                  <div style={{ fontSize: 'var(--at-text-sm)' }}>
                    You have used 92% of your plan quota.
                  </div>
                </div>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-3)', padding: 'var(--at-space-3) var(--at-space-4)', border: '2px solid var(--at-danger)', background: 'color-mix(in oklab, var(--at-danger) 14%, transparent)' }}>
                <span style={{ color: 'var(--at-danger-text)', fontWeight: 700 }}>✕</span>
                <div>
                  <div className="at-text-strong">Deployment failed</div>
                  <div style={{ fontSize: 'var(--at-text-sm)' }}>
                    Build exited with code 1 — check the logs.
                  </div>
                </div>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-3)', padding: 'var(--at-space-3) var(--at-space-4)', border: '2px solid var(--at-info)', background: 'color-mix(in oklab, var(--at-info) 14%, transparent)' }}>
                <span style={{ color: 'var(--at-info-text)', fontWeight: 700 }}>i</span>
                <div>
                  <div className="at-text-strong">Scheduled maintenance</div>
                  <div style={{ fontSize: 'var(--at-text-sm)' }}>
                    Sunday 02:00–04:00 UTC.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Solid alerts */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Solid alerts</div>
                <div className="at-eyebrow">Filled color blocks</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div className="at-cluster" style={{ gap: 'var(--at-space-3)', padding: 'var(--at-space-3) var(--at-space-4)', background: 'var(--at-success)', color: 'var(--at-on-success)', border: '2px solid var(--at-ink)' }}>
                <span style={{ fontWeight: 700 }}>✓</span>
                <div>
                  <div style={{ fontWeight: 700 }}>Changes saved</div>
                  <div style={{ opacity: 0.9, fontSize: 'var(--at-text-sm)' }}>
                    Your profile has been updated.
                  </div>
                </div>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-3)', padding: 'var(--at-space-3) var(--at-space-4)', background: 'var(--at-danger)', color: 'var(--at-on-danger)', border: '2px solid var(--at-ink)' }}>
                <span style={{ fontWeight: 700 }}>✕</span>
                <div>
                  <div style={{ fontWeight: 700 }}>Account suspended</div>
                  <div style={{ opacity: 0.9, fontSize: 'var(--at-text-sm)' }}>
                    Contact support to restore access.
                  </div>
                </div>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-3)', padding: 'var(--at-space-3) var(--at-space-4)', background: 'var(--at-ink-strong)', color: 'var(--at-paper)', border: '2px solid var(--at-ink)' }}>
                <span style={{ fontWeight: 700 }}>★</span>
                <div>
                  <div style={{ fontWeight: 700 }}>Welcome aboard</div>
                  <div style={{ opacity: 0.9, fontSize: 'var(--at-text-sm)' }}>
                    Your workspace is ready to go.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Accent edge */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Accent edge</div>
                <div className="at-eyebrow">Left bar emphasis</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div style={{ padding: 'var(--at-space-3) var(--at-space-4)', border: '2px solid var(--at-ink)', borderInlineStart: '6px solid var(--at-success)' }}>
                <div className="at-text-strong">Sync complete</div>
                <div style={{ fontSize: 'var(--at-text-sm)' }}>
                  All records are up to date.
                </div>
              </div>
              <div style={{ padding: 'var(--at-space-3) var(--at-space-4)', border: '2px solid var(--at-ink)', borderInlineStart: '6px solid var(--at-warning)' }}>
                <div className="at-text-strong">Trial ending soon</div>
                <div style={{ fontSize: 'var(--at-text-sm)' }}>
                  3 days left in your Pro trial.
                </div>
              </div>
              <div style={{ padding: 'var(--at-space-3) var(--at-space-4)', border: '2px solid var(--at-ink)', borderInlineStart: '6px solid var(--at-info)' }}>
                <div className="at-text-strong">New comment</div>
                <div style={{ fontSize: 'var(--at-text-sm)' }}>
                  Maya left a comment on your draft.
                </div>
              </div>
            </div>
          </div>

          {/* 4. Inline alerts */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Inline alerts</div>
                <div className="at-eyebrow">Embedded within forms</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div>
                <label className="at-form-label">Email address</label>
                <input className="at-input is-error" type="email" defaultValue="jane@" />
                <div className="at-cluster" style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-2)', color: 'var(--at-danger-text)', fontSize: 'var(--at-text-sm)' }}>
                  <span style={{ fontWeight: 700 }}>✕</span>
                  <span>Please enter a valid email address.</span>
                </div>
              </div>
              <div>
                <label className="at-form-label">Username</label>
                <input className="at-input is-valid" type="text" defaultValue="jane-doe" style={{ borderColor: 'var(--at-success)' }} />
                <div className="at-cluster" style={{ gap: 'var(--at-space-2)', marginBlockStart: 'var(--at-space-2)', color: 'var(--at-success-text)', fontSize: 'var(--at-text-sm)' }}>
                  <span style={{ fontWeight: 700 }}>✓</span>
                  <span>This username is available.</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Actions & dismissible */}
          <div className="at-col-12 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Actions &amp; dismissible</div>
                <div className="at-eyebrow">Buttons and close control</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {show1 && (
                <div className="at-cluster" style={{ gap: 'var(--at-space-3)', padding: 'var(--at-space-4)', border: '2px solid var(--at-info)', background: 'color-mix(in oklab, var(--at-info) 12%, transparent)' }}>
                  <span style={{ color: 'var(--at-info-text)', fontWeight: 700 }}>i</span>
                  <div style={{ flex: 1 }}>
                    <div className="at-text-strong">Cookie preferences</div>
                    <div style={{ fontSize: 'var(--at-text-sm)' }}>
                      We use cookies to improve your experience.
                    </div>
                  </div>
                  <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                    <button className="at-btn at-btn--ghost at-btn--sm">Decline</button>
                    <button className="at-btn at-btn--primary at-btn--sm at-press" onClick={() => setShow1(false)}>
                      Accept
                    </button>
                  </div>
                </div>
              )}
              {show2 && (
                <div className="at-cluster" style={{ gap: 'var(--at-space-3)', padding: 'var(--at-space-4)', border: '2px solid var(--at-warning)', background: 'color-mix(in oklab, var(--at-warning) 12%, transparent)' }}>
                  <span style={{ color: 'var(--at-warning-text)', fontWeight: 700 }}>!</span>
                  <div style={{ flex: 1 }}>
                    <div className="at-text-strong">Finish your profile</div>
                    <div style={{ fontSize: 'var(--at-text-sm)' }}>
                      Add a photo and bio to complete setup.
                    </div>
                  </div>
                  <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                    <button className="at-btn at-btn--outline at-btn--sm at-press">Later</button>
                    <button className="at-btn at-btn--primary at-btn--sm at-press">Finish now</button>
                    <button className="at-btn at-btn--ghost at-btn--icon at-btn--sm" aria-label="Dismiss" onClick={() => setShow2(false)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              {show3 && (
                <div className="at-cluster" style={{ gap: 'var(--at-space-3)', padding: 'var(--at-space-4)', border: '2px solid var(--at-ink)', background: 'var(--at-surface)' }}>
                  <span style={{ fontWeight: 700 }}>★</span>
                  <div style={{ flex: 1 }}>
                    <div className="at-text-strong">Did you know?</div>
                    <div style={{ fontSize: 'var(--at-text-sm)' }}>
                      You can press ⌘K to open the command palette.
                    </div>
                  </div>
                  <button className="at-btn at-btn--ghost at-btn--icon at-btn--sm" aria-label="Dismiss" onClick={() => setShow3(false)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
