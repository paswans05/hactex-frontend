/*
 * Hactex React — Chat app (fullscreen, no sidebar).
 * A 3-pane chat workspace
 * (conversations list | message thread + composer | contact details).
 * Renders inside <AppShell> (appbar + .at-app-fullscreen); no <PageHead>.
 */
import { useEffect, useMemo, useRef, useState } from 'react';

interface ChatMessage {
  out: boolean;
  read?: boolean;
  showAvatar?: boolean;
  text: string;
  time: string;
}

interface ChatConversation {
  id: number;
  name: string;
  initials: string;
  color: string;
  role: string;
  preview: string;
  time: string;
  unread: number;
  typing: boolean;
  messages: ChatMessage[];
}

const FILTERS = ['All', 'Unread', 'Groups'] as const;
type ChatFilter = (typeof FILTERS)[number];

const MEDIA_SWATCHES = [
  'var(--at-chart-1)',
  'var(--at-chart-2)',
  'var(--at-chart-3)',
  'var(--at-chart-4)',
  'var(--at-chart-5)',
  'var(--at-chart-6)',
];

const CONVERSATIONS: ChatConversation[] = [
  {
    id: 1,
    name: 'Devon Okafor',
    initials: 'D',
    color: 'var(--at-success)',
    role: 'Engineering Lead',
    preview: 'Pushed the fix — can you re-run CI?',
    time: '9:41 AM',
    unread: 2,
    typing: false,
    messages: [
      { out: false, showAvatar: true, text: 'Morning! Did the deploy go through last night?', time: '9:32 AM' },
      { out: true, read: true, text: 'Yep — went out at 11pm, all green. 🎉', time: '9:34 AM' },
      { out: false, showAvatar: true, text: 'Nice. One thing — the segmented control loses its focus ring in dark mode.', time: '9:38 AM' },
      { out: true, read: true, text: 'Good catch. I\'ll patch it this morning and push to <b>#481</b>.', time: '9:39 AM' },
      { out: false, showAvatar: false, text: 'Pushed the fix — can you re-run CI?', time: '9:41 AM' },
    ],
  },
  {
    id: 2,
    name: 'Design Crew',
    initials: 'D',
    color: 'var(--at-tertiary)',
    role: '5 members',
    preview: 'Lena: dropped the new empty states',
    time: '9:10 AM',
    unread: 1,
    typing: true,
    messages: [
      { out: false, showAvatar: true, text: 'Dropped the new empty-state illustrations in Figma.', time: '9:08 AM' },
      { out: true, read: true, text: 'These look great against the glass surfaces 👏', time: '9:10 AM' },
    ],
  },
  {
    id: 3,
    name: 'Priya Nair',
    initials: 'P',
    color: 'var(--at-warning)',
    role: 'Data Analyst',
    preview: 'You: sent the weekly digest',
    time: 'Yes',
    unread: 0,
    typing: false,
    messages: [
      { out: false, showAvatar: true, text: 'Can you forward last week\'s digest?', time: 'Mon' },
      { out: true, read: true, text: 'Sent the weekly digest 📊', time: 'Mon' },
    ],
  },
  {
    id: 4,
    name: 'Tomás Herrera',
    initials: 'T',
    color: 'var(--at-info)',
    role: 'Client · Brightline',
    preview: 'Thanks, talk Friday',
    time: 'Tue',
    unread: 0,
    typing: false,
    messages: [
      { out: false, showAvatar: true, text: 'Sent over the redlined contract.', time: 'Tue' },
      { out: true, read: true, text: 'Got it — will review and circle back.', time: 'Tue' },
      { out: false, showAvatar: false, text: 'Thanks, talk Friday 👍', time: 'Tue' },
    ],
  },
  {
    id: 5,
    name: 'Marketing',
    initials: 'M',
    color: 'var(--at-lime)',
    role: '8 members',
    preview: 'Ava: campaign goes live at noon',
    time: 'Tue',
    unread: 1,
    typing: false,
    messages: [
      { out: false, showAvatar: true, text: 'Campaign goes live at noon — final assets approved.', time: 'Tue' },
    ],
  },
  {
    id: 6,
    name: 'Daniel Cho',
    initials: 'D',
    color: 'var(--at-danger)',
    role: 'Product Manager',
    preview: '12:30 works for ramen 🍜',
    time: 'Mon',
    unread: 0,
    typing: false,
    messages: [
      { out: false, showAvatar: true, text: '12:30 works for ramen 🍜', time: 'Mon' },
    ],
  },
];

