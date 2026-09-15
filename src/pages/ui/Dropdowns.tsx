/*
 * Hactex React — Dropdowns UI page.
 * Each menu with
 * @click.outside becomes the <Dropdown> component (owns open state, outside-
 * click + Escape). The component renders the positioned .at-dropdown frame;
 * menu items replicate the source markup/styles. A local .at-dropdown-host
 * class makes each trigger host a positioned anchor (the source wraps each
 * trigger in <div style="position: relative; display: inline-block">).
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';
import { Dropdown } from '../../components/ui/Dropdown';

/* Shared item styles (the source inlines these on every menu link). */
const itemLink = (extra?: React.CSSProperties): React.CSSProperties => ({
  display: 'block',
  padding: 'var(--at-space-2) var(--at-space-3)',
  color: 'inherit',
  textDecoration: 'none',
  ...extra,
});

const itemRow = (extra?: React.CSSProperties): React.CSSProperties => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 'var(--at-space-2) var(--at-space-3)',
  color: 'inherit',
  textDecoration: 'none',
  ...extra,
});

const sectionLabel: React.CSSProperties = {
  padding: 'var(--at-space-2) var(--at-space-3)',
  fontSize: 'var(--at-text-xs)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--at-muted, inherit)',
};

const checkBtn = (extra?: React.CSSProperties): React.CSSProperties => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: 'var(--at-space-2)',
  padding: 'var(--at-space-2) var(--at-space-3)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left',
  color: 'inherit',
  ...extra,
});

const checkBox = (on: boolean): React.CSSProperties => ({
  width: '16px',
  height: '16px',
  border: '2px solid var(--at-ink)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: on ? 'var(--at-ink-strong)' : 'var(--at-paper)',
  color: on ? 'var(--at-paper)' : 'inherit',
});

const FILTER_LABELS = ['Active users', 'Verified email', 'Has 2FA'];

