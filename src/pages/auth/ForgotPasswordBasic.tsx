/*
 * Hactex React — Forgot password (standalone, no app shell).
 * Demo submit flashes a
 * success message and never hits the network. <BareShell> provides the loader,
 * theme toggle and home link.
 *
 * No password field: this form only identifies the account so a reset link can
 * be mailed to it. Asking for the password being recovered was the original bug.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthBrand } from '../../components/auth/AuthParts';

export const SLUG = 'auth/forgot-password-basic';

export default function ForgotPasswordBasic(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent): void => {
    e.preventDefault();
    setNotice('');
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setNotice('If that account exists, a reset link is on its way. (demo)');
    }, 900);
  };

  return (
    <div className="at-card at-auth">
      <AuthBrand />

      <div className="at-auth__head">
        <h1 className="at-auth__title">Reset password</h1>
        <p className="at-auth__sub">
          Enter the email on your account and we'll send you a link to set a new password.
        </p>
      </div>

      {notice && (
        <div className="at-alert at-alert--success" style={{ marginBlockEnd: 'var(--at-space-4)' }}>
          <div className="at-alert__body">{notice}</div>
        </div>
      )}

      <form className="at-auth__form" onSubmit={submit}>
        <div>
          <label className="at-form-label" htmlFor="email">Email</label>
          <input
            className="at-input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@atelier.co"
            autoComplete="email"
            required
          />
        </div>

        <button type="submit" className="at-btn at-btn--primary at-btn--block at-btn--lg at-press" disabled={loading}>
          {loading ? 'Sending…' : 'Send Reset Link'}
        </button>
      </form>

      <p className="at-auth__foot">
        Remembered it? <Link to="/auth/sign-in-basic" className="at-text-strong">Back to sign in</Link>
      </p>
    </div>
  );
}
