/*
 * Hactex React — Sign In, cover variant (standalone, no app shell).
 *
 * The cover layout is a split card — form on one side, brand panel on the other.
 * It used to be a byte-for-byte copy of the basic page, which left the menu
 * entry pointing at a variant that did not exist. The panel drops out below
 * 880px (shell.css) and the card falls back to a single column.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthBrand, CoverPanel, PasswordField } from '../../components/auth/AuthParts';

export const SLUG = 'auth/sign-in-cover';

export default function SignInCover(): React.JSX.Element {
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
      setError('Incorrect email or password. (demo)');
    }, 900);
  };

  return (
    <div className="at-card at-auth-cover">
      <div className="at-auth-cover__form">
        <div className="at-auth">
          <AuthBrand />

          <div className="at-auth__head">
            <h1 className="at-auth__title">Sign in</h1>
            <p className="at-auth__sub">Welcome back. Let's get you moving.</p>
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

          <p className="at-auth__foot">
            New here? <Link to="/auth/sign-up-cover" className="at-text-strong">Create an account</Link>
          </p>
        </div>
      </div>

      <CoverPanel
        headline="Every number in one place."
        lede="Hactex keeps revenue, pipeline and operations on a single surface — so the answer is never three tabs away."
        points={[
          '60+ pages across 12 sections',
          'Six themes, light and dark',
          'Typed components, RTL-ready',
        ]}
      />
    </div>
  );
}
