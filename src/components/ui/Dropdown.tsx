/*
 * Hactex React — generic dropdown. Owns open state, wires ARIA, closes on
 * outside-click + Escape,
 * and positions its panel with floating-ui.
 *
 * No react-router imports, so it drops into any tree unchanged.
 */
import { useState, useRef, useLayoutEffect, type MouseEvent, type ReactNode } from 'react';
import {
  computePosition,
  autoUpdate,
  flip,
  shift,
  offset,
  type Placement,
} from '@floating-ui/dom';
import { useClickOutside } from '../../hooks/useClickOutside';

export interface DropdownProps {
  /** The trigger element (render-prop receives the open state + toggle). */
  trigger: (open: boolean, toggle: () => void) => ReactNode;
  /** The dropdown panel content. */
  children: (close: () => void) => ReactNode;
  /** Extra class on the host wrapper (e.g. "at-icon-btn"). */
  className?: string;
  ariaLabel?: string;
  role?: 'button' | undefined;
  /**
   * Emits data-at-header-slot on the host. shell.css §5 drops the four
   * least-essential header controls (language, fullscreen, apps, cart) below
   * 768px — the right cluster otherwise overflows a phone — and keys that rule
   * off this attribute rather than nth-child so it survives re-ordering. Only
   * the header passes it; every other Dropdown leaves it undefined.
   */
  headerSlot?: string;
  /**
   * @floating-ui placement for the panel — mirrors atDropdown's argument.
   * The header passes 'bottom'; every other call site takes the default.
   */
  placement?: Placement;
}

export function Dropdown({
  trigger,
  children,
  className,
  ariaLabel,
  role,
  headerSlot,
  placement = 'bottom-start',
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(ref, open, () => setOpen(false));

  /* Place first, reveal second. computePosition is async and the panel now
     fades in rather than appearing, so revealing on `open` alone would start
     the fade at the panel's last known coords — 0/0 before the first open —
     and snap it across a frame later. `placed` gates .is-open on the first
     resolved placement instead. It resets to false on close, which is harmless:
     the class comes off in the same commit and the panel fades out from
     wherever it already sits. */
  const [placed, setPlaced] = useState(false);

  /*
   * Position the panel against its host.
   * Fixed strategy: floating-ui returns viewport-relative coords, so placement
   * is independent of the panel's offset parent (which is the trigger itself —
   * a degenerate case for the absolute strategy, and the reason the panel used
   * to land on the trigger's own top-left corner). flip()/shift() keep the wide
   * header panels (apps, cart, notifications) on screen near the viewport edge.
   *
   * Still gated on `open`: autoUpdate re-runs this on every ancestor scroll and
   * resize, and a dismissed panel has nothing to keep in position.
   */
  useLayoutEffect(() => {
    const reference = ref.current;
    const floating = panelRef.current;
    if (!open || !reference || !floating) {
      setPlaced(false);
      return;
    }
    return autoUpdate(reference, floating, () => {
      void computePosition(reference, floating, {
        placement,
        strategy: 'fixed',
        middleware: [offset(8), flip(), shift({ padding: 8 })],
      }).then(({ x, y, strategy }) => {
        Object.assign(floating.style, {
          position: strategy,
          left: `${x}px`,
          top: `${y}px`,
        });
        setPlaced(true);
      });
    });
  }, [open, placement]);

  const toggle = (): void => setOpen((o) => !o);
  const close = (): void => setOpen(false);

  /*
   * The panel is rendered *inside* the host, so every click on a panel item
   * bubbles up to the host's own onClick. Item handlers already call close(),
   * and toggling on top of that flipped the panel straight back open (both
   * updates batch, and the functional toggle sees the pending `false`) —
   * picking a language or a currency left the menu stuck on screen.
   *
   * So: a click that originated inside the panel always means "close", never
   * "toggle". Only a click on the trigger toggles. Items that do NOT call
   * close() (the Apps grid links) still dismiss the panel, exactly as before.
   */
  const onHostClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (panelRef.current?.contains(e.target as Node)) setOpen(false);
    else toggle();
  };

  return (
    <div
      ref={ref}
      className={className}
      data-at-header-slot={headerSlot}
      role={role}
      tabIndex={role === 'button' ? 0 : undefined}
      aria-label={ariaLabel}
      aria-haspopup="true"
      aria-expanded={open}
      onClick={onHostClick}
    >
      {trigger(open, toggle)}
      {/* Always mounted, dismissed by .is-open. Conditional rendering is what
          kept these menus from ever animating: an element inserted and revealed
          in the same commit has no before-change style for the browser to
          interpolate from, and one removed on close stops rendering before the
          fade gets a frame. components.css §9 owns the fade now, and parks the
          closed panel at opacity 0 / visibility hidden / pointer-events none —
          visibility keeps its links out of the tab order the way unmounting did.
          The fixed-strategy 0/0 seed lives in that rule too, so nothing here
          needs an inline style. */}
      <div
        ref={panelRef}
        className={`at-dropdown${open && placed ? ' is-open' : ''}`}
      >
        {children(close)}
      </div>
    </div>
  );
}
