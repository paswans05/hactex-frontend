/*
 * Hactex React — shared pieces of the six auth pages.
 *
 * These used to be copy-pasted into every page, which is how the set drifted:
 * two pages ended up titled "Sign in" while rendering a sign-up form, and the
 * brand lockup was built from .at-sidebar__brand — sidebar chrome that carries
 * a fixed header height and a bottom border, drawing a stray rule across the
 * card. One definition each, styled by the .at-auth* block in shell.css.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';

/** Centred logo lockup. Links home so the mark is not a dead end. */
export function AuthBrand(): React.JSX.Element {
  return (
    <Link to="/" className="at-auth__brand" aria-label="Hactex home">
      <span className="at-sidebar__stamp" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="currentColor">
          <path d="M8 8h16v16H8z" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M12 12h8v8H12z" />
        </svg>
      </span>
      <span className="at-sidebar__wordmark">Hactex</span>
    </Link>
  );
}

export interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  /** Rendered on the label row, right-aligned — e.g. the "Forgot?" link. */
  action?: React.ReactNode;
  hint?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  minLength?: number;
}

/*
 * Password input with a reveal toggle. The toggle is absolutely positioned
 * inside the field (see .at-auth__control) rather than sitting beside it, so
 * the input keeps the same width as every other control on the card.
 *
 * tabIndex={-1} keeps it out of the tab order: Tab from the password field
 * should reach the submit button, not a visibility affordance that a keyboard
 * user has no reason to visit mid-form.
 */
export function PasswordField({
  id,
  label,
  value,
  onChange,
  action,
  hint,
  autoComplete = 'current-password',
  autoFocus,
  minLength,
}: PasswordFieldProps): React.JSX.Element {
  const [show, setShow] = useState(false);

  return (
    <div>
      {action ? (
        <div className="at-auth__label-row">
          <label className="at-form-label" htmlFor={id}>{label}</label>
          {action}
        </div>
      ) : (
        <label className="at-form-label" htmlFor={id}>{label}</label>
      )}

      <div className="at-auth__control">
        <input
          className="at-input"
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          minLength={minLength}
          required
        />
        <button
          type="button"
          className="at-auth__reveal"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {show ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {hint && <p className="at-form-hint">{hint}</p>}
    </div>
  );
}

/** Rule with a centred caption, followed by the three provider buttons. */
export function SocialRow({ caption }: { caption: string }): React.JSX.Element {
  return (
    <>
      <div className="at-auth__sep">{caption}</div>
      <div className="at-auth__socials">
        <button type="button" className="at-btn at-btn--outline at-btn--sm at-press">Google</button>
        <button type="button" className="at-btn at-btn--outline at-btn--sm at-press">GitHub</button>
        <button type="button" className="at-btn at-btn--outline at-btn--sm at-press">SSO</button>
      </div>
    </>
  );
}

export interface CoverPanelProps {
  headline: string;
  lede: string;
  points: string[];
}

/** The accent half of the cover layout. Hidden below 880px by shell.css. */
export function CoverPanel({ headline, lede, points }: CoverPanelProps): React.JSX.Element {
  return (
    <aside className="at-auth-cover__panel">
      <span className="at-sidebar__stamp" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="currentColor">
          <path d="M8 8h16v16H8z" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M12 12h8v8H12z" />
        </svg>
      </span>

      <div>
        <p className="at-auth-cover__headline">{headline}</p>
        <p className="at-auth-cover__lede">{lede}</p>
      </div>

      <ul className="at-auth-cover__list">
        {points.map((p) => (
          <li key={p}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {p}
          </li>
        ))}
      </ul>
    </aside>
  );
}
