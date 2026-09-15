/*
 * Hactex React — eCommerce Add Product.
 * Built with the shared component classes,
 * inline token styles, and demo figures. Form inputs are controlled via useState.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const AVAILABILITY = ['Active', 'Draft', 'Archived'];
const TAGS = ['desk', 'led', 'brass'];

export default function AddProduct(): React.JSX.Element {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [compareAt, setCompareAt] = useState('');
  const [chargeTax, setChargeTax] = useState(false);
  const [sku, setSku] = useState('');
  const [qty, setQty] = useState('');
  const [trackQty, setTrackQty] = useState(true);
  const [continueOos, setContinueOos] = useState(false);
  const [physical, setPhysical] = useState(true);
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [urlHandle, setUrlHandle] = useState('');
  const [availability, setAvailability] = useState('Active');
  const [onlineStore, setOnlineStore] = useState(true);
  const [pos, setPos] = useState(true);
  const [instagram, setInstagram] = useState(false);
  const [type, setType] = useState('');
  const [vendor, setVendor] = useState('');
  const [collections, setCollections] = useState('');

  return (
    <>
      <PageHead
        title="Add Product"
        subtitle="Create a new product in the catalog."
        actions={
          <>
            <a href="#" className="at-btn at-btn--outline at-press">Cancel</a>
            <button className="at-btn at-btn--primary at-press">Save Product</button>
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
                <input className="at-input" type="text" placeholder="e.g. Aperture Desk Lamp" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <label className="at-form-label">Description</label>
                <textarea className="at-textarea" rows={4} placeholder="Describe the product…" value={description} onChange={(e) => setDescription(e.target.value)} />
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', marginBlockStart: 'var(--at-space-1)' }}>
                  {description.length} / 500 characters
                </div>
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Media</div>
                <div className="at-eyebrow">Photos and video</div>
              </div>
            </div>
            <div style={{ border: '2px dashed var(--at-ink)', borderRadius: 'var(--at-radius-md)', padding: 'var(--at-space-6)', textAlign: 'center', background: 'var(--at-surface)' }}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: 32, height: 32, marginInline: 'auto', color: 'var(--at-text-muted)', marginBlockEnd: 'var(--at-space-2)' }}
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <div className="at-text-strong" style={{ marginBlockEnd: 4 }}>Drop files here</div>
              <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', marginBlockEnd: 'var(--at-space-3)' }}>
                PNG, JPG, MP4 up to 5MB
              </div>
              <button className="at-btn at-btn--outline at-btn--sm at-press">Browse files</button>
            </div>
          </div>

          {/* Pricing */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Pricing</div>
                <div className="at-eyebrow">Set your selling price</div>
              </div>
            </div>
            <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-col-6">
                <label className="at-form-label">Price (USD)</label>
                <input className="at-input at-mono" type="number" placeholder="129.00" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="at-col-6">
                <label className="at-form-label">Compare-at price</label>
                <input className="at-input at-mono" type="number" placeholder="159.00" value={compareAt} onChange={(e) => setCompareAt(e.target.value)} />
                <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', marginBlockStart: 'var(--at-space-1)' }}>
                  Shown as a crossed-out price.
                </div>
              </div>
            </div>
            <div className="at-cluster" style={{ marginBlockStart: 'var(--at-space-4)' }}>
              <label className="at-check">
                <input type="checkbox" checked={chargeTax} onChange={(e) => setChargeTax(e.target.checked)} /> Charge tax on this product
              </label>
            </div>
          </div>

          {/* Inventory */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Inventory</div>
                <div className="at-eyebrow">Stock and SKU tracking</div>
              </div>
            </div>
            <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-col-6">
                <label className="at-form-label">SKU</label>
                <input className="at-input at-mono" type="text" placeholder="APG-0001" value={sku} onChange={(e) => setSku(e.target.value)} />
              </div>
              <div className="at-col-6">
                <label className="at-form-label">Quantity available</label>
                <input className="at-input at-mono" type="number" placeholder="84" value={qty} onChange={(e) => setQty(e.target.value)} />
              </div>
            </div>
            <div className="at-cluster" style={{ marginBlockStart: 'var(--at-space-4)' }}>
              <label className="at-check"><input type="checkbox" checked={trackQty} onChange={(e) => setTrackQty(e.target.checked)} /> Track quantity</label>
              <label className="at-check"><input type="checkbox" checked={continueOos} onChange={(e) => setContinueOos(e.target.checked)} /> Continue selling when out of stock</label>
            </div>
          </div>

          {/* Variants */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Variants</div>
                <div className="at-eyebrow">Size, color, material</div>
              </div>
              <button className="at-btn at-btn--ghost at-btn--sm">+ Add variant</button>
            </div>
            <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
              This product has multiple versions (e.g. colors or sizes). Add a variant to track
              inventory and pricing separately for each.
            </div>
          </div>

          {/* Shipping */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Shipping</div>
                <div className="at-eyebrow">Physical product details</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <label className="at-check"><input type="checkbox" checked={physical} onChange={(e) => setPhysical(e.target.checked)} /> This is a physical product</label>
              <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
                <div className="at-col-4">
                  <label className="at-form-label">Weight (g)</label>
                  <input className="at-input at-mono" type="number" placeholder="1200" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="at-col-4">
                  <label className="at-form-label">Length (cm)</label>
                  <input className="at-input at-mono" type="number" placeholder="48" value={length} onChange={(e) => setLength(e.target.value)} />
                </div>
                <div className="at-col-4">
                  <label className="at-form-label">Width (cm)</label>
                  <input className="at-input at-mono" type="number" placeholder="18" value={width} onChange={(e) => setWidth(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Search engine listing */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Search engine listing</div>
                <div className="at-eyebrow">How this appears on Google</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div>
                <label className="at-form-label">Meta title</label>
                <input className="at-input" type="text" placeholder="Aperture Desk Lamp — Warm-white LED" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
              </div>
              <div>
                <label className="at-form-label">Meta description</label>
                <textarea className="at-textarea" rows={2} placeholder="Short description for search results…" value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} />
              </div>
              <div>
                <label className="at-form-label">URL handle</label>
                <div className="at-cluster">
                  <span className="at-text-muted at-mono" style={{ fontSize: 'var(--at-text-sm)' }}>/products/</span>
                  <input className="at-input at-mono" type="text" placeholder="aperture-desk-lamp" style={{ flex: 1 }} value={urlHandle} onChange={(e) => setUrlHandle(e.target.value)} />
                </div>
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
              <label className="at-check"><input type="checkbox" checked={instagram} onChange={(e) => setInstagram(e.target.checked)} /> Instagram shop</label>
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
                <input className="at-input" type="text" placeholder="Lighting" value={type} onChange={(e) => setType(e.target.value)} />
              </div>
              <div>
                <label className="at-form-label">Vendor</label>
                <input className="at-input" type="text" placeholder="Lumière Studio" value={vendor} onChange={(e) => setVendor(e.target.value)} />
              </div>
              <div>
                <label className="at-form-label">Collections</label>
                <input className="at-input" type="text" placeholder="Add to collection…" value={collections} onChange={(e) => setCollections(e.target.value)} />
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
        </div>
      </div>
    </>
  );
}
