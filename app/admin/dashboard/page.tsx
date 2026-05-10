'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Building2, Users, UserCheck, AlertTriangle,
  TrendingUp, ChevronRight, RefreshCw,
} from 'lucide-react';

type Stats = {
  tenants: { total: number; trial: number; active: number; suspended: number; cancelled: number };
  users: { total: number };
  employees: { total: number };
  admins: { total: number };
};

type Tenant = {
  id: string;
  name: string;
  slug: string;
  status: string;
  plan?: { name: string };
  trialEndsAt?: string;
  createdAt: string;
  _count?: { employees: number; users: number };
};

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    ACTIVE:    { bg: 'rgba(61,140,114,0.12)',  color: 'var(--success)' },
    TRIAL:     { bg: 'rgba(46,111,198,0.12)',  color: '#2E6FC6' },
    SUSPENDED: { bg: 'rgba(198,138,46,0.12)',  color: 'var(--warning)' },
    CANCELLED: { bg: 'rgba(184,69,69,0.12)',   color: 'var(--danger)' },
  };
  const s = map[status] ?? { bg: 'var(--neutral-100)', color: 'var(--fg-2)' };
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: 99,
      fontSize: 11,
      fontWeight: 600,
      background: s.bg,
      color: s.color,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    }}>
      {status}
    </span>
  );
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      const [s, t] = await Promise.all([
        fetch('/api/admin/stats').then(r => r.json()),
        fetch('/api/admin/tenants?limit=6&sort=createdAt&order=desc').then(r => r.json()),
      ]);
      setStats(s);
      setTenants(t.data ?? []);
    } catch {
      setError('Could not load dashboard data. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const statCards = stats ? [
    { label: 'Total tenants',  value: stats.tenants.total,     icon: <Building2 size={20} />, href: '/admin/dashboard/tenants' },
    { label: 'Active',         value: stats.tenants.active,    icon: <TrendingUp size={20} />, color: 'var(--success)' },
    { label: 'On trial',       value: stats.tenants.trial,     icon: <UserCheck size={20} />, color: '#2E6FC6' },
    { label: 'Suspended',      value: stats.tenants.suspended, icon: <AlertTriangle size={20} />, color: 'var(--warning)' },
    { label: 'Total employees',value: stats.employees.total,   icon: <Users size={20} /> },
    { label: 'Platform admins',value: stats.admins.total,      icon: <UserCheck size={20} /> },
  ] : [];

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1200 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 4 }}>Platform Overview</h1>
          <p style={{ fontSize: 14, color: 'var(--fg-3)' }}>
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <button onClick={load} disabled={loading} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 16px', borderRadius: 9, border: '1px solid var(--border)',
          background: 'var(--bg)', color: 'var(--fg-2)', fontSize: 13,
          fontFamily: 'inherit', cursor: 'pointer',
        }}>
          <RefreshCw size={14} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          Refresh
        </button>
      </div>

      {error && (
        <div style={{
          padding: '14px 18px', borderRadius: 10,
          background: 'rgba(184,69,69,0.08)', border: '1px solid rgba(184,69,69,0.2)',
          color: 'var(--danger)', fontSize: 14, marginBottom: 24,
        }}>
          {error}
        </div>
      )}

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 36 }}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              height: 100, borderRadius: 14,
              background: 'var(--neutral-100)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
          ))
          : statCards.map(({ label, value, icon, color, href }) => (
            <div key={label} style={{
              background: 'var(--neutral-0)',
              border: '1px solid var(--border-soft)',
              borderRadius: 14,
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: color ? `${color}18` : 'var(--cirvio-mint-50)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: color ?? 'var(--cirvio-sage)',
                flexShrink: 0,
              }}>
                {icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 28, fontWeight: 700, color: color ?? 'var(--fg-1)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {value}
                </p>
                <p style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4, fontWeight: 500 }}>{label}</p>
              </div>
              {href && (
                <Link href={href} style={{ color: 'var(--fg-3)', display: 'flex' }}>
                  <ChevronRight size={16} />
                </Link>
              )}
            </div>
          ))
        }
      </div>

      {/* Recent tenants */}
      <div style={{
        background: 'var(--neutral-0)',
        border: '1px solid var(--border-soft)',
        borderRadius: 16,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 24px', borderBottom: '1px solid var(--border-soft)',
        }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg-1)' }}>Recent sign-ups</h2>
          <Link href="/admin/dashboard/tenants" style={{
            fontSize: 13, color: 'var(--cirvio-sage)', textDecoration: 'none',
            fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4,
          }}>
            View all <ChevronRight size={14} />
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--neutral-50)' }}>
                {['Company', 'Plan', 'Status', 'Employees', 'Joined', ''].map(h => (
                  <th key={h} style={{
                    padding: '10px 24px', textAlign: 'left',
                    fontSize: 11, fontWeight: 600, letterSpacing: '0.05em',
                    textTransform: 'uppercase', color: 'var(--fg-3)',
                    borderBottom: '1px solid var(--border-soft)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} style={{ padding: '14px 24px' }}>
                        <div style={{ height: 14, borderRadius: 4, background: 'var(--neutral-100)', width: j === 0 ? 140 : 60 }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : tenants.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '32px 24px', textAlign: 'center', color: 'var(--fg-3)', fontSize: 14 }}>
                    No tenants yet
                  </td>
                </tr>
              ) : tenants.map((t, i) => (
                <tr key={t.id} style={{ borderBottom: i < tenants.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                  <td style={{ padding: '14px 24px' }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--fg-1)' }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--fg-3)' }}>{t.slug}</p>
                  </td>
                  <td style={{ padding: '14px 24px', fontSize: 13, color: 'var(--fg-2)' }}>
                    {t.plan?.name ?? '—'}
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <StatusBadge status={t.status} />
                  </td>
                  <td style={{ padding: '14px 24px', fontSize: 13, color: 'var(--fg-2)' }}>
                    {t._count?.employees ?? 0}
                  </td>
                  <td style={{ padding: '14px 24px', fontSize: 13, color: 'var(--fg-3)' }}>
                    {new Date(t.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <Link href={`/admin/dashboard/tenants/${t.id}`} style={{
                      fontSize: 12, color: 'var(--cirvio-sage)', textDecoration: 'none', fontWeight: 500,
                    }}>
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
