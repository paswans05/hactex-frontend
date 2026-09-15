/*
 * Hactex React — Kanban app (fullscreen, no sidebar).
 * A horizontal board of columns + cards.
 * Renders inside <AppShell> (appbar + .at-app-main); no <PageHead>.
 *
 * Drag-and-drop uses native HTML5 DnD (draggable + onDragStart/onDragOver/
 * onDrop). A kanban-scoped handler pair is enough — no library required.
 */
import { useMemo, useState } from 'react';

interface KbColumn {
  id: string;
  title: string;
  color: string;
  wip: number;
}

interface Label {
  t: string;
  c: string;
}

interface Assignee {
  i: string;
  n: string;
  c: string;
}

interface Card {
  id: number;
  key: string;
  col: string;
  cover?: string;
  title: string;
  labels: Label[];
  due: string;
  overdue: boolean;
  checklist: string;
  comments: number;
  who: Assignee;
}

const COLUMNS: KbColumn[] = [
  { id: 'todo', title: 'To Do', color: 'var(--at-on-surface-muted)', wip: 0 },
  { id: 'progress', title: 'In Progress', color: 'var(--at-info-text)', wip: 4 },
  { id: 'review', title: 'Review', color: 'var(--at-tertiary-text)', wip: 3 },
  { id: 'done', title: 'Done', color: 'var(--at-success-text)', wip: 0 },
];

const SEED_ITEMS: Card[] = [
  {
    id: 1,
    key: 'APP-118',
    col: 'todo',
    title: 'Add biometric unlock to login',
    labels: [{ t: 'Auth', c: 'var(--at-tertiary)' }],
    due: 'Jul 2',
    overdue: false,
    checklist: '0/3',
    comments: 1,
    who: { i: 'M', n: 'Maya Okonkwo', c: 'var(--at-info)' },
  },
  {
    id: 2,
    key: 'APP-121',
    col: 'todo',
    title: 'Offline mode for saved articles',
    labels: [{ t: 'Feature', c: 'var(--at-info)' }],
    due: '',
    overdue: false,
    checklist: '',
    comments: 0,
    who: { i: 'T', n: 'Tom Reyes', c: 'var(--at-tertiary)' },
  },
  {
    id: 3,
    key: 'APP-124',
    col: 'todo',
    title: 'Crash on Android 13 cold start',
    labels: [{ t: 'Bug', c: 'var(--at-danger)' }],
    due: 'Jun 26',
    overdue: true,
    checklist: '',
    comments: 4,
    who: { i: 'P', n: 'Priya Nair', c: 'var(--at-warning)' },
  },
  {
    id: 4,
    key: 'APP-110',
    col: 'progress',
    cover: 'var(--at-accent)',
    title: 'Onboarding flow — wire to auth API',
    labels: [
      { t: 'Auth', c: 'var(--at-tertiary)' },
      { t: 'P1', c: 'var(--at-warning)' },
    ],
    due: 'Jun 28',
    overdue: false,
    checklist: '3/5',
    comments: 6,
    who: { i: 'T', n: 'Tom Reyes', c: 'var(--at-tertiary)' },
  },
  {
    id: 5,
    key: 'APP-113',
    col: 'progress',
    title: 'Push notification preferences screen',
    labels: [{ t: 'Feature', c: 'var(--at-info)' }],
    due: 'Jul 1',
    overdue: false,
    checklist: '2/4',
    comments: 2,
    who: { i: 'M', n: 'Maya Okonkwo', c: 'var(--at-info)' },
  },
  {
    id: 6,
    key: 'APP-115',
    col: 'progress',
    title: 'Dark mode contrast audit',
    labels: [{ t: 'Design', c: 'var(--at-lime)' }],
    due: '',
    overdue: false,
    checklist: '',
    comments: 1,
    who: { i: 'P', n: 'Priya Nair', c: 'var(--at-warning)' },
  },
  {
    id: 7,
    key: 'APP-101',
    col: 'review',
    title: 'Profile settings redesign',
    labels: [{ t: 'Design', c: 'var(--at-lime)' }],
    due: 'Jun 27',
    overdue: false,
    checklist: '4/4',
    comments: 3,
    who: { i: 'L', n: 'Lena Brandt', c: 'var(--at-lime)' },
  },
  {
    id: 8,
    key: 'APP-106',
    col: 'review',
    title: 'Reduce bundle size below 4 MB',
    labels: [{ t: 'Perf', c: 'var(--at-warning)' }],
    due: '',
    overdue: false,
    checklist: '',
    comments: 5,
    who: { i: 'D', n: 'Daniel Cho', c: 'var(--at-success)' },
  },
  {
    id: 9,
    key: 'APP-094',
    col: 'done',
    title: 'Replace deprecated map SDK',
    labels: [{ t: 'Tech debt', c: 'var(--at-on-surface-muted)' }],
    due: '',
    overdue: false,
    checklist: '',
    comments: 0,
    who: { i: 'T', n: 'Tom Reyes', c: 'var(--at-tertiary)' },
  },
  {
    id: 10,
    key: 'APP-097',
    col: 'done',
    title: 'Localize strings for FR & DE',
    labels: [{ t: 'i18n', c: 'var(--at-info)' }],
    due: '',
    overdue: false,
    checklist: '6/6',
    comments: 2,
    who: { i: 'P', n: 'Priya Nair', c: 'var(--at-warning)' },
  },
  {
    id: 11,
    key: 'APP-099',
    col: 'done',
    title: 'Fix flaky checkout E2E test',
    labels: [{ t: 'Bug', c: 'var(--at-danger)' }],
    due: '',
    overdue: false,
    checklist: '',
    comments: 1,
    who: { i: 'M', n: 'Maya Okonkwo', c: 'var(--at-info)' },
  },
];

