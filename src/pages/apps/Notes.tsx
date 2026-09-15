/*
 * Hactex React — Notes app (fullscreen, no sidebar).
 * A 3-pane notebooks → list → editor
 * master-detail workspace. Renders inside <AppShell> (appbar + main); no
 * <PageHead>. Notebooks, the list and the editor are React hooks.
 *
 * Page-scoped <style> (the .at-note-* rules from the reference) is rendered
 * inline so the [data-at-route='apps/notes'] selectors apply once mounted.
 */
import { useMemo, useState } from 'react';

interface Book {
  id: string;
  label: string;
  color: string;
}

interface NoteTag {
  t: string;
  c: string;
}

interface Note {
  id: number;
  title: string;
  book: string;
  pinned: boolean;
  fav: boolean;
  trashed: boolean;
  updated: string;
  snippet: string;
  tags: NoteTag[];
  body: string;
}

const BOOKS: Book[] = [
  { id: 'personal', label: 'Personal', color: 'var(--at-info-text)' },
  { id: 'work', label: 'Work', color: 'var(--at-tertiary-text)' },
  { id: 'ideas', label: 'Ideas', color: 'var(--at-accent-text)' },
  { id: 'reading', label: 'Reading list', color: 'var(--at-lime-text)' },
];

const INITIAL_NOTES: Note[] = [
  {
    id: 1,
    title: 'Aurora design language — principles',
    book: 'work',
    pinned: true,
    fav: true,
    trashed: false,
    updated: '2h ago',
    snippet:
      'Glassy surfaces, one rationed expressive moment, data-viz palette stays constant across all 12 accents…',
    tags: [{ t: 'research', c: 'var(--at-tertiary)' }],
    body: 'Aurora keeps the spec architecture but swaps in a dark glassy-glow visual language.\n\nKey rules:\n- Glass cards at 24px radius with an inset top highlight\n- Accent is the only themed color; data-viz hexes are constant\n- Motion is restrained; the drag lift is the one expressive moment\n- Both light and dark must read correctly from tokens alone',
  },
  {
    id: 2,
    title: 'Q3 planning — open questions',
    book: 'work',
    pinned: true,
    fav: false,
    trashed: false,
    updated: '5h ago',
    snippet:
      'Headcount for the platform team, whether to ship offline mode in v2.0 or v2.1, pricing experiment scope…',
    tags: [{ t: 'todo', c: 'var(--at-warning)' }],
    body: 'Open questions to resolve before the planning offsite:\n\n1. Platform team headcount — 2 or 3 hires?\n2. Offline mode: v2.0 stretch or v2.1 commit?\n3. Pricing experiment: how big a cohort?\n4. Do we sunset the legacy API in Q3 or Q4?',
  },
  {
    id: 3,
    title: 'Books to read this summer',
    book: 'reading',
    pinned: false,
    fav: true,
    trashed: false,
    updated: '1d ago',
    snippet:
      'A Pattern Language, The Timeless Way of Building, Thinking in Systems, Shape Up, The Design of Everyday Things…',
    tags: [{ t: 'idea', c: 'var(--at-info)' }],
    body: 'Summer reading list:\n\n- A Pattern Language — Alexander\n- The Timeless Way of Building — Alexander\n- Thinking in Systems — Meadows\n- Shape Up — Singer\n- The Design of Everyday Things — Norman',
  },
  {
    id: 4,
    title: 'Onboarding flow rewrite notes',
    book: 'work',
    pinned: false,
    fav: false,
    trashed: false,
    updated: '2d ago',
    snippet:
      'Cut steps from 5 to 3, defer profile photo to later, add a skip on every step, instrument drop-off…',
    tags: [{ t: 'draft', c: 'var(--at-lime)' }],
    body: 'Rewrite goals:\n- Reduce from 5 steps to 3\n- Defer profile photo until first real use\n- Skip available on every step\n- Instrument drop-off between every transition\n- A/B test against current flow for two weeks',
  },
  {
    id: 5,
    title: 'Cabin trip packing list',
    book: 'personal',
    pinned: false,
    fav: false,
    trashed: false,
    updated: '3d ago',
    snippet:
      'Hiking boots, rain shell, headlamp, French press, board games, the good coffee, first-aid kit…',
    tags: [{ t: 'todo', c: 'var(--at-warning)' }],
    body: 'Packing for the cabin weekend:\n- Hiking boots + wool socks\n- Rain shell\n- Headlamp + spare batteries\n- French press + the good coffee\n- Board games\n- First-aid kit',
  },
  {
    id: 6,
    title: 'Idea: weekly design digest',
    book: 'ideas',
    pinned: false,
    fav: false,
    trashed: false,
    updated: '4d ago',
    snippet:
      'A short internal newsletter: one pattern we shipped, one we are exploring, one external thing worth a look…',
    tags: [{ t: 'idea', c: 'var(--at-info)' }],
    body: 'A short Friday digest for the design team:\n1. One pattern we shipped this week\n2. One we are exploring\n3. One external thing worth a look\n\nKeep it under a 3-minute read.',
  },
  {
    id: 7,
    title: 'Meeting — Northwind kickoff',
    book: 'work',
    pinned: false,
    fav: false,
    trashed: false,
    updated: '5d ago',
    snippet:
      'Scope confirmed for phase 1, weekly check-ins on Tuesdays, shared Figma, security review before launch…',
    tags: [{ t: 'research', c: 'var(--at-tertiary)' }],
    body: 'Northwind kickoff notes:\n- Phase 1 scope confirmed (dashboard + reports)\n- Weekly check-ins, Tuesdays 10am\n- Shared Figma + staging access granted\n- Security review must complete before launch',
  },
  {
    id: 8,
    title: 'Old draft — archived',
    book: 'ideas',
    pinned: false,
    fav: false,
    trashed: true,
    updated: '2w ago',
    snippet: 'Superseded by the Aurora direction doc. Kept for reference only.',
    tags: [],
    body: 'Superseded by the Aurora direction doc.',
  },
];

