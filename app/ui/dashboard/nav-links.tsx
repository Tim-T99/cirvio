'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, FolderOpen, Settings } from 'lucide-react';

const links = [
  { name: 'Chat', href: '/dashboard', icon: <MessageSquare size={16} /> },
  { name: 'Documents', href: '/dashboard/documents', icon: <FolderOpen size={16} /> },
  { name: 'Settings', href: '/dashboard/settings', icon: <Settings size={16} /> },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {links.map(({ name, href, icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={name}
            href={href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
              transition:
                'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
              background: active ? 'rgba(140,201,181,0.14)' : 'transparent',
              color: active ? 'var(--cirvio-mint)' : 'var(--neutral-400)',
            }}
            onMouseEnter={(e) => {
              if (!active) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.color = 'var(--fg-on-dark)';
              }
            }}
            onMouseLeave={(e) => {
              if (!active) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--neutral-400)';
              }
            }}
          >
            {icon}
            {name}
          </Link>
        );
      })}
    </div>
  );
}
