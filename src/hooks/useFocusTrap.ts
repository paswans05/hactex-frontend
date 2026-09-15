/*
 * Hactex React — focus trap for offcanvas/dropdowns.
 * Port of core/focus-trap.js behavior: trap Tab, restore focus on close,
 * focus first focusable on open.
 */
import { useEffect } from 'react';

const FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'textarea', 'input', 'select',
  '[tabindex]:not([tabindex="-1"])',
];

export function useFocusTrap(
  ref: React.RefObject<HTMLElement | null>,
  active: boolean,
): void {
  useEffect(() => {
    if (!active || !ref.current) return;
    const node = ref.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables = (): HTMLElement[] =>
      Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE.join(','))).filter(
        (el) => el.offsetParent !== null,
      );

    const first = focusables()[0];
    if (first) first.focus();

    const onKey = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    node.addEventListener('keydown', onKey);
    return () => {
      node.removeEventListener('keydown', onKey);
      if (previouslyFocused) previouslyFocused.focus();
    };
  }, [ref, active]);
}