const COL_HEADER_STYLE = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2px 2px var(--at-space-3)',
  alignItems: 'center',
} as const;

const CARD_TITLE_STYLE = {
  color: 'var(--at-text-strong)',
  fontSize: 'var(--at-text-sm)',
  fontWeight: 500,
  lineHeight: 1.4,
  margin: 0,
} as const;

const CARD_FOOTER_STYLE = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 'var(--at-space-2)',
  alignItems: 'center',
} as const;

export default function Kanban(): React.JSX.Element {
  const [q, setQ] = useState('');
  const [items, setItems] = useState<Card[]>(SEED_ITEMS);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);

  // cards(): items in a column, narrowed by the search query
  const cards = useMemo(
    () => (colId: string): Card[] => {
      const t = q.trim().toLowerCase();
      return items.filter(
        (c) =>
          c.col === colId &&
          (!t || c.title.toLowerCase().includes(t) || c.key.toLowerCase().includes(t)),
      );
    },
    [items, q],
  );

  const dragStart = (id: number): void => setDraggingId(id);

  const dragEnd = (): void => {
    setDraggingId(null);
    setDragOverCol(null);
  };

  // HTML5 DnD: on drop, move the dragged card into the target column.
  const drop = (colId: string): void => {
    if (draggingId !== null) {
      setItems((prev) =>
        prev.map((c) => (c.id === draggingId ? { ...c, col: colId } : c)),
      );
    }
    dragEnd();
  };

  const openNew = (colId: string): void => {
    const n: Card = {
      id: Date.now(),
      key: 'NEW',
      col: colId,
      title: 'New card',
      labels: [],
      due: '',
      overdue: false,
      checklist: '',
      comments: 0,
      who: { i: '?', n: 'Unassigned', c: 'var(--at-on-surface-muted)' },
    };
    setItems((prev) => [n, ...prev]);
  };

  return (
    <>
      {/* toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 'var(--at-space-3)',
          marginBlockEnd: 'var(--at-space-5)',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <input
          className="at-input"
          type="search"
          placeholder="Search cards…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ flex: '1 1 240px', maxWidth: 340 }}
          aria-label="Search cards"
        />
        <div className="at-cluster">
          <div className="at-segment">
            <button className="at-segment__btn is-active">Board</button>
            <button className="at-segment__btn">List</button>
          </div>
          <button className="at-btn at-btn--outline at-press">Filter</button>
          <button className="at-btn at-btn--primary at-press" onClick={() => openNew('todo')}>
            Add card
          </button>
        </div>
      </div>

      {/* board */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--at-space-4)',
          overflowX: 'auto',
          paddingBlockEnd: 'var(--at-space-3)',
          alignItems: 'stretch',
          flex: '1 1 auto',
          minHeight: 0,
        }}
      >
        {COLUMNS.map((col) => {
          const colCards = cards(col.id);
          return (
            <section
              key={col.id}
              className={`at-kb-col${dragOverCol === col.id ? ' is-over' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverCol(col.id);
              }}
              onDragLeave={() => {
                if (dragOverCol === col.id) setDragOverCol(null);
              }}
              onDrop={() => drop(col.id)}
              role="region"
              aria-label={`${col.title} column`}
            >
              {/* column header */}
              <div style={COL_HEADER_STYLE}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--at-space-2)' }}>
                  <i
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 3,
                      background: col.color,
                      display: 'inline-block',
                    }}
                  />
                  <b style={{ color: 'var(--at-text-strong)', fontSize: 'var(--at-text-sm)' }}>{col.title}</b>
                  <span className="at-badge at-badge--flat">{colCards.length}</span>
                  {col.wip > 0 && (
                    <span
                      className={`at-badge ${colCards.length >= col.wip ? 'at-badge--danger' : 'at-badge--warning'}`}
                      title={`Work-in-progress limit ${col.wip}`}
                    >
                      {`WIP ${colCards.length}/${col.wip}`}
                    </span>
                  )}
                </div>
                <button
                  className="at-btn at-btn--ghost at-btn--icon at-btn--sm at-press"
                  aria-label={`Add card to ${col.title}`}
                  onClick={() => openNew(col.id)}
                >
                  +
                </button>
              </div>

              {/* cards */}
              <div className="at-kb-col__body">
                {colCards.map((card) => (
                  <article
                    key={card.id}
                    className={`at-kb-card${draggingId === card.id ? ' is-ghost' : ''}`}
                    draggable
                    onDragStart={() => dragStart(card.id)}
                    onDragEnd={dragEnd}
                    tabIndex={0}
                    role="button"
                    aria-label={card.title}
                  >
                    {card.cover && (
                      <span
                        className="at-kb-card__cover"
                        style={{ background: card.cover }}
                        aria-hidden="true"
                      />
                    )}
                    {card.labels.length > 0 && (
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {card.labels.map((lb) => (
                          <span
                            key={lb.t}
                            className="at-badge at-badge--flat"
                            style={{
                              color: `oklch(from ${lb.c} var(--at-fg-l) c h)`,
                              background: `color-mix(in oklab, ${lb.c} 16%, transparent)`,
                            }}
                          >
                            {lb.t}
                          </span>
                        ))}
                      </div>
                    )}
                    <p style={CARD_TITLE_STYLE}>{card.title}</p>
                    <div style={CARD_FOOTER_STYLE}>
                      <div style={{ display: 'flex', gap: 'var(--at-space-3)', fontSize: 'var(--at-text-xs)' }}>
                        {card.due && (
                          <span
                            style={
                              card.overdue
                                ? { color: 'var(--at-danger-text)' }
                                : { color: 'var(--at-on-surface-muted)' }
                            }
                          >
                            {card.due}
                          </span>
                        )}
                        {card.checklist && (
                          <span style={{ color: 'var(--at-on-surface-muted)' }}>{card.checklist}</span>
                        )}
                        {card.comments > 0 && (
                          <span style={{ color: 'var(--at-on-surface-muted)' }}>{`💬 ${card.comments}`}</span>
                        )}
                      </div>
                      <span
                        className="at-avatar at-avatar--xs"
                        style={{
                          background: `color-mix(in oklab, ${card.who.c} 22%, transparent)`,
                          color: card.who.c,
                          fontWeight: 600,
                          fontSize: 'var(--at-text-xs)',
                        }}
                        title={card.who.n}
                      >
                        {card.who.i}
                      </span>
                    </div>
                  </article>
                ))}

                <button type="button" className="at-kb-add at-press" onClick={() => openNew(col.id)}>
                  + Add card
                </button>
              </div>
            </section>
          );
        })}

        <button type="button" className="at-kb-addcol at-press">+ Add column</button>
      </div>

      <style>{`
        [data-at-route='apps/kanban'] .at-kb-col {
          flex: 0 0 300px;
          width: 300px;
          display: flex;
          flex-direction: column;
          background: var(--at-canvas);
          border: 1px solid var(--at-ink);
          border-radius: var(--at-radius-md);
          padding: var(--at-space-3);
          transition:
            background 0.12s ease,
            box-shadow 0.12s ease;
        }
        [data-at-route='apps/kanban'] .at-kb-col.is-over {
          background: var(--at-accent-wash);
          box-shadow: inset 0 0 0 2px var(--at-accent);
        }
        [data-at-route='apps/kanban'] .at-kb-col__body {
          display: flex;
          flex-direction: column;
          gap: var(--at-space-3);
          min-height: 40px;
          flex: 1 1 auto;
        }
        [data-at-route='apps/kanban'] .at-kb-card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: var(--at-space-2);
          padding: var(--at-space-3);
          background: var(--at-paper);
          border: 1px solid var(--at-ink);
          border-radius: var(--at-radius-sm);
          cursor: grab;
          text-align: left;
          overflow: hidden;
          transition:
            box-shadow 0.12s ease,
            transform 0.12s ease;
        }
        [data-at-route='apps/kanban'] .at-kb-card:hover {
          box-shadow: 0 4px 12px color-mix(in oklab, var(--at-ink) 12%, transparent);
        }
        [data-at-route='apps/kanban'] .at-kb-card:active {
          cursor: grabbing;
        }
        [data-at-route='apps/kanban'] .at-kb-card.is-ghost {
          opacity: 0.4;
        }
        [data-at-route='apps/kanban'] .at-kb-card__cover {
          display: block;
          height: 6px;
          margin: calc(var(--at-space-3) * -1) calc(var(--at-space-3) * -1) 0;
        }
        [data-at-route='apps/kanban'] .at-kb-add {
          display: inline-flex;
          align-items: center;
          gap: var(--at-space-2);
          width: 100%;
          margin-top: auto;
          padding: var(--at-space-2) var(--at-space-3);
          font-size: var(--at-text-sm);
          color: var(--at-on-surface-muted);
          background: transparent;
          border: 1px dashed var(--at-ink);
          border-radius: var(--at-radius-sm);
          cursor: pointer;
        }
        [data-at-route='apps/kanban'] .at-kb-add:hover {
          color: var(--at-accent-text);
          background: var(--at-accent-wash);
        }
        [data-at-route='apps/kanban'] .at-kb-addcol {
          flex: 0 0 220px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--at-space-2);
          align-self: stretch;
          min-height: 120px;
          font-size: var(--at-text-sm);
          color: var(--at-on-surface-muted);
          background: var(--at-canvas);
          border: 1px dashed var(--at-ink);
          border-radius: var(--at-radius-md);
          cursor: pointer;
        }
        [data-at-route='apps/kanban'] .at-kb-addcol:hover {
          color: var(--at-accent-text);
          background: var(--at-accent-wash);
        }
      `}</style>
    </>
  );
}
