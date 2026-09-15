/*
 * Hactex React — Sign In (standalone, no app shell).
 * Demo submit flashes an
 * "incorrect credentials" alert; never hits the network.
 * <BareShell> provides the loader, theme toggle and home link.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthBrand, PasswordField, SocialRow } from '../../components/auth/AuthParts';

export const SLUG = 'auth/sign-in-basic';

export default function SignInBasic(): React.JSX.Element {
  const [email, setEmail] = useState('alex@atelier.co');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent): void => {
    e.preventDefault();
    setError('');
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setError('Incorrect email or password. (demo)');
    }, 900);
  };

  return (
    <div className="at-card at-auth">
      <AuthBrand />

      <div className="at-auth__head">
        <h1 className="at-auth__title">Welcome back</h1>
        <p className="at-auth__sub">Sign in to pick up where you left off.</p>
      </div>

      {error && (
        <div className="at-alert at-alert--danger" style={{ marginBlockEnd: 'var(--at-space-4)' }}>
          <div className="at-alert__body">{error}</div>
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

        <PasswordField
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
          action={<Link to="/auth/forgot-password-basic" style={{ fontSize: 'var(--at-text-xs)' }}>Forgot?</Link>}
        />

        <div className="at-auth__options">
          <label className="at-check"><input type="checkbox" /> Keep me signed in</label>
        </div>

        <button type="submit" className="at-btn at-btn--primary at-btn--block at-btn--lg at-press" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <SocialRow caption="or continue with" />

      <p className="at-auth__foot">
        Don't have an account? <Link to="/auth/sign-up-basic" className="at-text-strong">Sign up</Link>
      </p>
    </div>
  );
}
