/*
 * Hactex React — Pricing page.
 * Built with the shared component classes, inline token
 * styles, and demo copy. The annual/monthly billing toggle (one x-data
 * "{ annual: true }") and the FAQ accordion (x-data "{ open: 1 }") are
 * useState-driven. Plans + comparison rows + FAQ items extracted into consts.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

type Feature = { text: string; included: boolean };

type Plan = {
  name: string;
  description: string;
  /** Billed-toggle dependent price text (annual / monthly). */
  price?: { annual: string; monthly: string };
  /** Custom (non-numeric) headline, e.g. Enterprise. */
  custom?: string;
  /** Sub note under the price; annual vs monthly variant. */
  note: { annual: string; monthly: string };
  /** Pro/Business render the note in mono `.at-num`. */
  noteMono?: boolean;
  cta: string;
  ctaVariant: 'outline' | 'primary';
  features: Feature[];
  popular?: boolean;
  /** Keeps numeric plans (Pro/Business) a fixed width to avoid shift on toggle. */
  fixedWidth?: boolean;
};

const PLANS: Plan[] = [
  {
    name: 'Starter',
    description: 'For individuals exploring Hactex.',
    price: { annual: '$0', monthly: '$0' },
    note: {
      annual: 'Free forever — no card required',
      monthly: 'Free forever — no card required',
    },
    cta: 'Get started',
    ctaVariant: 'outline',
    features: [
      { text: '1 workspace', included: true },
      { text: 'Up to 3 team members', included: true },
      { text: '5 dashboards', included: true },
      { text: 'Community support', included: true },
      { text: 'API access', included: false },
    ],
  },
  {
    name: 'Pro',
    description: 'For growing product teams.',
    price: { annual: '$24', monthly: '$29' },
    note: { annual: '$288 billed annually', monthly: 'billed monthly' },
    noteMono: true,
    cta: 'Start 14-day trial',
    ctaVariant: 'primary',
    popular: true,
    fixedWidth: true,
    features: [
      { text: '3 workspaces', included: true },
      { text: 'Up to 25 team members', included: true },
      { text: 'Unlimited dashboards', included: true },
      { text: 'Full API & webhooks', included: true },
      { text: 'Priority email support', included: true },
    ],
  },
  {
    name: 'Business',
    description: 'For scaling organizations.',
    price: { annual: '$64', monthly: '$79' },
    note: { annual: '$768 billed annually', monthly: 'billed monthly' },
    noteMono: true,
    cta: 'Start 14-day trial',
    ctaVariant: 'outline',
    fixedWidth: true,
    features: [
      { text: 'Everything in Pro, plus:', included: true },
      { text: 'Unlimited members', included: true },
      { text: 'SSO & SAML', included: true },
      { text: 'Advanced audit logs', included: true },
      { text: '24/7 priority support', included: true },
    ],
  },
  {
    name: 'Enterprise',
    description: 'For regulated, large-scale teams.',
    custom: 'Custom',
    note: {
      annual: 'Tailored to your requirements',
      monthly: 'Tailored to your requirements',
    },
    cta: 'Contact sales',
    ctaVariant: 'outline',
    features: [
      { text: 'Everything in Business', included: true },
      { text: 'Dedicated CSM', included: true },
      { text: '99.99% uptime SLA', included: true },
      { text: 'On-prem & private cloud', included: true },
      { text: 'Custom contract & DPA', included: true },
    ],
  },
];

