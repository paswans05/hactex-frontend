/*
 * Hactex React — Calendar app (fullscreen, no sidebar).
 * Built with the shared component classes, inline
 * token styles, and demo data. Renders inside <AppShell> (appbar + main);
 * no <PageHead>. The inline `x-data="{ view: 'month' }"` → React hooks.
 *
 * The month grid is computed from currentMonth/currentYear (Mon-start week)
 * with JS Date; June 2026 carries the seed events verbatim from the
 * reference, and "today" is anchored to the 27th of that month.
 *
 * Page-scoped <style> (the .at-cal-* rules from the reference) is rendered
 * inline so the [data-at-route='apps/calendar'] selectors apply once mounted.
 */
import { useMemo, useState } from 'react';

type View = 'month' | 'week' | 'day' | 'list';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface CalEvent {
  /** day-of-month (1–31) within the seeded June 2026 month */
  day: number;
  time?: string;
  label: string;
  /** CSS token / color string for the --c swatch */
  c: string;
}

// Seed events for June 2026 — verbatim from the reference month grid. Each
// entry carries the original time + label + color token.
const SEED_YEAR = 2026;
const SEED_MONTH = 5; // June (0-based)
const TODAY_DAY = 27;
const EVENTS: CalEvent[] = [
  { day: 1, time: '09:30', label: 'Standup', c: 'var(--at-accent)' },
  { day: 2, time: '14:30', label: 'Critique', c: 'var(--at-tertiary)' },
  { day: 4, time: '11:00', label: '1:1 Maya', c: 'var(--at-info)' },
  { day: 4, time: '16:00', label: 'Release', c: 'var(--at-accent)' },
  { day: 6, label: 'Cabin trip', c: 'var(--at-warning)' },
  { day: 9, time: '10:00', label: 'Roadmap', c: 'var(--at-accent)' },
  { day: 11, time: '13:00', label: 'Workshop', c: 'var(--at-tertiary)' },
  { day: 12, time: '15:00', label: 'All-hands', c: 'var(--at-accent)' },
  { day: 16, time: '09:00', label: 'Checkup', c: 'var(--at-info)' },
  { day: 18, time: '11:00', label: 'QA sign-off', c: 'var(--at-accent)' },
  { day: 18, time: '14:00', label: 'Icons', c: 'var(--at-tertiary)' },
  { day: 21, label: "Father's Day", c: 'var(--at-warning)' },
  { day: 23, time: '10:30', label: 'Northwind', c: 'var(--at-accent)' },
  { day: 25, time: '15:30', label: 'Portfolio', c: 'var(--at-tertiary)' },
  { day: 27, time: '10:00', label: 'Sprint planning', c: 'var(--at-accent)' },
  { day: 27, time: '14:30', label: 'Critique', c: 'var(--at-tertiary)' },
  { day: 28, time: '09:00', label: 'Dentist', c: 'var(--at-info)' },
  { day: 30, time: '16:00', label: 'Month-end', c: 'var(--at-accent)' },
];

// how many events each cell shows before collapsing to "+N more" (matches the
// reference: day 18 shows two events then "+2 more", i.e. a 2-item cap).
const CELL_EVENT_CAP = 2;
// extra hidden-event counts per day (only day 18 in the seed has this).
const CELL_MORE: Record<number, number> = { 18: 2 };

interface GridCell {
  day: number;
  muted: boolean; // belongs to prev/next month
}

function buildGrid(year: number, month: number): GridCell[] {
  // Mon-start weeks. JS: 0=Sun..6=Sat → convert so Mon=0.
  const first = new Date(year, month, 1);
  const jsDow = first.getDay(); // 0=Sun
  const leading = (jsDow + 6) % 7; // count of prev-month days before the 1st
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells: GridCell[] = [];
  // leading: tail of previous month
  for (let i = leading - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, muted: true });
  }
  // current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, muted: false });
  }
  // trailing: pad to a whole number of weeks
  let next = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: next++, muted: true });
  }
  return cells;
}

