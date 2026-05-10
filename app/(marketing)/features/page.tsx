'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import {
  Users, ShieldCheck, FileCheck, Bell,
  CheckCircle2, ArrowRight, FileText,
  BarChart3, Lock, RefreshCw,
} from 'lucide-react';

const features = [
  {
    icon: <Users size={28} />,
    title: 'Employee Management',
    subtitle: 'Complete digital HR records for every team member.',
    points: [
      'Full employee profiles — personal details, emergency contacts, job history',
      'Department and role management with organisational hierarchy',
      'Employment contract storage and expiry tracking',
      'Bulk employee import via CSV or manual entry',
      'Role-based access so HR managers see only what they need',
    ],
    visual: [
      { label: 'Total employees',   value: '84',    color: 'var(--fg-1)' },
      { label: 'Departments',       value: '9',     color: 'var(--fg-1)' },
      { label: 'Active contracts',  value: '81',    color: 'var(--success)' },
      { label: 'Expiring soon',     value: '3',     color: 'var(--warning)' },
    ],
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Visa & Immigration Tracking',
    subtitle: 'Never miss a visa renewal again.',
    points: [
      'Track all visa types — employment, residence, investor, visit',
      'Automated expiry alerts at 90, 60, and 30 days',
      'Store visa documents, entry stamps, and renewal records',
      'GDRFA and ICA status monitoring',
      'Renewal workflow with assignable tasks for your PRO team',
    ],
    visual: [
      { label: 'Employment visa',  value: '62',  color: 'var(--success)' },
      { label: 'Residence visa',   value: '18',  color: 'var(--success)' },
      { label: 'Expiring <30d',    value: '6',   color: 'var(--danger)'  },
      { label: 'Expiring <60d',    value: '11',  color: 'var(--warning)' },
    ],
  },
  {
    icon: <FileCheck size={28} />,
    title: 'WPS Compliance',
    subtitle: 'Wage Protection System filing, simplified.',
    points: [
      'Monthly payroll records with full audit trail',
      'WPS SIF file generation for MOHRE submission',
      'Salary history per employee with change log',
      'Filing deadline reminders and calendar view',
      'MOL compliance status dashboard',
    ],
    visual: [
      { label: 'Last WPS filing',   value: 'On time', color: 'var(--success)' },
      { label: 'This cycle status', value: 'Due Jun 14', color: 'var(--warning)' },
      { label: 'Employees paid',    value: '84 / 84',   color: 'var(--success)' },
      { label: 'SIF file',          value: 'Ready',     color: 'var(--info)'    },
    ],
  },
  {
    icon: <Bell size={28} />,
    title: 'Smart Alerts',
    subtitle: 'Proactive notifications before deadlines hit.',
    points: [
      'Configurable alert windows — 30, 60, or 90 days',
      'Email and in-app notifications for all team members',
      'Escalation rules if actions are not acknowledged',
      'Digest summaries — daily or weekly compliance reports',
      'Alert history and acknowledgement audit trail',
    ],
    visual: [
      { label: 'Active alerts',    value: '14',  color: 'var(--warning)' },
      { label: 'Resolved today',   value: '3',   color: 'var(--success)' },
      { label: 'Critical',         value: '2',   color: 'var(--danger)'  },
      { label: 'Upcoming 30d',     value: '9',   color: 'var(--info)'    },
    ],
  },
];

const extras = [
  { icon: <FileText size={20} />,   title: 'Document Storage',   desc: 'Centralised, secure document repository for all employee and company files.' },
  { icon: <BarChart3 size={20} />,  title: 'Compliance Reports', desc: 'Export audit-ready reports for MOHRE, GDRFA, and internal HR reviews.' },
  { icon: <Lock size={20} />,       title: 'Role-based Access',  desc: 'Tenant Admin, HR Manager, and Viewer roles with granular permissions.' },
  { icon: <RefreshCw size={20} />,  title: 'Renewal Workflows',  desc: 'Assign renewal tasks to your PRO team with due dates and status tracking.' },
];

export default function FeaturesPage() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* Page header */}
      <section style={{
        background: 'var(--cirvio-hunter)',
        padding: '72px 32px 80px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cirvio-mint)', marginBottom: 16 }}>
          Platform features
        </p>
        <h1 style={{ fontSize: 48, fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--fg-on-dark)', marginBottom: 18, lineHeight: 1.1 }}>
          Every tool your HR team needs.
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(236,236,232,0.7)', maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.65 }}>
          Built for complex, multi-national workforces — with deep specialisation in UAE and GCC compliance requirements.
        </p>
        <Link href="/signup" className="btn-primary" style={{ padding: '12px 24px', fontSize: 15, background: 'var(--cirvio-mint)', color: 'var(--cirvio-hunter)' }}>
          Start free trial <ArrowRight size={15} />
        </Link>
      </section>

      {/* Feature sections */}
      {features.map(({ icon, title, subtitle, points, visual }, i) => (
        <section key={title} className="section-pad" style={{
          padding: '80px 32px',
          background: i % 2 === 0 ? 'var(--bg)' : 'var(--neutral-50)',
          borderTop: '1px solid var(--border-soft)',
        }}>
          <div style={{
            maxWidth: 1200, margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
            gap: 64,
            alignItems: 'center',
          }} className="col-2">
            {/* Content */}
            <div className={i % 2 !== 0 ? 'reveal' : 'reveal'} style={{ order: i % 2 !== 0 ? 2 : 1 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: 'var(--cirvio-mint-50)', border: '1px solid var(--cirvio-mint-100)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--cirvio-sage)', marginBottom: 20,
              }}>
                {icon}
              </div>
              <h2 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--fg-1)', marginBottom: 8 }}>
                {title}
              </h2>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', marginBottom: 24, lineHeight: 1.6 }}>{subtitle}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {points.map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <CheckCircle2 size={15} style={{ color: 'var(--success)', flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: 14, color: 'var(--fg-1)', lineHeight: 1.55 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="reveal" style={{ order: i % 2 !== 0 ? 1 : 2 }}>
              <div className="cirvio-glass" style={{ padding: '28px' }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg-2)', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {title} — Live snapshot
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {visual.map(({ label, value, color }) => (
                    <div key={label} style={{
                      background: 'var(--neutral-50)', border: '1px solid var(--border-soft)',
                      borderRadius: 12, padding: '18px 20px',
                    }}>
                      <p style={{ fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, fontWeight: 500 }}>{label}</p>
                      <p style={{ fontSize: 24, fontWeight: 600, color, letterSpacing: '-0.02em' }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Additional features grid */}
      <section className="section-pad" style={{ padding: '80px 32px', background: 'var(--neutral-50)', borderTop: '1px solid var(--border-soft)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--fg-1)' }}>And more, built in.</h2>
          </div>
          <div className="col-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {extras.map(({ icon, title, desc }) => (
              <div key={title} className="cirvio-glass reveal" style={{ padding: '24px' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'var(--cirvio-mint-50)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: 'var(--cirvio-sage)', marginBottom: 14,
                }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ padding: '80px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--fg-1)', marginBottom: 14 }}>
          Ready to get started?
        </h2>
        <p style={{ fontSize: 16, color: 'var(--fg-2)', marginBottom: 32 }}>
          Try Cirvio free for 14 days. No credit card required.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/signup" className="btn-primary" style={{ padding: '12px 24px', fontSize: 15 }}>
            Start free trial <ArrowRight size={15} />
          </Link>
          <Link href="/pricing" className="btn-ghost" style={{ padding: '12px 24px', fontSize: 15 }}>
            View pricing
          </Link>
        </div>
      </section>
    </div>
  );
}
