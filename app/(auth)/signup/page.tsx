'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Check, X } from 'lucide-react';

type FormData = {
  organizationName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

function PasswordRule({ met, label }: { met: boolean; label: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: met ? 'var(--success)' : 'var(--fg-3)',
      transition: 'color 120ms',
    }}>
      {met
        ? <Check size={12} />
        : <X size={12} />}
      {label}
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    organizationName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const pw = form.password;
  const passwordRules = {
    length:    pw.length >= 8,
    uppercase: /[A-Z]/.test(pw),
    number:    /[0-9]/.test(pw),
    special:   /[^A-Za-z0-9]/.test(pw),
  };
  const allRulesMet = Object.values(passwordRules).every(Boolean);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  const isFormReady =
    form.organizationName.trim().length > 0 &&
    form.firstName.trim().length > 0 &&
    form.lastName.trim().length > 0 &&
    EMAIL_RE.test(form.email.trim()) &&
    allRulesMet &&
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword;

  const validate = (): boolean => {
    const next: FieldErrors = {};

    if (!form.organizationName.trim()) {
      next.organizationName = 'Organization name is required';
    }
    if (!form.firstName.trim()) {
      next.firstName = 'First name is required';
    }
    if (!form.lastName.trim()) {
      next.lastName = 'Last name is required';
    }
    if (!form.email.trim()) {
      next.email = 'Email is required';
    } else if (!EMAIL_RE.test(form.email.trim())) {
      next.email = 'Please enter a valid email address';
    }
    if (!allRulesMet) {
      next.password = 'Password does not meet all requirements';
    }
    if (form.confirmPassword && form.password !== form.confirmPassword) {
      next.confirmPassword = 'Passwords do not match';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationName: form.organizationName,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error ?? 'Registration failed. Please try again.');
        return;
      }

      router.push('/dashboard');
    } catch {
      setServerError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <header style={{ padding: '20px 32px', borderBottom: '1px solid var(--border-soft)' }}>
        <Link
          href="/"
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: 'var(--cirvio-sage)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          Cirvio
        </Link>
      </header>

      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '48px 24px 64px',
      }}>
        <div className="animate-fade-up-1" style={{ width: '100%', maxWidth: 460 }}>
          <div className="cirvio-glass" style={{ padding: '40px 36px' }}>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: '-0.015em',
                color: 'var(--fg-1)',
                marginBottom: 8,
              }}>
                Create your workspace
              </h1>
              <p style={{ fontSize: 15, color: 'var(--fg-2)' }}>
                Start your 14-day free trial. No credit card required.
              </p>
            </div>

            {serverError && (
              <div style={{
                background: 'var(--danger-bg)',
                border: '1px solid rgba(184,69,69,0.20)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                fontSize: 14,
                color: 'var(--danger)',
                marginBottom: 20,
              }}>
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Organization */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--fg-2)',
                  marginBottom: 6,
                }}>
                  Organization name
                </label>
                <input
                  name="organizationName"
                  type="text"
                  placeholder="Acme Corp"
                  value={form.organizationName}
                  onChange={handleChange}
                  required
                  autoComplete="organization"
                  className={`field${errors.organizationName ? ' error' : ''}`}
                />
                {errors.organizationName && (
                  <p style={{ fontSize: 12, color: 'var(--danger)', marginTop: 4 }}>
                    {errors.organizationName}
                  </p>
                )}
              </div>

              {/* Name row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--fg-2)',
                    marginBottom: 6,
                  }}>
                    First name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="Jane"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    autoComplete="given-name"
                    className={`field${errors.firstName ? ' error' : ''}`}
                  />
                  {errors.firstName && (
                    <p style={{ fontSize: 12, color: 'var(--danger)', marginTop: 4 }}>
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--fg-2)',
                    marginBottom: 6,
                  }}>
                    Last name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    autoComplete="family-name"
                    className={`field${errors.lastName ? ' error' : ''}`}
                  />
                  {errors.lastName && (
                    <p style={{ fontSize: 12, color: 'var(--danger)', marginTop: 4 }}>
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--fg-2)',
                  marginBottom: 6,
                }}>
                  Work email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={() => {
                    setEmailTouched(true);
                    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
                    if (form.email && !EMAIL_RE.test(form.email.trim())) {
                      setErrors(e => ({ ...e, email: 'Please enter a valid email address' }));
                    }
                  }}
                  required
                  autoComplete="email"
                  className={`field${errors.email ? ' error' : ''}`}
                />
                {emailTouched && errors.email && (
                  <p style={{ fontSize: 12, color: 'var(--danger)', marginTop: 4 }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--fg-2)',
                  marginBottom: 6,
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    required
                    autoComplete="new-password"
                    className={`field${errors.password ? ' error' : ''}`}
                    style={{ paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--fg-3)',
                      padding: 0,
                      display: 'flex',
                    }}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {(passwordFocused || form.password) && (
                  <div style={{
                    marginTop: 8,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '6px 16px',
                    padding: '8px 10px',
                    background: 'var(--bg-sunken)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-soft)',
                  }}>
                    <PasswordRule met={passwordRules.length} label="8+ characters" />
                    <PasswordRule met={passwordRules.uppercase} label="Uppercase letter" />
                    <PasswordRule met={passwordRules.number} label="Contains a number" />
                    <PasswordRule met={passwordRules.special} label="Special character" />
                  </div>
                )}
                {errors.password && (
                  <p style={{ fontSize: 12, color: 'var(--danger)', marginTop: 4 }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--fg-2)',
                  marginBottom: 6,
                }}>
                  Confirm password
                </label>
                <input
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  className={`field${errors.confirmPassword ? ' error' : ''}`}
                />
                {errors.confirmPassword && (
                  <p style={{ fontSize: 12, color: 'var(--danger)', marginTop: 4 }}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={!isFormReady || loading}
                style={{
                  width: '100%',
                  padding: '11px 22px',
                  marginTop: 4,
                  opacity: (!isFormReady || loading) ? 0.45 : 1,
                  cursor: (!isFormReady || loading) ? 'not-allowed' : 'pointer',
                  transition: 'opacity 150ms',
                }}
              >
                {loading ? 'Creating workspace…' : 'Create workspace'}
              </button>
            </form>
          </div>

          <p style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 14,
            color: 'var(--fg-2)',
          }}>
            Already have a workspace?{' '}
            <Link
              href="/login"
              style={{ color: 'var(--cirvio-sage)', fontWeight: 500, textDecoration: 'none' }}
            >
              Log in
            </Link>
          </p>
          <p style={{ textAlign: 'center', marginTop: 8, fontSize: 13, color: 'var(--fg-3)' }}>
            Joining an existing workspace?{' '}
            <Link
              href="/accept-invite"
              style={{ color: 'var(--fg-2)', textDecoration: 'none' }}
            >
              Accept your invite
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
