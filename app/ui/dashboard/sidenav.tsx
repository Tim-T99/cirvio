'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import NavLinks from './nav-links';

export default function SideNav() {
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <aside style={{
      width: 240,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--neutral-900)',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      padding: '16px 12px',
    }}>
      {/* Logo */}
      <div style={{
        padding: '8px 12px 20px',
        marginBottom: 4,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <span style={{
          fontSize: 20,
          fontWeight: 600,
          color: 'var(--cirvio-mint)',
          letterSpacing: '-0.02em',
        }}>
          Cirvio
        </span>
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, paddingTop: 12 }}>
        <NavLinks />
      </nav>

      {/* Sign out */}
      <div style={{ paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onClick={handleSignOut}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            width: '100%',
            padding: '9px 12px',
            borderRadius: 'var(--radius-sm)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--neutral-400)',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: 'inherit',
            transition:
              'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.color = 'var(--fg-on-dark)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--neutral-400)';
          }}
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
