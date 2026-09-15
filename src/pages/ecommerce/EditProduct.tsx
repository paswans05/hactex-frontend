/*
 * Hactex React — eCommerce Edit Product.
 * Built with the shared component classes,
 * inline token styles, and demo figures. Form inputs are controlled via useState;
 * the variants table + performance stats are extracted into const arrays.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const VARIANTS = [
  { variant: 'Graphite / 48 cm', price: '$129.00', stock: 62, sku: 'APG-0001-G' },
  { variant: 'Brass / Warm white', price: '$182.00', stock: 22, sku: 'APG-0008-B' },
];

const PERFORMANCE = [
  { label: 'Units sold', value: '412' },
  { label: 'Revenue', value: '$53,148' },
  { label: 'Views', value: '2,840' },
  { label: 'Conversion', value: '14.5%' },
];

const TAGS = ['desk', 'led', 'brass'];
const AVAILABILITY = ['Active', 'Draft', 'Archived'];

export default function EditProduct(): React.JSX.Element {
  const [title, setTitle] = useState('Aperture Desk Lamp');
  const [description, setDescription] = useState('Adjustable warm-white LED desk lamp with a weighted brass base and full-range dimmer.');
  const [price, setPrice] = useState('129.00');
  const [compareAt, setCompareAt] = useState('159.00');
  const [sku, setSku] = useState('APG-0001');
  const [qty, setQty] = useState('84');
  const [trackQty, setTrackQty] = useState(true);
  const [metaTitle, setMetaTitle] = useState('Aperture Desk Lamp — Warm-white LED');
  const [metaDesc, setMetaDesc] = useState('Adjustable warm-white LED desk lamp with a weighted brass base.');
  const [availability, setAvailability] = useState('Active');
  const [onlineStore, setOnlineStore] = useState(true);
  const [pos, setPos] = useState(true);
  const [type, setType] = useState('Lighting');
  const [vendor, setVendor] = useState('Lumière Studio');

  return (
    <>
      <PageHead
        title="Edit Product"
        subtitle="Aperture Desk Lamp · SKU APG-0001"
        actions={
          <>
            <a href="#" className="at-btn at-btn--outline at-press">Cancel</a>
            <button className="at-btn at-btn--primary at-press">Save changes</button>
          </>
        }
      />

      <div className="at-row">
        {/* MAIN FORM */}
        <div className="at-col-8 at-stack" style={{ gap: 'var(--at-space-5)' }}>
          {/* Basic information */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Basic information</div>
                <div className="at-eyebrow">Core product details</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
              <div>
                <label className="at-form-label">Title</label>
                <input className="at-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <label className="at-form-label">Description</label>
                <textarea className="at-textarea" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Media</div>
                <div className="at-eyebrow">4 photos</div>
              </div>
              <button className="at-btn at-btn--ghost at-btn--sm">+ Add</button>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-3)', flexWrap: 'wrap' }}>
              <div style={{ width: 96, height: 96, borderRadius: 'var(--at-radius-sm)', background: 'var(--at-surface)', border: '2px solid var(--at-ink)', display: 'grid', placeItems: 'center' }}>
                <div className="at-avatar at-avatar--lg" style={{ background: 'var(--at-secondary)', color: 'var(--at-on-secondary)' }}>A</div>
              </div>
              <div style={{ width: 96, height: 96, borderRadius: 'var(--at-radius-sm)', background: 'var(--at-canvas)', display: 'grid', placeItems: 'center' }}>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>+2</span>
              </div>
              <div style={{ width: 96, height: 96, borderRadius: 'var(--at-radius-sm)', border: '2px dashed var(--at-ink)', display: 'grid', placeItems: 'center', color: 'var(--at-text-muted)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Pricing</div>
                <div className="at-eyebrow">Current selling price</div>
              </div>
            </div>
            <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-col-6">
                <label className="at-form-label">Price (USD)</label>
                <input className="at-input at-mono" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="at-col-6">
                <label className="at-form-label">Compare-at price</label>
                <input className="at-input at-mono" type="number" value={compareAt} onChange={(e) => setCompareAt(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Inventory</div>
                <div className="at-eyebrow">84 in stock</div>
              </div>
            </div>
            <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-col-6">
                <label className="at-form-label">SKU</label>
                <input className="at-input at-mono" type="text" value={sku} onChange={(e) => setSku(e.target.value)} />
              </div>
              <div className="at-col-6">
                <label className="at-form-label">Quantity available</label>
                <input className="at-input at-mono" type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
              </div>
            </div>
            <label className="at-check" style={{ marginBlockStart: 'var(--at-space-4)' }}>
              <input type="checkbox" checked={trackQty} onChange={(e) => setTrackQty(e.target.checked)} /> Track quantity
            </label>
          </div>

          {/* Variants */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Variants</div>
                <div className="at-eyebrow">2 variants · Graphite, Brass</div>
              </div>
              <button className="at-btn at-btn--ghost at-btn--sm">+ Add variant</button>
            </div>
            <div className="at-table-wrap" style={{ border: 'none' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Variant</th>
                    <th className="at-num">Price</th>
                    <th className="at-num">Stock</th>
                    <th>SKU</th>
                  </tr>
                </thead>
                <tbody>
                  {VARIANTS.map((v) => (
                    <tr key={v.sku}>
                      <td>{v.variant}</td>
                      <td className="at-num">{v.price}</td>
                      <td className="at-num">{v.stock}</td>
                      <td className="at-mono">{v.sku}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Search engine listing */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Search engine listing</div>
                <div className="at-eyebrow">Preview on Google</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div>
                <label className="at-form-label">Meta title</label>
                <input className="at-input" type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
              </div>
              <div>
                <label className="at-form-label">Meta description</label>
                <textarea className="at-textarea" rows={2} value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="at-col-4 at-stack" style={{ gap: 'var(--at-space-5)' }}>
          {/* Status */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Status</div>
                <div className="at-eyebrow">Sales channels</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div>
                <label className="at-form-label">Availability</label>
                <select className="at-select" value={availability} onChange={(e) => setAvailability(e.target.value)}>
                  {AVAILABILITY.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>
              <label className="at-check"><input type="checkbox" checked={onlineStore} onChange={(e) => setOnlineStore(e.target.checked)} /> Online store</label>
              <label className="at-check"><input type="checkbox" checked={pos} onChange={(e) => setPos(e.target.checked)} /> Point of sale</label>
            </div>
          </div>

          {/* Performance */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Performance</div>
                <div className="at-eyebrow">Last 30 days</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {PERFORMANCE.map((p) => (
                <div key={p.label} className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>{p.label}</span>
                  <span className="at-text-strong at-num">{p.value}</span>
                </div>
              ))}
              <div className="at-progress" style={{ marginBlockStart: 'var(--at-space-2)' }}>
                <div className="at-progress__bar" style={{ width: '68%' }} />
              </div>
            </div>
          </div>

          {/* Organization */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Organization</div>
                <div className="at-eyebrow">Group this product</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div>
                <label className="at-form-label">Product type</label>
                <input className="at-input" type="text" value={type} onChange={(e) => setType(e.target.value)} />
              </div>
              <div>
                <label className="at-form-label">Vendor</label>
                <input className="at-input" type="text" value={vendor} onChange={(e) => setVendor(e.target.value)} />
              </div>
              <div>
                <label className="at-form-label">Tags</label>
                <div className="at-cluster" style={{ gap: 'var(--at-space-2)', flexWrap: 'wrap' }}>
                  {TAGS.map((t) => (
                    <span key={t} className="at-badge at-badge--neutral">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Danger zone */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)', borderColor: 'var(--at-danger)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div className="at-chart__title">Danger zone</div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                Removing this product deletes it permanently. Existing orders are unaffected.
              </p>
              <button className="at-btn at-btn--outline at-press" style={{ borderColor: 'var(--at-danger)', color: 'var(--at-danger-text)' }}>
                Archive product
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
