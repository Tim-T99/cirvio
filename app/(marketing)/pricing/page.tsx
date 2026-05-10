'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { CheckCircle2, ArrowRight, Zap, Building2, Globe } from 'lucide-react';

const plans = [
  {
    icon: <Zap size={22} />,
    name: 'Starter',
    price: 'AED 299',
    period: '/month',
    desc: 'Perfect for small businesses and startups managing up to 25 employees.',
    cta: 'Start free trial',
    ctaHref: '/signup',
    highlight: false,
    features: [
      'Up to 25 employees',
      'Employee profile management',
      'Visa expiry tracking',
      'Basic alert notifications (30-day)',
      'WPS record keeping',
      '2 HR manager accounts',
      'Email support',
      '5 GB document storage',
    ],
  },
  {
    icon: <Building2 size={22} />,
    name: 'Professional',
    price: 'AED 799',
    period: '/month',
    desc: 'For growing companies that need advanced compliance tools and team access.',
    cta: 'Start free trial',
    ctaHref: '/signup',
    highlight: true,
    badge: 'Most popular',
    features: [
      'Up to 150 employees',
      'Everything in Starter',
      'Multi-level alert windows (30/60/90 days)',
      'WPS SIF file generation',
      'GDRFA & ICA status monitoring',
      'Renewal workflow & task assignment',
      'Compliance reports (MOHRE, GDRFA)',
      '5 HR manager accounts',
      'Priority email + chat support',
      '25 GB document storage',
    ],
  },
  {
    icon: <Globe size={22} />,
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For large organisations with complex multi-entity requirements and dedicated support.',
    cta: 'Contact sales',
    ctaHref: '/contact',
    highlight: false,
    features: [
      'Unlimited employees',
      'Everything in Professional',
      'Multi-entity / group company support',
      'Custom alert rules and escalations',
      'API access & webhooks',
      'SSO / SAML integration',
      'Dedicated account manager',
      'SLA-backed uptime guarantee',
      'Unlimited HR accounts',
      'Unlimited document storage',
      'Custom onboarding & training',
    ],
  },
];

const faqs = [
  {
    q: 'Is there a free trial?',
    a: 'Yes — all paid plans include a 14-day free trial with no credit card required. You can explore every feature before committing.',
  },
  {
    q: 'Can I change plans later?',
    a: 'Absolutely. You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at your next billing cycle.',
  },
  {
    q: 'How is the employee count calculated?',
    a: 'We count active employees on your account at the start of each billing cycle. Archived or terminated employees do not count.',
  },
  {
    q: 'Is my data stored in the UAE?',
    a: 'Yes. All data is stored on UAE-region servers to comply with local data residency requirements.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards, as well as bank transfer for annual plans. AED invoicing is available for UAE businesses.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes — annual billing gives you two months free compared to monthly pricing. Contact us to set up an annual plan.',
  },
];

export default function PricingPage() {
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
          Pricing
        </p>
        <h1 style={{ fontSize: 48, fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--fg-on-dark)', marginBottom: 18, lineHeight: 1.1 }}>
          Simple, transparent pricing.
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(236,236,232,0.7)', maxWidth: 480, margin: '0 auto', lineHeight: 1.65 }}>
          No hidden fees. No per-module charges. Everything your team needs to stay compliant, in one flat price.
        </p>
      </section>

      {/* Pricing cards */}
      <section style={{ padding: '80px 32px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="col-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, alignItems: 'stretch' }}>
            {plans.map(({ icon, name, price, period, desc, cta, ctaHref, highlight, badge, features }) => (
              <div key={name} className="reveal cirvio-glass" style={{
                padding: '32px 28px',
                border: highlight ? '2px solid var(--cirvio-sage)' : '1px solid var(--border)',
                borderRadius: 20,
                background: highlight ? 'var(--cirvio-mint-50)' : 'var(--bg)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}>
                {badge && (
                  <div style={{
                    position: 'absolute',
                    top: -14,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--cirvio-sage)',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '4px 14px',
                    borderRadius: 99,
                    whiteSpace: 'nowrap',
                  }}>
                    {badge}
                  </div>
                )}

                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: highlight ? 'var(--cirvio-sage)' : 'var(--cirvio-mint-50)',
                  border: highlight ? 'none' : '1px solid var(--cirvio-mint-100)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: highlight ? '#fff' : 'var(--cirvio-sage)',
                  marginBottom: 20,
                }}>
                  {icon}
                </div>

                <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 4 }}>{name}</h2>
                <p style={{ fontSize: 13, color: 'var(--fg-3)', marginBottom: 20, lineHeight: 1.5 }}>{desc}</p>

                <div style={{ marginBottom: 28 }}>
                  <span style={{ fontSize: 38, fontWeight: 700, color: 'var(--fg-1)', letterSpacing: '-0.03em' }}>{price}</span>
                  {period && <span style={{ fontSize: 15, color: 'var(--fg-3)', marginLeft: 4 }}>{period}</span>}
                </div>

                <Link href={ctaHref} className={highlight ? 'btn-primary' : 'btn-ghost'} style={{
                  padding: '11px 20px',
                  fontSize: 14,
                  justifyContent: 'center',
                  marginBottom: 28,
                }}>
                  {cta} <ArrowRight size={14} />
                </Link>

                <div style={{ height: 1, background: 'var(--border-soft)', marginBottom: 24 }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  {features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <CheckCircle2 size={14} style={{ color: 'var(--success)', flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="reveal" style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: 'var(--fg-3)' }}>
            All prices exclude VAT. Annual billing available at 2 months free.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 32px', background: 'var(--neutral-50)', borderTop: '1px solid var(--border-soft)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--fg-1)', marginBottom: 12 }}>
              Frequently asked questions
            </h2>
            <p style={{ fontSize: 15, color: 'var(--fg-2)' }}>
              Still have questions? <Link href="/contact" style={{ color: 'var(--cirvio-sage)', textDecoration: 'none', fontWeight: 500 }}>Get in touch →</Link>
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {faqs.map(({ q, a }) => (
              <div key={q} className="cirvio-glass reveal" style={{ padding: '24px 28px', borderRadius: 16 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 8 }}>{q}</h3>
                <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.65, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--fg-1)', marginBottom: 14 }}>
          14 days free. No card required.
        </h2>
        <p style={{ fontSize: 16, color: 'var(--fg-2)', marginBottom: 32 }}>
          Get started today and see how Cirvio simplifies your UAE compliance workflow.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/signup" className="btn-primary" style={{ padding: '12px 24px', fontSize: 15 }}>
            Start free trial <ArrowRight size={15} />
          </Link>
          <Link href="/contact" className="btn-ghost" style={{ padding: '12px 24px', fontSize: 15 }}>
            Talk to sales
          </Link>
        </div>
      </section>
    </div>
  );
}
