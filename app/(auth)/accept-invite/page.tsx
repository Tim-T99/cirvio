'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Check, X, AlertTriangle } from 'lucide-react';

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
      {met ? <Check size={12} /> : <X size={12} />}
      {label}
    </div>
  );
}

function AcceptInviteForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token');

  const [form, setForm] = useState({ firstName: '', lastName: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [inviteInfo, setInviteInfo] = useState<{ email?: string; organizationName?: string } | null>(null);
  const [tokenError, setTokenError] = useState('');

  const pw = form.password;
  const passwordRules = {
    length:    pw.length >= 8,
    uppercase: /[A-Z]/.test(pw),
    number:    /[0-9]/.test(pw),
    special:   /[^A-Za-z0-9]/.test(pw),
  };
  const allRulesMet = Object.values(passwordRules).every(Boolean);

  const isFormReady =
    form.firstName.trim().length > 0 &&
    form.lastName.trim().length > 0 &&
    allRulesMet &&
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword;

  useEffect(() => {
    if (!token) {
      setTokenError('No invite token found. Please check your invite link.');
      return;
    }
    // Optionally validate token and prefetch invite info
    fetch(`/api/auth/accept-invite?token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) setTokenError(d.error);
        else setInviteInfo(d);
      })
      .catch(() => setTokenError('Unable to validate invite link. Please try again.'));
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormReady || !token) return;

    setLoading(true);
    setServerError('');

    try {
      const res = await fetch('/api/auth/accept-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, ...form }),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error ?? 'Failed to accept invite. Please try again.');
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push('/login'), 2500);
    } catch {
      setServerError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '20px 32px', borderBottom: '1px solid var(--border-soft)' }}>
        <Link href="/" style={{ fontSize: 20, fontWeight: 600, color: 'var(--cirvio-sage)', textDecoration: 'none', letterSpacing: '-0.02em' }}>
          Cirvio
        </Link>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px 64px' }}>
        <div className="animate-fade-up-1" style={{ width: '100%', maxWidth: 460 }}>

          {/* Invalid token state */}
          {tokenError && (
            <div className="cirvio-glass" style={{ padding: '40px 36px', textAlign: 'center' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--warning-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <AlertTriangle size={24} color="var(--warning)" />
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 8, letterSpacing: '-0.015em' }}>
                Invalid invite link
              </h1>
              <p style={{ fontSize: 15, color: 'var(--fg-2)', marginBottom: 28, lineHeight: 1.5 }}>
                {tokenError}
              </p>
              <Link href="/login" style={{
                display: 'inline-block',
                padding: '10px 24px',
                background: 'var(--cirvio-hunter)',
                color: '#fff',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
              }}>
                Go to login
              </Link>
            </div>
          )}

          {/* Success state */}
          {!tokenError && success && (
            <div className="cirvio-glass" style={{ padding: '40px 36px', textAlign: 'center' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--success-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <Check size={24} color="var(--success)" />
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 8, letterSpacing: '-0.015em' }}>
                Welcome aboard!
              </h1>
              <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.5 }}>
                Your account is ready. Redirecting you to login…
              </p>
            </div>
          )}

          {/* Form state */}
          {!tokenError && !success && (
            <div className="cirvio-glass" style={{ padding: '40px 36px' }}>
              <div style={{ marginBottom: 28 }}>
                {inviteInfo?.organizationName && (
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: 'var(--cirvio-mint-50)',
                    border: '1px solid var(--cirvio-mint-300)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '4px 12px',
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--cirvio-sage-800)',
                    marginBottom: 16,
                  }}>
                    {inviteInfo.organizationName}
                  </div>
                )}
                <h1 style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--fg-1)', marginBottom: 8 }}>
                  Accept your invite
                </h1>
                <p style={{ fontSize: 15, color: 'var(--fg-2)' }}>
                  {inviteInfo?.email
                    ? <>You've been invited as <strong style={{ color: 'var(--fg-1)' }}>{inviteInfo.email}</strong>. Set up your account below.</>
                    : 'Set up your account to join your team on Cirvio.'}
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--fg-2)', marginBottom: 6 }}>
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
                      className="field"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--fg-2)', marginBottom: 6 }}>
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
                      className="field"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--fg-2)', marginBottom: 6 }}>
                    Create password
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
                      className="field"
                      style={{ paddingRight: 44 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      tabIndex={-1}
                      style={{
                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                        background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-3)',
                        padding: 0, display: 'flex',
                      }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {(passwordFocused || form.password) && (
                    <div style={{
                      marginTop: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px',
                      padding: '8px 10px', background: 'var(--bg-sunken)',
                      borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-soft)',
                    }}>
                      <PasswordRule met={passwordRules.length} label="8+ characters" />
                      <PasswordRule met={passwordRules.uppercase} label="Uppercase letter" />
                      <PasswordRule met={passwordRules.number} label="Contains a number" />
                      <PasswordRule met={passwordRules.special} label="Special character" />
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--fg-2)', marginBottom: 6 }}>
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
                    className={`field${form.confirmPassword && form.password !== form.confirmPassword ? ' error' : ''}`}
                  />
                  {form.confirmPassword && form.password !== form.confirmPassword && (
                    <p style={{ fontSize: 12, color: 'var(--danger)', marginTop: 4 }}>Passwords do not match</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={!isFormReady || loading}
                  style={{
                    width: '100%', padding: '11px 22px', marginTop: 4,
                    opacity: (!isFormReady || loading) ? 0.45 : 1,
                    cursor: (!isFormReady || loading) ? 'not-allowed' : 'pointer',
                    transition: 'opacity 150ms',
                  }}
                >
                  {loading ? 'Setting up account…' : 'Accept invite'}
                </button>
              </form>
            </div>
          )}

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--fg-2)' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--cirvio-sage)', fontWeight: 500, textDecoration: 'none' }}>
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default function AcceptInvitePage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 14, color: 'var(--fg-3)' }}>Loading…</div>
      </div>
    }>
      <AcceptInviteForm />
    </Suspense>
  );
}
