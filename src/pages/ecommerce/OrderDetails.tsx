/*
 * Hactex React — eCommerce Order Details.
 * Built with the shared component classes,
 * inline token styles, and demo figures. The timeline, items, and notes rows
 * are extracted into const arrays; the internal-note textarea is controlled.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const TIMELINE = [
  { title: 'Order placed', meta: 'Jun 27, 2026 · 2:41 PM — confirmation sent to amelia.hart@gmail.com', muted: false, done: true },
  { title: 'Payment confirmed', meta: 'Jun 27, 2026 · 2:42 PM', muted: false, done: true },
  { title: 'Processing', meta: 'In progress — packing team notified', muted: false, done: true },
  { title: 'Shipped', meta: 'Pending', muted: true, done: false },
  { title: 'Expected Jun 28', meta: 'Pending', muted: true, done: false },
];

const ITEMS = [
  { letter: 'A', name: 'Aperture Desk Lamp', meta: 'Brass / Warm white · APG-0001 × 1', amount: '$129.00', muted: false, refunded: false, bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)' },
  { letter: 'M', name: 'Matte Ceramic Mug', meta: 'Slate · 12 oz · APG-0003 × 2', amount: '$48.00', muted: false, refunded: false, bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)' },
  { letter: 'W', name: 'Walnut Monitor Riser', meta: 'Walnut / Large · APG-0004 × 1', amount: '$96.00', muted: false, refunded: false, bg: 'var(--at-lime)', color: 'var(--at-on-lime)' },
  { letter: 'L', name: 'Leather Cable Wrap', meta: 'Tan · APG-0012 × 1', amount: '$18.00', muted: true, refunded: true, bg: 'var(--at-accent)', color: 'var(--at-on-accent)' },
];

const FULFILLMENT = [
  { label: 'Carrier', value: 'UPS Ground' },
  { label: 'Tracking', value: '1Z999AA10123456784', mono: true },
  { label: 'Service', value: 'Standard (3–5 days)' },
];

const PAYMENT = [
  { label: 'Subtotal', value: '$273.00' },
  { label: 'Discount (WELCOME10)', value: '−$27.30', color: 'var(--at-danger-text)' },
  { label: 'Shipping', value: 'Free', color: 'var(--at-success-text)' },
  { label: 'Tax (8.25%)', value: '$20.27' },
];

const NOTES = [
  { letter: 'P', name: 'Priya Nair', when: 'Jun 27, 2026 · 4:12 PM', text: 'Customer requested gift wrapping — added a note for the packing team.', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)' },
  { letter: 'S', name: 'System', when: 'Jun 27, 2026 · 2:41 PM', text: 'Discount code WELCOME10 applied automatically (first order).', bg: 'var(--at-ink-strong)', color: 'var(--at-paper)' },
];

const SHIPPING_ADDR = ['Amelia Hart', '1820 NW Glisan St, Apt 4B', 'Portland · OR · 97201', 'United States', '+1 (503) 555-0142'];
const BILLING_ADDR = ['Amelia Hart', '1820 NW Glisan St, Apt 4B', 'Portland · OR · 97201', 'United States'];

const ADDRESS_STYLE: React.CSSProperties = { fontStyle: 'normal', color: 'var(--at-text-muted)', fontSize: 'var(--at-text-sm)', lineHeight: 1.7 };

export default function OrderDetails(): React.JSX.Element {
  const [note, setNote] = useState('');

  return (
    <>
      <PageHead
        title="#ORD-8042"
        subtitle="Placed Jun 27, 2026 · Amelia Hart · $265.97"
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Print</button>
            <button className="at-btn at-btn--primary at-press">Fulfill order</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* MAIN COLUMN */}
          <div className="at-col-8 at-stack" style={{ gap: 'var(--at-space-5)' }}>
            {/* Order timeline */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div>
                  <div className="at-chart__title">Order timeline</div>
                  <div className="at-eyebrow">Estimated delivery Jul 2 – Jul 4, 2026</div>
                </div>
                <span className="at-badge at-badge--neutral at-mono">Step 3 of 5</span>
              </div>
              <div className="at-timeline">
                {TIMELINE.map((t) => (
                  <div key={t.title} className="at-timeline__item">
                    <div
                      className="at-timeline__dot"
                      style={t.done ? undefined : { background: 'var(--at-canvas)', border: '2px solid var(--at-ink)' }}
                    />
                    <div>
                      <div className={t.muted ? 'at-text-muted' : 'at-text-strong'}>{t.title}</div>
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{t.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div><div className="at-chart__title">Items</div></div>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>4 items</span>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
                {ITEMS.map((it) => (
                  <div key={it.name} className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <div className="at-cluster">
                      <div className="at-avatar at-avatar--sm" style={{ ...(it.bg ? { background: it.bg, color: it.color } : null), ...(it.color ? { color: it.color } : null) }}>{it.letter}</div>
                      <div>
                        <div className="at-text-strong">
                          {it.name}
                          {it.refunded && <span className="at-badge at-badge--inline at-badge--neutral">Refunded</span>}
                        </div>
                        <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{it.meta}</div>
                      </div>
                    </div>
                    <span className={`at-num at-mono${it.muted ? ' at-text-muted' : ''}`} style={it.muted ? { textDecoration: 'line-through' } : undefined}>{it.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fulfillment & shipping */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div><div className="at-chart__title">Fulfillment &amp; shipping</div></div>
                <span className="at-badge at-badge--neutral">Unfulfilled</span>
              </div>
              <div className="at-row">
                {FULFILLMENT.map((f) => (
                  <div key={f.label} className="at-col-4">
                    <div className="at-eyebrow">{f.label}</div>
                    <div className={`at-text-strong${f.mono ? ' at-mono' : ''}`}>{f.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment summary */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div><div className="at-chart__title">Payment summary</div></div>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-2)', fontSize: 'var(--at-text-sm)', maxWidth: 420, marginInlineStart: 'auto' }}>
                {PAYMENT.map((p) => (
                  <div key={p.label} className="at-cluster" style={{ justifyContent: 'space-between' }}>
                    <span className="at-text-muted">{p.label}</span>
                    <span className="at-num at-mono" style={p.color ? { color: p.color } : undefined}>{p.value}</span>
                  </div>
                ))}
                <div className="at-divider" />
                <div className="at-cluster" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="at-text-strong">Total</span>
                  <span className="at-num" style={{ fontSize: 'var(--at-text-lg)', fontWeight: 700 }}>$265.97</span>
                </div>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--at-success-text)' }}>Amount paid</span>
                  <span className="at-num at-mono" style={{ color: 'var(--at-success-text)' }}>$265.97</span>
                </div>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Balance</span>
                  <span className="at-num at-mono at-text-muted">$0.00</span>
                </div>
              </div>
            </div>

            {/* Internal notes */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div>
                  <div className="at-chart__title">Internal notes</div>
                  <div className="at-eyebrow">Only visible to your team</div>
                </div>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
                {NOTES.map((n) => (
                  <div key={n.name + n.when} className="at-cluster" style={{ alignItems: 'flex-start', gap: 'var(--at-space-3)' }}>
                    <div className="at-avatar at-avatar--sm" style={{ ...(n.bg ? { background: n.bg, color: n.color } : null), ...(n.color ? { color: n.color } : null) }}>{n.letter}</div>
                    <div>
                      <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>
                        {n.name}
                        <span className="at-text-muted" style={{ fontWeight: 400 }}> · {n.when}</span>
                      </div>
                      <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', margin: '2px 0 0' }}>{n.text}</p>
                    </div>
                  </div>
                ))}
                <textarea className="at-textarea" placeholder="Add an internal note…" value={note} onChange={(e) => setNote(e.target.value)} />
                <div><button className="at-btn at-btn--primary at-press">Add note</button></div>
              </div>
            </div>
          </div>

          {/* SIDEBAR COLUMN */}
          <div className="at-col-4 at-stack" style={{ gap: 'var(--at-space-5)' }}>
            {/* Customer */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div><div className="at-chart__title">Customer</div></div>
                <a href="#" className="at-btn at-btn--ghost at-btn--sm">View profile</a>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
                <div className="at-avatar at-avatar--lg" style={{ background: 'var(--at-secondary)', color: 'var(--at-on-secondary)' }}>A</div>
                <div>
                  <div className="at-text-strong">Amelia Hart</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>amelia.hart@gmail.com</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>12 orders · $2,186.75 spent</div>
                </div>
              </div>
            </div>

            {/* Shipping address */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div><div className="at-chart__title">Shipping address</div></div>
              </div>
              <address style={ADDRESS_STYLE}>
                <span className="at-text-strong" style={{ color: 'var(--at-text-strong)' }}>{SHIPPING_ADDR[0]}</span><br />
                {SHIPPING_ADDR[1]}<br />
                Portland · OR · <span className="at-mono">97201</span><br />
                {SHIPPING_ADDR[3]}<br />
                <span className="at-mono">{SHIPPING_ADDR[4]}</span>
              </address>
            </div>

            {/* Billing address */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div><div className="at-chart__title">Billing address</div></div>
                <span className="at-badge at-badge--neutral">Same as shipping</span>
              </div>
              <address style={ADDRESS_STYLE}>
                <span className="at-text-strong" style={{ color: 'var(--at-text-strong)' }}>{BILLING_ADDR[0]}</span><br />
                {BILLING_ADDR[1]}<br />
                Portland · OR · <span className="at-mono">97201</span><br />
                {BILLING_ADDR[3]}
              </address>
            </div>

            {/* Payment */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div><div className="at-chart__title">Payment</div></div>
                <span className="at-badge at-badge--success">Paid</span>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-3)', padding: 'var(--at-space-3)', border: '1px solid var(--at-ink)', borderRadius: 'var(--at-radius-md)', background: 'var(--at-surface)' }}>
                <div className="at-avatar at-avatar--sm at-avatar--square" style={{ background: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)' }}>V</div>
                <div>
                  <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>Visa ending 4242</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>Expires 08/27 · Auth 2.41 PM</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div><div className="at-chart__title">Tags</div></div>
              </div>
              <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                <span className="at-badge at-badge--neutral">First order</span>
                <span className="at-badge at-badge--neutral">Gift</span>
                <button className="at-btn at-btn--outline at-btn--sm">+ Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
