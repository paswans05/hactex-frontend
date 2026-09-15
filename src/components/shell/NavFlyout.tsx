/*
 * Hactex React — collapsed-rail nav flyout.
 *
 * The layer is PORTALED to <body> rather than rendered inside the group. The
 * nav tree lives in .at-sidebar__nav, an overflow scroll container, and any
 * overflow other than `visible` clips absolutely-positioned descendants — a
 * flyout anchored inside the group gets sliced off at the rail's edges.
 * On <body> it escapes the clip, and floating-ui's flip()/shift() keep it on
 * screen at every viewport edge.
 *
 * Mounted for the life of the sidebar, not per-open — the reference creates its
 * flyout layer once at init for the same reason. nav.css dismisses it with
 * opacity + transform + visibility, and a transition needs two rendered styles
 * to interpolate between: a layer inserted and revealed in the same commit has
 * no before-change style, so the first open would snap, and one unmounted on
 * close leaves the DOM before the 140ms exit gets a frame. Sitting inert since
 * mount, both edges animate. `anchor` is null until the first hover.
 *
 * Portability note: no router imports here — the nav links are passed in as
 * children by Sidebar, so this file has no routing dependency of its own.
 */
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { computePosition, autoUpdate, flip, shift, offset } from '@floating-ui/dom';

export interface NavFlyoutProps {
  /** Whether the panel is showing. Drives [data-open]; nav.css owns the fade. */
  open: boolean;
  /** The hovered group head. floating-ui positions the panel against it. */
  anchor: HTMLElement | null;
  /** The group's name, restored as a title since the rail hides its label. */
  title: string;
  children: ReactNode;
  /** Cancels the pending close while the pointer is over the panel. */
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function NavFlyout({
  open,
  anchor,
  title,
  children,
  onMouseEnter,
  onMouseLeave,
}: NavFlyoutProps): React.JSX.Element | null {
  const ref = useRef<HTMLDivElement>(null);

  /* The portal target only exists on the client, and React's server renderer
     drops portals entirely — so the layer is created one commit after mount
     rather than during hydration, where a client-only subtree has nothing on the
     server side to line up with. Still page-load time, long before any hover,
     so the fade-in guarantee above is unaffected. */
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  useLayoutEffect(() => {
    const floating = ref.current;
    /* Tracking stops on close rather than following the old anchor: the inline
       left/top from the last placement stay put, so the panel fades out exactly
       where it was instead of drifting mid-exit. */
    if (!open || !anchor || !floating) return;
    /* Direction is read per-open rather than once, so a live language toggle
       (ltr↔rtl) flips the placement instead of stranding the panel on the far
       side of the rail. */
    const rtl = document.documentElement.getAttribute('dir') === 'rtl';
    floating.setAttribute('dir', rtl ? 'rtl' : 'ltr');
    return autoUpdate(anchor, floating, () => {
      void computePosition(anchor, floating, {
        placement: rtl ? 'left-start' : 'right-start',
        /* Must match the layer's `position: fixed` (nav.css). The default
           'absolute' strategy returns document-relative coords — scroll offset
           included — which a fixed element reads as viewport-relative, so the
           flyout drifted by exactly the page's scrollY once the body moved.
           Same reasoning as ui/Dropdown; write `position` back from the
           returned strategy so the two stay in step. */
        strategy: 'fixed',
        middleware: [offset(8), flip(), shift({ padding: 8 })],
      }).then(({ x, y, strategy }) => {
        Object.assign(floating.style, { position: strategy, left: `${x}px`, top: `${y}px` });
      });
    });
    // `ready` is a dep because the portal — and therefore ref.current — only
    // exists after it flips.
  }, [anchor, open, ready]);

  if (!ready || typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={ref}
      className="at-nav__flyout"
      data-open={open ? '' : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="at-nav__flyout__title">{title}</div>
      {children}
    </div>,
    document.body,
  );
}
