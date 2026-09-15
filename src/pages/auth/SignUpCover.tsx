/*
 * Hactex React — Sign Up, cover variant (standalone, no app shell).
 * Split card — see the note in
 * SignInCover.tsx. The panel drops out below 880px (shell.css).
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthBrand, CoverPanel, PasswordField } from '../../components/auth/AuthParts';

export const SLUG = 'auth/sign-up-cover';

export default function SignUpCover(): React.JSX.Element {
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
    <div className="at-card at-auth-cover">
      <div className="at-auth-cover__form">
        <div className="at-auth">
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

          <p className="at-auth__foot">
            Already have an account? <Link to="/auth/sign-in-cover" className="at-text-strong">Sign in</Link>
          </p>
        </div>
      </div>

      <CoverPanel
        headline="Ship the dashboard, not the scaffolding."
        lede="Charts, tables, forms and the whole app shell arrive assembled. Point them at your data and the first screen is done."
        points={['No credit card for the trial', 'Invite your whole team', 'Cancel any time']}
      />
    </div>
  );
}
