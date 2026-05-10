'use client';

import { useState } from 'react';
import { ArrowRight, Mail, MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const subjects = [
  'General enquiry',
  'Sales & pricing',
  'Technical support',
  'Partnership',
  'Feedback',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('success');
      setForm({ firstName: '', lastName: '', email: '', company: '', phone: '', subject: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    fontSize: 14,
    color: 'var(--fg-1)',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    outline: 'none',
    fontFamily: 'var(--font-jost)',
    transition: 'border-color var(--dur-fast)',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--fg-2)',
    marginBottom: 6,
    display: 'block',
  };

  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* Header */}
      <section style={{
        background: 'var(--cirvio-hunter)',
        padding: '72px 32px 80px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cirvio-mint)', marginBottom: 16 }}>
          Get in touch
        </p>
        <h1 style={{ fontSize: 48, fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--fg-on-dark)', marginBottom: 18, lineHeight: 1.1 }}>
          We'd love to hear from you.
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(236,236,232,0.7)', maxWidth: 480, margin: '0 auto', lineHeight: 1.65 }}>
          Whether you have a question about pricing, features, or compliance requirements — our team is ready to help.
        </p>
      </section>

      {/* Main content */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'start' }} className="contact-grid">

          {/* Info sidebar */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 24 }}>Contact details</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'var(--cirvio-mint-50)', border: '1px solid var(--cirvio-mint-100)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--cirvio-sage)', flexShrink: 0,
                }}>
                  <Mail size={18} />
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-3)', marginBottom: 4 }}>Email</p>
                  <p style={{ fontSize: 14, color: 'var(--fg-1)' }}>hello@cirvio.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'var(--cirvio-mint-50)', border: '1px solid var(--cirvio-mint-100)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--cirvio-sage)', flexShrink: 0,
                }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-3)', marginBottom: 4 }}>Location</p>
                  <p style={{ fontSize: 14, color: 'var(--fg-1)' }}>Dubai, UAE</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'var(--cirvio-mint-50)', border: '1px solid var(--cirvio-mint-100)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--cirvio-sage)', flexShrink: 0,
                }}>
                  <Clock size={18} />
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-3)', marginBottom: 4 }}>Response time</p>
                  <p style={{ fontSize: 14, color: 'var(--fg-1)' }}>Within 1 business day</p>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: 36,
              padding: '20px',
              background: 'var(--cirvio-mint-50)',
              border: '1px solid var(--cirvio-mint-100)',
              borderRadius: 14,
            }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--cirvio-sage)', marginBottom: 6 }}>Looking for a demo?</p>
              <p style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.6, margin: 0 }}>
                Select "Sales &amp; pricing" as the subject and let us know your team size. We'll arrange a live walkthrough.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="cirvio-glass" style={{ padding: '36px 32px', borderRadius: 20 }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'var(--success-bg, #f0faf5)', border: '1px solid var(--success)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <CheckCircle2 size={28} style={{ color: 'var(--success)' }} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 10 }}>Message sent!</h3>
                <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.65, maxWidth: 380, margin: '0 auto 24px' }}>
                  Thank you for reaching out. We've sent a confirmation to your email and will be in touch within one business day.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-ghost"
                  style={{ padding: '10px 20px', fontSize: 14 }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 24 }}>Send a message</h2>

                {status === 'error' && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 16px', borderRadius: 10,
                    background: '#fff1f2', border: '1px solid var(--danger)',
                    marginBottom: 20,
                  }}>
                    <AlertCircle size={16} style={{ color: 'var(--danger)', flexShrink: 0 }} />
                    <p style={{ fontSize: 13, color: 'var(--danger)', margin: 0 }}>{errorMsg}</p>
                  </div>
                )}

                <div className="col-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>First name <span style={{ color: 'var(--danger)' }}>*</span></label>
                    <input
                      required
                      type="text"
                      value={form.firstName}
                      onChange={e => set('firstName', e.target.value)}
                      placeholder="Sarah"
                      style={fieldStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--cirvio-sage)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Last name <span style={{ color: 'var(--danger)' }}>*</span></label>
                    <input
                      required
                      type="text"
                      value={form.lastName}
                      onChange={e => set('lastName', e.target.value)}
                      placeholder="Al Rashid"
                      style={fieldStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--cirvio-sage)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Work email <span style={{ color: 'var(--danger)' }}>*</span></label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    placeholder="sarah@company.ae"
                    style={fieldStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--cirvio-sage)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                <div className="col-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={e => set('company', e.target.value)}
                      placeholder="Acme LLC"
                      style={fieldStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--cirvio-sage)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      placeholder="+971 50 123 4567"
                      style={fieldStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--cirvio-sage)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Subject <span style={{ color: 'var(--danger)' }}>*</span></label>
                  <select
                    required
                    value={form.subject}
                    onChange={e => set('subject', e.target.value)}
                    style={{ ...fieldStyle, appearance: 'none', cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = 'var(--cirvio-sage)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  >
                    <option value="">Select a subject</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Message <span style={{ color: 'var(--danger)' }}>*</span></label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    placeholder="Tell us what you need help with..."
                    style={{ ...fieldStyle, resize: 'vertical', minHeight: 120 }}
                    onFocus={e => e.target.style.borderColor = 'var(--cirvio-sage)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary"
                  style={{ width: '100%', padding: '13px 20px', fontSize: 15, justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
                >
                  {status === 'loading' ? 'Sending…' : (<>Send message <ArrowRight size={15} /></>)}
                </button>

                <p style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 12, textAlign: 'center' }}>
                  We'll never share your details with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
