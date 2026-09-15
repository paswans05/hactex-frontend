/*
 * Hactex React — Basic form elements.
 * Built with the shared component classes, inline
 * token styles. Inputs are controlled; switches toggle on/off via useState.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

type SwitchKey = 'tfa' | 'push' | 'beta' | 'maint';

export default function BasicElements(): React.JSX.Element {
  const [fullName, setFullName] = useState('Camila Rossi');
  const [email, setEmail] = useState('camila@northwind.io');
  const [password, setPassword] = useState('aurora-glass-42');
  const [url, setUrl] = useState('https://northwind.io');
  const [budget, setBudget] = useState('4,250.00');
  const [workspace, setWorkspace] = useState('northwind-labs');
  const [note, setNote] = useState(
    'Ship the Q3 release notes to the design channel before standup.',
  );
  const [notifsProduct, setNotifsProduct] = useState(true);
  const [notifsDigest, setNotifsDigest] = useState(false);
  const [cycle, setCycle] = useState('monthly');
  const [sw, setSw] = useState<Record<SwitchKey, boolean>>({
    tfa: true,
    push: false,
    beta: true,
    maint: false,
  });
  const [country, setCountry] = useState('United States');
  const [pageSize, setPageSize] = useState('25 rows');
  const [budgetRange, setBudgetRange] = useState(62);
  const [quality, setQuality] = useState(35);

  const noteCount = note.length;

  return (
    <>
      <PageHead
        title="Basic Elements"
        subtitle="Every native control — text, choice, switch, range & file — in one place."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Reset</button>
            <button className="at-btn at-btn--primary at-press">Save preset</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* Text Inputs */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Text Inputs</div>
                <div className="at-eyebrow">Plain, icon, read-only &amp; disabled</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div>
                <label className="at-form-label">
                  Full name <span className="at-text-muted">*</span>
                </label>
                <input
                  className="at-input"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <div className="at-form-hint">As it appears on your billing account.</div>
              </div>
              <div>
                <label className="at-form-label">Work email</label>
                <input
                  className="at-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="at-form-label">Password</label>
                <input
                  className="at-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="at-form-hint">Use 12+ characters with a symbol.</div>
              </div>
              <div>
                <label className="at-form-label">Website URL</label>
                <input
                  className="at-input"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div>
                <label className="at-form-label">Account ID (read-only)</label>
                <input className="at-input at-mono" type="text" defaultValue="ACC-2025-04821" readOnly />
              </div>
            </div>
          </div>

          {/* Number, Groups & Textarea */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Number, Groups &amp; Textarea</div>
                <div className="at-eyebrow">Stepper, prefix/suffix &amp; notes</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div>
                <label className="at-form-label">Quantity</label>
                <input className="at-input at-mono" type="number" defaultValue="12" />
              </div>
              <div>
                <label className="at-form-label">Budget</label>
                <div className="at-input-group">
                  <span className="at-input-group__addon at-input-group__addon--prefix at-mono">$</span>
                  <input
                    className="at-input at-mono"
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                  <span className="at-input-group__addon at-input-group__addon--suffix">USD</span>
                </div>
                <div className="at-form-hint">Monthly cap before approval is required.</div>
              </div>
              <div>
                <label className="at-form-label">Workspace URL</label>
                <div className="at-input-group">
                  <span className="at-input-group__addon at-input-group__addon--prefix">atelier.co/</span>
                  <input
                    className="at-input"
                    type="text"
                    value={workspace}
                    onChange={(e) => setWorkspace(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="at-form-label">Internal note</label>
                <textarea
                  className="at-textarea"
                  rows={3}
                  placeholder="Add a short note…"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <div
                  className="at-cluster"
                  style={{ justifyContent: 'space-between', fontSize: 'var(--at-text-xs)' }}
                >
                  <span className="at-text-muted">Visible to teammates with editor access.</span>
                  <span className="at-text-muted at-mono">{noteCount} / 240</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="at-row">
          {/* Checkbox & Radio */}
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Checkbox &amp; Radio</div>
                <div className="at-eyebrow">18px controls &amp; groups</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
                <div className="at-form-label">Notifications</div>
                <label className="at-check">
                  <input
                    type="checkbox"
                    checked={notifsProduct}
                    onChange={(e) => setNotifsProduct(e.target.checked)}
                  />{' '}
                  Product updates
                </label>
                <label className="at-check">
                  <input
                    type="checkbox"
                    checked={notifsDigest}
                    onChange={(e) => setNotifsDigest(e.target.checked)}
                  />{' '}
                  Weekly digest
                </label>
                <label className="at-check">
                  <input type="checkbox" checked disabled /> Security alerts
                </label>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
                <div className="at-form-label">Billing cycle</div>
                <label className="at-check">
                  <input
                    type="radio"
                    name="fe-cycle"
                    checked={cycle === 'monthly'}
                    onChange={() => setCycle('monthly')}
                  />{' '}
                  Monthly — $29/mo
                </label>
                <label className="at-check">
                  <input
                    type="radio"
                    name="fe-cycle"
                    checked={cycle === 'annual'}
                    onChange={() => setCycle('annual')}
                  />{' '}
                  Annual — $290/yr <span className="at-badge at-badge--success">save 17%</span>
                </label>
                <label className="at-check">
                  <input type="radio" name="fe-cycle" disabled /> Enterprise
                </label>
              </div>
            </div>
          </div>

          {/* Switches */}
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Switches</div>
                <div className="at-eyebrow">Toggle on / off states</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              {([
                { key: 'tfa' as const, title: 'Two-factor auth', desc: 'Require a code at sign-in.' },
                { key: 'push' as const, title: 'Desktop push', desc: 'Default off state.' },
                { key: 'beta' as const, title: 'Beta features', desc: 'Early access toggles.' },
              ]).map((s) => (
                <div key={s.key} className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <div>
                    <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>
                      {s.title}
                    </div>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                      {s.desc}
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`at-switch${sw[s.key] ? ' is-on' : ''}`}
                    onClick={() => setSw((p) => ({ ...p, [s.key]: !p[s.key] }))}
                  >
                    <span className="at-switch__thumb" />
                  </button>
                </div>
              ))}
              <div className="at-cluster" style={{ justifyContent: 'space-between', opacity: 0.55 }}>
                <div>
                  <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>
                    Maintenance mode
                  </div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                    Disabled (admin only).
                  </div>
                </div>
                <button className="at-switch" disabled>
                  <span className="at-switch__thumb" />
                </button>
              </div>
            </div>
          </div>

          {/* Native Select */}
          <div className="at-col-4 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Native Select</div>
                <div className="at-eyebrow">Single &amp; grouped</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div>
                <label className="at-form-label">Country</label>
                <select
                  className="at-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>Japan</option>
                  <option>Australia</option>
                </select>
              </div>
              <div>
                <label className="at-form-label">Timezone</label>
                <select className="at-select" defaultValue="Eastern (EST)">
                  <optgroup label="Americas">
                    <option>Pacific (PST)</option>
                    <option>Eastern (EST)</option>
                  </optgroup>
                  <optgroup label="Europe">
                    <option>London (GMT)</option>
                    <option>Berlin (CET)</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label className="at-form-label">Page size</label>
                <select
                  className="at-select"
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                >
                  <option>10 rows</option>
                  <option>25 rows</option>
                  <option>50 rows</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="at-row">
          {/* Range Slider */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Range Slider</div>
                <div className="at-eyebrow">Native range inputs</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
              <div>
                <div
                  className="at-cluster"
                  style={{ justifyContent: 'space-between', marginBlockEnd: 'var(--at-space-3)' }}
                >
                  <label className="at-form-label">Monthly budget</label>
                  <span className="at-text-strong at-mono">${(budgetRange * 50).toLocaleString()}</span>
                </div>
                <input
                  className="at-input"
                  type="range"
                  min={0}
                  max={100}
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(Number(e.target.value))}
                  style={{ width: '100%', padding: 0 }}
                />
              </div>
              <div>
                <div
                  className="at-cluster"
                  style={{ justifyContent: 'space-between', marginBlockEnd: 'var(--at-space-3)' }}
                >
                  <label className="at-form-label">Image quality</label>
                  <span className="at-text-strong at-mono">{quality}%</span>
                </div>
                <input
                  className="at-input"
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  style={{ width: '100%', padding: 0 }}
                />
              </div>
              <div style={{ opacity: 0.55 }}>
                <div
                  className="at-cluster"
                  style={{ justifyContent: 'space-between', marginBlockEnd: 'var(--at-space-3)' }}
                >
                  <label className="at-form-label">Volume (disabled)</label>
                  <span className="at-text-muted at-mono">—</span>
                </div>
                <input
                  className="at-input"
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={40}
                  disabled
                  style={{ width: '100%', padding: 0 }}
                />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">File Upload</div>
                <div className="at-eyebrow">Button + dropzone + queue</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div>
                <label className="at-form-label">Profile photo</label>
                <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
                  <label
                    className="at-btn at-btn--outline at-press"
                    style={{ cursor: 'pointer' }}
                  >
                    Choose file
                    <input
                      type="file"
                      style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0 }}
                    />
                  </label>
                  <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                    No file selected
                  </span>
                </div>
              </div>
              <div>
                <label className="at-form-label">Attachments</label>
                <div
                  className="at-card"
                  style={{
                    padding: 'var(--at-space-5)',
                    borderStyle: 'dashed',
                    textAlign: 'center',
                  }}
                >
                  <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>
                    Drag files here, or click to browse
                  </div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                    PNG, JPG or PDF — up to 10MB each
                  </div>
                </div>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
                <div
                  className="at-cluster"
                  style={{ justifyContent: 'space-between', gap: 'var(--at-space-3)' }}
                >
                  <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>
                    brand-guidelines.pdf
                  </span>
                  <span className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
                    <span className="at-text-muted at-mono" style={{ fontSize: 'var(--at-text-xs)' }}>
                      2.4 MB
                    </span>
                    <span className="at-badge at-badge--success">Done</span>
                  </span>
                </div>
                <div>
                  <div
                    className="at-cluster"
                    style={{ justifyContent: 'space-between', marginBlockEnd: 'var(--at-space-2)' }}
                  >
                    <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>
                      hero-mockup.png
                    </span>
                    <span className="at-text-muted at-mono" style={{ fontSize: 'var(--at-text-xs)' }}>
                      6.1 MB · 68%
                    </span>
                  </div>
                  <div className="at-progress">
                    <div className="at-progress__bar" style={{ width: '68%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
