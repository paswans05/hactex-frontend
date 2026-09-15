/*
 * Hactex React — eCommerce Create Invoice.
 * Built with the shared component classes,
 * inline token styles, and demo figures. Form inputs are controlled via useState;
 * the line-items table is extracted into a const array.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const CLIENTS = [
  'Clayhouse Ceramics — billing@clayhouse.io',
  'Northwind Furniture — ap@northwind.co',
  'Rossi Hactex Ltda. — finance@rossiatelier.com',
  'Voltic Supply Co. — accounts@voltic.co',
  '+ Add new client',
];

const CURRENCIES = ['USD — US Dollar', 'EUR — Euro', 'GBP — Pound'];
const TERMS = ['Net 14', 'Net 30', 'Due on receipt'];
const DISCOUNT_TYPES = ['Percent (%)', 'Flat amount'];

const LINE_ITEMS = [
  { desc: 'Glazed stoneware mug — wholesale pack of 12', qty: 40, price: '$42.00', tax: '8%', total: '$1,680.00' },
  { desc: 'Matte carafe — 1.2L, slate finish', qty: 18, price: '$52.00', tax: '8%', total: '$936.00' },
  { desc: 'Marketplace listing fee — Q3 2026', qty: 1, price: '$120.00', tax: '0%', total: '$120.00' },
];

export default function CreateInvoice(): React.JSX.Element {
  const [client, setClient] = useState(CLIENTS[0]);
  const [contactName, setContactName] = useState('Mei-Ling Chen');
  const [email, setEmail] = useState('billing@clayhouse.io');
  const [billingAddress, setBillingAddress] = useState('88 Kiln Road, Unit 4\nPortland · OR · 97209 · United States');
  const [invoiceNo, setInvoiceNo] = useState('#INV-2026-0143');
  const [issueDate, setIssueDate] = useState('2026-06-28');
  const [dueDate, setDueDate] = useState('2026-07-12');
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [paymentTerms, setPaymentTerms] = useState(TERMS[0]);
  const [discount, setDiscount] = useState('5');
  const [discountType, setDiscountType] = useState(DISCOUNT_TYPES[0]);
  const [shipping, setShipping] = useState('0');
  const [notes, setNotes] = useState('');

  return (
    <>
      <PageHead
        title="Create Invoice"
        subtitle="New draft · #INV-2026-0143"
        actions={
          <>
            <a href="#" className="at-btn at-btn--outline at-press">Cancel</a>
            <button className="at-btn at-btn--primary at-press">Save &amp; send</button>
          </>
        }
      />

      <div className="at-row">
        {/* MAIN FORM */}
        <div className="at-col-8 at-stack" style={{ gap: 'var(--at-space-5)' }}>
          {/* Client */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Client</div>
                <div className="at-eyebrow">Bill to</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
              <div>
                <label className="at-form-label">Select client</label>
                <select className="at-select" value={client} onChange={(e) => setClient(e.target.value)}>
                  {CLIENTS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
                <div className="at-col-6">
                  <label className="at-form-label">Contact name</label>
                  <input className="at-input" type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                </div>
                <div className="at-col-6">
                  <label className="at-form-label">Email</label>
                  <input className="at-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="at-form-label">Billing address</label>
                <textarea className="at-textarea" rows={2} value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Details</div>
                <div className="at-eyebrow">Invoice metadata</div>
              </div>
            </div>
            <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-col-4">
                <label className="at-form-label">Invoice number</label>
                <input className="at-input at-mono" type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
              </div>
              <div className="at-col-4">
                <label className="at-form-label">Issue date</label>
                <input className="at-input at-mono" type="text" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
              </div>
              <div className="at-col-4">
                <label className="at-form-label">Due date</label>
                <input className="at-input at-mono" type="text" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
            </div>
            <div className="at-row" style={{ gap: 'var(--at-space-4)', marginBlockStart: 'var(--at-space-4)' }}>
              <div className="at-col-6">
                <label className="at-form-label">Currency</label>
                <select className="at-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  {CURRENCIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="at-col-6">
                <label className="at-form-label">Payment terms</label>
                <select className="at-select" value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)}>
                  {TERMS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Line items */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Line items</div>
                <div className="at-eyebrow">3 items</div>
              </div>
              <button className="at-btn at-btn--ghost at-btn--sm">+ Add line</button>
            </div>
            <div className="at-table-wrap" style={{ border: 'none' }}>
              <table className="at-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th className="at-num">Qty</th>
                    <th className="at-num">Price</th>
                    <th>Tax</th>
                    <th className="at-num">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {LINE_ITEMS.map((li) => (
                    <tr key={li.desc}>
                      <td>{li.desc}</td>
                      <td className="at-num">{li.qty}</td>
                      <td className="at-num at-mono">{li.price}</td>
                      <td>{li.tax}</td>
                      <td className="at-num at-mono">{li.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Adjustments & notes */}
          <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Adjustments &amp; notes</div>
                <div className="at-eyebrow">Discounts, shipping, memo</div>
              </div>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
                <div className="at-col-4">
                  <label className="at-form-label">Discount</label>
                  <input className="at-input at-mono" type="text" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                </div>
                <div className="at-col-4">
                  <label className="at-form-label">Type</label>
                  <select className="at-select" value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
                    {DISCOUNT_TYPES.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="at-col-4">
                  <label className="at-form-label">Shipping</label>
                  <input className="at-input at-mono" type="number" value={shipping} onChange={(e) => setShipping(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="at-form-label">Notes (visible to client)</label>
                <textarea className="at-textarea" rows={2} placeholder="Thank you for your business…" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR: live preview */}
        <div className="at-col-4">
          <div className="at-card" style={{ padding: 'var(--at-space-5)', position: 'sticky', top: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Invoice</div>
                <div className="at-eyebrow">Live preview</div>
              </div>
              <span className="at-badge at-badge--neutral">Draft</span>
            </div>
            <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>From</span>
                <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>Lumière Studio</span>
              </div>
              <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>To</span>
                <span className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>Clayhouse Ceramics</span>
              </div>
              <div className="at-divider" />
              <div className="at-stack" style={{ gap: 'var(--at-space-2)', fontSize: 'var(--at-text-sm)' }}>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Subtotal</span>
                  <span className="at-num at-mono">$2,736.00</span>
                </div>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Discount (5%)</span>
                  <span className="at-num at-mono" style={{ color: 'var(--at-danger-text)' }}>−$136.80</span>
                </div>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Tax</span>
                  <span className="at-num at-mono">$209.28</span>
                </div>
                <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="at-text-muted">Shipping</span>
                  <span className="at-num at-mono" style={{ color: 'var(--at-success-text)' }}>Free</span>
                </div>
                <div className="at-divider" />
                <div className="at-cluster" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="at-text-strong">Amount due</span>
                  <span className="at-num" style={{ fontSize: 'var(--at-text-lg)', fontWeight: 700 }}>$2,808.48</span>
                </div>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-2)' }}>
                <button className="at-btn at-btn--primary at-btn--block at-press">Save &amp; send</button>
                <button className="at-btn at-btn--outline at-btn--block at-press">Save as draft</button>
              </div>
              <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', textAlign: 'center' }}>
                Due Jul 12, 2026 · Net 14
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