const COMPARE_ROWS: { label: string; cells: string[] }[] = [
  { label: 'Team members', cells: ['3', '25', 'Unlimited', 'Unlimited'] },
  { label: 'Dashboards', cells: ['5', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { label: 'Data retention', cells: ['30 days', '1 year', '3 years', 'Custom'] },
  { label: 'API access & webhooks', cells: ['off', 'on', 'on', 'on'] },
  { label: 'SSO & SAML', cells: ['off', 'off', 'on', 'on'] },
  { label: 'Support', cells: ['Community', 'Priority email', '24/7', 'Dedicated CSM'] },
  { label: 'Uptime SLA', cells: ['—', '99.9%', '99.95%', '99.99%'] },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Can I change plans later?',
    a: 'Yes — upgrade or downgrade anytime from your billing page. Upgrades are prorated instantly; downgrades take effect at the next renewal.',
  },
  {
    q: 'Is there a free trial?',
    a: "Every paid plan includes a 14-day free trial — no credit card required. You'll only be billed if you choose to continue.",
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards via Stripe. Business and Enterprise plans can also pay by invoice and bank transfer.',
  },
  {
    q: 'Do you offer discounts for nonprofits?',
    a: 'Yes. Registered nonprofits and accredited students get 40% off any annual plan — reach out to sales with your documentation.',
  },
];

export default function Pricing(): React.JSX.Element {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(1);

  return (
    <>
      <PageHead
        title="Pricing"
        subtitle="Simple, transparent plans that scale with your team — switch or cancel anytime."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Talk to sales</button>
            <button className="at-btn at-btn--primary at-press">Start free trial</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-6)' }}>
        {/* Billing toggle */}
        <div
          className="at-cluster"
          style={{ flexDirection: 'column', alignItems: 'center', gap: 'var(--at-space-3)' }}
        >
          <div className="at-segment">
            <button
              className={`at-segment__btn${!annual ? ' is-active' : ''}`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`at-segment__btn${annual ? ' is-active' : ''}`}
              onClick={() => setAnnual(true)}
            >
              Annual
            </button>
          </div>
          {annual && (
            <span className="at-badge at-badge--accent">Save 20% billed yearly</span>
          )}
        </div>

        {/* Tier cards */}
        <div className="at-row" style={{ alignItems: 'stretch' }}>
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="at-col-3 at-card at-press"
              style={{
                padding: 'var(--at-space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--at-space-4)',
                ...(plan.popular
                  ? {
                    position: 'relative',
                    borderColor: 'var(--at-accent)',
                    borderWidth: 'var(--at-border-w-lg)',
                  }
                  : {}),
              }}
            >
              {plan.popular && (
                <span
                  className="at-badge at-badge--accent"
                  style={{
                    position: 'absolute',
                    insetBlockStart: 'var(--at-space-4)',
                    insetInlineEnd: 'var(--at-space-4)',
                  }}
                >
                  Most popular
                </span>
              )}

              <div>
                <div
                  className="at-chart__title"
                  style={plan.popular ? { color: 'var(--at-accent-text)' } : undefined}
                >
                  {plan.name}
                </div>
                <p
                  className="at-text-muted"
                  style={{
                    fontSize: 'var(--at-text-sm)',
                    marginBlockStart: 'var(--at-space-1)',
                  }}
                >
                  {plan.description}
                </p>
              </div>

              <div>
                <div className="at-cluster" style={{ alignItems: 'baseline', gap: 'var(--at-space-1)' }}>
                  {plan.custom ? (
                    <span
                      style={{
                        fontFamily: 'var(--at-font-display)',
                        fontSize: 'var(--at-text-2xl)',
                        fontWeight: 'var(--at-weight-bold)',
                        color: 'var(--at-text-strong)',
                        lineHeight: 1,
                      }}
                    >
                      {plan.custom}
                    </span>
                  ) : (
                    <span
                      className="at-num"
                      style={{
                        fontFamily: 'var(--at-font-display)',
                        fontSize: 'var(--at-text-3xl)',
                        fontWeight: 'var(--at-weight-bold)',
                        color: 'var(--at-text-strong)',
                        lineHeight: 1,
                        ...(plan.fixedWidth
                          ? { minWidth: '84px', display: 'inline-block' }
                          : {}),
                      }}
                    >
                      {annual ? plan.price!.annual : plan.price!.monthly}
                    </span>
                  )}
                  <span className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                    /mo
                  </span>
                </div>
                <p
                  className={plan.noteMono ? 'at-num at-text-muted' : 'at-text-muted'}
                  style={{
                    fontSize: 'var(--at-text-sm)',
                    marginBlockStart: 'var(--at-space-1)',
                    ...(plan.noteMono ? { fontFamily: 'var(--at-font-mono)' } : {}),
                  }}
                >
                  {annual ? plan.note.annual : plan.note.monthly}
                </p>
              </div>

              <button className={`at-btn at-btn--${plan.ctaVariant} at-btn--block at-press`}>
                {plan.cta}
              </button>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--at-space-3)',
                }}
              >
                {plan.features.map((f) => (
                  <li
                    key={f.text}
                    className="at-cluster"
                    style={{
                      gap: 'var(--at-space-2)',
                      alignItems: 'flex-start',
                      fontSize: 'var(--at-text-sm)',
                      ...(f.included ? {} : { color: 'var(--at-text-muted)' }),
                    }}
                  >
                    {f.included ? (
                      <span style={{ color: 'var(--at-success-text)' }}>✓</span>
                    ) : (
                      <span>×</span>
                    )}
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Comparison table (titled card #1) */}
        <div className="at-card" style={{ overflow: 'hidden' }}>
          <div className="at-chart__head" style={{ padding: 'var(--at-space-5)' }}>
            <div>
              <div className="at-chart__title">All features, side by side</div>
              <div className="at-eyebrow">
                Every plan includes SSL, daily backups, and the Hactex design system.
              </div>
            </div>
          </div>
          <div
            className="at-table-wrap"
            style={{ border: 'none', borderRadius: 0, borderBlockStart: '2px solid var(--at-ink)' }}
          >
            <table className="at-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="at-num">Starter</th>
                  <th className="at-num" style={{ color: 'var(--at-accent-text)' }}>
                    Pro
                  </th>
                  <th className="at-num">Business</th>
                  <th className="at-num">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.label}>
                    <td className="at-text-strong">{row.label}</td>
                    {row.cells.map((cell, i) => (
                      <td key={i} className="at-num" style={cellStyle(cell)}>
                        {cell === 'on' ? '✓' : cell === 'off' ? '×' : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ strip: accordion (titled card #2) + contact rail */}
        <div className="at-row" style={{ alignItems: 'stretch' }}>
          <div className="at-col-8 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Pricing FAQ</div>
                <div className="at-eyebrow">Questions</div>
              </div>
              <a href="#" className="at-btn at-btn--ghost at-btn--sm at-press">
                All FAQs →
              </a>
            </div>
            <div className="at-accordion">
              {FAQS.map((f, idx) => {
                const n = idx + 1;
                const isOpen = openFaq === n;
                return (
                  <div key={f.q} className="at-accordion__item">
                    <button
                      className="at-accordion__head"
                      onClick={() => setOpenFaq(isOpen ? 0 : n)}
                    >
                      <span>{f.q}</span>
                      <span>{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && <div className="at-accordion__body">{f.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Still deciding rail (untitled) */}
          <div
            className="at-col-4 at-card at-press"
            style={{
              padding: 'var(--at-space-5)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--at-space-4)',
            }}
          >
            <div
              className="at-avatar at-avatar--lg"
              style={{ background: 'var(--at-accent-wash)', color: 'var(--at-accent-text)' }}
            >
              ?
            </div>
            <div>
              <div className="at-chart__title">Still deciding?</div>
              <p
                className="at-text-muted"
                style={{
                  fontSize: 'var(--at-text-sm)',
                  marginBlockStart: 'var(--at-space-1)',
                }}
              >
                Book a 30-minute walkthrough with our team and we'll help you pick the right plan.
              </p>
            </div>
            <div
              style={{
                marginBlockStart: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--at-space-3)',
              }}
            >
              <button className="at-btn at-btn--primary at-btn--block at-press">Book a demo</button>
              <a href="#" className="at-btn at-btn--ghost at-btn--block at-press">
                Visit help center
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/** Color mapping for comparison check / cross cells; everything else muted-strong default. */
function cellStyle(cell: string): React.CSSProperties {
  if (cell === 'on') return { color: 'var(--at-success-text)' };
  if (cell === 'off') return { color: 'var(--at-text-muted)' };
  return {};
}
