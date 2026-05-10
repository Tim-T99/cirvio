'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Search, X, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';

type Tenant = {
  id: string; name: string; slug: string; email: string; status: string;
  plan?: { name: string }; trialEndsAt?: string; subscriptionEndsAt?: string;
  createdAt: string; _count?: { employees: number; users: number };
};

type Page = { data: Tenant[]; total: number; page: number; pages: number };

const STATUSES = ['ALL', 'ACTIVE', 'TRIAL', 'SUSPENDED', 'CANCELLED'];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, [string, string]> = {
    ACTIVE:    ['rgba(61,140,114,0.12)',  'var(--success)'],
    TRIAL:     ['rgba(46,111,198,0.12)',  '#2E6FC6'],
    SUSPENDED: ['rgba(198,138,46,0.12)',  'var(--warning)'],
    CANCELLED: ['rgba(184,69,69,0.12)',   'var(--danger)'],
  };
  const [bg, color] = map[status] ?? ['var(--neutral-100)', 'var(--fg-2)'];
  return (
    <span style={{ display:'inline-block', padding:'2px 10px', borderRadius:99, fontSize:11, fontWeight:600, background:bg, color, textTransform:'uppercase', letterSpacing:'0.05em' }}>
      {status}
    </span>
  );
}

function ActionMenu({ tenant, onRefresh }: { tenant: Tenant; onRefresh: () => void }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function setStatus(status: string) {
    setBusy(true);
    setOpen(false);
    await fetch(`/api/admin/tenants/${tenant.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setBusy(false);
    onRefresh();
  }

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(v => !v)} disabled={busy} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--fg-3)', padding: 4, borderRadius: 6, display: 'flex',
      }}>
        <MoreVertical size={16} />
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 9 }} />
          <div style={{
            position: 'absolute', right: 0, top: 28, zIndex: 10,
            background: 'var(--neutral-0)', border: '1px solid var(--border)',
            borderRadius: 10, boxShadow: 'var(--shadow-md)',
            minWidth: 160, overflow: 'hidden',
          }}>
            <Link href={`/admin/dashboard/tenants/${tenant.id}`} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '10px 14px', fontSize: 13,
              color: 'var(--fg-1)', textDecoration: 'none',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--neutral-50)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              View details
            </Link>
            {tenant.status !== 'ACTIVE' && (
              <button onClick={() => setStatus('ACTIVE')} style={{
                display: 'block', width: '100%', padding: '10px 14px', fontSize: 13,
                color: 'var(--success)', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--neutral-50)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                Activate
              </button>
            )}
            {tenant.status !== 'SUSPENDED' && (
              <button onClick={() => setStatus('SUSPENDED')} style={{
                display: 'block', width: '100%', padding: '10px 14px', fontSize: 13,
                color: 'var(--warning)', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--neutral-50)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                Suspend
              </button>
            )}
            {tenant.status !== 'CANCELLED' && (
              <button onClick={() => setStatus('CANCELLED')} style={{
                display: 'block', width: '100%', padding: '10px 14px', fontSize: 13,
                color: 'var(--danger)', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--neutral-50)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                Cancel
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function TenantsPage() {
  const [data, setData] = useState<Page | null>(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '15' });
    if (search) params.set('search', search);
    if (status !== 'ALL') params.set('status', status);
    const res = await fetch(`/api/admin/tenants?${params}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }, [search, status, page]);

  useEffect(() => { load(); }, [load]);

  // reset page on filter change
  useEffect(() => { setPage(1); }, [search, status]);

  return (
    <div style={{ padding: '32px 36px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 4 }}>Tenants</h1>
          <p style={{ fontSize: 14, color: 'var(--fg-3)' }}>
            {data ? `${data.total} companies registered` : 'Loading…'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: 320 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-3)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            style={{
              width: '100%', paddingLeft: 36, paddingRight: search ? 32 : 12,
              paddingTop: 9, paddingBottom: 9,
              border: '1px solid var(--border)', borderRadius: 9, fontSize: 13,
              background: 'var(--neutral-0)', color: 'var(--fg-1)',
              fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
            }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{
              position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-3)', display: 'flex',
            }}>
              <X size={13} />
            </button>
          )}
        </div>

        {/* Status tabs */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {STATUSES.map(s => (
            <button key={s} onClick={() => setStatus(s)} style={{
              padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500,
              fontFamily: 'inherit', cursor: 'pointer',
              border: status === s ? '1px solid var(--cirvio-sage)' : '1px solid var(--border)',
              background: status === s ? 'var(--cirvio-mint-50)' : 'var(--neutral-0)',
              color: status === s ? 'var(--cirvio-sage)' : 'var(--fg-2)',
            }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--neutral-0)', border: '1px solid var(--border-soft)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--neutral-50)' }}>
                {['Company', 'Email', 'Plan', 'Status', 'Employees / Users', 'Trial ends', 'Joined', ''].map(h => (
                  <th key={h} style={{
                    padding: '11px 20px', textAlign: 'left', fontSize: 11,
                    fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
                    color: 'var(--fg-3)', borderBottom: '1px solid var(--border-soft)', whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 8 }).map((_, j) => (
                      <td key={j} style={{ padding: '14px 20px' }}>
                        <div style={{ height: 13, borderRadius: 4, background: 'var(--neutral-100)', width: j === 0 ? 160 : j === 1 ? 180 : 70 }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : !data || data.data.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--fg-3)', fontSize: 14 }}>
                    No tenants match your filters
                  </td>
                </tr>
              ) : data.data.map((t, i) => (
                <tr key={t.id} style={{ borderBottom: i < data.data.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                  <td style={{ padding: '13px 20px' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 2 }}>{t.name}</p>
                    <p style={{ fontSize: 11, color: 'var(--fg-3)' }}>{t.slug}</p>
                  </td>
                  <td style={{ padding: '13px 20px', fontSize: 13, color: 'var(--fg-2)' }}>{t.email}</td>
                  <td style={{ padding: '13px 20px', fontSize: 13, color: 'var(--fg-2)' }}>{t.plan?.name ?? '—'}</td>
                  <td style={{ padding: '13px 20px' }}><StatusBadge status={t.status} /></td>
                  <td style={{ padding: '13px 20px', fontSize: 13, color: 'var(--fg-2)' }}>
                    {t._count?.employees ?? 0} / {t._count?.users ?? 0}
                  </td>
                  <td style={{ padding: '13px 20px', fontSize: 12, color: 'var(--fg-3)', whiteSpace: 'nowrap' }}>
                    {t.trialEndsAt ? new Date(t.trialEndsAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) : '—'}
                  </td>
                  <td style={{ padding: '13px 20px', fontSize: 12, color: 'var(--fg-3)', whiteSpace: 'nowrap' }}>
                    {new Date(t.createdAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
                  </td>
                  <td style={{ padding: '13px 20px' }}>
                    <ActionMenu tenant={t} onRefresh={load} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.pages > 1 && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 20px', borderTop: '1px solid var(--border-soft)',
            background: 'var(--neutral-50)',
          }}>
            <p style={{ fontSize: 13, color: 'var(--fg-3)' }}>
              Page {data.page} of {data.pages} — {data.total} total
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setPage(p => p - 1)} disabled={page <= 1} style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px',
                border: '1px solid var(--border)', borderRadius: 7, background: 'var(--neutral-0)',
                fontSize: 13, fontFamily: 'inherit', cursor: page <= 1 ? 'not-allowed' : 'pointer',
                color: page <= 1 ? 'var(--fg-3)' : 'var(--fg-1)', opacity: page <= 1 ? 0.5 : 1,
              }}>
                <ChevronLeft size={14} /> Prev
              </button>
              <button onClick={() => setPage(p => p + 1)} disabled={page >= data.pages} style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px',
                border: '1px solid var(--border)', borderRadius: 7, background: 'var(--neutral-0)',
                fontSize: 13, fontFamily: 'inherit', cursor: page >= data.pages ? 'not-allowed' : 'pointer',
                color: page >= data.pages ? 'var(--fg-3)' : 'var(--fg-1)', opacity: page >= data.pages ? 0.5 : 1,
              }}>
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
