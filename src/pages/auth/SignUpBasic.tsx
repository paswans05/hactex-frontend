/*
 * Hactex React — Sign Up (standalone, no app shell).
 * Connected to Flask + MySQL backend API with token authentication.
 * <BareShell> provides the loader, theme toggle and home link.
 */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthBrand, PasswordField, SocialRow } from '../../components/auth/AuthParts';
import { register, isAuthenticated } from '../../lib/auth';

export const SLUG = 'auth/register';

export default function SignUpBasic(): React.JSX.Element {
  const navigate = useNavigate();
  const [name, setName] = useState('');
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
      const res = await register(name, email, password);
      if (res.success) {
        navigate('/dashboards/sales', { replace: true });
      } else {
        setError(res.error || 'Failed to create account.');
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
        <h1 className="at-auth__title">Create account</h1>
        <p className="at-auth__sub">Join Hactex to manage your hatchery and poultry farm.</p>
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
            placeholder="John Doe"
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
            placeholder="farmer@hactex.ai"
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
          minLength={6}
          hint="At least 6 characters."
        />

        <div className="at-auth__options">
          <label className="at-check">
            <input type="checkbox" required defaultChecked /> I agree to the <Link to="/pages/terms">Terms & Conditions</Link>
          </label>
        </div>

        <button type="submit" className="at-btn at-btn--primary at-btn--block at-btn--lg at-press" disabled={loading}>
          {loading ? 'Creating account…' : 'Create Account'}
        </button>
      </form>

      <SocialRow caption="or sign up with" />

      <p className="at-auth__foot">
        Already have an account? <Link to="/auth/login" className="at-text-strong">Sign in</Link>
      </p>
    </div>
  );
}