export default function Dropdowns(): React.JSX.Element {
  const [opts, setOpts] = useState<boolean[]>([true, false, true]);

  return (
    <>
      <style>{`.at-dropdown-host { position: relative; display: inline-block; }`}</style>

      <PageHead
        title="Dropdowns"
        subtitle="Overlay menus for actions, navigation and selection."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Settings</button>
            <button className="at-btn at-btn--primary at-press">Create</button>
          </>
        }
      />

      <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
        <div className="at-row">
          {/* 1. Directions */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Directions</div>
                <div className="at-eyebrow">Menu placement</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-3)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <Dropdown
                className="at-dropdown-host"
                ariaLabel="Drop down"
                trigger={() => (
                  <button className="at-btn at-btn--outline at-press">Drop down ▾</button>
                )}
              >
                {() => (
                  <div style={{ minWidth: '180px' }}>
                    <a href="#" className="at-dropdown__item" style={itemLink({ borderBottom: '1px solid var(--at-ink)' })}>Edit</a>
                    <a href="#" className="at-dropdown__item" style={itemLink({ borderBottom: '1px solid var(--at-ink)' })}>Duplicate</a>
                    <a href="#" className="at-dropdown__item" style={itemLink()}>Archive</a>
                  </div>
                )}
              </Dropdown>

              <Dropdown
                className="at-dropdown-host"
                ariaLabel="Drop up"
                placement="top-start"
                trigger={() => (
                  <button className="at-btn at-btn--outline at-press">Drop up ▴</button>
                )}
              >
                {() => (
                  <div style={{ minWidth: '180px' }}>
                    <a href="#" className="at-dropdown__item" style={itemLink({ borderBottom: '1px solid var(--at-ink)' })}>Share</a>
                    <a href="#" className="at-dropdown__item" style={itemLink({ borderBottom: '1px solid var(--at-ink)' })}>Move</a>
                    <a href="#" className="at-dropdown__item" style={itemLink()}>Delete</a>
                  </div>
                )}
              </Dropdown>

              <Dropdown
                className="at-dropdown-host"
                ariaLabel="Drop right"
                placement="right-start"
                trigger={() => (
                  <button className="at-btn at-btn--outline at-press">Drop right ▸</button>
                )}
              >
                {() => (
                  <div style={{ minWidth: '180px' }}>
                    <a href="#" className="at-dropdown__item" style={itemLink({ borderBottom: '1px solid var(--at-ink)' })}>Profile</a>
                    <a href="#" className="at-dropdown__item" style={itemLink()}>Sign out</a>
                  </div>
                )}
              </Dropdown>
            </div>
          </div>

          {/* 2. Icons, shortcuts & danger */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Icons, shortcuts &amp; danger</div>
                <div className="at-eyebrow">Enriched menu items</div>
              </div>
            </div>
            <Dropdown
              className="at-dropdown-host"
              ariaLabel="Open menu"
              trigger={() => (
                <button className="at-btn at-btn--primary at-press">Open menu ▾</button>
              )}
            >
              {() => (
                <div style={{ minWidth: '220px' }}>
                  <a href="#" className="at-dropdown__item" style={itemRow({ borderBottom: '1px solid var(--at-ink)' })}>
                    <span className="at-cluster" style={{ gap: 'var(--at-space-2)', alignItems: 'center' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </span>
                    <kbd style={{ fontSize: 'var(--at-text-xs)', background: 'var(--at-surface)', padding: '1px 6px', border: '1px solid var(--at-ink)' }}>⌘E</kbd>
                  </a>
                  <a href="#" className="at-dropdown__item" style={itemRow({ borderBottom: '1px solid var(--at-ink)' })}>
                    <span className="at-cluster" style={{ gap: 'var(--at-space-2)', alignItems: 'center' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Duplicate
                    </span>
                    <kbd style={{ fontSize: 'var(--at-text-xs)', background: 'var(--at-surface)', padding: '1px 6px', border: '1px solid var(--at-ink)' }}>⌘D</kbd>
                  </a>
                  <a href="#" className="at-dropdown__item" style={{ display: 'flex', alignItems: 'center', gap: 'var(--at-space-2)', padding: 'var(--at-space-2) var(--at-space-3)', color: 'var(--at-danger-text)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    </svg>
                    Delete permanently
                  </a>
                </div>
              )}
            </Dropdown>
          </div>

          {/* 3. Headers & sections */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Headers &amp; sections</div>
                <div className="at-eyebrow">Grouped, labeled menus</div>
              </div>
            </div>
            <Dropdown
              className="at-dropdown-host"
              ariaLabel="Account"
              trigger={() => (
                <button className="at-btn at-btn--outline at-press">Account ▾</button>
              )}
            >
              {() => (
                <div style={{ minWidth: '240px' }}>
                  <div style={{ padding: 'var(--at-space-3)', borderBottom: '2px solid var(--at-ink)', background: 'var(--at-surface)' }}>
                    <div className="at-text-strong">Signed in as</div>
                    <div className="at-text-muted" style={{ fontSize: 'var(--at-text-sm)' }}>ava@atelier.dev</div>
                  </div>
                  <div style={{ ...sectionLabel, borderBottom: '1px solid var(--at-ink)' }}>Workspace</div>
                  <a href="#" className="at-dropdown__item" style={itemLink({ borderBottom: '1px solid var(--at-ink)' })}>Switch workspace</a>
                  <a href="#" className="at-dropdown__item" style={itemLink({ borderBottom: '1px solid var(--at-ink)' })}>Invite members</a>
                  <div style={{ ...sectionLabel, borderBottom: '1px solid var(--at-ink)' }}>Account</div>
                  <a href="#" className="at-dropdown__item" style={itemLink({ borderBottom: '1px solid var(--at-ink)' })}>Settings</a>
                  <a href="#" className="at-dropdown__item" style={itemLink()}>Sign out</a>
                </div>
              )}
            </Dropdown>
          </div>

          {/* 4. Checkable items & split button */}
          <div className="at-col-6 at-card" style={{ padding: 'var(--at-space-5)' }}>
            <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
              <div>
                <div className="at-chart__title">Checkable items &amp; split button</div>
                <div className="at-eyebrow">Selectable options + dual action</div>
              </div>
            </div>
            <div className="at-cluster" style={{ gap: 'var(--at-space-4)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <Dropdown
                className="at-dropdown-host"
                ariaLabel="Filter"
                trigger={() => (
                  <button className="at-btn at-btn--outline at-press">Filter ▾</button>
                )}
              >
                {() => (
                  <div style={{ minWidth: '200px' }}>
                    {FILTER_LABELS.map((label, i) => (
                      <button
                        key={label}
                        onClick={() => setOpts((prev) => prev.map((v, idx) => (idx === i ? !v : v)))}
                        style={checkBtn(i < FILTER_LABELS.length - 1 ? { borderBottom: '1px solid var(--at-ink)' } : undefined)}
                      >
                        <span style={checkBox(opts[i])}>
                          {opts[i] && <span style={{ fontWeight: 700, fontSize: 'var(--at-text-2xs)' }}>✓</span>}
                        </span>
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </Dropdown>

              <div className="at-cluster" style={{ gap: 0 }}>
                <button className="at-btn at-btn--primary at-press" style={{ borderInlineEnd: 0 }}>Save</button>
                <Dropdown
                  className="at-dropdown-host"
                  ariaLabel="More options"
                  trigger={() => (
                    <button className="at-btn at-btn--primary at-press" style={{ paddingInline: 'var(--at-space-2)' }}>▾</button>
                  )}
                >
                  {() => (
                    <div style={{ minWidth: '180px' }}>
                      <a href="#" className="at-dropdown__item" style={itemLink({ borderBottom: '1px solid var(--at-ink)' })}>Save &amp; new</a>
                      <a href="#" className="at-dropdown__item" style={itemLink({ borderBottom: '1px solid var(--at-ink)' })}>Save &amp; duplicate</a>
                      <a href="#" className="at-dropdown__item" style={itemLink()}>Save as draft</a>
                    </div>
                  )}
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
