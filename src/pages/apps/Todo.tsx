/*
 * Hactex React — Todo app (fullscreen, no sidebar).
 * A smart-views rail + filtered task list.
 * Renders inside <AppShell> (appbar + .at-app-main); no <PageHead>.
 */
import { useMemo, useState } from 'react';

type ViewId = 'today' | 'upcoming' | 'important' | 'completed' | string;

interface View {
  id: ViewId;
  label: string;
  color: string;
  glyph: string;
}

interface TodoList {
  id: string;
  label: string;
  color: string;
}

interface Task {
  id: number;
  title: string;
  list: string;
  done: boolean;
  important: boolean;
  due: string;
  today?: boolean;
  overdue?: boolean;
  subtasks: string;
}

const VIEWS: View[] = [
  { id: 'today', label: 'Today', color: 'var(--at-accent-text)', glyph: '◉' },
  { id: 'upcoming', label: 'Upcoming', color: 'var(--at-info-text)', glyph: 'calendar' },
  { id: 'important', label: 'Important', color: 'var(--at-warning-text)', glyph: '★' },
  { id: 'completed', label: 'Completed', color: 'var(--at-success-text)', glyph: '✓' },
];

const LISTS: TodoList[] = [
  { id: 'work', label: 'Work', color: 'var(--at-tertiary-text)' },
  { id: 'personal', label: 'Personal', color: 'var(--at-info-text)' },
  { id: 'shopping', label: 'Shopping', color: 'var(--at-lime-text)' },
];

const SEED_ITEMS: Task[] = [
  { id: 1, title: 'Reply to investor update thread', list: 'work', done: false, important: true, due: 'Today', today: true, subtasks: '' },
  { id: 2, title: 'Finalize Q3 OKRs draft', list: 'work', done: false, important: false, due: 'Today', today: true, subtasks: '1/3' },
  { id: 3, title: 'Book flights for the offsite', list: 'personal', done: false, important: false, due: 'Jun 26', overdue: true, subtasks: '' },
  { id: 4, title: 'Renew gym membership', list: 'personal', done: false, important: false, due: 'Jul 1', subtasks: '' },
  { id: 5, title: 'Pick up dry cleaning', list: 'shopping', done: true, important: false, due: '', subtasks: '' },
  { id: 6, title: 'Buy oat milk and coffee beans', list: 'shopping', done: false, important: false, due: 'Today', today: true, subtasks: '' },
  { id: 7, title: 'Review pull request #482', list: 'work', done: false, important: true, due: 'Jun 28', subtasks: '' },
  { id: 8, title: 'Schedule dentist appointment', list: 'personal', done: true, important: false, due: '', subtasks: '' },
  { id: 9, title: 'Outline blog post on Aurora design', list: 'work', done: false, important: false, due: 'Jul 4', subtasks: '0/4' },
];

const RAIL_HR_STYLE = {
  margin: 'var(--at-space-4) 0',
  border: 0,
  borderBlockStart: '1px solid var(--at-ink)',
} as const;

const RAIL_BTN_STYLE = { width: '100%', textAlign: 'start' } as const;

const GLYPH_STYLE = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--at-space-2)',
  fontSize: 'var(--at-text-sm)',
} as const;

const COUNT_STYLE = {
  fontSize: 'var(--at-text-xs)',
  color: 'var(--at-on-surface-muted)',
} as const;

/** Does a task belong to the given view? (mirrors atTodo().inView) */
function inView(t: Task, view: ViewId): boolean {
  if (view === 'today') return t.today || !!t.overdue;
  if (view === 'upcoming') return !t.today && !t.overdue && !t.done && !!t.due;
  if (view === 'important') return t.important;
  if (view === 'completed') return t.done;
  return t.list === view;
}

