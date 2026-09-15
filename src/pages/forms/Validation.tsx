/*
 * Hactex React — Form validation.
 * Built with the shared component classes, inline
 * token styles. The "Create your account" form is fully interactive — validates
 * on submit then re-validates on input, with useState tracking touched/errors.
 */
import { useState } from 'react';
import { PageHead } from '../../components/shell/PageHead';

type Fields = 'name' | 'email' | 'password' | 'confirm';

export default function Validation(): React.JSX.Element {
  const [values, setValues] = useState<Record<Fields, string>>({
    name: '',
    email: 'amelia.hart@northwind.io',
    password: '',
    confirm: '',
  });
  const [touched, setTouched] = useState<Record<Fields, boolean>>({
    name: false,
    email: false,
    password: false,
    confirm: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: Fields, v: string): void => {
    setValues((p) => ({ ...p, [k]: v }));
  };

  const errors: Partial<Record<Fields, string>> = {};
  if (touched.name && !values.name.trim()) errors.name = 'Enter your full name.';
  if (touched.email && values.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email))
    errors.email = 'Enter a complete email address, e.g. name@company.com.';
  if (touched.password && values.password.length < 8)
    errors.password = 'Use at least 8 characters with one number.';
  if (touched.confirm && values.confirm !== values.password)
    errors.confirm = 'Passwords do not match.';

  const fieldClass = (k: Fields): string => {
    if (!touched[k]) return 'at-input';
    return errors[k] ? 'at-input is-error' : 'at-input is-valid';
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirm: true });
    setSubmitted(true);
  };

  return (
    <>
      <PageHead
        title="Validation"
        subtitle="Live valid & invalid states, accessible error messaging, and a working submit demo."
        actions={
          <>
            <button className="at-btn at-btn--outline at-press">Docs</button>
            <button className="at-btn at-btn--primary at-press">Run checks</button>
          </>
        }
      />

      <div className="at-row">
        {/* Field States */}
        <div className="at-col-5 at-card" style={{ padding: 'var(--at-space-5)' }}>
          <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
            <div>
              <div className="at-chart__title">Field States</div>
              <div className="at-eyebrow">Rest, valid, invalid &amp; disabled — side by side</div>
            </div>
          </div>
          <div className="at-stack" style={{ gap: 'var(--at-space-5)' }}>
            {/* rest */}
            <div>
              <label className="at-form-label">Rest</label>
              <input className="at-input" type="text" placeholder="you@company.com" />
              <div className="at-form-hint">We&apos;ll never share your address.</div>
            </div>
            {/* valid */}
            <div>
              <label className="at-form-label">Valid</label>
              <input
                className="at-input is-valid"
                type="text"
                defaultValue="amelia.hart@northwind.io"
                style={{ borderColor: 'var(--at-success)' }}
              />
              <div className="at-form-hint" style={{ color: 'var(--at-success-text)' }}>
                Looks good — this email is available.
              </div>
            </div>
            {/* invalid */}
            <div>
              <label className="at-form-label">Invalid</label>
              <input className="at-input is-error" type="text" defaultValue="amelia.hart@" />
              <div className="at-form-error">
                Enter a complete email address, e.g. name@company.com.
              </div>
            </div>
            {/* disabled */}
            <div style={{ opacity: 0.6 }}>
              <label className="at-form-label">Disabled</label>
              <input className="at-input" type="text" defaultValue="locked@company.com" disabled />
              <div className="at-form-hint">Managed by your administrator.</div>
            </div>
          </div>
        </div>

        {/* Create your account */}
        <div className="at-col-7 at-card" style={{ padding: 'var(--at-space-5)' }}>
          <div className="at-chart__head" style={{ padding: 0, marginBlockEnd: 'var(--at-space-4)' }}>
            <div>
              <div className="at-chart__title">Create your account</div>
              <div className="at-eyebrow">
                Validates on submit, then re-validates on input. Try submitting empty.
              </div>
            </div>
          </div>
          <form className="at-stack" style={{ gap: 'var(--at-space-4)' }} noValidate onSubmit={handleSubmit}>
            {/* name */}
            <div>
              <label className="at-form-label">
                Full name <span className="at-text-muted">*</span>
              </label>
              <input
                className={fieldClass('name')}
                type="text"
                placeholder="Amelia Hart"
                value={values.name}
                onChange={(e) => set('name', e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, name: true }))}
              />
              {touched.name && errors.name ? (
                <div className="at-form-error">{errors.name}</div>
              ) : (
                <div className="at-form-error" style={{ visibility: 'hidden' }}>
                  Enter your full name.
                </div>
              )}
            </div>
            {/* email */}
            <div>
              <label className="at-form-label">
                Work email <span className="at-text-muted">*</span>
              </label>
              <input
                className={fieldClass('email')}
                type="email"
                value={values.email}
                onChange={(e) => set('email', e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                style={
                  touched.email && !errors.email ? { borderColor: 'var(--at-success)' } : undefined
                }
              />
              {touched.email && !errors.email ? (
                <div className="at-form-hint" style={{ color: 'var(--at-success-text)' }}>
                  We send the confirmation link here.
                </div>
              ) : errors.email ? (
                <div className="at-form-error">{errors.email}</div>
              ) : (
                <div className="at-form-hint" style={{ visibility: 'hidden' }}>
                  We send the confirmation link here.
                </div>
              )}
            </div>
            {/* password */}
            <div>
              <label className="at-form-label">
                Password <span className="at-text-muted">*</span>
              </label>
              <input
                className={fieldClass('password')}
                type="password"
                placeholder="At least 8 characters"
                value={values.password}
                onChange={(e) => set('password', e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, password: true }))}
              />
              {touched.password && errors.password ? (
                <div className="at-form-error">{errors.password}</div>
              ) : (
                <div className="at-form-error" style={{ visibility: 'hidden' }}>
                  Use at least 8 characters with one number.
                </div>
              )}
            </div>
            {/* confirm password */}
            <div>
              <label className="at-form-label">
                Confirm password <span className="at-text-muted">*</span>
              </label>
              <input
                className={fieldClass('confirm')}
                type="password"
                placeholder="Re-enter password"
                value={values.confirm}
                onChange={(e) => set('confirm', e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, confirm: true }))}
              />
              {touched.confirm && errors.confirm ? (
                <div className="at-form-error">{errors.confirm}</div>
              ) : (
                <div className="at-form-error" style={{ visibility: 'hidden' }}>
                  Passwords do not match.
                </div>
              )}
            </div>
            {/* terms */}
            <label className="at-check">
              <input type="checkbox" />I agree to the{' '}
              <a className="at-text-strong" href="#">
                Terms
              </a>{' '}
              and{' '}
              <a className="at-text-strong" href="#">
                Privacy Policy
              </a>
              .
            </label>
            <div className="at-cluster" style={{ justifyContent: 'flex-end', gap: 'var(--at-space-3)' }}>
              <button type="reset" className="at-btn at-btn--ghost at-press">
                Reset
              </button>
              <button type="submit" className="at-btn at-btn--primary at-press">
                Create account
              </button>
            </div>
            {submitted && Object.keys(errors).length === 0 && values.name.trim() && (
              <div className="at-form-hint" style={{ color: 'var(--at-success-text)' }}>
                Looks good — all checks passed.
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
