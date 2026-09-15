/*
 * Hactex React — Profile Settings (pages/settings).
 * 2-column settings (forms + toggles).
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const SESSIONS = [
  { device: 'MacBook Pro · Lisbon', meta: 'Chrome 126 · 84.91.12.4', badge: 'This device', badgeKind: 'success', time: null },
  { device: 'iPhone 15 · Lisbon', meta: 'Safari · Mobile', badge: null, time: '3h ago' },
  { device: 'Windows PC · Madrid', meta: 'Edge 126 · 88.4.220.9', badge: null, time: 'Yesterday' },
];

const CHANNELS = [
  { title: 'New comment', desc: 'When someone replies', on: true },
  { title: 'Mentions', desc: "When you're @mentioned", on: true },
  { title: 'Weekly digest', desc: 'Summary of activity', on: false },
  { title: 'Security alerts', desc: 'New sign-ins and changes', on: true },
];

const CARDS = [
  { name: 'Visa ending 4921', meta: 'Expires 08/27', isDefault: true },
  { name: 'Mastercard ending 7045', meta: 'Expires 02/26', isDefault: false },
];

function Switch({ on, onClick }: { on: boolean; onClick: () => void }): React.JSX.Element {
  return (
    <button className={`at-switch${on ? ' is-on' : ''}`} onClick={onClick} type="button">
      <span className="at-switch__thumb"></span>
    </button>
  );
}

export default function Settings(): React.JSX.Element {
  const [muted, setMuted] = useState(false);
  const [channels, setChannels] = useState(CHANNELS);
  const toggleChannel = (i: number): void =>
    setChannels((prev) => prev.map((c, idx) => (idx === i ? { ...c, on: !c.on } : c)));

  return (
    <>
      <PageHead
        title="Profile Settings"
        subtitle="Manage your account, security, notifications and billing."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Discard</button>
            <button className="at-btn at-btn--primary at-press">Save changes</button>
          </>
        }
      />
      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* MAIN COLUMN */}
          <div className="at-col-8 at-stack" style={{ gap: 'var(--at-space-5)' }}>
            {/* Personal information */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">Personal information</div>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
                <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
                  <div className="at-col-6 at-stack" style={{ gap: 'var(--at-space-2)' }}>
                    <label className="at-form-label">First name</label>
                    <input className="at-input" type="text" defaultValue="Maya" />
                  </div>
                  <div className="at-col-6 at-stack" style={{ gap: 'var(--at-space-2)' }}>
                    <label className="at-form-label">Last name</label>
                    <input className="at-input" type="text" defaultValue="Albright" />
                  </div>
                </div>
                <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
                  <div className="at-col-6 at-stack" style={{ gap: 'var(--at-space-2)' }}>
                    <label className="at-form-label">Username</label>
                    <input className="at-input" type="text" defaultValue="maya.albright" />
                  </div>
                  <div className="at-col-6 at-stack" style={{ gap: 'var(--at-space-2)' }}>
                    <label className="at-form-label">Email</label>
                    <input className="at-input" type="email" defaultValue="maya.albright@northwind.io" />
                  </div>
                </div>
                <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
                  <div className="at-col-6 at-stack" style={{ gap: 'var(--at-space-2)' }}>
                    <label className="at-form-label">Phone</label>
                    <input className="at-input" type="tel" defaultValue="+351 912 044 318" />
                  </div>
                  <div className="at-col-6 at-stack" style={{ gap: 'var(--at-space-2)' }}>
                    <label className="at-form-label">Timezone</label>
                    <select className="at-select">
                      <option>(GMT+00:00) Lisbon</option>
                      <option>(GMT+01:00) Berlin</option>
                      <option>(GMT-05:00) New York</option>
                    </select>
                  </div>
                </div>
                <div className="at-stack" style={{ gap: 'var(--at-space-2)' }}>
                  <label className="at-form-label">Bio</label>
                  <textarea className="at-textarea" rows={3} defaultValue={'Designer focused on data-dense interfaces and design systems.'} />
                </div>
                <div className="at-cluster" style={{ justifyContent: 'flex-end' }}>
                  <button className="at-btn at-btn--primary at-press">Save changes</button>
                </div>
              </div>
            </div>

            {/* Change password */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">Change password</div>
                <div className="at-eyebrow">At least 8 characters, mixed letters &amp; numbers</div>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-5)', maxWidth: 480 }}>
                <div className="at-stack" style={{ gap: 'var(--at-space-2)' }}>
                  <label className="at-form-label">Current password</label>
                  <input className="at-input" type="password" autoComplete="current-password" />
                </div>
                <div className="at-stack" style={{ gap: 'var(--at-space-2)' }}>
                  <label className="at-form-label">New password</label>
                  <input className="at-input" type="password" autoComplete="new-password" />
                  <div className="at-progress"><div className="at-progress__bar" style={{ width: '75%' }}></div></div>
                  <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Strength: Good</span>
                </div>
                <div className="at-stack" style={{ gap: 'var(--at-space-2)' }}>
                  <label className="at-form-label">Confirm new password</label>
                  <input className="at-input" type="password" autoComplete="new-password" />
                </div>
                <div className="at-cluster" style={{ justifyContent: 'flex-end' }}>
                  <button className="at-btn at-btn--primary at-press">Update password</button>
                </div>
              </div>
            </div>

            {/* 2FA */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">Two-factor authentication</div>
              </div>
              <div className="at-cluster" style={{ justifyContent: 'space-between', gap: 'var(--at-space-4)' }}>
                <div style={{ minWidth: 0 }}>
                  <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                    <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>Authenticator app</span>
                    <span className="at-badge at-badge--success">Enabled</span>
                  </div>
                  <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginTop: 2 }}>
                    Codes are generated by your authenticator app. Recovery codes last viewed Jun 02.
                  </p>
                </div>
                <div className="at-cluster" style={{ gap: 'var(--at-space-2)', flexShrink: 0 }}>
                  <button className="at-btn at-btn--ghost at-btn--sm">Recovery codes</button>
                  <button className="at-btn at-btn--primary at-btn--sm">Manage</button>
                </div>
              </div>
            </div>

            {/* Delivery preferences */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">Delivery preferences</div>
              </div>
              <div className="at-row">
                <div className="at-col-6 at-stack" style={{ gap: 'var(--at-space-2)' }}>
                  <label className="at-form-label">Digest frequency</label>
                  <select className="at-select" defaultValue="Weekly">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Off</option>
                  </select>
                </div>
                <div className="at-col-6 at-stack" style={{ gap: 'var(--at-space-2)' }}>
                  <label className="at-form-label">Quiet hours</label>
                  <select className="at-select" defaultValue="22:00 – 07:00">
                    <option>Off</option>
                    <option>22:00 – 07:00</option>
                    <option>20:00 – 08:00</option>
                  </select>
                </div>
              </div>
              <div
                className="at-cluster"
                style={{ justifyContent: 'space-between', paddingTop: 'var(--at-space-4)', marginTop: 'var(--at-space-4)', borderBlockStart: '1px solid var(--at-ink)' }}
              >
                <div>
                  <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>Mute all notifications</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Temporarily pause every channel</div>
                </div>
                <Switch on={muted} onClick={() => setMuted((m) => !m)} />
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="at-col-4 at-stack" style={{ gap: 'var(--at-space-5)' }}>
            {/* Profile photo */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">Profile photo</div>
                <div className="at-eyebrow">PNG or JPG, up to 2 MB</div>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
                <div
                  className="at-avatar at-avatar--xl"
                  style={{ alignSelf: 'center', background: 'color-mix(in oklab, var(--at-accent) 16%, transparent)', color: 'var(--at-accent-text)' }}
                >M</div>
                <div className="at-stack" style={{ gap: 'var(--at-space-2)' }}>
                  <button className="at-btn at-btn--primary at-press">Upload new</button>
                  <button className="at-btn at-btn--ghost">Remove</button>
                </div>
                <div className="at-cluster" style={{ justifyContent: 'center' }}>
                  <button className="at-btn at-btn--primary at-press">Save photo</button>
                </div>
              </div>
            </div>

            {/* Active sessions */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">Active sessions</div>
                <button className="at-btn at-btn--ghost at-btn--sm">Revoke all others</button>
              </div>
              <div className="at-list">
                {SESSIONS.map((s) => (
                  <div key={s.device} className="at-list__item">
                    <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                      <div>
                        <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{s.device}</div>
                        <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{s.meta}</div>
                      </div>
                      {s.badge ? (
                        <span className={`at-badge at-badge--${s.badgeKind}`}>{s.badge}</span>
                      ) : (
                        <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                          <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{s.time}</span>
                          <button className="at-btn at-btn--ghost at-btn--sm">Revoke</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification channels */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">Notification channels</div>
                <div className="at-eyebrow">Choose how you want to be notified</div>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
                {channels.map((c, i) => (
                  <label key={c.title} className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <div>
                      <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{c.title}</div>
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{c.desc}</div>
                    </div>
                    <Switch on={c.on} onClick={() => toggleChannel(i)} />
                  </label>
                ))}
                <div className="at-cluster" style={{ justifyContent: 'flex-end', paddingTop: 'var(--at-space-2)' }}>
                  <button className="at-btn at-btn--primary at-press">Save preferences</button>
                </div>
              </div>
            </div>

            {/* Payment methods */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div className="at-chart__title">Payment methods</div>
                <button className="at-btn at-btn--primary at-btn--sm">Add card</button>
              </div>
              <div className="at-list">
                {CARDS.map((c) => (
                  <div key={c.name} className="at-list__item">
                    <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                      <div>
                        <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{c.name}</div>
                        <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{c.meta}</div>
                      </div>
                      {c.isDefault ? (
                        <span className="at-badge at-badge--accent">Default</span>
                      ) : (
                        <button className="at-btn at-btn--ghost at-btn--sm">Set default</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