export default function Chat(): React.JSX.Element {
  const [active, setActive] = useState(1);
  const [filter, setFilter] = useState<ChatFilter>('All');
  const [q, setQ] = useState('');
  const [draft, setDraft] = useState('');
  const [conversations, setConversations] = useState<ChatConversation[]>(CONVERSATIONS);

  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let list = conversations;
    if (filter === 'Unread') list = list.filter((c) => c.unread);
    if (filter === 'Groups') list = list.filter((c) => (c.role ?? '').includes('member'));
    if (q.trim()) {
      const needle = q.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(needle));
    }
    return list;
  }, [conversations, filter, q]);

  const conv = conversations.find((c) => c.id === active) ?? conversations[0];

  const scrollDown = (): void => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  // auto-scroll to bottom whenever the active thread or its messages change
  useEffect(() => {
    scrollDown();
  }, [active, conv?.messages]);

  const open = (id: number): void => {
    setActive(id);
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  };

  const sendMsg = (): void => {
    const t = draft.trim();
    if (!t) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setConversations((prev) =>
      prev.map((c) =>
        c.id === active
          ? { ...c, messages: [...c.messages, { out: true, read: false, text: t.replace(/</g, '&lt;'), time }] }
          : c,
      ),
    );
    setDraft('');
  };

  return (
    <>
      <style>{`
        [data-at-route='apps/chat'] .at-chat-row {
          display: flex;
          align-items: center;
          gap: var(--at-space-3);
          padding: var(--at-space-3);
          border: 0;
          border-radius: var(--at-radius-sm);
          cursor: pointer;
          background: transparent;
          transition: background 0.12s ease;
        }
        [data-at-route='apps/chat'] .at-chat-row:hover {
          background: var(--at-canvas);
        }
        [data-at-route='apps/chat'] .at-chat-row.is-active {
          background: var(--at-accent-wash);
        }

        /* ── Pane layout ──
           Declared here, not in a style attribute on the card. An inline
           declaration outranks every stylesheet rule, so with \`display:grid\`
           and the track list sitting on the element the two media queries
           below were dead: the workspace held 320+1fr+280 on a 390px phone
           and the card's own overflow:hidden clipped ~490px of it away with
           no scrollbar and no way to reach it. The panes' inline
           \`display:flex\` blocked the matching \`display:none\` the same way.
           Child combinators keep the hide rules ahead of the pane defaults. */
        [data-at-route='apps/chat'] .at-card[aria-label='Chat workspace'] {
          display: grid;
          grid-template-columns: 320px 1fr 280px;
        }
        [data-at-route='apps/chat'] .at-card[aria-label='Chat workspace'] > aside,
        [data-at-route='apps/chat'] .at-card[aria-label='Chat workspace'] > section {
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        /* Tablet — drop the contact rail, keep the list + thread. */
        @media (max-width: 1100px) {
          [data-at-route='apps/chat'] .at-card[aria-label='Chat workspace'] {
            grid-template-columns: 280px 1fr;
          }
          [data-at-route='apps/chat']
            .at-card[aria-label='Chat workspace']
            > aside[aria-label='Contact details'] {
            display: none;
          }
        }
        /* Phone — a single column: the thread alone. */
        @media (max-width: 768px) {
          [data-at-route='apps/chat'] .at-card[aria-label='Chat workspace'] {
            grid-template-columns: 1fr;
          }
          [data-at-route='apps/chat']
            .at-card[aria-label='Chat workspace']
            > aside[aria-label='Conversations'] {
            display: none;
          }
        }
      `}</style>

      {/* ════════════════ 3-PANE CHAT WORKSPACE ════════════════ */}
      <div
        className="at-card"
        role="region"
        aria-label="Chat workspace"
        style={{
          flex: '1 1 auto',
          minHeight: 600,
          padding: 0,
          overflow: 'hidden',
        }}
      >
        {/* ───────── CONVERSATION LIST ───────── */}
        <aside
          aria-label="Conversations"
          style={{
            borderInlineEnd: '1px solid var(--at-ink)',
          }}
        >
          <div
            style={{
              padding: 'var(--at-space-4)',
              borderBlockEnd: '1px solid var(--at-ink)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--at-space-3)',
            }}
          >
            <input
              className="at-input"
              type="search"
              placeholder="Search conversations…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search conversations"
            />
            <div className="at-segment" style={{ width: '100%' }}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  className={`at-segment__btn${filter === f ? ' is-active' : ''}`}
                  style={{ flex: '1 1 0' }}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <ul
            style={{
              flex: '1 1 auto',
              minHeight: 0,
              overflow: 'auto',
              padding: 'var(--at-space-2)',
              margin: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {filtered.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className={`at-chat-row${active === c.id ? ' is-active' : ''}`}
                  onClick={() => open(c.id)}
                  style={{ position: 'relative', width: '100%', textAlign: 'start' }}
                >
                  {active === c.id && (
                    <i
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        insetBlock: 6,
                        insetInlineStart: 0,
                        width: 2,
                        borderRadius: 2,
                        background: 'var(--at-accent)',
                      }}
                    />
                  )}
                  <span
                    className="at-avatar at-avatar--sm"
                    style={{
                      background: `color-mix(in oklab, ${c.color} 22%, transparent)`,
                      color: `oklch(from ${c.color} var(--at-fg-l) c h)`,
                    }}
                  >
                    {c.initials}
                  </span>
                  <span style={{ minWidth: 0, flex: '1 1 auto' }}>
                    <span
                      style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--at-space-2)' }}
                    >
                      <span
                        className="at-text-strong"
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        {c.name}
                      </span>
                      <span
                        style={{
                          fontSize: 'var(--at-text-xs)',
                          color: 'var(--at-on-surface-muted)',
                          flex: '0 0 auto',
                        }}
                      >
                        {c.time}
                      </span>
                    </span>
                    <span
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 'var(--at-space-2)',
                        marginTop: 2,
                      }}
                    >
                      <span
                        style={
                          c.typing
                            ? { fontSize: 'var(--at-text-xs)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--at-accent-text)', fontStyle: 'italic' }
                            : { fontSize: 'var(--at-text-xs)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--at-on-surface-muted)' }
                        }
                      >
                        {c.typing ? 'typing…' : c.preview}
                      </span>
                      {c.unread > 0 && (
                        <span
                          style={{
                            flex: '0 0 auto',
                            minWidth: 18,
                            height: 18,
                            padding: '0 5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'var(--at-accent)',
                            color: 'var(--at-on-accent)',
                            borderRadius: 999,
                            fontSize: 'var(--at-text-xs)',
                            fontWeight: 600,
                          }}
                        >
                          {c.unread}
                        </span>
                      )}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* ───────── CONVERSATION THREAD ───────── */}
        <section
          aria-label="Conversation"
          style={{ background: 'var(--at-canvas)' }}
        >
          {/* thread header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--at-space-3)',
              padding: 'var(--at-space-3) var(--at-space-5)',
              borderBlockEnd: '1px solid var(--at-ink)',
              background: 'var(--at-paper)',
              minHeight: 64,
              flex: '0 0 auto',
            }}
          >
            <span
              className="at-avatar at-avatar--sm"
              style={{
                background: `color-mix(in oklab, ${conv.color} 22%, transparent)`,
                color: `oklch(from ${conv.color} var(--at-fg-l) c h)`,
              }}
            >
              {conv.initials}
            </span>
            <div style={{ flex: '1 1 auto', minWidth: 0 }}>
              <div
                className="at-text-strong"
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                {conv.name}
              </div>
              <div style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                {conv.role}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 2, flex: '0 0 auto' }}>
              <button className="at-btn at-btn--ghost at-btn--icon at-press" aria-label="Start voice call">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 16, height: 16 }}
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </button>
              <button className="at-btn at-btn--ghost at-btn--icon at-press" aria-label="Start video call">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 16, height: 16 }}
                >
                  <path d="m22 8-6 4 6 4V8Z" />
                  <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                </svg>
              </button>
            </div>
          </div>

          {/* messages */}
          <div
            ref={scrollRef}
            style={{
              flex: '1 1 auto',
              minHeight: 0,
              overflow: 'auto',
              padding: 'var(--at-space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--at-space-3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', margin: 'var(--at-space-2) 0' }}>
              <span
                style={{
                  fontSize: 'var(--at-text-xs)',
                  color: 'var(--at-on-surface-muted)',
                  background: 'var(--at-paper)',
                  border: '1px solid var(--at-ink)',
                  borderRadius: 999,
                  padding: '3px 12px',
                }}
              >
                Today
              </span>
            </div>

            {conv.messages.map((m, i) => (
              <div
                key={i}
                style={
                  m.out
                    ? { alignSelf: 'flex-end', maxWidth: '74%' }
                    : { alignSelf: 'flex-start', maxWidth: '74%', display: 'flex', gap: 'var(--at-space-2)' }
                }
              >
                {!m.out && m.showAvatar && (
                  <span
                    className="at-avatar at-avatar--xs"
                    style={{
                      alignSelf: 'flex-end',
                      flex: '0 0 auto',
                      background: `color-mix(in oklab, ${conv.color} 22%, transparent)`,
                      color: `oklch(from ${conv.color} var(--at-fg-l) c h)`,
                    }}
                  >
                    {conv.initials}
                  </span>
                )}
                {!m.out && !m.showAvatar && (
                  <span style={{ width: 28, flex: '0 0 auto' }} aria-hidden="true" />
                )}
                <div>
                  <div
                    style={{
                      padding: 'var(--at-space-3) var(--at-space-4)',
                      fontSize: 'var(--at-text-sm)',
                      lineHeight: 1.55,
                      ...(m.out
                        ? {
                          background: 'var(--at-accent-wash)',
                          color: 'var(--at-text-strong)',
                          border: '1px solid color-mix(in oklab, var(--at-accent) 28%, transparent)',
                          borderRadius:
                            'var(--at-radius-md) var(--at-radius-md) var(--at-radius-xs) var(--at-radius-md)',
                        }
                        : {
                          background: 'var(--at-paper)',
                          color: 'var(--at-text-strong)',
                          border: '1px solid var(--at-ink)',
                          borderRadius:
                            'var(--at-radius-md) var(--at-radius-md) var(--at-radius-md) var(--at-radius-xs)',
                        }),
                    }}
                    dangerouslySetInnerHTML={{ __html: m.text }}
                  />
                  <div style={{ marginTop: 3, paddingInline: 'var(--at-space-2)' }}>
                    <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                      {m.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMsg();
            }}
            style={{
              flex: '0 0 auto',
              padding: 'var(--at-space-3) var(--at-space-5)',
              borderBlockStart: '1px solid var(--at-ink)',
              background: 'var(--at-paper)',
            }}
          >
            <div style={{ display: 'flex', gap: 'var(--at-space-2)', alignItems: 'flex-end' }}>
              <button type="button" className="at-btn at-btn--ghost at-btn--icon at-press" aria-label="Attach file">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 16, height: 16 }}
                >
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 17.93 8.8l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </button>
              <textarea
                className="at-textarea"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={1}
                placeholder="Write a message…  (Enter to send, Shift+Enter for newline)"
                style={{
                  flex: '1 1 auto',
                  minHeight: 40,
                  maxHeight: 140,
                  resize: 'none',
                  lineHeight: 1.5,
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMsg();
                  }
                }}
              />
              <button
                type="submit"
                className="at-btn at-btn--primary at-btn--icon at-press"
                disabled={!draft.trim()}
                aria-label="Send message"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 16, height: 16 }}
                >
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                  <path d="m21.854 2.147-10.94 10.939" />
                </svg>
              </button>
            </div>
          </form>
        </section>

        {/* ───────── CONTACT DETAILS ───────── */}
        <aside
          aria-label="Contact details"
          style={{
            borderInlineStart: '1px solid var(--at-ink)',
            background: 'var(--at-paper)',
            padding: 'var(--at-space-5)',
            overflow: 'auto',
            gap: 'var(--at-space-5)',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--at-space-2)',
            }}
          >
            <span
              className="at-avatar at-avatar--xl"
              style={{
                background: `color-mix(in oklab, ${conv.color} 22%, transparent)`,
                color: `oklch(from ${conv.color} var(--at-fg-l) c h)`,
              }}
            >
              {conv.initials}
            </span>
            <div>
              <div className="at-text-strong">{conv.name}</div>
              <div style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                {conv.role}
              </div>
            </div>
          </div>

          <div>
            <div className="at-eyebrow" style={{ marginBlockEnd: 'var(--at-space-2)' }}>
              Shared media
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {MEDIA_SWATCHES.map((g) => (
                <span
                  key={g}
                  style={{
                    aspectRatio: '1',
                    borderRadius: 'var(--at-radius-md)',
                    background: `color-mix(in oklab, ${g} 22%, var(--at-canvas))`,
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--at-space-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--at-text-sm)', color: 'var(--at-text-strong)' }}>Mute notifications</span>
              <button className="at-switch">
                <span className="at-switch__thumb" />
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--at-text-sm)', color: 'var(--at-text-strong)' }}>Pin conversation</span>
              <button className="at-switch is-on">
                <span className="at-switch__thumb" />
              </button>
            </div>
          </div>

          <button
            className="at-btn at-btn--outline at-btn--block at-press"
            style={{ borderColor: 'var(--at-danger)', color: 'var(--at-danger-text)' }}
          >
            Block &amp; report
          </button>
        </aside>
      </div>
    </>
  );
}