export default function Todo(): React.JSX.Element {
  const [view, setView] = useState<ViewId>('today');
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');
  const [draft, setDraft] = useState('');
  const [tasks, setTasks] = useState<Task[]>(SEED_ITEMS);
  const [nextId, setNextId] = useState(100);

  // list label/color helpers
  const listLabel = (id: string): string => LISTS.find((l) => l.id === id)?.label ?? id;
  const listColor = (id: string): string => LISTS.find((l) => l.id === id)?.color ?? 'var(--at-on-surface-muted)';

  const viewLabel = useMemo<string>(() => {
    const v = VIEWS.find((x) => x.id === view) ?? LISTS.find((x) => x.id === view);
    return v ? v.label : '';
  }, [view]);

  // shown(): tasks in the active view, narrowed by the active/done filter
  const shown = useMemo<Task[]>(
    () =>
      tasks.filter(
        (t) => inView(t, view) && (filter === 'all' || (filter === 'done' ? t.done : !t.done)),
      ),
    [tasks, view, filter],
  );

  const countFor = useMemo(
    () => (id: ViewId): number => {
      if (id === 'today') return tasks.filter((t) => (t.today || !!t.overdue) && !t.done).length;
      if (id === 'upcoming') return tasks.filter((t) => !t.today && !t.overdue && !t.done && t.due).length;
      if (id === 'important') return tasks.filter((t) => t.important && !t.done).length;
      if (id === 'completed') return tasks.filter((t) => t.done).length;
      return tasks.filter((t) => t.list === id && !t.done).length;
    },
    [tasks],
  );

  const activeInView = useMemo(
    () => tasks.filter((t) => inView(t, view) && !t.done).length,
    [tasks, view],
  );

  const pct = useMemo((): number => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.done).length;
    return total ? Math.round((done / total) * 100) : 0;
  }, [tasks]);

  const add = (): void => {
    const v = draft.trim();
    if (!v) return;
    const list = LISTS.some((l) => l.id === view) ? view : 'work';
    const task: Task = {
      id: nextId,
      title: v,
      list,
      done: false,
      important: view === 'important',
      due: view === 'today' ? 'Today' : '',
      today: view === 'today',
      subtasks: '',
    };
    setTasks((prev) => [task, ...prev]);
    setNextId((n) => n + 1);
    setDraft('');
  };

  const toggleDone = (id: number): void =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const toggleImportant = (id: number): void =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, important: !t.important } : t)));

  const remove = (id: number): void => setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <>
      <div className="at-row" style={{ gap: 'var(--at-space-4)', alignItems: 'stretch' }}>
        {/* ───── RAIL ───── */}
        <div className="at-col-3 at-card" style={{ padding: 'var(--at-space-5)' }}>
          {/* smart views */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                className={`at-todo-rail${view === v.id ? ' is-active' : ''}`}
                onClick={() => setView(v.id)}
                style={RAIL_BTN_STYLE}
              >
                <span style={{ ...GLYPH_STYLE, color: `oklch(from ${v.color} var(--at-fg-l) c h)` }}>
                  <span>{v.glyph}</span>
                  <span style={{ color: 'var(--at-text-strong)' }}>{v.label}</span>
                </span>
                <span className="at-num" style={COUNT_STYLE}>
                  {countFor(v.id)}
                </span>
              </button>
            ))}
          </div>

          <hr style={RAIL_HR_STYLE} />

          {/* user lists */}
          <div className="at-eyebrow" style={{ marginBlockEnd: 'var(--at-space-2)' }}>My lists</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {LISTS.map((l) => (
              <button
                key={l.id}
                type="button"
                className={`at-todo-rail${view === l.id ? ' is-active' : ''}`}
                onClick={() => setView(l.id)}
                style={RAIL_BTN_STYLE}
              >
                <span style={GLYPH_STYLE}>
                  <i
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 3,
                      background: l.color,
                      display: 'inline-block',
                    }}
                  />
                  <span>{l.label}</span>
                </span>
                <span className="at-num" style={COUNT_STYLE}>
                  {countFor(l.id)}
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
            + New list
          </button>

          <hr style={RAIL_HR_STYLE} />

          {/* progress */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBlockEnd: 6,
              alignItems: 'center',
            }}
          >
            <small style={{ fontSize: 'var(--at-text-sm)', color: 'var(--at-text-strong)' }}>Today&apos;s progress</small>
            <b className="at-num" style={{ fontSize: 'var(--at-text-sm)', color: 'var(--at-text-strong)' }}>
              {pct}%
            </b>
          </div>
          <div className="at-progress">
            <div className="at-progress__bar" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* ───── MAIN ───── */}
        <div className="at-col-9 at-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 'var(--at-space-3)',
              padding: 'var(--at-space-4) var(--at-space-5)',
              borderBlockEnd: '1px solid var(--at-ink)',
            }}
          >
            <div>
              <h2 style={{ margin: 0, color: 'var(--at-text-strong)', fontSize: 'var(--at-text-lg)' }}>{viewLabel}</h2>
              <p style={{ margin: 'var(--at-space-1) 0 0', fontSize: 'var(--at-text-sm)', color: 'var(--at-on-surface-muted)' }}>
                {activeInView} remaining
              </p>
            </div>
            <div className="at-segment">
              <button className={`at-segment__btn${filter === 'all' ? ' is-active' : ''}`} onClick={() => setFilter('all')}>
                All
              </button>
              <button className={`at-segment__btn${filter === 'active' ? ' is-active' : ''}`} onClick={() => setFilter('active')}>
                Active
              </button>
              <button className={`at-segment__btn${filter === 'done' ? ' is-active' : ''}`} onClick={() => setFilter('done')}>
                Done
              </button>
            </div>
          </div>

          <div style={{ padding: 'var(--at-space-5)', flex: '1 1 auto' }}>
            {/* add input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                add();
              }}
              style={{ marginBlockEnd: 'var(--at-space-4)' }}
            >
              <input
                className="at-input"
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Add a task and press Enter…"
                aria-label="Add a task"
              />
            </form>

            {/* empty state */}
            {shown.length === 0 && (
              <div style={{ textAlign: 'center', padding: 'var(--at-space-8) var(--at-space-4)' }}>
                <p style={{ color: 'var(--at-text-strong)', fontWeight: 500 }}>All clear here</p>
                <p style={{ color: 'var(--at-on-surface-muted)', fontSize: 'var(--at-text-sm)' }}>
                  Add a task above to get started.
                </p>
              </div>
            )}

            {/* list */}
            {shown.length > 0 && (
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
                {shown.map((t) => (
                  <li key={t.id} className="at-todo-row" style={t.done ? { opacity: 0.62 } : undefined}>
                    <label className="at-check" style={{ flex: '0 0 auto' }}>
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => toggleDone(t.id)}
                        aria-label={`Complete ${t.title}`}
                      />
                    </label>
                    <span style={{ minWidth: 0, flex: '1 1 auto' }}>
                      <span
                        style={
                          t.done
                            ? { color: 'var(--at-on-surface-muted)', textDecoration: 'line-through', fontWeight: 400 }
                            : { color: 'var(--at-text-strong)', fontWeight: 500 }
                        }
                      >
                        {t.title}
                      </span>
                      <span
                        style={{
                          display: 'flex',
                          gap: 'var(--at-space-2)',
                          fontSize: 'var(--at-text-xs)',
                          marginTop: 2,
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <i
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: 2,
                              background: listColor(t.list),
                              display: 'inline-block',
                            }}
                          />
                          <span>{listLabel(t.list)}</span>
                        </span>
                        {t.due && (
                          <span
                            style={
                              t.overdue
                                ? { color: 'var(--at-danger-text)' }
                                : t.today
                                  ? { color: 'var(--at-accent-text)' }
                                  : { color: 'var(--at-on-surface-muted)' }
                            }
                          >
                            {t.due}
                          </span>
                        )}
                        {t.subtasks && (
                          <span style={{ color: 'var(--at-on-surface-muted)' }}>☐ {t.subtasks}</span>
                        )}
                      </span>
                    </span>
                    <span style={{ flex: '0 0 auto', display: 'flex', gap: 2 }}>
                      <button
                        type="button"
                        className="at-btn at-btn--ghost at-btn--icon at-btn--sm at-press"
                        style={
                          t.important
                            ? { color: 'var(--at-warning-text)' }
                            : { color: 'var(--at-on-surface-muted)' }
                        }
                        onClick={() => toggleImportant(t.id)}
                        aria-label={t.important ? 'Remove from Important' : 'Mark Important'}
                        aria-pressed={t.important}
                      >
                        ★
                      </button>
                      <button
                        type="button"
                        className="at-btn at-btn--ghost at-btn--icon at-btn--sm at-press"
                        style={{ color: 'var(--at-on-surface-muted)' }}
                        onClick={() => remove(t.id)}
                        aria-label={`Delete ${t.title}`}
                      >
                        ✕
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <style>{`
        [data-at-route='apps/todo'] .at-todo-rail {
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
        [data-at-route='apps/todo'] .at-todo-rail:hover {
          background: var(--at-canvas);
        }
        [data-at-route='apps/todo'] .at-todo-rail.is-active {
          background: var(--at-accent-wash);
        }
        [data-at-route='apps/todo'] .at-todo-row {
          display: flex;
          align-items: center;
          gap: var(--at-space-3);
          padding: var(--at-space-3);
          border-radius: var(--at-radius-sm);
          transition: background 0.12s ease;
        }
        [data-at-route='apps/todo'] .at-todo-row:hover {
          background: var(--at-canvas);
        }
        [data-at-route='apps/todo'] .at-todo-row .at-btn {
          opacity: 0;
        }
        [data-at-route='apps/todo'] .at-todo-row:hover .at-btn,
        [data-at-route='apps/todo'] .at-todo-row .at-btn[aria-pressed='true'] {
          opacity: 1;
        }
      `}</style>
    </>
  );
}
