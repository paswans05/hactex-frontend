/*
 * Hactex React — eCommerce Checkout.
 * Built with the shared component classes, inline
 * token styles, and demo figures. Contact/address + payment inputs are controlled
 * via useState; the shipping method and payment method are selectable.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard', meta: '5–7 business days', price: 'Free', priceColor: 'var(--at-success-text)' },
  { id: 'express', name: 'Express', meta: '2–3 business days', price: '$12.00', priceColor: undefined },
  { id: 'priority', name: 'Priority overnight', meta: 'Next business day by 12 PM', price: '$24.50', priceColor: undefined },
];

const ORDER_ITEMS = [
  { letter: 'A', name: 'Aperture Desk Lamp × 1', price: '$129.00', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)' },
  { letter: 'M', name: 'Matte Ceramic Mug × 2', price: '$48.00', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)' },
  { letter: 'W', name: 'Walnut Monitor Riser × 1', price: '$96.00', bg: 'var(--at-lime)', color: 'var(--at-on-lime)' },
];

const PAYMENT_TABS = ['Card', 'PayPal', 'Bank'];

export default function Checkout(): React.JSX.Element {
  const [email, setEmail] = useState('amelia.hart@gmail.com');
  const [phone, setPhone] = useState('+1 (503) 555-0142');
  const [firstName, setFirstName] = useState('Amelia');
  const [lastName, setLastName] = useState('Hart');
  const [address, setAddress] = useState('1820 NW Glisan St, Apt 4B');
  const [city, setCity] = useState('Portland');
  const [state, setState] = useState('OR');
  const [zip, setZip] = useState('97201');
  const [ship, setShip] = useState('standard');
  const [payTab, setPayTab] = useState(0);
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('Amelia Hart');
  const [emailReceipt, setEmailReceipt] = useState(true);

  return (
    <>
      <PageHead
        title="Checkout"
        subtitle="Secure checkout · 3 items · $273.00"
        actions={
          <a href="#" className="at-btn at-btn--outline at-press">Back to cart</a>
        }
      />

      <div className="at-row">
        {/* Steps column */}
        <div className="at-col-8 at-stack" style={{ gap: 'var(--at-space-5)' }}>
          {/* Step 1: Contact & address */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Contact &amp; address</div>
                <div className="at-eyebrow">Step 1 of 4 · Where should we send it?</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-row" style={{ gap: 'var(--at-space-5)' }}>
                <div className="at-col-6">
                  <label className="at-form-label">Email</label>
                  <input className="at-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="at-col-6">
                  <label className="at-form-label">Phone</label>
                  <input className="at-input at-mono" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
                <div className="at-col-6">
                  <label className="at-form-label">First name</label>
                  <input className="at-input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="at-col-6">
                  <label className="at-form-label">Last name</label>
                  <input className="at-input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="at-form-label">Address</label>
                <input className="at-input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
                <div className="at-col-6">
                  <label className="at-form-label">City</label>
                  <input className="at-input" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="at-col-3">
                  <label className="at-form-label">State</label>
                  <input className="at-input" type="text" value={state} onChange={(e) => setState(e.target.value)} />
                </div>
                <div className="at-col-3">
                  <label className="at-form-label">ZIP</label>
                  <input className="at-input at-mono" type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Shipping method */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Shipping method</div>
                <div className="at-eyebrow">Step 2 of 4 · Delivering to Portland, OR 97201</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              {SHIPPING_METHODS.map((m) => (
                <label
                  key={m.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--at-space-4)',
                    padding: 'var(--at-space-4)',
                    border: '1.5px solid var(--at-ink)',
                    borderRadius: 'var(--at-radius-md)',
                    cursor: 'pointer',
                  }}
                >
                  <input type="radio" name="ship" checked={ship === m.id} onChange={() => setShip(m.id)} />
                  <div style={{ flex: 1 }}>
                    <div className="at-text-strong">{m.name}</div>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{m.meta}</div>
                  </div>
                  <span className="at-text-strong at-num" style={m.priceColor ? { color: m.priceColor } : undefined}>{m.price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Step 3: Payment */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Payment</div>
                <div className="at-eyebrow">Step 3 of 4 · All transactions are encrypted</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-segment">
                {PAYMENT_TABS.map((t, i) => (
                  <button key={t} className={`at-segment__btn${payTab === i ? ' is-active' : ''}`} onClick={() => setPayTab(i)}>{t}</button>
                ))}
              </div>
              <div>
                <label className="at-form-label">Card number</label>
                <input className="at-input at-mono" type="text" placeholder="4242 4242 4242 4242" value={card} onChange={(e) => setCard(e.target.value)} />
              </div>
              <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
                <div className="at-col-6">
                  <label className="at-form-label">Expiry</label>
                  <input className="at-input at-mono" type="text" placeholder="08/27" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                </div>
                <div className="at-col-6">
                  <label className="at-form-label">CVC</label>
                  <input className="at-input at-mono" type="text" placeholder="123" value={cvc} onChange={(e) => setCvc(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="at-form-label">Name on card</label>
                <input className="at-input" type="text" value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Step 4: Review & place order */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Review &amp; place order</div>
                <div className="at-eyebrow">Step 4 of 4 · Final check</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>Ship to</span>
                <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>Amelia Hart, Portland OR 97201</span>
              </div>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>Delivery</span>
                <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>Standard · 5–7 business days</span>
              </div>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>Payment</span>
                <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>Visa ending 4242</span>
              </div>
              <label className="at-check" style={{ marginBlockStart: 'var(--at-space-2)' }}>
                <input type="checkbox" checked={emailReceipt} onChange={(e) => setEmailReceipt(e.target.checked)} /> Email me a receipt and shipping updates
              </label>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="at-col-4">
          <div className="at-card" style={{ padding: 'var(--at-space-5)', position: 'sticky', top: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div><div className="at-chart__title">Order summary</div></div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
              <div className="at-stack" style={{ gap: 'var(--at-space-2)' }}>
                {ORDER_ITEMS.map((it) => (
                  <div key={it.name} className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
                    <div className="at-avatar at-avatar--sm" style={{ ...(it.bg ? { background: it.bg, color: it.color } : null), ...(it.color ? { color: it.color } : null) }}>{it.letter}</div>
                    <div style={{ flex: 1 }}>
                      <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{it.name}</div>
                    </div>
                    <span className="at-num at-mono" style={{ fontSize: 'var(--at-text-sm)' }}>{it.price}</span>
                  </div>
                ))}
              </div>
              <div className="at-divider" />
              <div className="at-stack" style={{ gap: 'var(--at-space-2)', fontSize: 'var(--at-text-sm)' }}>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Subtotal</span>
                  <span className="at-num at-mono">$273.00</span>
                </div>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Shipping</span>
                  <span className="at-num at-mono" style={{ color: 'var(--at-success-text)' }}>Free</span>
                </div>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Tax (8.25%)</span>
                  <span className="at-num at-mono">$22.52</span>
                </div>
                <div className="at-divider" />
                <div className="at-cluster" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="at-text-strong">Total</span>
                  <span className="at-num" style={{ fontSize: 'var(--at-text-lg)', fontWeight: 700 }}>$295.52</span>
                </div>
              </div>
              <button className="at-btn at-btn--primary at-btn--block at-press">Place order · $295.52</button>
              <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', textAlign: 'center' }}>
                By placing this order you agree to our terms of service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
