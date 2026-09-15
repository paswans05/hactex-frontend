/*
 * Hactex React — Landing page.
 * Digital operating platform for hatcheries and poultry farms.
 * Built with the shared component classes, inline token styles, and poultry domain copy.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHead } from '../../components/shell/PageHead';
import { ApexChart } from '../../components/charts/ApexChart';

const MOCK_KPIS = [
  { label: 'Eggs Set', value: '148,200' },
  { label: 'Hatchability', value: '88.4%' },
  { label: 'Chicks Sold', value: '131,010' },
  { label: 'Flock HDP', value: '91.2%' },
];

const HERO_REVENUE_SERIES = [{ name: 'Chicks Hatched', data: [18400, 22100, 19500, 26800, 21400, 28900, 23910] }];
const HERO_REVENUE_CATEGORIES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const FEATURE_ACTIVE_SERIES = [{ name: 'Hatchability %', data: [85, 87, 86, 88, 89, 90, 88] }];
const FEATURE_ACTIVE_CATEGORIES = ['Batch 1', 'Batch 2', 'Batch 3', 'Batch 4', 'Batch 5', 'Batch 6', 'Batch 7'];

const MODULE_PILLS = [
  'Hatchery Operations',
  'Poultry Farm Management',
  'Flock Management',
  'Inventory & Stock',
  'Chick Sales',
  'Dispatch & Trips',
  'Feed Management',
  'Expenses & Finance',
  'Reports & Analytics',
];

const STATS = [
  { value: 'Unified', label: 'hatchery & farm operations' },
  { value: '6+', label: 'core operational modules' },
  { value: '1-click', label: 'batch & hatch reports' },
  { value: '24/7', label: 'flock & logistics visibility' },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: 'How does Hactex connect hatcheries and poultry farms?',
    a: 'Hactex unifies daily egg collections from parent stock farms with cold-room warehousing, dispatch challans, incubation setting, candling, and day-21 chick hatching in one connected digital platform.',
  },
  {
    q: 'Can Hactex replace our Excel sheets and paper registers?',
    a: 'Yes. Hactex replaces paper registers, spreadsheets, and disconnected records with structured daily logs for bird headcounts, mortality, feed intake, egg grading, chick sales, and delivery trips.',
  },
  {
    q: 'How does chick sales and dispatch management work?',
    a: 'Manage chick parties, sales orders, delivery challans, transit mortality deductions, and customer returns, alongside vehicle odometer readings and trip expenses with complete visibility.',
  },
  {
    q: 'What kind of reports and analytics does Hactex provide?',
    a: 'Generate daily and weekly flock performance summaries, Hen-Housed Hatching Egg (HHHE) curves, Ross/Cobb genetic breed comparisons, monthly feed reconciliations, and 1-click landscape hatch batch reports.',
  },
];

export default function Landing(): React.JSX.Element {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <PageHead title="HACTEX.ai" />

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
          <span className="at-badge__dot"></span>The digital operating platform for hatcheries and poultry farms
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
          Run Your Poultry Business{' '}
          <span style={{ color: 'var(--at-accent-text)' }}>Smarter</span>
        </h1>
        <p
          className="at-text-muted"
          style={{ margin: 0, maxWidth: '54ch', fontSize: 'var(--at-text-md)', lineHeight: 1.6 }}
        >
          Hactex brings hatcheries and poultry farms together on one intelligent platform—helping you manage operations, automate manual work, track performance, and make better decisions.
        </p>
        <div className="at-cluster" style={{ gap: 'var(--at-space-3)', justifyContent: 'center' }}>
          <Link to="/auth/register" className="at-btn at-btn--primary at-btn--lg at-press" style={{ textDecoration: 'none' }}>
            Get Started
          </Link>
          <Link to="/auth/login" className="at-btn at-btn--outline at-btn--lg at-press" style={{ textDecoration: 'none' }}>
            Explore Platform
          </Link>
        </div>
        <p
          className="at-text-muted at-num"
          style={{ fontSize: 'var(--at-text-sm)', fontFamily: 'var(--at-font-mono)' }}
        >
          Built for modern hatcheries and poultry farms
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
              hactex.ai/hatchery/dashboard
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

      {/* TRUST / SUPPORTING TEXT */}
      <section
        aria-label="Core modules"
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
          Built for modern hatcheries and poultry farms
        </p>
        <div
          className="at-cluster"
          style={{
            gap: 'var(--at-space-4) var(--at-space-6)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            color: 'var(--at-text-muted)',
            fontFamily: 'var(--at-font-display)',
            fontWeight: 'var(--at-weight-semibold)',
            fontSize: 'var(--at-text-sm)',
          }}
        >
          {MODULE_PILLS.map((item) => (
            <span key={item} className="at-cluster" style={{ gap: 'var(--at-space-2)' }}>
              ◈ {item}
            </span>
          ))}
        </div>
      </section>

      {/* PROBLEM & SOLUTION */}
      <section id="features" style={{ paddingBlock: 'var(--at-space-10)' }}>
        <div style={{ textAlign: 'center', marginBlockEnd: 'var(--at-space-8)' }}>
          <span
            className="at-eyebrow"
            style={{ display: 'block', marginBlockEnd: 'var(--at-space-2)' }}
          >
            Move Beyond Registers & Excel
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
            One Platform for Your Poultry Ecosystem
          </h2>
          <p
            className="at-text-muted"
            style={{
              margin: 'var(--at-space-3) auto 0',
              maxWidth: '56ch',
              fontSize: 'var(--at-text-md)',
              lineHeight: 1.6,
            }}
          >
            Stop managing critical poultry operations through paper registers, spreadsheets, and disconnected systems. From egg grading and hatchery production to chick sales, dispatch, inventory, feed, expenses, and reporting—Hactex gives your team a single source of truth.
          </p>
        </div>

        {/* AUTOMATION SECTION */}
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
              Automate Your Daily Poultry Operations
            </h3>
            <p
              className="at-text-muted"
              style={{ margin: 0, fontSize: 'var(--at-text-md)', lineHeight: 1.6 }}
            >
              Reduce repetitive data entry and manual work. Hactex helps your team capture operational data once and use it across workflows, reports, and business decisions.
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
                <span style={{ color: 'var(--at-success-text)' }}>✓</span> <strong>Hatchery Management:</strong> Manage hatchery operations, production, settings, reports, and daily activities from one place.
              </li>
              <li className="at-cluster" style={{ gap: 'var(--at-space-2)', fontSize: 'var(--at-text-sm)' }}>
                <span style={{ color: 'var(--at-success-text)' }}>✓</span> <strong>Farm & Flock Management:</strong> Track poultry farm operations and flock performance across locations.
              </li>
            </ul>
          </div>
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-text-muted" style={{ fontSize: 'var(--at-text-xs)', marginBlockEnd: 'var(--at-space-2)' }}>
              Batch Hatchability Trend (% Set)
            </div>
            <ApexChart
              type="bar"
              height={220}
              series={FEATURE_ACTIVE_SERIES}
              categories={FEATURE_ACTIVE_CATEGORIES}
            />
          </div>
        </div>

        {/* ECOSYSTEM & AI SECTION */}
        <div className="at-row" style={{ gap: 'var(--at-space-8)', alignItems: 'center' }}>
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <span
              className="at-eyebrow"
              style={{ display: 'block', marginBlockEnd: 'var(--at-space-2)' }}
            >
              Connected Poultry Lifecycle
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
              From Hatchery to Farm
            </h3>
            <p
              className="at-text-muted"
              style={{ margin: '0 0 var(--at-space-4)', fontSize: 'var(--at-text-sm)', lineHeight: 1.6 }}
            >
              Connect the complete poultry lifecycle—from eggs and hatchery production to chicks, farms, feed, inventory, sales, dispatch, and business reporting.
            </p>
            <div
              className="at-cluster"
              style={{ gap: 'var(--at-space-2)', flexWrap: 'wrap' }}
            >
              {['Hatchery Production', 'Chick Sales', 'Dispatch & Trips', 'Inventory & Stock', 'Flock Health', 'Reports'].map((m) => (
                <span
                  key={m}
                  className="at-badge at-badge--accent"
                  style={{ fontSize: 'var(--at-text-xs)' }}
                >
                  {m}
                </span>
              ))}
            </div>
            <p
              className="at-text-muted at-num"
              style={{
                margin: 'var(--at-space-4) 0 0',
                fontSize: 'var(--at-text-xs)',
                fontFamily: 'var(--at-font-mono)',
              }}
            >
              Single source of truth across all operations
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
              Intelligence for Better Decisions
            </h3>
            <p
              className="at-text-muted"
              style={{ margin: 0, fontSize: 'var(--at-text-md)', lineHeight: 1.6 }}
            >
              Use your operational data to understand performance, identify trends, and make faster, data-driven decisions with Hactex intelligence.
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
                <span style={{ color: 'var(--at-success-text)' }}>✓</span> <strong>Chick Sales & Trips:</strong> Manage parties, sales, orders, vehicles, and deliveries with complete visibility.
              </li>
              <li className="at-cluster" style={{ gap: 'var(--at-space-2)', fontSize: 'var(--at-text-sm)' }}>
                <span style={{ color: 'var(--at-success-text)' }}>✓</span> <strong>Inventory Management:</strong> Manage box and tray stock, scrap items, feed, and other operational inventory.
              </li>
              <li className="at-cluster" style={{ gap: 'var(--at-space-2)', fontSize: 'var(--at-text-sm)' }}>
                <span style={{ color: 'var(--at-success-text)' }}>✓</span> <strong>Reports & Analytics:</strong> Turn operational data into clear reports and actionable business insights.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section
        id="stats"
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
            Ready to Build a Smarter Poultry Business?
          </h2>
          <p
            style={{
              margin: 'var(--at-space-3) auto var(--at-space-5)',
              maxWidth: '46ch',
              fontSize: 'var(--at-text-md)',
              opacity: 0.92,
            }}
          >
            Bring your hatchery and poultry farm operations into one connected platform.
          </p>
          <div className="at-cluster" style={{ gap: 'var(--at-space-3)', justifyContent: 'center' }}>
            <Link
              to="/auth/login"
              className="at-btn at-btn--dark at-btn--lg at-press"
              style={{ '--at-shadow-color': 'var(--at-on-accent)', textDecoration: 'none' } as React.CSSProperties}
            >
              Get Started with Hactex
            </Link>
            <Link
              to="/auth/login"
              className="at-btn at-btn--lg at-press"
              style={{
                background: 'color-mix(in oklab, var(--at-on-accent) 16%, transparent)',
                color: 'var(--at-on-accent)',
                textDecoration: 'none',
              }}
            >
              Explore Platform
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
