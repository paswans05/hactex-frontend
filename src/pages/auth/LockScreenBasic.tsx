/*
 * Hactex React — Lock screen (standalone, no app shell).
 * Demo submit flashes an error
 * and never hits the network. <BareShell> provides the loader, theme toggle and
 * home link.
 *
 * A lock screen resumes an existing session, so the account is already known:
 * it shows who is locked out and asks only for the password. The email field
 * this page used to carry belonged on the sign-in page.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PasswordField } from '../../components/auth/AuthParts';

export const SLUG = 'auth/lock-screen-basic';

export default function LockScreenBasic(): React.JSX.Element {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent): void => {
    e.preventDefault();
    setError('');
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setError('Incorrect password. (demo)');
    }, 900);
  };

  return (
    <div className="at-card at-auth">
      <div className="at-auth__identity">
        <span className="at-avatar" aria-hidden="true">AM</span>
        <span className="at-auth__identity-name">Alex Morgan</span>
        <span className="at-auth__identity-mail">alex@atelier.co</span>
      </div>

      <div className="at-auth__head">
        <h1 className="at-auth__title">Screen locked</h1>
        <p className="at-auth__sub">Enter your password to pick up where you left off.</p>
      </div>

      {error && (
        <div className="at-alert at-alert--danger" style={{ marginBlockEnd: 'var(--at-space-4)' }}>
          <div className="at-alert__body">{error}</div>
        </div>
      )}

      <form className="at-auth__form" onSubmit={submit}>
        <PasswordField
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
          autoFocus
        />

        <button type="submit" className="at-btn at-btn--primary at-btn--block at-btn--lg at-press" disabled={loading}>
          {loading ? 'Unlocking…' : 'Unlock'}
        </button>
      </form>

      <p className="at-auth__foot">
        Not you? <Link to="/auth/sign-in-basic" className="at-text-strong">Sign in as someone else</Link>
      </p>
    </div>
  );
}
