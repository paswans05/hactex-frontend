/*
 * Hactex React — eCommerce Product Details.
 * Built with the shared component classes,
 * inline token styles, and demo figures. The review form is controlled via
 * useState; "You might also like" rows are extracted into a const array.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

const THUMBS = [
  { n: '1', active: true },
  { n: '2', active: false },
  { n: '3', active: false },
  { n: '4', active: false },
];

const SPECS = [
  { label: 'Finish', value: 'Graphite / Brass' },
  { label: 'Wattage', value: '8W LED' },
  { label: 'Dimensions', value: '48 × 18 × 48 cm', mono: true },
];

const SHIPPING = [
  { icon: '✦', bg: 'var(--at-secondary)', color: 'var(--at-on-secondary)', title: 'Free standard shipping', meta: 'On orders over $75 · 3–5 business days' },
  { icon: '↺', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)', title: '30-day returns', meta: 'Free returns on unopened items in original packaging' },
  { icon: '⌂', bg: 'var(--at-lime)', color: 'var(--at-on-lime)', title: 'Ships from Portland, OR', meta: '2-year manufacturer warranty included' },
];

const RELATED = [
  { letter: 'B', name: 'Brass Task Light', cat: 'Lighting', price: '$182.00', bg: 'var(--at-tertiary)', color: 'var(--at-on-tertiary)' },
  { letter: 'W', name: 'Walnut Monitor Riser', cat: 'Desk', price: '$96.00', bg: 'var(--at-lime)', color: 'var(--at-on-lime)' },
  { letter: 'C', name: 'Cork Desk Mat', cat: 'Desk', price: '$38.00', bg: undefined, color: undefined },
];

export default function ProductDetails(): React.JSX.Element {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');

  return (
    <>
      <PageHead
        title="Aperture Desk Lamp"
        subtitle="Lighting · SKU APG-0001 · ★ 4.7 (128 reviews)"
        actions={
          <>
            <a href="#" className="at-btn at-btn--outline at-press">Edit product</a>
            <button className="at-btn at-btn--primary at-press">Add to cart</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* Gallery */}
          <div className="at-col-5">
            <div className="at-card" style={{ padding: 'var(--at-space-5)', position: 'sticky', top: 'var(--at-space-5)' }}>
              <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
                <div style={{ aspectRatio: '1 / 1', borderRadius: 'var(--at-radius-md)', background: 'var(--at-surface)', display: 'grid', placeItems: 'center' }}>
                  <div className="at-avatar at-avatar--xl" style={{ background: 'var(--at-secondary)', color: 'var(--at-on-secondary)' }}>A</div>
                </div>
                <div className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
                  {THUMBS.map((t) => (
                    <div
                      key={t.n}
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 'var(--at-radius-sm)',
                        background: t.active ? 'var(--at-surface)' : 'var(--at-canvas)',
                        border: t.active ? '2px solid var(--at-ink)' : 'none',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{t.n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detail column */}
          <div className="at-col-7 at-stack" style={{ gap: 'var(--at-space-5)' }}>
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
                <div className="at-cluster">
                  <span className="at-badge at-badge--success">In stock · 84</span>
                  <span className="at-badge at-badge--accent">Bestseller</span>
                </div>
                <div className="at-cluster" style={{ alignItems: 'baseline', gap: 'var(--at-space-3)' }}>
                  <span style={{ fontSize: 'var(--at-text-lg)', fontWeight: 700 }}>$129.00</span>
                  <span className="at-text-muted" style={{ textDecoration: 'line-through' }}>$159.00</span>
                  <span className="at-badge at-badge--danger">Save 19%</span>
                </div>
                <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', lineHeight: 1.6 }}>
                  Adjustable warm-white LED desk lamp with a weighted brass base and full-range
                  dimmer. Machined aluminum body, 48 cm reach, USB-C passthrough charging.
                </p>
                <div className="at-divider" />
                <div className="at-stack" style={{ gap: 'var(--at-space-2)', fontSize: 'var(--at-text-sm)' }}>
                  {SPECS.map((s) => (
                    <div key={s.label} className="at-cluster" style={{ justifyContent: 'space-between' }}>
                      <span className="at-text-muted">{s.label}</span>
                      <span className={`at-text-strong${s.mono ? ' at-mono' : ''}`}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
                <div><div className="at-chart__title">Shipping &amp; returns</div></div>
              </div>
              <div className="at-stack" style={{ gap: 'var(--at-space-3)' }}>
                {SHIPPING.map((s) => (
                  <div key={s.title} className="at-cluster" style={{ gap: 'var(--at-space-3)' }}>
                    <div
                      className="at-avatar at-avatar--sm at-avatar--square"
                      style={{ ...(s.bg ? { background: s.bg, color: s.color } : null), ...(s.color ? { color: s.color } : null) }}
                    >
                      {s.icon}
                    </div>
                    <div>
                      <div className="at-text-strong" style={{ fontSize: 'var(--at-text-sm)' }}>{s.title}</div>
                      <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{s.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* You might also like */}
        <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
          <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
            <div><div className="at-chart__title">You might also like</div></div>
          </div>
          <div className="at-row" style={{ gap: 'var(--at-space-4)' }}>
            {RELATED.map((p) => (
              <div key={p.name} className="at-col-4">
                <div className="at-card" style={{ padding: 'var(--at-space-4)' }}>
                  <div style={{ aspectRatio: '1 / 1', borderRadius: 'var(--at-radius-sm)', background: 'var(--at-surface)', display: 'grid', placeItems: 'center', marginBlockEnd: 'var(--at-space-3)' }}>
                    <div className="at-avatar at-avatar--lg" style={{ ...(p.bg ? { background: p.bg, color: p.color } : null), ...(p.color ? { color: p.color } : null) }}>{p.letter}</div>
                  </div>
                  <div className="at-text-strong">{p.name}</div>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>{p.cat}</div>
                  <div className="at-cluster" style={{ justifyContent: 'space-between', marginBlockStart: 'var(--at-space-2)' }}>
                    <span className="at-text-strong at-num">{p.price}</span>
                    <button className="at-btn at-btn--ghost at-btn--sm">View →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Write a review */}
        <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
          <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
            <div>
              <div className="at-chart__title">Write a review</div>
              <div className="at-eyebrow">Share your experience with this product</div>
            </div>
          </div>
          <div className="at-stack" style={{ gap: 'var(--at-space-4)' }}>
            <div>
              <label className="at-form-label">Your rating</label>
              <div className="at-cluster" style={{ gap: 'var(--at-space-1)', fontSize: 'var(--at-text-lg)', color: 'var(--at-warning-text)' }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: n <= rating ? 'var(--at-warning-text)' : 'var(--at-text-muted)' }}
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="at-form-label">Review title</label>
              <input
                className="at-input"
                type="text"
                placeholder="Summarize your experience"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="at-form-label">Your review</label>
              <textarea
                className="at-textarea"
                rows={4}
                placeholder="What did you like or dislike? How was the quality?"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <div className="at-cluster" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)' }}>
                Your review will be public and linked to your account.
              </span>
              <button className="at-btn at-btn--primary at-press">Submit review</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
