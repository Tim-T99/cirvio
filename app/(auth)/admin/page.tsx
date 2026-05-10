'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Login failed. Check your credentials.');
        return;
      }

      router.push('/admin/dashboard');
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}>
        <div className="animate-fade-up-1" style={{ width: '100%', maxWidth: 400 }}>
          {/* Portal badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 24,
            padding: '8px 16px',
            background: 'var(--cirvio-mint-50)',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--cirvio-mint-100)',
            width: 'fit-content',
            margin: '0 auto 28px',
          }}>
            <ShieldCheck size={14} style={{ color: 'var(--cirvio-sage)' }} />
            <span style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--cirvio-hunter)',
            }}>
              Admin portal
            </span>
          </div>

          <div className="cirvio-glass" style={{ padding: '40px 36px' }}>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: '-0.015em',
                color: 'var(--fg-1)',
                marginBottom: 8,
              }}>
                Admin sign in
              </h1>
              <p style={{ fontSize: 14, color: 'var(--fg-2)' }}>
                Restricted access. Authorised personnel only.
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
                  placeholder="admin@cirvio.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="field"
                />
              </div>

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
                disabled={loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '11px 22px',
                  marginTop: 4,
                  background: 'var(--cirvio-hunter)',
                  color: 'white',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 500,
                  fontSize: 15,
                  fontFamily: 'inherit',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'background var(--dur-fast) var(--ease-out)',
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.background = 'var(--cirvio-sage-800)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--cirvio-hunter)';
                }}
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </div>

          <p style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 13,
            color: 'var(--fg-3)',
          }}>
            Not an admin?{' '}
            <Link href="/login" style={{ color: 'var(--fg-2)', textDecoration: 'none' }}>
              User login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
