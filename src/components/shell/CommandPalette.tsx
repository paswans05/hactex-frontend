/*
 * Hactex React — ⌘K command palette. Port of core/command-palette.js.
 * Fuzzy-filter over manifest leaves (inMenu), keyboard nav (↑/↓/Enter/Esc).
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIndex, hrefForSlug } from '../../lib/manifest';
import type { ManifestNode } from '../../lib/manifest';
import { useFocusTrap } from '../../hooks/useFocusTrap';

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const RESULTS: ManifestNode[] = Object.values(getIndex().bySlug).filter((n) => n.inMenu);

export function CommandPalette({ open, onClose }: CommandPaletteProps): React.JSX.Element {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [insets, setInsets] = useState<React.CSSProperties>({});
  useFocusTrap(listRef, open);

  /* Center the dialog over the content area (.at-shell) rather than the
     viewport, matching core/command-palette.js — with a fixed sidebar a
     viewport-centered dialog sits visibly off to one side of the content it is
     searching. Physical left/right, not the logical inset-inline-* pair:
     getBoundingClientRect reports physical coordinates, and pairing the two
     mirrors the offsets under dir="rtl". The scrim is separately fixed to the
     full screen, so clamping the container leaves no undimmed strip. */
  useEffect(() => {
    if (!open) return;
    const measure = (): void => {
      const r = document.querySelector('.at-shell')?.getBoundingClientRect();
      if (!r || (r.left <= 1 && r.right >= window.innerWidth - 1)) setInsets({});
      else setInsets({ left: Math.round(r.left), right: Math.round(window.innerWidth - r.right) });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const matches = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return RESULTS.slice(0, 8);
    return RESULTS.filter((n) => {
      const hay = (n.title + ' ' + n.slug + ' ' + (n.keywords || []).join(' ')).toLowerCase();
      return hay.includes(needle);
    }).slice(0, 12);
  }, [q]);

  const go = (node: ManifestNode): void => {
    navigate(hrefForSlug(node.slug));
    onClose();
  };

  const onKey = (e: React.KeyboardEvent): void => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, matches.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter' && matches[active]) { e.preventDefault(); go(matches[active]); }
    else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
  };

  /* Always mounted, dismissed by .is-open (shell.css). Returning null while
     closed is what stopped the dialog from ever animating: a layer created and
     revealed in the same commit has no before-change style to interpolate from,
     so the first ⌘K snapped open, and unmounting on close killed the fade out.
     Rendered from the start it has been sitting inert — opacity 0, visibility
     hidden, pointer-events none — since mount, so the very first open
     transitions like every later one. pointer-events matters as much as opacity:
     this is a full-viewport `inset: 0` layer, and a transparent-but-live copy of
     it would swallow every click on the page.

     No aria-hidden pairing: visibility:hidden already takes the closed dialog
     out of the accessibility tree and the tab order, and the reference carries
     no such attribute — adding one here would be an ARIA divergence for nothing
     (BUILD-CONVENTIONS §6.1). */
  return (
    <div
      className={`at-command${open ? ' is-open' : ''}`}
      role="dialog"
      aria-label="Command palette"
      style={insets}
    >
      <div className="at-command__backdrop" onClick={onClose} />
      <div className="at-command__panel" ref={listRef} onKeyDown={onKey}>
        <div className="at-command__input-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            className="at-command__input"
            placeholder="Search pages…"
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
          />
          <kbd className="at-command__esc">ESC</kbd>
        </div>
        <div className="at-command__list">
          {matches.length === 0 && (
            <div className="at-command__empty">No matches</div>
          )}
          {matches.map((n, i) => (
            <button
              key={n.id}
              className={`at-command__item${i === active ? ' is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(n)}
            >
              <span className="at-command__item-title">{n.title}</span>
              <span className="at-command__item-slug">{n.slug}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
