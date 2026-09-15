/*
 * Hactex React — 401 Unauthorized (standalone, no app shell).
 * The centered content is ported
 * verbatim — the router's <BareShell> provides loader, theme toggle, home link.
 */
import { Link } from 'react-router-dom';

export const SLUG = 'error/401';

export default function Error401(): React.JSX.Element {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1
        style={{
          fontFamily: 'var(--at-font-display)',
          fontSize: 'var(--at-text-4xl)',
          fontWeight: 800,
          color: 'var(--at-text-strong)',
        }}
      >
        401
      </h1>
      <p
        className="at-text-muted"
        style={{ fontSize: 'var(--at-text-md)', marginBlock: 'var(--at-space-2) var(--at-space-5)' }}
      >
        Something went wrong. Let's get you back.
      </p>
      <Link to="/" className="at-btn at-btn--primary at-btn--lg at-press">Back to Dashboard</Link>
    </div>
  );
}
