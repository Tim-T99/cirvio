'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Building2, CreditCard,
  ShieldCheck, ClipboardList, LogOut, ChevronRight,
} from 'lucide-react';
import Logo from '../../components/Logo';

const nav = [
  { href: '/admin/dashboard',         label: 'Overview',   icon: <LayoutDashboard size={17} /> },
  { href: '/admin/dashboard/tenants', label: 'Tenants',    icon: <Building2 size={17} /> },
  { href: '/admin/dashboard/plans',   label: 'Plans',      icon: <CreditCard size={17} /> },
  { href: '/admin/dashboard/admins',  label: 'Admins',     icon: <ShieldCheck size={17} /> },
  { href: '/admin/dashboard/audit',   label: 'Audit Log',  icon: <ClipboardList size={17} /> },
];

export default function AdminSideNav({ adminEmail }: { adminEmail?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  }

  function isActive(href: string) {
    if (href === '/admin/dashboard') return pathname === '/admin/dashboard';
    return pathname.startsWith(href);
  }

  return (
    <aside style={{
      width: 240,
      flexShrink: 0,
      background: 'var(--cirvio-hunter)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px' }}>
        <Link href="/admin/dashboard" style={{ display: 'block', marginBottom: 8 }}>
          <Logo width={100} color="var(--cirvio-mint)" />
        </Link>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          background: 'rgba(140,201,181,0.15)',
          border: '1px solid rgba(140,201,181,0.25)',
          borderRadius: 6,
          padding: '3px 10px',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--cirvio-mint)',
        }}>
          <ShieldCheck size={11} /> Admin Console
        </div>
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '0 20px' }} />

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {nav.map(({ href, label, icon }) => {
          const active = isActive(href);
          return (
            <Link key={href} href={href} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              borderRadius: 9,
              fontSize: 14,
              fontWeight: active ? 600 : 400,
              textDecoration: 'none',
              color: active ? 'var(--cirvio-mint)' : 'rgba(236,236,232,0.6)',
              background: active ? 'rgba(140,201,181,0.12)' : 'transparent',
              transition: 'all 0.15s',
            }}>
              <span style={{ opacity: active ? 1 : 0.7 }}>{icon}</span>
              {label}
              {active && <ChevronRight size={13} style={{ marginLeft: 'auto', opacity: 0.6 }} />}
            </Link>
          );
        })}
      </nav>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '0 20px' }} />

      {/* Footer */}
      <div style={{ padding: '16px 20px' }}>
        {adminEmail && (
          <p style={{ fontSize: 12, color: 'rgba(236,236,232,0.4)', marginBottom: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {adminEmail}
          </p>
        )}
        <button onClick={handleLogout} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'rgba(236,236,232,0.5)',
          fontSize: 13,
          fontFamily: 'inherit',
          padding: '6px 0',
          width: '100%',
          transition: 'color 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--danger)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(236,236,232,0.5)'}
        >
          <LogOut size={14} /> Sign out
        </button>
      </div>
    </aside>
  );
}