// static tag chips in the rail
const RAIL_TAGS = [
  { t: 'idea', c: 'var(--at-info)' },
  { t: 'research', c: 'var(--at-tertiary)' },
  { t: 'draft', c: 'var(--at-lime)' },
  { t: 'todo', c: 'var(--at-warning)' },
];

function bookLabel(id: string): string {
  return BOOKS.find((b) => b.id === id)?.label ?? id;
}

function bookColor(id: string): string {
  return BOOKS.find((b) => b.id === id)?.color ?? 'var(--at-on-surface-muted)';
}

export default function Notes(): React.JSX.Element {
  const [scope, setScope] = useState('all');
  const [q, setQ] = useState('');
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  // seed the active note: active = listed()[0]
  const [activeId, setActiveId] = useState<number | null>(
    INITIAL_NOTES.find((n) => !n.trashed)?.id ?? null,
  );

  const listed = useMemo(() => {
    const t = q.trim().toLowerCase();
    let list = notes.filter((n) => {
      if (scope === 'trash') return n.trashed;
      if (n.trashed) return false;
      if (scope === 'fav') return n.fav;
      if (scope === 'all') return true;
      return n.book === scope;
    });
    if (t) {
      list = list.filter(
        (n) => n.title.toLowerCase().includes(t) || n.snippet.toLowerCase().includes(t),
      );
    }
    return [...list].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }, [notes, scope, q]);

  const active = notes.find((n) => n.id === activeId) ?? null;

  const updateNote = (id: number, patch: Partial<Note>): void => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...patch } : n)));
  };

  const open = (n: Note): void => setActiveId(n.id);

  const newNote = (): void => {
    const id = Math.max(0, ...notes.map((n) => n.id)) + 1;
    const n: Note = {
      id,
      title: 'Untitled note',
      book: BOOKS.find((b) => b.id === scope) ? scope : 'personal',
      pinned: false,
      fav: false,
      trashed: false,
      updated: 'just now',
      snippet: '',
      tags: [],
      body: '',
    };
    setNotes((prev) => [n, ...prev]);
    setScope('all');
    setActiveId(n.id);
  };

  const togglePin = (n: Note): void => updateNote(n.id, { pinned: !n.pinned });

  const trash = (n: Note): void => {
    updateNote(n.id, { trashed: true });
    // recompute the next active from the post-trash listing
    const remaining = notes
      .filter((x) => x.id !== n.id)
      .filter((x) => !x.trashed)
      .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    setActiveId(remaining[0]?.id ?? null);
  };

  const wordCount = (body: string): number =>
    body.trim().split(/\s+/).filter(Boolean).length;

  const countAll = notes.filter((n) => !n.trashed).length;
  const countFav = notes.filter((n) => n.fav && !n.trashed).length;
  const countTrash = notes.filter((n) => n.trashed).length;
  const countBook = (bookId: string) =>
    notes.filter((n) => n.book === bookId && !n.trashed).length;

  return (
    <>
      <style>{`
[data-at-route='apps/notes'] .at-note-rail {
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
  width: 100%;
  text-align: start;
}
[data-at-route='apps/notes'] .at-note-rail:hover {
  background: var(--at-canvas);
}
[data-at-route='apps/notes'] .at-note-rail.is-active {
  background: var(--at-accent-wash);
}
[data-at-route='apps/notes'] .at-note-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  text-align: left;
  padding: var(--at-space-3) var(--at-space-4);
  background: transparent;
  border: 0;
  border-block-end: 1px solid var(--at-ink);
  cursor: pointer;
  transition: background 0.12s ease;
}
[data-at-route='apps/notes'] .at-note-card:hover {
  background: var(--at-canvas);
}
[data-at-route='apps/notes'] .at-note-card.is-active {
  background: var(--at-accent-wash);
  box-shadow: inset 2px 0 0 var(--at-accent);
}
[data-at-route='apps/notes'] .at-note-card__title {
  font-weight: 600;
  color: var(--at-text-strong);
  font-size: var(--at-text-sm);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
[data-at-route='apps/notes'] .at-note-card__snippet {
  color: var(--at-on-surface-muted);
  font-size: var(--at-text-sm);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}
`}</style>

      <div className="at-row" style={{ gap: 'var(--at-space-4)', alignItems: 'stretch' }}>
        {/* ───── RAIL: notebooks ───── */}
        <div className="at-col-3 at-card" style={{ padding: 'var(--at-space-5)' }}>
          {/* smart views */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <button
              type="button"
              className={`at-note-rail${scope === 'all' ? ' is-active' : ''}`}
              onClick={() => setScope('all')}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--at-space-2)',
                  fontSize: 'var(--at-text-sm)',
                }}
              >
                <span>▤</span>
                <span>All notes</span>
              </span>
              <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                {countAll}
              </span>
            </button>
            <button
              type="button"
              className={`at-note-rail${scope === 'fav' ? ' is-active' : ''}`}
              onClick={() => setScope('fav')}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--at-space-2)',
                  fontSize: 'var(--at-text-sm)',
                  color: 'var(--at-warning-text)',
                }}
              >
                <span>★</span>
                <span style={{ color: 'var(--at-text-strong)' }}>Favorites</span>
              </span>
              <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                {countFav}
              </span>
            </button>
            <button
              type="button"
              className={`at-note-rail${scope === 'trash' ? ' is-active' : ''}`}
              onClick={() => setScope('trash')}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--at-space-2)',
                  fontSize: 'var(--at-text-sm)',
                  color: 'var(--at-on-surface-muted)',
                }}
              >
                <span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '14px', height: '14px', verticalAlign: 'middle' }}
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </span>
                <span style={{ color: 'var(--at-text-strong)' }}>Trash</span>
              </span>
              <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                {countTrash}
              </span>
            </button>
          </div>

          <hr
            style={{
              margin: 'var(--at-space-4) 0',
              border: 0,
              borderBlockStart: '1px solid var(--at-ink)',
            }}
          />

          {/* notebooks */}
          <div className="at-eyebrow" style={{ marginBlockEnd: 'var(--at-space-2)' }}>Notebooks</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {BOOKS.map((b) => (
              <button
                key={b.id}
                type="button"
                className={`at-note-rail${scope === b.id ? ' is-active' : ''}`}
                onClick={() => setScope(b.id)}
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
                      width: '9px',
                      height: '9px',
                      borderRadius: '3px',
                      background: b.color,
                      display: 'inline-block',
                    }}
                  />
                  <span>{b.label}</span>
                </span>
                <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                  {countBook(b.id)}
                </span>
              </button>
            ))}
          </div>
          <button
            className="at-btn at-btn--ghost at-btn--sm at-btn--block at-press"
            style={{
              justifyContent: 'flex-start',
              marginBlockStart: 'var(--at-space-2)',
              color: 'var(--at-on-surface-muted)',
            }}
          >
            + New notebook
          </button>

          <hr
            style={{
              margin: 'var(--at-space-4) 0',
              border: 0,
              borderBlockStart: '1px solid var(--at-ink)',
            }}
          />

          {/* tags */}
          <div className="at-eyebrow" style={{ marginBlockEnd: 'var(--at-space-2)' }}>Tags</div>
          <div style={{ display: 'flex', gap: 'var(--at-space-2)', flexWrap: 'wrap' }}>
            {RAIL_TAGS.map((tag) => (
              <span
                key={tag.t}
                className="at-badge at-badge--flat"
                style={{
                  color: `oklch(from ${tag.c} var(--at-fg-l) c h)`,
                  background: `color-mix(in oklab, ${tag.c} 15%, transparent)`,
                }}
              >
                {tag.t}
              </span>
            ))}
          </div>
        </div>

        {/* ───── NOTE LIST ───── */}
        <div
          className="at-col-3 at-card"
          style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        >
          {/* search header */}
          <div
            className="at-cluster"
            style={{
              padding: 'var(--at-space-4)',
              borderBlockEnd: '1px solid var(--at-ink)',
              gap: 'var(--at-space-2)',
            }}
          >
            <input
              className="at-input"
              type="search"
              placeholder="Search notes…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search notes"
            />
            <button className="at-btn at-btn--primary at-press" onClick={newNote}>New note</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '72vh', overflow: 'auto' }}>
            {listed.map((n) => (
              <button
                key={n.id}
                type="button"
                className={`at-note-card${active && active.id === n.id ? ' is-active' : ''}`}
                onClick={() => open(n)}
                style={{ textAlign: 'start' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--at-space-2)' }}>
                  <span className="at-note-card__title">{n.title}</span>
                  {n.pinned && (
                    <span style={{ color: 'var(--at-accent-text)', flex: '0 0 auto', display: 'inline-flex' }}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: '14px', height: '14px' }}
                      >
                        <path d="M12 17v5" />
                        <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
                      </svg>
                    </span>
                  )}
                </div>
                <p className="at-note-card__snippet">{n.snippet}</p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 'var(--at-space-2)',
                    marginTop: '4px',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <i
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '2px',
                        background: bookColor(n.book),
                        display: 'inline-block',
                      }}
                    />
                    <small style={{ color: 'var(--at-on-surface-muted)', fontSize: 'var(--at-text-xs)' }}>
                      {bookLabel(n.book)}
                    </small>
                  </span>
                  <small style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                    {n.updated}
                  </small>
                </div>
              </button>
            ))}
            {listed.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  padding: 'var(--at-space-8) var(--at-space-4)',
                  color: 'var(--at-on-surface-muted)',
                  fontSize: 'var(--at-text-sm)',
                }}
              >
                No notes here yet.
              </div>
            )}
          </div>
        </div>

        {/* ───── EDITOR ───── */}
        <div
          className="at-col-6 at-card"
          style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        >
          {active && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* editor toolbar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--at-space-3) var(--at-space-5)',
                  borderBlockEnd: '1px solid var(--at-ink)',
                  gap: 'var(--at-space-2)',
                }}
              >
                <div style={{ display: 'flex', gap: 'var(--at-space-1)', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="at-btn at-btn--ghost at-btn--icon at-btn--sm at-press"
                    aria-label="Bold"
                    style={{ fontWeight: 700 }}
                  >
                    B
                  </button>
                  <button
                    type="button"
                    className="at-btn at-btn--ghost at-btn--icon at-btn--sm at-press"
                    aria-label="Italic"
                    style={{ fontStyle: 'italic' }}
                  >
                    I
                  </button>
                  <span style={{ width: '1px', height: '18px', background: 'var(--at-ink)' }} />
                  <button
                    type="button"
                    className="at-btn at-btn--ghost at-btn--icon at-btn--sm at-press"
                    aria-label="Bulleted list"
                  >
                    •
                  </button>
                  <button
                    type="button"
                    className="at-btn at-btn--ghost at-btn--icon at-btn--sm at-press"
                    aria-label="Checklist"
                  >
                    ☐
                  </button>
                  <span style={{ width: '1px', height: '18px', background: 'var(--at-ink)' }} />
                  <button
                    type="button"
                    className="at-btn at-btn--ghost at-btn--icon at-btn--sm at-press"
                    aria-label="Insert link"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: '14px', height: '14px' }}
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '2px' }}>
                  <button
                    type="button"
                    className="at-btn at-btn--ghost at-btn--icon at-btn--sm at-press"
                    aria-label={active.pinned ? 'Unpin note' : 'Pin note'}
                    aria-pressed={active.pinned}
                    onClick={() => togglePin(active)}
                    style={active.pinned ? { color: 'var(--at-accent-text)' } : undefined}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: '14px', height: '14px' }}
                    >
                      <path d="M12 17v5" />
                      <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="at-btn at-btn--ghost at-btn--icon at-btn--sm at-press"
                    aria-label={active.fav ? 'Remove from favorites' : 'Add to favorites'}
                    aria-pressed={active.fav}
                    onClick={() => updateNote(active.id, { fav: !active.fav })}
                    style={active.fav ? { color: 'var(--at-warning-text)' } : undefined}
                  >
                    ★
                  </button>
                  <button
                    type="button"
                    className="at-btn at-btn--ghost at-btn--icon at-btn--sm at-press"
                    aria-label="Delete note"
                    style={{ color: 'var(--at-danger-text)' }}
                    onClick={() => trash(active)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: '14px', height: '14px' }}
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* editor body */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--at-space-4)',
                  flex: '1 1 auto',
                  padding: 'var(--at-space-5)',
                  overflow: 'auto',
                }}
              >
                <input
                  type="text"
                  value={active.title}
                  onChange={(e) => updateNote(active.id, { title: e.target.value })}
                  style={{
                    border: 0,
                    background: 'transparent',
                    outline: 'none',
                    color: 'var(--at-text-strong)',
                    fontSize: 'var(--at-text-lg)',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                  }}
                  aria-label="Note title"
                />
                {/* tags + notebook */}
                <div style={{ display: 'flex', gap: 'var(--at-space-2)', flexWrap: 'wrap' }}>
                  <span
                    className="at-badge at-badge--flat"
                    style={{
                      color: bookColor(active.book),
                      background: `color-mix(in oklab, ${bookColor(active.book)} 15%, transparent)`,
                    }}
                  >
                    {bookLabel(active.book)}
                  </span>
                  {active.tags.map((tag) => (
                    <span
                      key={tag.t}
                      className="at-badge at-badge--flat"
                      style={{
                        color: `oklch(from ${tag.c} var(--at-fg-l) c h)`,
                        background: `color-mix(in oklab, ${tag.c} 15%, transparent)`,
                      }}
                    >
                      {tag.t}
                    </span>
                  ))}
                  <button type="button" className="at-btn at-btn--outline at-btn--sm at-press">
                    + Tag
                  </button>
                </div>
                <textarea
                  value={active.body}
                  onChange={(e) => updateNote(active.id, { body: e.target.value })}
                  style={{
                    flex: '1 1 auto',
                    minHeight: '280px',
                    border: 0,
                    background: 'transparent',
                    outline: 'none',
                    resize: 'none',
                    color: 'var(--at-text-strong)',
                    fontSize: 'var(--at-text-sm)',
                    lineHeight: 1.7,
                  }}
                  aria-label="Note body"
                />
              </div>

              {/* footer: autosave indicator */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--at-space-3) var(--at-space-5)',
                  borderBlockStart: '1px solid var(--at-ink)',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    gap: '6px',
                    fontSize: 'var(--at-text-xs)',
                    color: 'var(--at-on-surface-muted)',
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: 'var(--at-success)',
                    }}
                  />
                  Saved · edited <span>{active.updated}</span>
                </span>
                <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                  {wordCount(active.body)} words
                </span>
              </div>
            </div>
          )}

          {/* no selection */}
          {!active && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                textAlign: 'center',
              }}
            >
              <p style={{ color: 'var(--at-text-strong)', fontWeight: 500 }}>Select a note to read</p>
              <p style={{ color: 'var(--at-on-surface-muted)', fontSize: 'var(--at-text-sm)' }}>
                Or create a new one to start writing.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
