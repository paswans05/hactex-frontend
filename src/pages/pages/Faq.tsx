/*
 * Hactex React — FAQ page.
 * Built with the shared component classes, inline token
 * styles, and demo copy. The 4 accordion groups + filter chips + search input
 * are useState-driven. FAQ items extracted into a const.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

type FaqItem = { q: string; a: string };
type FaqGroup = { title: string; count: number; items: FaqItem[] };

const GROUPS: FaqGroup[] = [
  {
    title: 'Account',
    count: 3,
    items: [
      { q: 'How do I create a new workspace?', a: 'Open the workspace switcher in the top-left, choose "New workspace", give it a name and pick a region. Your first three workspaces are free on every paid plan.' },
      { q: 'Can I transfer ownership of my account?', a: 'Yes. Go to Settings → Members, open the member you want to promote and select "Transfer ownership". You\'ll confirm by email — the change is instant once both parties accept.' },
      { q: 'How do I delete my account?', a: 'Account deletion lives under Settings → Danger zone. We keep a 14-day grace window during which you can restore everything, after which data is permanently purged.' },
    ],
  },
  {
    title: 'Billing',
    count: 3,
    items: [
      { q: 'When am I charged for my subscription?', a: 'Monthly plans renew on the calendar day you subscribed; annual plans renew on the anniversary date. We email an invoice 3 days before every renewal.' },
      { q: 'Can I get a refund?', a: 'We offer a no-questions-asked refund within 14 days of any new charge. Reach out from the billing page and the credit lands back on your card within 5–10 business days.' },
      { q: 'Do prices include tax?', a: 'Listed prices are exclusive of VAT and sales tax. Applicable tax is calculated at checkout based on your billing address and shown on every invoice.' },
    ],
  },
  {
    title: 'Security',
    count: 3,
    items: [
      { q: 'Where is my data stored?', a: 'Data is stored in SOC 2 Type II certified data centers in your chosen region (US, EU or AP). It is encrypted at rest with AES-256 and in transit with TLS 1.3.' },
      { q: 'Do you support two-factor authentication?', a: 'Yes — TOTP authenticator apps and hardware security keys (WebAuthn) are supported on all plans. Admins can enforce 2FA org-wide from Security settings.' },
      { q: 'How do I report a vulnerability?', a: 'Email security@atelier.co or use our responsible-disclosure form. Verified reports are eligible for a bounty and we acknowledge every submission within one business day.' },
    ],
  },
  {
    title: 'Integrations',
    count: 2,
    items: [
      { q: 'Which integrations are available?', a: 'Hactex connects natively with Slack, Linear, GitHub, Stripe, Google Workspace and 40+ other tools. Anything else can be wired through our REST API and webhooks.' },
      { q: 'Is there a public API?', a: 'Pro and above include a full REST API plus signed webhooks. Generate keys under Settings → Developer, and explore every endpoint in our interactive API reference.' },
    ],
  },
];

const FILTERS = ['All', 'Account', 'Billing', 'Security', 'Integrations'] as const;

function AccordionGroup({ group, initialOpen }: { group: FaqGroup; initialOpen: number }): React.JSX.Element {
  const [open, setOpen] = useState(initialOpen);
  return (
    <section>
      <div className="at-eyebrow" style={{ marginBlockEnd: 'var(--at-space-3)' }}>
        {group.title} · {group.count}
      </div>
      <div className="at-accordion">
        {group.items.map((item, idx) => {
          const id = idx + 1;
          const isOpen = open === id;
          return (
            <div key={item.q} className="at-accordion__item">
              <button className="at-accordion__head" onClick={() => setOpen(isOpen ? 0 : id)}>
                <span>{item.q}</span>
                <span>{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <div className="at-accordion__body">{item.a}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Faq(): React.JSX.Element {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');

  return (
    <>
      <PageHead
        title="Frequently asked questions"
        subtitle="Answers to the questions our customers ask most. Can't find what you need? Contact support."
        actions={<button className="at-btn at-btn--primary at-press">Contact support</button>}
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        {/* Search + filter bar (untitled card) */}
        <div className="at-card" style={{ padding: 'var(--at-space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--at-space-4)' }}>
          <div style={{ position: 'relative', maxWidth: '560px' }}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                width: '16px',
                height: '16px',
                position: 'absolute',
                insetInlineStart: 'var(--at-space-3)',
                insetBlockStart: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--at-text-muted)',
                pointerEvents: 'none',
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="at-input"
              type="search"
              placeholder="Search questions…"
              aria-label="Search questions"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ paddingInlineStart: 'var(--at-space-9)' }}
            />
          </div>
          <div className="at-cluster" style={{ gap: 'var(--at-space-2)', flexWrap: 'wrap' }} role="group" aria-label="Filter by category">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={filter === f ? 'at-btn at-btn--primary at-btn--sm at-press' : 'at-btn at-btn--outline at-btn--sm at-press'}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <p className="at-text-muted at-num" style={{ fontSize: 'var(--at-text-sm)', fontFamily: 'var(--at-font-mono)' }}>
            11 questions
          </p>
        </div>

        <div className="at-row" style={{ alignItems: 'flex-start' }}>
          {/* Accordion groups */}
          <div className="at-col-8 at-stack" style={{ gap: 'var(--at-space-5)' }}>
            {GROUPS.map((g, i) => (
              <AccordionGroup key={g.title} group={g} initialOpen={i === 0 ? 1 : 0} />
            ))}
          </div>

          {/* Categories rail + contact */}
          <div className="at-col-4 at-stack" style={{ gap: 'var(--at-space-5)' }}>
            <div className="at-card" style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-chart__title" style={{ marginBlockEnd: 'var(--at-space-3)' }}>Categories</div>
              <div className="at-list">
                {GROUPS.map((g) => (
                  <div key={g.title} className="at-list__item">
                    <div className="at-cluster" style={{ justifyContent: 'space-between' }}>
                      <span className="at-text-strong">{g.title}</span>
                      <span className="at-text-muted at-num">{g.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="at-card at-press"
              style={{
                padding: 'var(--at-space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--at-space-3)',
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <div className="at-avatar at-avatar--lg" style={{ background: 'var(--at-accent-wash)', color: 'var(--at-accent-text)' }}>
                ?
              </div>
              <div className="at-text-strong">Didn't find an answer?</div>
              <p className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>
                Our team typically replies within a few hours.
              </p>
              <button className="at-btn at-btn--primary at-btn--block at-press">Contact support</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
