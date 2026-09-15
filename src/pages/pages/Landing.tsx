/*
 * Hactex React — Landing (marketing) page.
 * Built with the shared component classes, inline token
 * styles, and demo copy. Mostly static markup; the FAQ accordion
 * is useState-driven. Charts use <ApexChart>;
 * the two embedded bar charts become typed props. Stats + FAQ items extracted
 * into consts.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const MOCK_KPIS = [
  { label: 'Revenue', value: '$748K' },
  { label: 'Customers', value: '3,920' },
  { label: 'Orders', value: '9,812' },
  { label: 'Refunds', value: '1.2%' },
];

const HERO_REVENUE_SERIES = [{ name: 'Revenue', data: [44, 55, 41, 67, 52, 72, 58] }];
const HERO_REVENUE_CATEGORIES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const FEATURE_ACTIVE_SERIES = [{ name: 'Active', data: [44, 55, 41, 67, 52, 72, 58] }];
const FEATURE_ACTIVE_CATEGORIES = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];

const ACCENTS = [
  '--at-chart-1',
  '--at-chart-2',
  '--at-chart-3',
  '--at-chart-4',
  '--at-chart-5',
  '--at-chart-6',
];

const STATS = [
  { value: '210+', label: 'pre-built pages' },
  { value: '12', label: 'color schemes' },
  { value: '6', label: 'accent presets' },
  { value: '100', label: 'Lighthouse a11y' },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Is Hactex a one-time purchase?',
    a: 'Yes — a single license gives you every dashboard, app and page, plus 12 months of updates. Renew at a discount to keep receiving new releases.',
  },
  {
    q: 'Can I use it for client projects?',
    a: 'The Extended license covers unlimited end-products for clients. The Standard license is for a single internal application.',
  },
  {
    q: 'Do you provide Figma source files?',
    a: 'Pro and Business plans include the full Figma design system with every component, token and icon — kept in sync with each release.',
  },
  {
    q: "What's your refund policy?",
    a: "If Hactex isn't right for you, request a full refund within 14 days — no questions asked. We'll process it within 5–10 business days.",
  },
];

export default function Landing(): React.JSX.Element {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <PageHead title="Landing" />

      {/* HERO */}
      <section
        style={{
          padding: 'var(--at-space-10) 0 var(--at-space-8)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--at-space-5)',
        }}
      >
        <span className="at-badge at-badge--accent">
          <span className="at-badge__dot"></span>Hactex 2.4 is live
        </span>
        <h1
          style={{
            margin: 0,
            maxWidth: '18ch',
            fontFamily: 'var(--at-font-display)',
            fontSize: 'var(--at-text-4xl)',
            fontWeight: 'var(--at-weight-bold)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: 'var(--at-text-strong)',
          }}
        >
          The admin dashboard your team will{' '}
          <span style={{ color: 'var(--at-accent-text)' }}>actually use</span>.
        </h1>
        <p
          className="at-text-muted"
          style={{ margin: 0, maxWidth: '54ch', fontSize: 'var(--at-text-md)', lineHeight: 1.6 }}
        >
          Hactex ships 17 dashboards, 8 web apps and a full eCommerce suite in one Bold Press design
          system — light, dark and six accent presets, all out of the box.
        </p>
        <div className="at-cluster" style={{ gap: 'var(--at-space-3)', justifyContent: 'center' }}>
          <button className="at-btn at-btn--primary at-btn--lg at-press">Start free trial →</button>
          <button className="at-btn at-btn--outline at-btn--lg at-press">▶ Live demo</button>
        </div>
        <p
          className="at-text-muted at-num"
          style={{ fontSize: 'var(--at-text-sm)', fontFamily: 'var(--at-font-mono)' }}
        >
          No card required · 14-day trial · cancel anytime
        </p>

        {/* Product mockup */}
        <div
          className="at-card"
          style={{
            marginBlockStart: 'var(--at-space-6)',
            width: '100%',
            maxWidth: '980px',
            padding: 0,
            overflow: 'hidden',
          }}
        >
          <div
            className="at-cluster"
            style={{
              gap: 'var(--at-space-2)',
              padding: 'var(--at-space-3) var(--at-space-4)',
              borderBlockEnd: 'var(--at-border-w-sm) solid var(--at-border)',
            }}
          >
            <span
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                background: 'var(--at-danger)',
              }}
            ></span>
            <span
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                background: 'var(--at-warning)',
              }}
            ></span>
            <span
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                background: 'var(--at-success)',
              }}
            ></span>
            <span
              className="at-text-muted at-num"
              style={{
                marginInlineStart: 'var(--at-space-3)',
                fontSize: 'var(--at-text-xs)',
                fontFamily: 'var(--at-font-mono)',
              }}
            >
              app.atelier.co/dashboards/sales
            </span>
          </div>
          <div style={{ padding: 'var(--at-space-5)', background: 'var(--at-canvas)' }}>
            <div
              className="at-row"
              style={{ gap: 'var(--at-space-3)', marginBlockEnd: 'var(--at-space-4)' }}
            >
              {MOCK_KPIS.map((k) => (
                <div key={k.label} className="at-col-3 at-card" style={{ padding: 'var(--at-space-3)' }}>
                  <div className="at-text-muted" style={{ fontSize: 'var(--at-text-2xs)' }}>
                    {k.label}
                  </div>
                  <div
                    className="at-num"
                    style={{
                      fontFamily: 'var(--at-font-display)',
                      fontWeight: 'var(--at-weight-bold)',
                      fontSize: 'var(--at-text-lg)',
                      color: 'var(--at-text-strong)',
                    }}
                  >
                    {k.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="at-card" style={{ padding: 'var(--at-space-4)' }}>
              <ApexChart
                type="bar"
                height={200}
                series={HERO_REVENUE_SERIES}
                categories={HERO_REVENUE_CATEGORIES}
              />
            </div>
          </div>
        </div>
      </section>

      {/* LOGO STRIP */}
      <section
        aria-label="Trusted by"
        style={{ paddingBlockEnd: 'var(--at-space-8)', textAlign: 'center' }}
      >
        <p
          className="at-text-muted"
          style={{
            margin: '0 0 var(--at-space-5)',
            fontSize: 'var(--at-text-sm)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Trusted by product teams at
        </p>
        <div
          className="at-cluster"
          style={{
            gap: 'var(--at-space-8)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            color: 'var(--at-text-muted)',
            fontFamily: 'var(--at-font-display)',
            fontWeight: 'var(--at-weight-semibold)',
          }}
        >
          <span className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>◈ Northwind</span>
          <span className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>◐ Helio</span>
          <span className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>▲ Vantage</span>
          <span className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>⬢ Quanta</span>
          <span className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>◉ Lumen</span>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ paddingBlock: 'var(--at-space-10)' }}>
        <div style={{ textAlign: 'center', marginBlockEnd: 'var(--at-space-8)' }}>
          <span
            className="at-eyebrow"
            style={{ display: 'block', marginBlockEnd: 'var(--at-space-2)' }}
          >
            Why Hactex
          </span>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--at-font-display)',
              fontSize: 'var(--at-text-3xl)',
              fontWeight: 'var(--at-weight-bold)',
              color: 'var(--at-text-strong)',
              letterSpacing: '-0.015em',
            }}
          >
            Everything is a token away
          </h2>
          <p
            className="at-text-muted"
            style={{
              margin: 'var(--at-space-3) auto 0',
              maxWidth: '50ch',
              fontSize: 'var(--at-text-md)',
            }}
          >
            A single token layer drives every surface — so themes, accents and dark mode just work.
          </p>
        </div>

        <div
          className="at-row"
          style={{
            gap: 'var(--at-space-8)',
            alignItems: 'center',
            marginBlockEnd: 'var(--at-space-10)',
          }}
        >
          <div className="at-col-6">
            <span
              className="at-avatar at-avatar--lg"
              style={{
                background: 'var(--at-accent-wash)',
                color: 'var(--at-accent-text)',
                marginBlockEnd: 'var(--at-space-4)',
              }}
            >
              ▦
            </span>
            <h3
              style={{
                margin: '0 0 var(--at-space-2)',
                fontFamily: 'var(--at-font-display)',
                fontSize: 'var(--at-text-xl)',
                fontWeight: 'var(--at-weight-semibold)',
                color: 'var(--at-text-strong)',
              }}
            >
              17 ready-made dashboards
            </h3>
            <p
              className="at-text-muted"
              style={{ margin: 0, fontSize: 'var(--at-text-md)', lineHeight: 1.6 }}
            >
              Sales, analytics, CRM, crypto, healthcare, HR and more — each a complete, considered
              layout you can ship today or remix tomorrow.
            </p>
            <ul
              style={{
                margin: 'var(--at-space-4) 0 0',
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--at-space-2)',
              }}
            >
              <li className="at-cluster" style={{ gap: 'var(--at-space-2)', fontSize: 'var(--at-text-sm)' }}>
                <span style={{ color: 'var(--at-success-text)' }}>✓</span> Real demo data on every screen
              </li>
              <li className="at-cluster" style={{ gap: 'var(--at-space-2)', fontSize: 'var(--at-text-sm)' }}>
                <span style={{ color: 'var(--at-success-text)' }}>✓</span> Charts that retheme automatically
              </li>
            </ul>
          </div>
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <ApexChart
              type="bar"
              height={220}
              series={FEATURE_ACTIVE_SERIES}
              categories={FEATURE_ACTIVE_CATEGORIES}
            />
          </div>
        </div>

        <div className="at-row" style={{ gap: 'var(--at-space-8)', alignItems: 'center' }}>
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <p
              className="at-text-muted"
              style={{ margin: '0 0 var(--at-space-3)', fontSize: 'var(--at-text-sm)' }}
            >
              Pick an accent — the whole page rethemes live:
            </p>
            <div
              className="at-cluster"
              style={{ gap: 'var(--at-space-2)', flexWrap: 'wrap' }}
              role="group"
              aria-label="Accent preset picker"
            >
              {ACCENTS.map((c) => (
                <span
                  key={c}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--at-radius-md)',
                    background: `var(${c})`,
                    border: 'var(--at-border-w-sm) solid var(--at-border)',
                  }}
                ></span>
              ))}
            </div>
            <p
              className="at-text-muted at-num"
              style={{
                margin: 'var(--at-space-4) 0 0',
                fontSize: 'var(--at-text-sm)',
                fontFamily: 'var(--at-font-mono)',
              }}
            >
              6 accent presets · light + dark · WCAG AA
            </p>
          </div>
          <div className="at-col-6">
            <span
              className="at-avatar at-avatar--lg"
              style={{
                background: 'color-mix(in oklab, var(--at-chart-2) 18%, transparent)',
                color: 'var(--at-chart-2-text)',
                marginBlockEnd: 'var(--at-space-4)',
              }}
            >
              ◐
            </span>
            <h3
              style={{
                margin: '0 0 var(--at-space-2)',
                fontFamily: 'var(--at-font-display)',
                fontSize: 'var(--at-text-xl)',
                fontWeight: 'var(--at-weight-semibold)',
                color: 'var(--at-text-strong)',
              }}
            >
              Themeable to the pixel
            </h3>
            <p
              className="at-text-muted"
              style={{ margin: 0, fontSize: 'var(--at-text-md)', lineHeight: 1.6 }}
            >
              Pick from six curated accents or set your own brand color in the live customizer. Every
              component, chart and badge follows instantly — no overrides.
            </p>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section
        aria-label="By the numbers"
        style={{ borderBlock: 'var(--at-border-w-sm) solid var(--at-border)' }}
      >
        <div
          style={{
            paddingBlock: 'var(--at-space-8)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'var(--at-space-6)',
            textAlign: 'center',
          }}
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                className="at-num"
                style={{
                  fontFamily: 'var(--at-font-display)',
                  fontSize: 'var(--at-text-3xl)',
                  fontWeight: 'var(--at-weight-bold)',
                  color: 'var(--at-text-strong)',
                }}
              >
                {s.value}
              </div>
              <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)', marginBlockStart: 'var(--at-space-1)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        style={{ maxWidth: '760px', marginInline: 'auto', paddingBlock: 'var(--at-space-10)' }}
      >
        <div style={{ textAlign: 'center', marginBlockEnd: 'var(--at-space-6)' }}>
          <span
            className="at-eyebrow"
            style={{ display: 'block', marginBlockEnd: 'var(--at-space-2)' }}
          >
            FAQ
          </span>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--at-font-display)',
              fontSize: 'var(--at-text-3xl)',
              fontWeight: 'var(--at-weight-bold)',
              color: 'var(--at-text-strong)',
              letterSpacing: '-0.015em',
            }}
          >
            Questions, answered
          </h2>
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
      </section>

      {/* CTA BAND */}
      <section aria-label="Get started" style={{ paddingBlockEnd: 'var(--at-space-10)' }}>
        <div
          className="at-card at-press"
          style={{
            padding: 'var(--at-space-10) var(--at-space-6)',
            textAlign: 'center',
            background: 'var(--at-accent)',
            color: 'var(--at-on-accent)',
            border: 'none',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--at-font-display)',
              fontSize: 'var(--at-text-3xl)',
              fontWeight: 'var(--at-weight-bold)',
              letterSpacing: '-0.015em',
              color: 'var(--at-on-accent)',
            }}
          >
            Start building today
          </h2>
          <p
            style={{
              margin: 'var(--at-space-3) auto var(--at-space-5)',
              maxWidth: '46ch',
              fontSize: 'var(--at-text-md)',
              opacity: 0.92,
            }}
          >
            Join thousands of teams shipping beautiful, accessible admin interfaces with Hactex.
          </p>
          <div className="at-cluster" style={{ gap: 'var(--at-space-3)', justifyContent: 'center' }}>
            {/* On an accent panel the dark button re-inks its offset block,
                same reason as .at-sidebar__cta — see components.css §1. */}
            <button
              className="at-btn at-btn--dark at-btn--lg at-press"
              style={{ '--at-shadow-color': 'var(--at-on-accent)' } as React.CSSProperties}
            >
              Get started free
            </button>
            <button
              className="at-btn at-btn--lg at-press"
              style={{
                background: 'color-mix(in oklab, var(--at-on-accent) 16%, transparent)',
                color: 'var(--at-on-accent)',
              }}
            >
              View live demo
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
