/*
 * Hactex React — Sign In (standalone, no app shell).
 * Connected to Flask + MySQL backend API with token authentication.
 * <BareShell> provides the loader, theme toggle and home link.
 */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthBrand, PasswordField, SocialRow } from '../../components/auth/AuthParts';
import { login, isAuthenticated } from '../../lib/auth';

export const SLUG = 'auth/login';

export default function SignInBasic(): React.JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboards/sales', { replace: true });
    }
  }, [navigate]);

  const submit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/dashboards/sales', { replace: true });
      } else {
        setError(res.error || 'Invalid email/username or password.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <label className="at-form-label" htmlFor="email">Email or Username</label>
          <input
            className="at-input"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="farmer@hactex.ai or admin"
            autoComplete="username"
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
          <label className="at-check"><input type="checkbox" defaultChecked /> Keep me signed in</label>
        </div>

        <button type="submit" className="at-btn at-btn--primary at-btn--block at-btn--lg at-press" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <SocialRow caption="or continue with" />

      <p className="at-auth__foot">
        Don't have an account? <Link to="/auth/register" className="at-text-strong">Sign up</Link>
      </p>
    </div>
  );
}
