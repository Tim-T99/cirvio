'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  const isFormReady = EMAIL_RE.test(form.email.trim()) && form.password.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Login failed. Check your credentials.');
        return;
      }

      router.push('/dashboard');
    } catch {
      setError('Something went wrong. Please try again.');
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
      <header style={{
        padding: '20px 32px',
        borderBottom: '1px solid var(--border-soft)',
      }}>
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

      {/* Form */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}>
        <div className="animate-fade-up-1" style={{ width: '100%', maxWidth: 420 }}>
          {/* Card */}
          <div className="cirvio-glass" style={{ padding: '40px 36px' }}>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: '-0.015em',
                color: 'var(--fg-1)',
                marginBottom: 8,
              }}>
                Welcome back
              </h1>
              <p style={{ fontSize: 15, color: 'var(--fg-2)' }}>
                Log in to your Cirvio workspace.
              </p>
            </div>

            {error && (
              <div style={{
                background: 'var(--danger-bg)',
                border: '1px solid rgba(184,69,69,0.20)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                fontSize: 14,
                color: 'var(--danger)',
                marginBottom: 20,
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--fg-2)',
                  marginBottom: 6,
                }}>
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="field"
                />
              </div>

              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                }}>
                  <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg-2)' }}>
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    style={{ fontSize: 13, color: 'var(--cirvio-sage)', textDecoration: 'none' }}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    className="field"
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
                {loading ? 'Logging in…' : 'Log in'}
              </button>
            </form>
          </div>

          {/* Footer link */}
          <p style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 14,
            color: 'var(--fg-2)',
          }}>
            Don't have an account?{' '}
            <Link
              href="/signup"
              style={{ color: 'var(--cirvio-sage)', fontWeight: 500, textDecoration: 'none' }}
            >
              Sign up
            </Link>
          </p>
          <p style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: 'var(--fg-3)' }}>
            Admin?{' '}
            <Link
              href="/admin"
              style={{ color: 'var(--fg-2)', textDecoration: 'none' }}
            >
              Admin portal
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
