'use client';

import Link from 'next/link';
import Logo from './Logo';

const productLinks = [
  { label: 'Features',  href: '/features'  },
  { label: 'Pricing',   href: '/pricing'   },
  { label: 'About',     href: '/about'     },
  { label: 'Contact',   href: '/contact'   },
];

const legalLinks = [
  { label: 'Privacy Policy',    href: '/privacy'  },
  { label: 'Terms of Service',  href: '/terms'    },
];

const productLinks2 = [
  { label: 'Log in',    href: '/login'   },
  { label: 'Sign up',   href: '/signup'  },
  { label: 'Admin',     href: '/admin'   },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--neutral-900)',
      color: 'var(--fg-on-dark)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '56px 32px 40px',
      }}>
        {/* Top grid */}
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48,
          marginBottom: 48,
          paddingBottom: 40,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Brand */}
          <div>
            <Logo width={110} color="var(--cirvio-mint)" />
            <p style={{
              marginTop: 16,
              fontSize: 14,
              color: 'var(--neutral-400)',
              lineHeight: 1.65,
              maxWidth: 260,
            }}>
              Workforce compliance for modern HR teams. Track employees, visas, and payroll obligations from one platform.
            </p>
            <p style={{ marginTop: 16, fontSize: 13, color: 'var(--neutral-500)' }}>
              Dubai, UAE · Serving teams globally
            </p>
          </div>

          {/* Product */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--neutral-500)', marginBottom: 16 }}>
              Product
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {productLinks.map(({ label, href }) => (
                <Link key={href} href={href} style={{
                  fontSize: 14, color: 'var(--neutral-400)', textDecoration: 'none',
                  transition: 'color var(--dur-fast)',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--fg-on-dark)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--neutral-400)'}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--neutral-500)', marginBottom: 16 }}>
              Account
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {productLinks2.map(({ label, href }) => (
                <Link key={href} href={href} style={{
                  fontSize: 14, color: 'var(--neutral-400)', textDecoration: 'none',
                  transition: 'color var(--dur-fast)',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--fg-on-dark)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--neutral-400)'}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--neutral-500)', marginBottom: 16 }}>
              Legal
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {legalLinks.map(({ label, href }) => (
                <Link key={href} href={href} style={{
                  fontSize: 14, color: 'var(--neutral-400)', textDecoration: 'none',
                  transition: 'color var(--dur-fast)',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--fg-on-dark)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--neutral-400)'}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ fontSize: 13, color: 'var(--neutral-500)' }}>
            © {new Date().getFullYear()} Cirvio. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: 'var(--neutral-600)' }}>
            Trusted by teams across the Gulf and beyond.
          </p>
        </div>
      </div>
    </footer>
  );
}
