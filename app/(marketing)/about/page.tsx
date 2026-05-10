'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { ArrowRight, Target, ShieldCheck, Users, Lightbulb } from 'lucide-react';

const values = [
  {
    icon: <Target size={22} />,
    title: 'Built for UAE compliance',
    desc: 'Every feature is designed around the specific requirements of MOHRE, GDRFA, and UAE labour law — not retrofitted from a generic HR tool.',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Reliability you can depend on',
    desc: 'Compliance deadlines cannot be missed. We build every alert system and reminder with the assumption that silence is not acceptable.',
  },
  {
    icon: <Users size={22} />,
    title: 'Made for HR teams, not IT teams',
    desc: 'Cirvio is built to be used by HR managers and PRO officers, not system administrators. No technical setup required.',
  },
  {
    icon: <Lightbulb size={22} />,
    title: 'Transparent and honest',
    desc: 'Simple pricing, no hidden modules, and no surprise add-ons. If you need something we don\'t offer, we\'ll tell you.',
  },
];

const stats = [
  { value: '1,200+', label: 'Employees tracked' },
  { value: '98%',    label: 'On-time filing rate' },
  { value: '40+',    label: 'UAE companies' },
  { value: '0',      label: 'Missed renewals' },
];

export default function AboutPage() {
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

      {/* Hero */}
      <section style={{
        background: 'var(--cirvio-hunter)',
        padding: '72px 32px 80px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cirvio-mint)', marginBottom: 16 }}>
          About Cirvio
        </p>
        <h1 style={{ fontSize: 48, fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--fg-on-dark)', marginBottom: 18, lineHeight: 1.1, maxWidth: 640, margin: '0 auto 18px' }}>
          We exist so businesses never miss a compliance deadline.
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(236,236,232,0.7)', maxWidth: 560, margin: '0 auto', lineHeight: 1.65 }}>
          Cirvio was built to solve a very specific problem — managing employee visas, payroll compliance, and labour obligations is fragile, manual, and high-stakes for any growing company.
        </p>
      </section>

      {/* Mission */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--fg-1)', marginBottom: 20 }}>
              The problem we set out to solve
            </h2>
            <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.75, marginBottom: 16 }}>
              Managing a multinational workforce means juggling dozens of overlapping obligations — employment visas that expire at different times, payroll filings due each month, residency permits, government ID renewals, and labour card updates. For most companies, this is tracked in spreadsheets and chat reminders. When something slips, the consequences range from fines to visa cancellations.
            </p>
            <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.75 }}>
              Cirvio replaces that fragile system with a single platform that tracks everything, notifies the right people before deadlines hit, and produces the records regulators actually ask for.
            </p>
          </div>

          {/* Stats strip */}
          <div className="col-4 reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, textAlign: 'center' }}>
            {stats.map(({ value, label }) => (
              <div key={label} className="cirvio-glass" style={{ padding: '28px 16px' }}>
                <p style={{ fontSize: 36, fontWeight: 700, color: 'var(--cirvio-sage)', letterSpacing: '-0.03em', marginBottom: 6 }}>{value}</p>
                <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.4 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 32px', background: 'var(--neutral-50)', borderTop: '1px solid var(--border-soft)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--fg-1)' }}>
              How we build
            </h2>
          </div>
          <div className="col-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="cirvio-glass reveal" style={{ padding: '28px' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'var(--cirvio-mint-50)', border: '1px solid var(--cirvio-mint-100)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--cirvio-sage)', marginBottom: 16,
                }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="reveal">
            <h2 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--fg-1)', marginBottom: 20 }}>
              Built in Dubai, serving teams across the globe
            </h2>
            <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.75, marginBottom: 16 }}>
              Cirvio is based in Dubai and carries deep expertise in UAE and GCC regulatory requirements — MOHRE, GDRFA, ICA, and the Wage Protection System. That specialisation is our foundation, not our ceiling.
            </p>
            <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.75, marginBottom: 16 }}>
              We serve businesses of all sizes and nationalities that operate in the Gulf — from homegrown SMEs to international companies setting up regional headquarters. Whether your workforce is entirely local or spans dozens of nationalities, Cirvio is built to handle the complexity that comes with managing people across jurisdictions.
            </p>
            <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.75 }}>
              Our goal is simple: every business using Cirvio should have zero missed deadlines, zero compliance surprises, and an HR team that can focus on people instead of paperwork.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 32px', background: 'var(--cirvio-hunter)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--fg-on-dark)', marginBottom: 14 }}>
          Ready to simplify your compliance?
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(236,236,232,0.7)', marginBottom: 32 }}>
          Join businesses across the Gulf already using Cirvio to stay ahead of every deadline.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/signup" className="btn-primary" style={{
            padding: '12px 24px', fontSize: 15,
            background: 'var(--cirvio-mint)', color: 'var(--cirvio-hunter)',
          }}>
            Start free trial <ArrowRight size={15} />
          </Link>
          <Link href="/contact" style={{
            padding: '12px 24px', fontSize: 15, fontWeight: 500,
            color: 'rgba(236,236,232,0.8)', textDecoration: 'none',
            border: '1px solid rgba(236,236,232,0.2)',
            borderRadius: 'var(--radius-md)',
            display: 'flex', alignItems: 'center', gap: 8,
            transition: 'color var(--dur-fast)',
          }}>
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
