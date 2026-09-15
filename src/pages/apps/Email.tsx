/*
 * Hactex React — Email app (fullscreen, no sidebar).
 * A 3-pane mail client
 * (folder rail | message list | reading pane).
 * Renders inside <AppShell> (appbar + .at-app-fullscreen); no <PageHead>.
 */
import { useMemo, useState } from 'react';

interface EmailFolder {
  id: string;
  name: string;
  count: number;
}

interface EmailLabel {
  name: string;
  color: string;
  count: number;
}

interface EmailMessage {
  id: number;
  from: string;
  subject: string;
  snippet: string;
  time: string;
  unread: boolean;
  attach: boolean;
  tag: string;
  tagColor: string;
  initials: string;
  color: string;
  email: string;
  fullTime: string;
  participants: number;
  count: number;
  body: string;
}

const FOLDERS: EmailFolder[] = [
  { id: 'inbox', name: 'Inbox', count: 6 },
  { id: 'starred', name: 'Starred', count: 3 },
  { id: 'snoozed', name: 'Snoozed', count: 1 },
  { id: 'sent', name: 'Sent', count: 0 },
  { id: 'drafts', name: 'Drafts', count: 2 },
  { id: 'archive', name: 'Archive', count: 0 },
  { id: 'spam', name: 'Spam', count: 0 },
  { id: 'trash', name: 'Trash', count: 0 },
];

const LABELS: EmailLabel[] = [
  { name: 'Finance', color: 'var(--at-success)', count: 8 },
  { name: 'Clients', color: 'var(--at-info)', count: 14 },
  { name: 'Personal', color: 'var(--at-tertiary)', count: 5 },
  { name: 'Receipts', color: 'var(--at-warning)', count: 21 },
];

