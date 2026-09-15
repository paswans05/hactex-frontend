/*
 * Hactex React — Sign Up (standalone, no app shell).
 * Demo submit flashes an error and
 * never hits the network. <BareShell> provides the loader, theme toggle and
 * home link.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthBrand, PasswordField, SocialRow } from '../../components/auth/AuthParts';

export const SLUG = 'auth/register';

export default function SignUpBasic(): React.JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent): void => {
    e.preventDefault();
    setError('');
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setError('Sign-up is disabled in this demo.');
    }, 900);
  };

  return (
    <div className="at-card at-auth">
      <AuthBrand />

      <div className="at-auth__head">
        <h1 className="at-auth__title">Create account</h1>
        <p className="at-auth__sub">Start your 14-day trial. No card required.</p>
      </div>

      {error && (
        <div className="at-alert at-alert--danger" style={{ marginBlockEnd: 'var(--at-space-4)' }}>
          <div className="at-alert__body">{error}</div>
        </div>
      )}

      <form className="at-auth__form" onSubmit={submit}>
        <div>
          <label className="at-form-label" htmlFor="name">Full name</label>
          <input
            className="at-input"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Morgan"
            autoComplete="name"
            required
          />
        </div>

        <div>
          <label className="at-form-label" htmlFor="email">Work email</label>
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

        <PasswordField
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          minLength={8}
          hint="At least 8 characters, including a number."
        />

        <div className="at-auth__options">
          <label className="at-check">
            <input type="checkbox" required /> I agree to the <a href="#">Terms</a>
          </label>
        </div>

        <button type="submit" className="at-btn at-btn--primary at-btn--block at-btn--lg at-press" disabled={loading}>
          {loading ? 'Creating…' : 'Create Account'}
        </button>
      </form>

      <SocialRow caption="or sign up with" />

      <p className="at-auth__foot">
        Already have an account? <Link to="/auth/login" className="at-text-strong">Sign in</Link>
      </p>
    </div>
  );
}
