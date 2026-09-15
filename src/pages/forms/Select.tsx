/*
 * Hactex React — Select patterns.
 * Built with the shared component classes, inline token
 * styles. The multi-select chips and tag-creator are interactive via useState.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const DEPARTMENTS = [
  'Design',
  'Engineering',
  'Marketing',
  'Sales',
  'Support',
  'Finance',
  'Operations',
  'Legal',
];

const SUGGESTED = ['responsive', 'accessibility', 'tailwind', 'typescript', 'vite'];

export default function Select(): React.JSX.Element {
  const [country, setCountry] = useState('United States');
  const [selected, setSelected] = useState<string[]>(['Design', 'Engineering']);
  const [tags, setTags] = useState<string[]>(['aurora', 'glassmorphism', 'dark-mode']);
  const [tagInput, setTagInput] = useState('');

  const toggleDept = (d: string): void => {
    setSelected((p) => (p.includes(d) ? p.filter((x) => x !== d) : [...p, d]));
  };

  const addTag = (raw: string): void => {
    const v = raw.trim().toLowerCase();
    if (!v) return;
    if (!tags.includes(v)) setTags((p) => [...p, v]);
    setTagInput('');
  };

  return (
    <>
      <PageHead
        title="Select"
        subtitle="Searchable, multi-select with chips, tag creation & a tree picker."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Reset</button>
            <button className="at-btn at-btn--primary at-press">Apply</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* Searchable Single */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Searchable Single</div>
                <div className="at-eyebrow">Type to filter grouped options</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div>
                <label className="at-form-label">Country</label>
                <select
                  className="at-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <optgroup label="Americas">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Brazil</option>
                    <option>Mexico</option>
                  </optgroup>
                  <optgroup label="Europe">
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Spain</option>
                  </optgroup>
                  <optgroup label="Asia Pacific">
                    <option>Japan</option>
                    <option>Singapore</option>
                    <option>Australia</option>
                    <option>India</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label className="at-form-label">Filter</label>
                <input className="at-input" type="text" placeholder="Search countries…" />
              </div>
              <div className="at-form-hint">Drives the region label and postal mask elsewhere.</div>
            </div>
          </div>

          {/* Multi-select Chips */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Multi-select Chips</div>
                <div className="at-eyebrow">Choose several; remove with the chip ✕</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div>
                <label className="at-form-label">Departments</label>
                <select
                  className="at-select"
                  multiple
                  style={{ minHeight: '120px' }}
                  value={selected}
                  onChange={(e) => {
                    const next = Array.from(e.target.selectedOptions).map((o) => o.value);
                    setSelected(next);
                  }}
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <div className="at-form-label">Selected</div>
                <div className="at-cluster" style={{ gap: 'var(--at-space-2)', flexWrap: 'wrap' }}>
                  {selected.map((d) => (
                    <button
                      key={d}
                      type="button"
                      className="at-badge at-badge--accent"
                      style={{ border: 0, cursor: 'pointer' }}
                      onClick={() => toggleDept(d)}
                    >
                      {d} ✕
                    </button>
                  ))}
                </div>
              </div>
              <div className="at-form-hint">
                <span className="at-mono">{selected.length}</span> of{' '}
                <span className="at-mono">{DEPARTMENTS.length}</span> selected.
              </div>
            </div>
          </div>

          {/* Create Tags */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Create Tags</div>
                <div className="at-eyebrow">
                  Press Enter or comma to add; Backspace removes the last
                </div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div>
                <label className="at-form-label">Project tags</label>
                <div
                  className="at-input"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--at-space-2)',
                    alignItems: 'center',
                  }}
                >
                  {tags.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className="at-badge at-badge--accent"
                      style={{ border: 0, cursor: 'pointer' }}
                      onClick={() => setTags((p) => p.filter((x) => x !== t))}
                    >
                      {t} ✕
                    </button>
                  ))}
                  <input
                    type="text"
                    placeholder="Add a tag…"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault();
                        addTag(tagInput);
                      } else if (e.key === 'Backspace' && !tagInput) {
                        setTags((p) => p.slice(0, -1));
                      }
                    }}
                    style={{
                      border: 0,
                      outline: 'none',
                      flex: 1,
                      minWidth: '120px',
                      background: 'transparent',
                    }}
                  />
                </div>
                <div className="at-form-hint">Tags are lowercased and de-duplicated automatically.</div>
              </div>
              <div>
                <div className="at-form-label">Suggested</div>
                <div className="at-cluster" style={{ gap: 'var(--at-space-2)', flexWrap: 'wrap' }}>
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="at-badge at-badge--flat"
                      style={{ border: 0, cursor: 'pointer' }}
                      onClick={() => addTag(s)}
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tree Select */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Tree Select</div>
                <div className="at-eyebrow">Nested categories with disclosure carets</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div>
                <label className="at-form-label">Category</label>
                <select className="at-select" defaultValue="Lighting (Home › Decor › Lighting)">
                  <option>Lighting (Home › Decor › Lighting)</option>
                  <option>Rugs (Home › Decor › Rugs)</option>
                  <option>Wall Art (Home › Decor › Wall Art)</option>
                  <option>Furniture (Home › Furniture)</option>
                  <option>Outerwear (Apparel › Outerwear)</option>
                  <option>Footwear (Apparel › Footwear)</option>
                </select>
              </div>
              <div
                className="at-card"
                style={{
                  padding: 'var(--at-space-3)',
                  background: 'var(--at-surface)',
                  borderColor: 'var(--at-ink)',
                  fontSize: 'var(--at-text-sm)',
                }}
              >
                <div className="at-text-strong" style={{ marginBlockEnd: 'var(--at-space-2)' }}>
                  Browse
                </div>
                <div className="at-stack" style={{ gap: 'var(--at-space-1)' }}>
                  <div>
                    ▾ <span className="at-text-strong">Home</span>
                  </div>
                  <div style={{ paddingInlineStart: 'var(--at-space-4)' }}>▾ Decor</div>
                  <div
                    className="at-cluster"
                    style={{ paddingInlineStart: 'var(--at-space-8)', gap: 'var(--at-space-2)' }}
                  >
                    <span>Lighting</span>
                    <span className="at-badge at-badge--success">✓</span>
                  </div>
                  <div style={{ paddingInlineStart: 'var(--at-space-8)' }}>Rugs</div>
                  <div style={{ paddingInlineStart: 'var(--at-space-8)' }}>Wall Art</div>
                  <div style={{ paddingInlineStart: 'var(--at-space-4)' }}>Furniture</div>
                  <div>▸ Apparel</div>
                </div>
              </div>
              <div className="at-form-hint">
                Selected path: <span className="at-text-strong">Home › Decor › Lighting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel States (full width) */}
        <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
          <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
            <div>
              <div className="at-chart__title">Panel States</div>
              <div className="at-eyebrow">
                Loading, empty &amp; error — how remote-backed selects communicate
              </div>
            </div>
          </div>
          <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
            {/* Loading */}
            <div className="at-col-4">
              <div className="at-form-label" style={{ marginBlockEnd: 'var(--at-space-2)' }}>
                Loading
              </div>
              <div
                className="at-card"
                style={{
                  padding: 'var(--at-space-5)',
                  background: 'var(--at-surface)',
                  borderColor: 'var(--at-ink)',
                  textAlign: 'center',
                }}
              >
                <div className="at-text-muted">Loading options…</div>
              </div>
            </div>
            {/* No results */}
            <div className="at-col-4">
              <div className="at-form-label" style={{ marginBlockEnd: 'var(--at-space-2)' }}>
                No results
              </div>
              <div
                className="at-card"
                style={{
                  padding: 0,
                  background: 'var(--at-surface)',
                  borderColor: 'var(--at-ink)',
                  overflow: 'hidden',
                }}
              >
                <input
                  className="at-input"
                  type="text"
                  defaultValue="zzqx"
                  readOnly
                  style={{ border: 0, borderBottom: '1px solid var(--at-ink)', borderRadius: 0 }}
                />
                <div style={{ padding: 'var(--at-space-5)', textAlign: 'center' }}>
                  <div className="at-text-muted" style={{ marginBlockEnd: 'var(--at-space-1)' }}>
                    No matches for &quot;zzqx&quot;.
                  </div>
                </div>
              </div>
            </div>
            {/* Error */}
            <div className="at-col-4">
              <div className="at-form-label" style={{ marginBlockEnd: 'var(--at-space-2)' }}>Error</div>
              <div
                className="at-card"
                style={{
                  padding: 'var(--at-space-5)',
                  background: 'var(--at-surface)',
                  borderColor: 'var(--at-danger)',
                  textAlign: 'center',
                  color: 'var(--at-danger-text)',
                }}
              >
                <div style={{ marginBlockEnd: 'var(--at-space-2)' }}>Couldn&apos;t load options.</div>
                <button className="at-btn at-btn--ghost at-btn--sm at-press">Retry</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
