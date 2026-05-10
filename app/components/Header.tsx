'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing',  href: '/pricing'  },
  { label: 'About',    href: '/about'    },
  { label: 'Contact',  href: '/contact'  },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(248,248,246,0.92)',
      backdropFilter: 'blur(16px) saturate(140%)',
      WebkitBackdropFilter: 'blur(16px) saturate(140%)',
      borderBottom: '1px solid var(--border-soft)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 32px',
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Logo width={120} color="var(--cirvio-sage)" />
        </Link>

        {/* Desktop nav */}
        <nav className="desktop-only" style={{ gap: 4, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              color: pathname === href ? 'var(--cirvio-sage)' : 'var(--fg-2)',
              background: pathname === href ? 'var(--cirvio-mint-50)' : 'transparent',
              transition: 'color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)',
            }}
              onMouseEnter={e => { if (pathname !== href) { e.currentTarget.style.color = 'var(--fg-1)'; e.currentTarget.style.background = 'var(--neutral-100)'; }}}
              onMouseLeave={e => { if (pathname !== href) { e.currentTarget.style.color = 'var(--fg-2)'; e.currentTarget.style.background = 'transparent'; }}}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="desktop-only" style={{ gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <Link href="/login" style={{
            padding: '7px 16px',
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--fg-2)',
            textDecoration: 'none',
            borderRadius: 'var(--radius-md)',
            transition: 'color var(--dur-fast)',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--fg-1)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-2)'}
          >
            Log in
          </Link>
          <Link href="/signup" className="btn-primary" style={{ padding: '8px 18px', fontSize: 14 }}>
            Get started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-only"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--fg-1)',
            padding: 6,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 68,
          left: 0,
          right: 0,
          background: 'rgba(248,248,246,0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          padding: '12px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          boxShadow: 'var(--shadow-lg)',
        }}>
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href}
              onClick={() => setOpen(false)}
              style={{
                padding: '12px 14px',
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 500,
                textDecoration: 'none',
                color: pathname === href ? 'var(--cirvio-sage)' : 'var(--fg-1)',
                background: pathname === href ? 'var(--cirvio-mint-50)' : 'transparent',
              }}
            >
              {label}
            </Link>
          ))}
          <div style={{ height: 1, background: 'var(--border-soft)', margin: '8px 0' }} />
          <Link href="/login" onClick={() => setOpen(false)} style={{
            padding: '12px 14px', fontSize: 16, fontWeight: 500,
            textDecoration: 'none', color: 'var(--fg-2)', borderRadius: 10,
          }}>
            Log in
          </Link>
          <Link href="/signup" onClick={() => setOpen(false)} className="btn-primary"
            style={{ padding: '12px 14px', fontSize: 15, justifyContent: 'center', borderRadius: 12 }}>
            Get started free
          </Link>
        </div>
      )}
    </header>
  );
}
