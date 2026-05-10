'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import {
  Users, FileCheck, ShieldCheck, Bell,
  ArrowRight, CheckCircle2, Building2,
  ChevronRight,
} from 'lucide-react';

const features = [
  {
    icon: <Users size={22} />,
    title: 'Employee Records',
    desc: 'Complete digital profiles for every employee — contracts, IDs, and HR data in one secure place.',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Visa Tracking',
    desc: 'Monitor visa types, status, and expiry dates. Receive automated alerts 90, 60, and 30 days before renewal.',
  },
  {
    icon: <FileCheck size={22} />,
    title: 'Payroll Compliance',
    desc: 'Stay on top of payroll filings and Wage Protection System requirements with a full audit trail.',
  },
  {
    icon: <Bell size={22} />,
    title: 'Smart Alerts',
    desc: 'Automated notifications for visas, trade licenses, and document renewals. Never miss a deadline.',
  },
];

const steps = [
  {
    n: '01',
    title: 'Add your employees',
    desc: 'Import or manually enter staff records, documents, and visa details in minutes.',
  },
  {
    n: '02',
    title: 'Configure your alerts',
    desc: 'Set notification windows — 30, 60, or 90 days — for every visa and compliance deadline.',
  },
  {
    n: '03',
    title: 'Stay ahead of deadlines',
    desc: 'Get proactive alerts and a live compliance dashboard so nothing slips through.',
  },
];

const stats = [
  { value: '100%', label: 'Audit ready' },
  { value: '14-day', label: 'Free trial' },
  { value: 'Real-time', label: 'Alerts' },
  { value: 'Multi-region', label: 'Compliance' },
];

