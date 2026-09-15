/*
 * Hactex React — eCommerce Cart.
 * Built with the shared component classes, inline token
 * styles, and demo figures. Line-item quantity steppers are wired to useState
 * so the line totals + order summary recompute live.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

interface Item {
  id: string;
  letter: string;
  name: string;
  meta: string;
  note?: string;
  noteWarn?: boolean;
  each: number;
  qty: number;
  bg?: string;
  color?: string;
}

const SAVED = [
  { letter: 'B', name: 'Brass Task Light', meta: 'Brass / Warm white', price: '$182.00', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)' },
  { letter: 'F', name: 'Felt Laptop Sleeve 14"', meta: 'Charcoal', price: '$44.00', bg: undefined, color: undefined },
];

const MAY_LIKE = [
  { letter: 'C', name: 'Cork Desk Mat', price: '$38.00', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)' },
  { letter: 'O', name: 'Oak Pen Tray', price: '$28.00', bg: 'var(--at-lime)', color: 'var(--at-on-lime)' },
  { letter: 'G', name: 'Grid Notebook A5', price: '$16.00', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)' },
];

const TAX_RATE = 0.0825;

export default function Cart(): React.JSX.Element {
  const [items, setItems] = useState<Item[]>([
    { id: 'APG-0001', letter: 'A', name: 'Aperture Desk Lamp', meta: 'Graphite / 48 cm · APG-0001', each: 129.0, qty: 1, bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)' },
    { id: 'APG-0003', letter: 'M', name: 'Matte Ceramic Mug', meta: 'Slate · 12 oz · APG-0003', each: 24.0, qty: 2, bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)' },
    { id: 'APG-0004', letter: 'W', name: 'Walnut Monitor Riser', meta: 'Walnut / Large · APG-0004', each: 96.0, qty: 1, bg: 'var(--at-lime)', color: 'var(--at-on-lime)' },
    { id: 'APG-0011', letter: 'A', name: 'Anodized Bottle 750ml', meta: 'Forest green · APG-0011', note: 'Only 3 left', noteWarn: true, each: 34.0, qty: 3, bg: 'var(--at-accent)', color: 'var(--at-on-accent)' },
  ]);
  const [discount, setDiscount] = useState('');

  const setQty = (id: string, q: number): void => {
    if (q < 1) return;
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty: q } : it)));
  };

  const totalUnits = items.reduce((s, it) => s + it.qty, 0);
  const subtotal = items.reduce((s, it) => s + it.each * it.qty, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const money = (n: number): string => `$${n.toFixed(2)}`;

  return (
    <>
      <PageHead
        title="Cart"
        subtitle={`${totalUnits} items · subtotal ${money(subtotal)}`}
        actions={
          <>
            <a href="#" className="at-btn at-btn--outline at-press">Continue shopping</a>
            <a href="#" className="at-btn at-btn--primary at-press">Checkout</a>
          </>
        }
      />

      <div className="at-row">
        {/* Items column */}
        <div className="at-col-8 at-stack" style={{ gap: 'var(--at-space-5)' }}>
          {/* Your items */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div><div className="at-chart__title">Your items</div></div>
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>{totalUnits} items</span>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
              {items.map((it, i) => (
                <div key={it.id}>
                  {i > 0 && <div className="at-divider" style={{ marginBlockEnd: 'var(--at-space-4)' }} />}
                  <div className="at-cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className="at-cluster">
                      <div className="at-avatar at-avatar--lg" style={{ ...(it.bg ? { background: it.bg, color: it.color } : null), ...(it.color ? { color: it.color } : null) }}>{it.letter}</div>
                      <div>
                        <div className="at-text-strong">{it.name}</div>
                        <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                          {it.meta}
                          {it.note && <> · <span style={it.noteWarn ? { color: 'var(--at-warning-text)' } : undefined}>{it.note}</span></>}
                        </div>
                        <div className="at-text-muted at-mono" style={{ fontSize: 'var(--at-text-xs)' }}>{money(it.each)} each</div>
                      </div>
                    </div>
                    <div className="at-cluster">
                      <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                        <button className="at-btn at-btn--outline at-btn--icon at-btn--sm" onClick={() => setQty(it.id, it.qty - 1)}>−</button>
                        <span className="at-text-strong at-mono" style={{ minWidth: 24, textAlign: 'center' }}>{it.qty}</span>
                        <button className="at-btn at-btn--outline at-btn--icon at-btn--sm" onClick={() => setQty(it.id, it.qty + 1)}>+</button>
                      </div>
                      <span className="at-text-strong at-num at-mono" style={{ minWidth: 72, textAlign: 'right' }}>{money(it.each * it.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved for later */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div><div className="at-chart__title">Saved for later</div></div>
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>2 items</span>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              {SAVED.map((s, i) => (
                <div key={s.name}>
                  {i > 0 && <div className="at-divider" style={{ marginBlockEnd: 'var(--at-space-4)' }} />}
                  <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <div className="at-cluster">
                      <div className="at-avatar at-avatar--sm" style={{ ...(s.bg ? { background: s.bg, color: s.color } : null), ...(s.color ? { color: s.color } : null) }}>{s.letter}</div>
                      <div>
                        <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{s.name}</div>
                        <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{s.meta}</div>
                      </div>
                    </div>
                    <div className="at-cluster">
                      <span className="at-text-strong at-num at-mono" style={{ fontSize: 'var(--at-text-sm)' }}>{s.price}</span>
                      <button className="at-btn at-btn--ghost at-btn--sm">Move to cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* You may also like */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div><div className="at-chart__title">You may also like</div></div>
            </div>
            <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
              {MAY_LIKE.map((p) => (
                <div key={p.name} className="at-col-4">
                  <div className="at-cluster">
                    <div className="at-avatar at-avatar--sm" style={{ ...(p.bg ? { background: p.bg, color: p.color } : null), ...(p.color ? { color: p.color } : null) }}>{p.letter}</div>
                    <div>
                      <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{p.name}</div>
                      <div className="at-text-muted at-num at-mono" style={{ fontSize: 'var(--at-text-xs)' }}>{p.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="at-col-4">
          <div className="at-card" style={{ padding: 'var(--at-space-5)', position: 'sticky', top: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div><div className="at-chart__title">Order summary</div></div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div>
                <div className="at-cluster" style={{ justifyContent: 'space-between', marginBlockEnd: 'var(--at-space-1)' }}>
                  <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Free shipping unlocked 🎉</span>
                  <span className="at-text-muted at-mono" style={{ fontSize: 'var(--at-text-xs)' }}>100%</span>
                </div>
                <div className="at-progress">
                  <div className="at-progress__bar at-progress--success" style={{ width: '100%' }} />
                </div>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-2)', fontSize: 'var(--at-text-sm)' }}>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Subtotal</span>
                  <span className="at-num at-mono">{money(subtotal)}</span>
                </div>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Shipping</span>
                  <span className="at-num at-mono" style={{ color: 'var(--at-success-text)' }}>Free</span>
                </div>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Estimated tax (8.25%)</span>
                  <span className="at-num at-mono">{money(tax)}</span>
                </div>
                <div className="at-divider" />
                <div className="at-cluster" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="at-text-strong">Total</span>
                  <span className="at-num" style={{ fontSize: 'var(--at-text-lg)', fontWeight: 700 }}>{money(total)}</span>
                </div>
              </div>
              <div>
                <label className="at-form-label">Discount code</label>
                <div className="at-cluster">
                  <input
                    className="at-input at-mono"
                    type="text"
                    placeholder="WELCOME10"
                    style={{ flex: 1 }}
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                  <button className="at-btn at-btn--outline at-press">Apply</button>
                </div>
              </div>
              <a href="#" className="at-btn at-btn--primary at-btn--block at-press">Checkout · {money(total)}</a>
              <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', textAlign: 'center' }}>
                Taxes and shipping calculated at checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