const MESSAGES: EmailMessage[] = [
  {
    id: 1,
    from: 'Maya Lindqvist',
    subject: 'Re: Q3 forecast — final review before Thursday',
    snippet: 'Thanks for the quick turnaround. I left two comments on the margin tab…',
    time: '9:14 AM',
    unread: true,
    attach: true,
    tag: 'Finance',
    tagColor: 'var(--at-success)',
    initials: 'M',
    color: 'var(--at-success)',
    email: 'maya.l@northwind.co',
    fullTime: 'Apr 25, 9:14 AM',
    participants: 3,
    count: 4,
    body: '<p>Thanks for the quick turnaround on this. I left two comments on the margin tab — mostly around the assumed churn rate for the enterprise segment. Otherwise the numbers line up with what finance modelled last week.</p><p>Can we lock the deck by EOD tomorrow so legal has time to review the appendix?</p><p style="margin-bottom:0;">Best,<br>Maya</p>',
  },
  {
    id: 2,
    from: 'GitHub',
    subject: '[northwind/web] 3 new pull requests need review',
    snippet: 'devon-okafor opened #482 · Aurora email client — three-pane layout…',
    time: '8:40 AM',
    unread: true,
    attach: false,
    tag: 'Clients',
    tagColor: 'var(--at-info)',
    initials: 'G',
    color: 'var(--at-info)',
    email: 'notifications@github.com',
    fullTime: 'Apr 25, 8:40 AM',
    participants: 1,
    count: 1,
    body: '<p>You have 3 pull requests awaiting review in <b>northwind/web</b>:</p><ul style="padding-inline-start:1.1rem;line-height:1.9;"><li>#482 — Aurora email client (three-pane layout)</li><li>#481 — Fix focus ring on segmented control</li><li>#479 — Dark-mode donut center label contrast</li></ul>',
  },
  {
    id: 3,
    from: 'Tomás Herrera',
    subject: 'Contract draft for the Q3 retainer',
    snippet: 'Attached the redlined version — the only open point is the SLA window…',
    time: 'Apr 24',
    unread: false,
    attach: true,
    tag: 'Clients',
    tagColor: 'var(--at-info)',
    initials: 'T',
    color: 'var(--at-tertiary)',
    email: 'tomas@brightline.io',
    fullTime: 'Apr 24, 4:18 PM',
    participants: 2,
    count: 6,
    body: '<p>Hi — attached the redlined version of the retainer. The only open point is the SLA window in section 4.2; we proposed 8 business hours, your team had asked for 4.</p><p>Happy to jump on a call Friday to close it out.</p>',
  },
  {
    id: 4,
    from: 'Priya Nair',
    subject: 'Weekly analytics digest is ready',
    snippet: 'Sessions up 12.4% week over week. Mobile conversion finally crossed 3%…',
    time: 'Apr 24',
    unread: false,
    attach: false,
    tag: '',
    tagColor: '',
    initials: 'P',
    color: 'var(--at-warning)',
    email: 'priya@northwind.io',
    fullTime: 'Apr 24, 11:02 AM',
    participants: 1,
    count: 1,
    body: '<p>Your weekly digest is ready. Highlights:</p><ul style="padding-inline-start:1.1rem;line-height:1.9;"><li>Sessions up <b>12.4%</b> week over week</li><li>Mobile conversion crossed <b>3%</b> for the first time</li><li>Top channel: organic search (27%)</li></ul>',
  },
  {
    id: 5,
    from: 'Stripe',
    subject: 'Your payout of $4,210.00 is on the way',
    snippet: 'A payout was initiated to your bank account ending in 7045…',
    time: 'Apr 23',
    unread: false,
    attach: false,
    tag: 'Receipts',
    tagColor: 'var(--at-warning)',
    initials: 'S',
    color: 'var(--at-tertiary)',
    email: 'support@stripe.com',
    fullTime: 'Apr 23, 6:30 PM',
    participants: 1,
    count: 1,
    body: '<p>A payout of <b>$4,210.00</b> was initiated to your bank account ending in 7045. It should arrive within 1–2 business days.</p>',
  },
  {
    id: 6,
    from: 'Lena Brandt',
    subject: 'New empty-state illustrations uploaded',
    snippet: 'Dropped the dark + light variants into Figma — pinged you on the frame…',
    time: 'Apr 23',
    unread: false,
    attach: false,
    tag: 'Personal',
    tagColor: 'var(--at-tertiary)',
    initials: 'L',
    color: 'var(--at-lime)',
    email: 'lena@studioform.de',
    fullTime: 'Apr 23, 2:11 PM',
    participants: 1,
    count: 2,
    body: '<p>Dropped the dark + light variants into Figma. Pinged you on the frame — let me know if the line weight reads OK against the glass surfaces.</p>',
  },
  {
    id: 7,
    from: 'Daniel Cho',
    subject: 'Lunch Thursday?',
    snippet: 'That new ramen place near the office opened. 12:30 work for you?',
    time: 'Apr 22',
    unread: false,
    attach: false,
    tag: '',
    tagColor: '',
    initials: 'D',
    color: 'var(--at-danger)',
    email: 'daniel@gmail.com',
    fullTime: 'Apr 22, 5:40 PM',
    participants: 1,
    count: 3,
    body: '<p>That new ramen place near the office finally opened. 12:30 Thursday work for you?</p>',
  },
];

