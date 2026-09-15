/*
 * Hactex React — 404 Not Found (standalone, no app shell).
 * The centered content is ported
 * verbatim — the router's <BareShell> provides loader, theme toggle, home link.
 */
import { Link } from 'react-router-dom';

export const SLUG = 'error/404';

export default function Error404(): React.JSX.Element {
  return (
    <div style={{ textAlign: 'center' }}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: '64px', height: '64px', marginInline: 'auto', color: 'var(--at-accent-text)', marginBlockEnd: 'var(--at-space-4)' }}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <h1
        style={{
          fontFamily: 'var(--at-font-display)',
          fontSize: 'var(--at-text-4xl)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--at-text-strong)',
        }}
      >
        404
      </h1>
      <p
        className="at-text-muted"
        style={{ fontSize: 'var(--at-text-md)', marginBlock: 'var(--at-space-2) var(--at-space-5)', maxWidth: '400px' }}
      >
        This page pressed itself right off the canvas. Let's get you back.
      </p>
      <Link to="/" className="at-btn at-btn--primary at-btn--lg at-press">Back to Dashboard</Link>
    </div>
  );
}