export default function HomePage() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="marketing-hero" style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '80px 32px 96px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'center',
      }}>
        {/* Copy */}
        <div>
          <div className="animate-fade-up-1" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--cirvio-mint-50)',
            border: '1px solid var(--cirvio-mint-100)',
            borderRadius: 'var(--radius-pill)',
            padding: '5px 14px',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--cirvio-hunter)',
            marginBottom: 28,
          }}>
            <Building2 size={13} />
            Trusted by teams across the Gulf
          </div>

          <h1 className="animate-fade-up-2" style={{
            fontSize: 52,
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: '-0.025em',
            color: 'var(--fg-1)',
            marginBottom: 22,
          }}>
            Workforce<br />
            compliance,<br />
            <span style={{ color: 'var(--cirvio-sage)' }}>simplified.</span>
          </h1>

          <p className="animate-fade-up-3" style={{
            fontSize: 18,
            color: 'var(--fg-2)',
            lineHeight: 1.65,
            marginBottom: 36,
            maxWidth: 460,
          }}>
            Track employee visas, manage payroll compliance, and stay ahead of every regulatory deadline — from a single platform built for modern HR teams.
          </p>

          <div className="hero-ctas animate-fade-up-4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn-primary" style={{ padding: '12px 24px', fontSize: 15 }}>
              Start free trial
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-ghost" style={{ padding: '12px 24px', fontSize: 15 }}>
              Book a demo
            </Link>
          </div>

          <p className="animate-fade-up-5" style={{ marginTop: 18, fontSize: 13, color: 'var(--fg-3)' }}>
            No credit card required · 14-day free trial
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="animate-fade-up-3" style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: -40,
            background: 'radial-gradient(ellipse at 60% 40%, rgba(140,201,181,0.16) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div className="cirvio-glass" style={{ overflow: 'hidden', position: 'relative' }}>
            {/* Mock header */}
            <div style={{
              padding: '14px 20px',
              borderBottom: '1px solid var(--border-soft)',
              background: 'rgba(255,255,255,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-1)' }}>Compliance Overview</span>
              <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
                All systems active
              </span>
            </div>

            <div style={{ padding: '20px' }}>
              {/* Stat row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
                {[
                  { label: 'Employees', value: '84', sub: '3 added this month' },
                  { label: 'Visas expiring', value: '6', sub: 'Next 30 days', warn: true },
                  { label: 'WPS status', value: 'Filed', sub: 'Last cycle: on time', ok: true },
                ].map(s => (
                  <div key={s.label} style={{
                    background: 'var(--neutral-50)',
                    border: '1px solid var(--border-soft)',
                    borderRadius: 12,
                    padding: '14px 16px',
                  }}>
                    <p style={{ fontSize: 11, color: 'var(--fg-3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>{s.label}</p>
                    <p style={{ fontSize: 22, fontWeight: 600, color: s.warn ? 'var(--warning)' : s.ok ? 'var(--success)' : 'var(--fg-1)', letterSpacing: '-0.02em' }}>{s.value}</p>
                    <p style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Alert list */}
              <div style={{ background: 'var(--neutral-50)', border: '1px solid var(--border-soft)', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-soft)' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-2)' }}>Upcoming alerts</span>
                </div>
                {[
                  { name: 'Ahmed Al Mansoori', type: 'Visa renewal', days: 12, urgent: true },
                  { name: 'Sarah Okafor',       type: 'Visa renewal', days: 24, urgent: false },
                  { name: 'Ravi Shankar',        type: 'Labour card', days: 31, urgent: false },
                ].map((a, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 16px',
                    borderBottom: i < 2 ? '1px solid var(--border-soft)' : 'none',
                  }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg-1)' }}>{a.name}</p>
                      <p style={{ fontSize: 11, color: 'var(--fg-3)' }}>{a.type}</p>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-pill)',
                      background: a.urgent ? 'var(--danger-bg)' : 'var(--warning-bg)',
                      color: a.urgent ? 'var(--danger)' : 'var(--warning)',
                    }}>
                      {a.days}d left
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────── */}
      <div style={{
        background: 'var(--cirvio-hunter)',
        padding: '0 32px',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 0,
        }}>
          {stats.map(({ value, label }, i) => (
            <div key={label} style={{
              padding: '28px 32px',
              textAlign: 'center',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <p style={{ fontSize: 26, fontWeight: 600, color: 'var(--cirvio-mint)', letterSpacing: '-0.02em', marginBottom: 4 }}>{value}</p>
              <p style={{ fontSize: 13, color: 'rgba(236,236,232,0.65)', fontWeight: 500 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ─────────────────────────────────── */}
      <section className="section-pad" style={{ padding: '88px 32px', background: 'var(--neutral-50)', borderTop: '1px solid var(--border-soft)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--cirvio-sage)', marginBottom: 10 }}>
              Everything you need
            </p>
            <h2 className="section-title" style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--fg-1)', marginBottom: 12 }}>
              One platform for every workforce obligation.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--fg-2)', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
              Cirvio brings employee records, visa tracking, and payroll compliance into a single, organised workspace — wherever your team is based.
            </p>
          </div>

          <div className="col-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 }}>
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="cirvio-glass reveal" style={{ padding: '32px' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'var(--cirvio-mint-50)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--cirvio-sage)', marginBottom: 20,
                }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.65 }}>{desc}</p>
                <Link href="/features" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 20,
                  fontSize: 13, fontWeight: 500, color: 'var(--cirvio-sage)', textDecoration: 'none',
                }}>
                  Learn more <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────── */}
      <section className="section-pad" style={{ padding: '88px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--cirvio-sage)', marginBottom: 10 }}>
              How it works
            </p>
            <h2 className="section-title" style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--fg-1)' }}>
              Up and running in minutes.
            </h2>
          </div>

          <div className="col-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 40, position: 'relative' }}>
            <div style={{
              position: 'absolute', top: 36, left: '18%', right: '18%',
              height: 1,
              background: 'linear-gradient(90deg, var(--cirvio-mint-100), var(--cirvio-mint), var(--cirvio-mint-100))',
            }} className="desktop-only" />
            {steps.map(({ n, title, desc }, i) => (
              <div key={n} className={`reveal reveal-d${i + 1}`} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%', margin: '0 auto 20px',
                  background: 'var(--neutral-0)', border: '2px solid var(--cirvio-mint-100)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--cirvio-sage)' }}>{n}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance checklist ─────────────────────── */}
      <section className="section-pad" style={{
        padding: '88px 32px',
        background: 'var(--neutral-50)',
        borderTop: '1px solid var(--border-soft)',
        borderBottom: '1px solid var(--border-soft)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="col-2">
          <div className="reveal">
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--cirvio-sage)', marginBottom: 12 }}>
              Built-in compliance coverage
            </p>
            <h2 className="section-title" style={{ fontSize: 34, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--fg-1)', marginBottom: 16, lineHeight: 1.2 }}>
              Every obligation, tracked automatically.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.65, marginBottom: 28 }}>
              From employment visas to payroll cycles, Cirvio monitors every compliance requirement so your HR team can focus on people, not paperwork.
            </p>
            {[
              'Employment visa monitoring and renewal alerts',
              'Payroll filing reminders and full audit logs',
              'Trade licence and document expiry tracking',
              'Labour card status and renewal management',
              'Regulatory deadline notifications (MOHRE, GDRFA, and more)',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <CheckCircle2 size={16} style={{ color: 'var(--success)', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 14, color: 'var(--fg-1)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
            <Link href="/features" className="btn-primary" style={{ marginTop: 28, display: 'inline-flex', padding: '11px 22px' }}>
              Explore all features <ArrowRight size={15} />
            </Link>
          </div>

          {/* Visual */}
          <div className="reveal" style={{ position: 'relative' }}>
            <div className="cirvio-glass" style={{ padding: '28px' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 16 }}>Compliance calendar — June 2025</p>
              {[
                { name: 'WPS filing deadline',       date: 'Jun 14', status: 'upcoming', dot: 'var(--warning)' },
                { name: 'Visa renewal — 4 employees',date: 'Jun 17', status: 'action needed', dot: 'var(--danger)' },
                { name: 'Labour card — R. Shankar',  date: 'Jun 28', status: 'upcoming', dot: 'var(--warning)' },
                { name: 'Trade licence renewal',     date: 'Jul 03', status: 'upcoming', dot: 'var(--info)' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 0',
                  borderBottom: i < 3 ? '1px solid var(--border-soft)' : 'none',
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.dot, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg-1)', marginBottom: 2 }}>{item.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--fg-3)' }}>{item.date}</p>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 500,
                    padding: '2px 8px', borderRadius: 'var(--radius-pill)',
                    background: item.status === 'action needed' ? 'var(--danger-bg)' : 'var(--warning-bg)',
                    color: item.status === 'action needed' ? 'var(--danger)' : 'var(--warning)',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────── */}
      <section className="section-pad" style={{ padding: '96px 32px' }}>
        <div className="cirvio-glass reveal" style={{
          maxWidth: 760, margin: '0 auto',
          textAlign: 'center', padding: '64px 48px',
        }}>
          <h2 style={{ fontSize: 38, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--fg-1)', marginBottom: 14 }}>
            Start managing compliance the right way.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--fg-2)', marginBottom: 32, lineHeight: 1.65 }}>
            14 days free. No credit card required. Set up in under 10 minutes.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn-primary" style={{ padding: '13px 28px', fontSize: 16 }}>
              Start free trial <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-ghost" style={{ padding: '13px 28px', fontSize: 16 }}>
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
