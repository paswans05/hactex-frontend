/*
 * Hactex React — Sign Up / User Registration (restricted).
 * Only authenticated Administrators / Super Admins can register new users.
 * Unauthenticated users are redirected to /auth/login.
 * Non-admins receive an Access Denied card.
 */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, UserPlus, CheckCircle2, Building2 } from 'lucide-react';
import { AuthBrand, PasswordField } from '../../components/auth/AuthParts';
import { getUser, isAuthenticated } from '../../lib/auth';
import { userService } from '../../api';
import { useCompany } from '../../context/CompanyContext';

export const SLUG = 'auth/register';

export default function SignUpBasic(): React.JSX.Element {
  const navigate = useNavigate();
  const currentUser = getUser();
  const { company } = useCompany();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('staff');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Check auth on mount: unauthenticated -> redirect to /auth/login
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/auth/login?restricted=1', { replace: true });
    }
  }, [navigate]);

  if (!isAuthenticated()) {
    return <></>;
  }

  // Non-admin check: show Access Denied
  const isAdmin = currentUser?.is_admin || currentUser?.role === 'admin' || currentUser?.role === 'super_admin';

  if (!isAdmin) {
    return (
      <div className="at-card at-auth" style={{ maxWidth: '480px' }}>
        <AuthBrand />

        <div className="text-center py-6 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto border-2 border-rose-300">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900">Administrator Access Required</h1>
            <p className="text-sm text-slate-600 mt-2">
              Registration of new user accounts is restricted to company administrators. Please contact your organization administrator to request an invite.
            </p>
          </div>

          <div className="pt-4 flex flex-col gap-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="at-btn at-btn--primary at-btn--block at-press"
            >
              Return to Dashboard
            </button>
            <Link to="/company/setup" className="text-xs font-bold text-emerald-700 hover:underline pt-2">
              Looking to register a new organization? Start Company Setup &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const submit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await userService.createUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
        phone: phone.trim() || undefined,
        status: 'ACTIVE'
      });

      if (res.success) {
        setSuccess(`User account for ${name} created successfully! Redirecting to user management...`);
        setTimeout(() => {
          navigate('/users');
        }, 1500);
      } else {
        setError(res.error || 'Failed to create user.');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="at-card at-auth" style={{ maxWidth: '480px' }}>
      <AuthBrand />

      <div className="at-auth__head">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-bold mb-2">
          <Building2 className="w-3.5 h-3.5" />
          {company?.name || currentUser?.company_name || 'Active Company'}
        </div>
        <h1 className="at-auth__title">Register Team Member</h1>
        <p className="at-auth__sub">Add a new operational user to your company organization.</p>
      </div>

      {error && (
        <div className="at-alert at-alert--danger" style={{ marginBlockEnd: 'var(--at-space-4)' }}>
          <div className="at-alert__body">{error}</div>
        </div>
      )}

      {success && (
        <div className="at-alert at-alert--success" style={{ marginBlockEnd: 'var(--at-space-4)' }}>
          <div className="at-alert__body flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {success}
          </div>
        </div>
      )}

      <form className="at-auth__form" onSubmit={submit}>
        <div>
          <label className="at-form-label" htmlFor="name">Full name *</label>
          <input
            className="at-input"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Anand Sharma"
            autoComplete="name"
            required
          />
        </div>

        <div>
          <label className="at-form-label" htmlFor="email">Work email *</label>
          <input
            className="at-input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="anand@company.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="at-form-label" htmlFor="role">Role</label>
            <select
              className="at-input"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="staff">Staff</option>
              <option value="manager">Manager</option>
              <option value="admin">Administrator</option>
              <option value="viewer">Viewer (Read-only)</option>
              <option value="prod_operator">Production Operator</option>
              <option value="hatchery_manager">Hatchery Manager</option>
            </select>
          </div>

          <div>
            <label className="at-form-label" htmlFor="phone">Phone</label>
            <input
              className="at-input"
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9876543210"
            />
          </div>
        </div>

        <PasswordField
          id="password"
          label="Temporary Password *"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          minLength={6}
          hint="Must be at least 6 characters long."
        />

        <button type="submit" className="at-btn at-btn--primary at-btn--block at-btn--lg at-press" disabled={loading}>
          <UserPlus className="w-4 h-4 inline-block mr-2" />
          {loading ? 'Creating user…' : 'Register User'}
        </button>
      </form>

      <p className="at-auth__foot">
        <Link to="/users" className="at-text-strong inline-flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to User Management
        </Link>
      </p>
    </div>
  );
}