export default function Calendar(): React.JSX.Element {
  const [view, setView] = useState<View>('month');
  const [year, setYear] = useState(SEED_YEAR);
  const [month, setMonth] = useState(SEED_MONTH);

  const isSeedMonth = year === SEED_YEAR && month === SEED_MONTH;
  const grid = useMemo(() => buildGrid(year, month), [year, month]);

  const prevPeriod = (): void => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };
  const nextPeriod = (): void => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };
  const goToday = (): void => {
    setYear(SEED_YEAR);
    setMonth(SEED_MONTH);
  };

  const label = `${MONTH_NAMES[month]} ${year}`;

  return (
    <>
      <style>{`
[data-at-route='apps/calendar'] .at-cal-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
  text-align: left;
  min-height: 104px;
  padding: var(--at-space-2);
  border-inline-end: 1px solid var(--at-ink);
  border-block-start: 1px solid var(--at-ink);
}
[data-at-route='apps/calendar'] .at-cal-cell:nth-child(7n) {
  border-inline-end: 0;
}
[data-at-route='apps/calendar'] .at-cal-cell--today {
  background: var(--at-accent-wash);
}
[data-at-route='apps/calendar'] .at-cal-cell__n {
  align-self: flex-start;
  font-size: var(--at-text-xs);
  color: var(--at-text-strong);
  padding: 1px 2px;
}
[data-at-route='apps/calendar'] .at-cal-cell__n--muted {
  color: var(--at-on-surface-muted);
}
[data-at-route='apps/calendar'] .at-cal-cell__n--today {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  border-radius: 999px;
  background: var(--at-accent);
  color: var(--at-on-accent);
  font-weight: 600;
}
[data-at-route='apps/calendar'] .at-cal-event {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 2px 7px;
  font-size: var(--at-text-xs);
  color: var(--at-text-strong);
  border-radius: var(--at-radius-xs);
  background: color-mix(in oklab, var(--c) 16%, transparent);
  border-inline-start: 3px solid var(--c);
}
[data-at-route='apps/calendar'] .at-cal-event b {
  font-weight: 600;
  color: oklch(from var(--c) var(--at-fg-l) c h);
  margin-inline-end: 3px;
}
/* A month grid whose days and events do not answer the cursor reads as
   a printed page rather than a calendar. Both get the hover the rest of
   the template gives a row; the day cell takes the standard wash, the
   event deepens its own color-mix so a chip stays tied to its category
   color instead of going gray.

   --today is excluded for the same reason .is-active is on a list row:
   it is already washed in accent, and washing it again loses the mark.

   (hover: hover) — without it a tap on a touch device leaves the day
   stuck in the hover wash, reading as today. */
@media (hover: hover) {
  [data-at-route='apps/calendar'] .at-cal-cell:not(.at-cal-cell--today):hover {
    background: var(--at-fill-hover);
  }
  [data-at-route='apps/calendar'] .at-cal-event:hover {
    background: color-mix(in oklab, var(--c) 28%, transparent);
  }
}
[data-at-route='apps/calendar'] .at-cal-more {
  font-size: var(--at-text-xs);
  color: var(--at-on-surface-muted);
  padding: 1px 7px;
  font-weight: 500;
}
@media (max-width: 768px) {
  [data-at-route='apps/calendar'] .at-cal-cell {
    min-height: 74px;
  }
}
`}</style>

      <div className="at-row" style={{ gap: 'var(--at-space-4)', alignItems: 'stretch' }}>
        {/* ───── SIDE RAIL ───── */}
        <div className="at-col-3 at-card" style={{ padding: 'var(--at-space-5)' }}>
          <button className="at-btn at-btn--primary at-btn--block at-press">Create event</button>

          {/* mini-month */}
          <div style={{ marginBlockStart: 'var(--at-space-5)' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBlockEnd: 'var(--at-space-3)',
              }}
            >
              <b style={{ color: 'var(--at-text-strong)', fontSize: 'var(--at-text-sm)' }}>{label}</b>
              <span style={{ display: 'flex', gap: '2px' }}>
                <button
                  className="at-btn at-btn--ghost at-btn--icon at-press"
                  aria-label="Previous month"
                  onClick={prevPeriod}
                >
                  ‹
                </button>
                <button
                  className="at-btn at-btn--ghost at-btn--icon at-press"
                  aria-label="Next month"
                  onClick={nextPeriod}
                >
                  ›
                </button>
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '2px',
                textAlign: 'center',
              }}
            >
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <small
                  key={`h${i}`}
                  style={{
                    color: 'var(--at-on-surface-muted)',
                    fontSize: 'var(--at-text-xs)',
                    fontWeight: 600,
                    padding: '4px 0',
                  }}
                >
                  {d}
                </small>
              ))}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '2px',
                textAlign: 'center',
                marginBlockStart: '2px',
              }}
            >
              {grid.map((c, i) => {
                const isToday = isSeedMonth && !c.muted && c.day === TODAY_DAY;
                const dot = isSeedMonth && !c.muted && EVENTS.some((e) => e.day === c.day);
                return (
                  <span
                    key={`m${i}`}
                    style={
                      isToday
                        ? {
                          fontSize: 'var(--at-text-xs)',
                          padding: '5px 0',
                          borderRadius: 'var(--at-radius-xs)',
                          background: 'var(--at-accent)',
                          color: 'var(--at-on-accent)',
                          fontWeight: 600,
                        }
                        : {
                          fontSize: 'var(--at-text-xs)',
                          padding: '5px 0',
                          borderRadius: 'var(--at-radius-xs)',
                          color: c.muted
                            ? 'var(--at-on-surface-muted)'
                            : dot
                              ? 'var(--at-accent)'
                              : 'var(--at-ink)',
                          fontWeight: dot ? 600 : undefined,
                        }
                    }
                  >
                    {c.day}
                  </span>
                );
              })}
            </div>
          </div>

          <hr
            style={{
              margin: 'var(--at-space-5) 0',
              border: 0,
              borderBlockStart: '1px solid var(--at-ink)',
            }}
          />

          {/* my calendars */}
          <div className="at-eyebrow" style={{ marginBlockEnd: 'var(--at-space-3)' }}>My calendars</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--at-space-2)' }}>
            <label
              className="at-check"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--at-space-2)',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--at-space-2)',
                  fontSize: 'var(--at-text-sm)',
                }}
              >
                <input type="checkbox" defaultChecked />
                <i
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '3px',
                    background: 'var(--at-accent)',
                    display: 'inline-block',
                  }}
                />
                Work
              </span>
              <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>12</span>
            </label>
            <label
              className="at-check"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--at-space-2)',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--at-space-2)',
                  fontSize: 'var(--at-text-sm)',
                }}
              >
                <input type="checkbox" defaultChecked />
                <i
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '3px',
                    background: 'var(--at-info)',
                    display: 'inline-block',
                  }}
                />
                Personal
              </span>
              <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>5</span>
            </label>
            <label
              className="at-check"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--at-space-2)',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--at-space-2)',
                  fontSize: 'var(--at-text-sm)',
                }}
              >
                <input type="checkbox" defaultChecked />
                <i
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '3px',
                    background: 'var(--at-tertiary)',
                    display: 'inline-block',
                  }}
                />
                Design team
              </span>
              <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>8</span>
            </label>
            <label
              className="at-check"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--at-space-2)',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--at-space-2)',
                  fontSize: 'var(--at-text-sm)',
                }}
              >
                <input type="checkbox" />
                <i
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '3px',
                    background: 'var(--at-warning)',
                    display: 'inline-block',
                  }}
                />
                Holidays
              </span>
              <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>3</span>
            </label>
          </div>

          <hr
            style={{
              margin: 'var(--at-space-5) 0',
              border: 0,
              borderBlockStart: '1px solid var(--at-ink)',
            }}
          />

          {/* upcoming */}
          <div className="at-eyebrow" style={{ marginBlockEnd: 'var(--at-space-3)' }}>Upcoming</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--at-space-3)' }}>
            <div style={{ display: 'flex', gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
              <span
                style={{
                  width: '3px',
                  alignSelf: 'stretch',
                  borderRadius: '2px',
                  background: 'var(--at-accent)',
                  flex: '0 0 auto',
                }}
              />
              <div style={{ minWidth: 0, flex: '1 1 auto' }}>
                <div style={{ fontWeight: 500, color: 'var(--at-text-strong)', fontSize: 'var(--at-text-sm)' }}>
                  Sprint planning
                </div>
                <div style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                  Today · 10:00 AM
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
              <span
                style={{
                  width: '3px',
                  alignSelf: 'stretch',
                  borderRadius: '2px',
                  background: 'var(--at-tertiary)',
                  flex: '0 0 auto',
                }}
              />
              <div style={{ minWidth: 0, flex: '1 1 auto' }}>
                <div style={{ fontWeight: 500, color: 'var(--at-text-strong)', fontSize: 'var(--at-text-sm)' }}>
                  Design critique
                </div>
                <div style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                  Today · 2:30 PM
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--at-space-3)', alignItems: 'flex-start' }}>
              <span
                style={{
                  width: '3px',
                  alignSelf: 'stretch',
                  borderRadius: '2px',
                  background: 'var(--at-info)',
                  flex: '0 0 auto',
                }}
              />
              <div style={{ minWidth: 0, flex: '1 1 auto' }}>
                <div style={{ fontWeight: 500, color: 'var(--at-text-strong)', fontSize: 'var(--at-text-sm)' }}>
                  Dentist appointment
                </div>
                <div style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-on-surface-muted)' }}>
                  Tomorrow · 9:00 AM
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ───── CALENDAR CANVAS ───── */}
        <div className="at-col-9 at-card" style={{ overflow: 'hidden' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--at-space-3)' }}>
              <span style={{ display: 'flex', gap: '2px' }}>
                <button
                  className="at-btn at-btn--ghost at-btn--icon at-press"
                  aria-label="Previous period"
                  onClick={prevPeriod}
                >
                  ‹
                </button>
                <button className="at-btn at-btn--outline at-btn--sm at-press" onClick={goToday}>
                  Today
                </button>
                <button
                  className="at-btn at-btn--ghost at-btn--icon at-press"
                  aria-label="Next period"
                  onClick={nextPeriod}
                >
                  ›
                </button>
              </span>
              <h2
                className="at-chart__title"
                style={{ margin: 0, color: 'var(--at-text-strong)', fontSize: 'var(--at-text-lg)' }}
              >
                {label}
              </h2>
            </div>
            <div className="at-segment">
              <button
                className={`at-segment__btn${view === 'month' ? ' is-active' : ''}`}
                onClick={() => setView('month')}
              >
                Month
              </button>
              <button
                className={`at-segment__btn${view === 'week' ? ' is-active' : ''}`}
                onClick={() => setView('week')}
              >
                Week
              </button>
              <button
                className={`at-segment__btn${view === 'day' ? ' is-active' : ''}`}
                onClick={() => setView('day')}
              >
                Day
              </button>
              <button
                className={`at-segment__btn${view === 'list' ? ' is-active' : ''}`}
                onClick={() => setView('list')}
              >
                List
              </button>
            </div>
          </div>

          {/* MONTH GRID */}
          {view === 'month' && (
            <div style={{ padding: 'var(--at-space-5)' }}>
              {/* weekday header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                  border: '1px solid var(--at-ink)',
                  borderRadius: 'var(--at-radius-md) var(--at-radius-md) 0 0',
                  overflow: 'hidden',
                }}
              >
                {WEEKDAYS.map((d, i) => (
                  <div
                    key={`wd-${d}-${i}`}
                    style={{
                      padding: 'var(--at-space-2) var(--at-space-3)',
                      fontSize: 'var(--at-text-xs)',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: 'var(--at-on-surface-muted)',
                      textAlign: 'center',
                      borderInlineEnd: i < 6 ? '1px solid var(--at-ink)' : undefined,
                      background: 'var(--at-canvas)',
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>
              {/* weeks */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                  borderInline: '1px solid var(--at-ink)',
                  borderBlockEnd: '1px solid var(--at-ink)',
                  borderRadius: '0 0 var(--at-radius-md) var(--at-radius-md)',
                  overflow: 'hidden',
                }}
              >
                {grid.map((c, i) => {
                  const isToday = isSeedMonth && !c.muted && c.day === TODAY_DAY;
                  const dayEvents = isSeedMonth && !c.muted
                    ? EVENTS.filter((e) => e.day === c.day)
                    : [];
                  const more = isSeedMonth && !c.muted ? CELL_MORE[c.day] ?? 0 : 0;
                  return (
                    <div
                      key={`c-${i}`}
                      className={`at-cal-cell${isToday ? ' at-cal-cell--today' : ''}`}
                    >
                      <span
                        className={`at-cal-cell__n${c.muted ? ' at-cal-cell__n--muted' : ''}${isToday ? ' at-cal-cell__n--today' : ''
                          }`}
                      >
                        {c.day}
                      </span>
                      {dayEvents.slice(0, CELL_EVENT_CAP).map((e, ei) => (
                        <span
                          key={`${c.day}-${ei}`}
                          className="at-cal-event"
                          style={{ ['--c' as string]: e.c }}
                        >
                          {e.time ? <b>{e.time}</b> : null}
                          {e.label}
                        </span>
                      ))}
                      {more > 0 && <span className="at-cal-more">+{more} more</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LIST / WEEK / DAY fallback */}
          {view !== 'month' && (
            <div style={{ padding: 'var(--at-space-5)' }}>
              <div className="at-list">
                <div className="at-list__item">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--at-space-2)' }}>
                    <i
                      style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '3px',
                        background: 'var(--at-accent)',
                        display: 'inline-block',
                      }}
                    />
                    <span>
                      <span className="at-text-strong">Sprint planning</span>
                      <span
                        style={{
                          display: 'block',
                          fontSize: 'var(--at-text-xs)',
                          color: 'var(--at-on-surface-muted)',
                        }}
                      >
                        Work · Conference room B
                      </span>
                    </span>
                  </span>
                  <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-text-strong)' }}>
                    Today · 10:00 AM
                  </span>
                </div>
                <div className="at-list__item">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--at-space-2)' }}>
                    <i
                      style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '3px',
                        background: 'var(--at-tertiary)',
                        display: 'inline-block',
                      }}
                    />
                    <span>
                      <span className="at-text-strong">Design critique</span>
                      <span
                        style={{
                          display: 'block',
                          fontSize: 'var(--at-text-xs)',
                          color: 'var(--at-on-surface-muted)',
                        }}
                      >
                        Design team · Figjam
                      </span>
                    </span>
                  </span>
                  <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-text-strong)' }}>
                    Today · 2:30 PM
                  </span>
                </div>
                <div className="at-list__item">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--at-space-2)' }}>
                    <i
                      style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '3px',
                        background: 'var(--at-info)',
                        display: 'inline-block',
                      }}
                    />
                    <span>
                      <span className="at-text-strong">Dentist appointment</span>
                      <span
                        style={{
                          display: 'block',
                          fontSize: 'var(--at-text-xs)',
                          color: 'var(--at-on-surface-muted)',
                        }}
                      >
                        Personal · Bright Smile Clinic
                      </span>
                    </span>
                  </span>
                  <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-text-strong)' }}>
                    Tomorrow · 9:00 AM
                  </span>
                </div>
                <div className="at-list__item">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--at-space-2)' }}>
                    <i
                      style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '3px',
                        background: 'var(--at-accent)',
                        display: 'inline-block',
                      }}
                    />
                    <span>
                      <span className="at-text-strong">Month-end review</span>
                      <span
                        style={{
                          display: 'block',
                          fontSize: 'var(--at-text-xs)',
                          color: 'var(--at-on-surface-muted)',
                        }}
                      >
                        Work · Zoom
                      </span>
                    </span>
                  </span>
                  <span style={{ fontSize: 'var(--at-text-xs)', color: 'var(--at-text-strong)' }}>
                    Jun 30 · 4:00 PM
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