export default function Email(): React.JSX.Element {
  const [folder, setFolder] = useState('inbox');
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);

  // read/unread flags live in state so opening a message clears its unread dot
  const [unreadById, setUnreadById] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(MESSAGES.map((m) => [m.id, m.unread])),
  );

  const current = useMemo(() => MESSAGES.find((m) => m.id === active), [active]);

  const open = (id: number): void => {
    setActive(id);
    setUnreadById((prev) => (prev[id] ? { ...prev, [id]: false } : prev));
  };

  const toggleAll = (checked: boolean): void => {
    setSelected(checked ? MESSAGES.map((m) => m.id) : []);
  };

  return (
    <>
      <style>{`
        [data-at-route='apps/email'] .at-mail-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--at-space-2);
          padding: var(--at-space-2) var(--at-space-3);
          border: 0;
          border-radius: var(--at-radius-sm);
          cursor: pointer;
          background: transparent;
          transition: background 0.12s ease;
        }
        [data-at-route='apps/email'] .at-mail-row:hover {
          background: var(--at-canvas);
        }
        [data-at-route='apps/email'] .at-mail-row.is-active {
          background: var(--at-accent-wash);
        }
        [data-at-route='apps/email'] .at-mail-row--msg {
          border-radius: 0;
        }

        /* ── Pane layout ──
           This lives here rather than in a style attribute on the card, and
           that is load-bearing. An inline declaration outranks every rule in
           every stylesheet, so while \`display:grid\` and the column track list
           sat on the element itself, the two media queries below could not
           override them: the client stayed pinned at 240+360+1fr on a 390px
           phone, roughly 600px of it clipped away by the card's own
           overflow:hidden and unreachable — no scrollbar, no way to see it.
           The panes had the same problem in the other direction, their inline
           \`display:flex\` outranking the \`display:none\` that is supposed to
           drop them at each breakpoint. Declaring both here restores the
           cascade, and the child-combinator selectors keep the hide rules
           more specific than the pane defaults so they still win. */
        [data-at-route='apps/email'] .at-card[aria-label='Email client'] {
          display: grid;
          grid-template-columns: 240px 360px 1fr;
        }
        [data-at-route='apps/email'] .at-card[aria-label='Email client'] > aside,
        [data-at-route='apps/email'] .at-card[aria-label='Email client'] > section {
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        /* Tablet — drop the reading pane, keep folders + list. */
        @media (max-width: 1280px) {
          [data-at-route='apps/email'] .at-card[aria-label='Email client'] {
            grid-template-columns: 220px 1fr;
          }
          [data-at-route='apps/email']
            .at-card[aria-label='Email client']
            > section[aria-label='Reading pane'] {
            display: none;
          }
        }
        /* Phone — a single column: the message list alone. */
        @media (max-width: 768px) {
          [data-at-route='apps/email'] .at-card[aria-label='Email client'] {
            grid-template-columns: 1fr;
          }
          [data-at-route='apps/email']
            .at-card[aria-label='Email client']
            > aside[aria-label='Mailbox folders'] {
            display: none;
          }
          /* Last pane standing — its divider would read as a stray hairline. */
          [data-at-route='apps/email']
            .at-card[aria-label='Email client']
            > section[aria-label='Message list'] {
            border-inline-end: 0;
          }
        }
      `}</style>

      {/* ════════════════ 3-PANE EMAIL CLIENT ════════════════ */}
      <div
        className="at-card"
        role="region"
        aria-label="Email client"
        style={{
          flex: '1 1 auto',
          minHeight: 600,
          padding: 0,
          overflow: 'hidden',
        }}
      >
        {/* ───────── PANE 1 · FOLDER RAIL ───────── */}
        <aside
          aria-label="Mailbox folders"
          style={{
            borderInlineEnd: '1px solid var(--at-ink)',
          }}
        >
          <div style={{ padding: 'var(--at-space-4) var(--at-space-4) var(--at-space-3)' }}>
            <button className="at-btn at-btn--primary at-btn--block at-press">Compose</button>
          </div>
          <nav
            aria-label="Folders"
            style={{
              flex: '1 1 auto',
              minHeight: 0,
              overflow: 'auto',
              padding: '0 var(--at-space-3) var(--at-space-4)',
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {FOLDERS.map((f) => (
                <li key={f.id}>
                  <button
                    type="button"
                    className={`at-mail-row${folder === f.id ? ' is-active' : ''}`}
                    onClick={() => setFolder(f.id)}
                    style={{ width: '100%', textAlign: 'start' }}
                  >
                    <span
                      className="at-text-strong"
                      style={{ fontSize: 'var(--at-text-sm)' }}
                    >
                      {f.name}
                    </span>
                    {f.count > 0 && (
                      <span
                        style={
                          f.id === 'inbox'
                            ? { fontSize: 'var(--at-text-xs)', flex: '0 0 auto', color: 'var(--at-accent-text)', fontWeight: 600 }
                            : { fontSize: 'var(--at-text-xs)', flex: '0 0 auto', color: 'var(--at-on-surface-muted)' }
                        }
                      >
                        {f.count}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <hr
              style={{
                margin: 'var(--at-space-4) var(--at-space-2)',
                border: 0,
                borderBlockStart: '1px solid var(--at-ink)',
              }}
            />

            <div
              className="at-eyebrow"
              style={{ paddingInline: 'var(--at-space-3)', marginBlockEnd: 'var(--at-space-2)' }}
            >
              Labels
            </div>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {LABELS.map((l) => (
                <li key={l.name}>
                  <button
                    type="button"
                    className={`at-mail-row${label === l.name ? ' is-active' : ''}`}
                    onClick={() => setLabel(l.name)}
                    style={{ width: '100%', textAlign: 'start' }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--at-space-2)',
                        fontSize: 'var(--at-text-sm)',
                      }}
                    >
                      <i
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: 3,
                          background: l.color,
                          display: 'inline-block',
                        }}
                      />
                      <span>{l.name}</span>
                    </span>
                    <span
                      style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}
                    >
                      {l.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* storage meter */}
          <div style={{ padding: 'var(--at-space-4)', borderBlockStart: '1px solid var(--at-ink)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBlockEnd: 6 }}>
              <small style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                Storage
              </small>
              <small style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-text-strong)' }}>8.4 / 15 GB</small>
            </div>
            <div className="at-progress">
              <div className="at-progress__bar" style={{ width: '56%' }} />
            </div>
          </div>
        </aside>

        {/* ───────── PANE 2 · MESSAGE LIST ───────── */}
        <section
          aria-label="Message list"
          style={{
            borderInlineEnd: '1px solid var(--at-ink)',
          }}
        >
          {/* toolbar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--at-space-2)',
              padding: 'var(--at-space-3) var(--at-space-4)',
              borderBlockEnd: '1px solid var(--at-ink)',
              minHeight: 56,
            }}
          >
            <label className="at-check" title="Select all">
              <input
                type="checkbox"
                checked={selected.length === MESSAGES.length && MESSAGES.length > 0}
                onChange={(e) => toggleAll(e.target.checked)}
                aria-label="Select all messages"
              />
            </label>
            <input
              className="at-input"
              type="search"
              placeholder="Search mail…"
              aria-label="Search mail"
              style={{ flex: '1 1 auto' }}
            />
          </div>

          {/* rows */}
          <ul
            style={{
              flex: '1 1 auto',
              minHeight: 0,
              overflow: 'auto',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {MESSAGES.map((m) => {
              const isUnread = unreadById[m.id];
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    className={`at-mail-row at-mail-row--msg${active === m.id ? ' is-active' : ''}`}
                    onClick={() => open(m.id)}
                    style={{
                      position: 'relative',
                      width: '100%',
                      textAlign: 'start',
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      gap: 'var(--at-space-3)',
                      alignItems: 'start',
                      padding: 'var(--at-space-3) var(--at-space-4)',
                      borderBlockEnd: '1px solid var(--at-ink)',
                    }}
                  >
                    {active === m.id && (
                      <i
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          insetBlock: 0,
                          insetInlineStart: 0,
                          width: 2,
                          background: 'var(--at-accent)',
                        }}
                      />
                    )}
                    <span
                      className="at-avatar at-avatar--sm"
                      style={{
                        background: `color-mix(in oklab, ${m.color} 22%, transparent)`,
                        color: `oklch(from ${m.color} var(--at-fg-l) c h)`,
                      }}
                    >
                      {m.initials}
                    </span>
                    <span style={{ minWidth: 0 }}>
                      <span
                        style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--at-space-2)' }}
                      >
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--at-space-2)',
                            minWidth: 0,
                          }}
                        >
                          {isUnread && (
                            <i
                              aria-hidden="true"
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: 'var(--at-accent)',
                                flex: '0 0 auto',
                              }}
                            />
                          )}
                          <span
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              fontWeight: 450,
                              color: 'var(--at-text-strong)',
                              ...(isUnread ? { fontWeight: 600 } : {}),
                            }}
                          >
                            {m.from}
                          </span>
                        </span>
                        <span
                          style={{
                            fontSize: 'var(--at-text-xs)',
                            color: 'var(--at-on-surface-muted)',
                            flex: '0 0 auto',
                          }}
                        >
                          {m.time}
                        </span>
                      </span>
                      <span
                        style={{
                          display: 'block',
                          marginTop: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: 'var(--at-text-strong)',
                          ...(isUnread ? { fontWeight: 500 } : {}),
                        }}
                      >
                        {m.subject}
                      </span>
                      <span
                        style={{
                          display: 'block',
                          fontSize: 'var(--at-text-xs)',
                          color: 'var(--at-on-surface-muted)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {m.snippet}
                      </span>
                      {m.tag && (
                        <span style={{ display: 'inline-flex', gap: 6, marginTop: 5 }}>
                          <span
                            className="at-badge at-badge--flat"
                            style={{
                              color: `oklch(from ${m.tagColor} var(--at-fg-l) c h)`,
                              background: `color-mix(in oklab, ${m.tagColor} 16%, transparent)`,
                            }}
                          >
                            {m.tag}
                          </span>
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ───────── PANE 3 · READING PANE ───────── */}
        <section
          aria-label="Reading pane"
        >
          {!current && (
            <div
              style={{
                flex: '1 1 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--at-space-3)',
                color: 'var(--at-on-surface-muted)',
                textAlign: 'center',
                padding: 'var(--at-space-8)',
              }}
            >
              <div style={{ fontSize: 'var(--at-text-lg)', color: 'var(--at-text-strong)' }}>
                Select a message to read
              </div>
              <div style={{ fontSize: 'var(--at-text-sm)' }}>
                Nothing is open — pick a conversation from the list.
              </div>
            </div>
          )}

          {current && (
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: '1 1 auto' }}>
              {/* thread header */}
              <div
                style={{
                  padding: 'var(--at-space-5) var(--at-space-6)',
                  borderBlockEnd: '1px solid var(--at-ink)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 'var(--at-space-3)',
                  }}
                >
                  <h2
                    style={{ fontSize: 'var(--at-text-lg)', margin: 0, color: 'var(--at-text-strong)' }}
                  >
                    {current.subject}
                  </h2>
                </div>
                <div style={{ display: 'inline-flex', gap: 6, marginTop: 'var(--at-space-3)' }}>
                  {current.tag && (
                    <span
                      className="at-badge at-badge--flat"
                      style={{
                        color: `oklch(from ${current.tagColor} var(--at-fg-l) c h)`,
                        background: `color-mix(in oklab, ${current.tagColor} 16%, transparent)`,
                      }}
                    >
                      {current.tag}
                    </span>
                  )}
                  <span
                    style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}
                  >
                    {current.participants} participants · {current.count} messages
                  </span>
                </div>
              </div>

              {/* body */}
              <div
                style={{
                  flex: '1 1 auto',
                  minHeight: 0,
                  overflow: 'auto',
                  padding: 'var(--at-space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--at-space-5)',
                }}
              >
                <article style={{ display: 'flex', flexDirection: 'column', gap: 'var(--at-space-4)' }}>
                  <div style={{ display: 'flex', gap: 'var(--at-space-3)' }}>
                    <span
                      className="at-avatar at-avatar--sm"
                      style={{
                        background: `color-mix(in oklab, ${current.color} 22%, transparent)`,
                        color: `oklch(from ${current.color} var(--at-fg-l) c h)`,
                      }}
                    >
                      {current.initials}
                    </span>
                    <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 'var(--at-space-2)',
                        }}
                      >
                        <b style={{ color: 'var(--at-text-strong)' }}>{current.from}</b>
                        <span
                          style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}
                        >
                          {current.fullTime}
                        </span>
                      </div>
                      <span
                        style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}
                      >
                        to me · {current.email}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{ color: 'var(--at-text-strong)', lineHeight: 1.7, fontSize: 'var(--at-text-sm)' }}
                    dangerouslySetInnerHTML={{ __html: current.body }}
                  />
                </article>
              </div>

              {/* action bar */}
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--at-space-2)',
                  padding: 'var(--at-space-4) var(--at-space-6)',
                  borderBlockStart: '1px solid var(--at-ink)',
                }}
              >
                <button className="at-btn at-btn--primary at-press">Reply</button>
                <button className="at-btn at-btn--outline at-press">Reply all</button>
                <button className="at-btn at-btn--outline at-press">Forward</button>
                <span style={{ flex: '1 1 auto' }} />
                <button className="at-btn at-btn--ghost at-btn--icon at-press" aria-label="Snooze">
                  ⏰
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
