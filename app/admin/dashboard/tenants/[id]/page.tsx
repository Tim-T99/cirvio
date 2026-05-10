'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Building2, Users, CheckCircle2, AlertTriangle } from 'lucide-react';

type TenantDetail = {
  id: string; name: string; slug: string; email: string; phone?: string;
  status: string; industry?: string; emirate?: string;
  tradelicenseNo?: string; tradelicenseExpiry?: string;
  trialEndsAt?: string; subscriptionEndsAt?: string; createdAt: string;
  plan?: { id: string; name: string; maxEmployees: number; priceAed: number };
  users?: { id: string; firstName: string; lastName: string; email: string; role: string; isActive: boolean; createdAt: string }[];
  _count?: { employees: number; users: number };
};

type Plan = { id: string; name: string; priceAed: number; maxEmployees: number };

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, [string, string]> = {
    ACTIVE:    ['rgba(61,140,114,0.12)',  'var(--success)'],
    TRIAL:     ['rgba(46,111,198,0.12)',  '#2E6FC6'],
    SUSPENDED: ['rgba(198,138,46,0.12)',  'var(--warning)'],
    CANCELLED: ['rgba(184,69,69,0.12)',   'var(--danger)'],
  };
  const [bg, color] = map[status] ?? ['var(--neutral-100)', 'var(--fg-2)'];
  return (
    <span style={{ display:'inline-block', padding:'4px 12px', borderRadius:99, fontSize:12, fontWeight:600, background:bg, color, textTransform:'uppercase', letterSpacing:'0.05em' }}>
      {status}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div style={{ display: 'flex', gap: 16, padding: '11px 0', borderBottom: '1px solid var(--border-soft)' }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.05em', minWidth: 140 }}>{label}</span>
      <span style={{ fontSize: 13, color: value ? 'var(--fg-1)' : 'var(--fg-3)' }}>{value ?? '—'}</span>
    </div>
  );
}

export default function TenantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [tenant, setTenant] = useState<TenantDetail | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusBusy, setStatusBusy] = useState(false);
  const [planBusy, setPlanBusy] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/tenants/${id}`).then(r => r.json()),
      fetch('/api/admin/plans').then(r => r.json()),
    ]).then(([t, p]) => {
      setTenant(t);
      setPlans(Array.isArray(p) ? p : p.data ?? []);
      setSelectedPlan(t.plan?.id ?? '');
    }).finally(() => setLoading(false));
  }, [id]);

  async function changeStatus(status: string) {
    setStatusBusy(true);
    const res = await fetch(`/api/admin/tenants/${id}/status`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) { setTenant(t => t ? { ...t, status } : t); setMsg(`Status changed to ${status}`); }
    setStatusBusy(false);
  }

  async function changePlan() {
    if (!selectedPlan) return;
    setPlanBusy(true);
    const res = await fetch(`/api/admin/tenants/${id}/plan`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId: selectedPlan }),
    });
    if (res.ok) { setMsg('Plan updated'); }
    setPlanBusy(false);
  }

  if (loading) {
    return (
      <div style={{ padding: '32px 36px' }}>
        <div style={{ height: 24, width: 200, background: 'var(--neutral-100)', borderRadius: 6, marginBottom: 32 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[1, 2].map(i => <div key={i} style={{ height: 280, background: 'var(--neutral-100)', borderRadius: 14 }} />)}
        </div>
      </div>
    );
  }

  if (!tenant) {
    return (
      <div style={{ padding: '32px 36px' }}>
        <p style={{ color: 'var(--danger)' }}>Tenant not found.</p>
      </div>
    );
  }

  const statusActions = ['ACTIVE', 'TRIAL', 'SUSPENDED', 'CANCELLED'].filter(s => s !== tenant.status);

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1100 }}>
      {/* Back */}
      <button onClick={() => router.back()} style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--fg-2)', fontSize: 13, fontFamily: 'inherit', marginBottom: 24,
      }}>
        <ArrowLeft size={15} /> Back to tenants
      </button>

      {msg && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 16px', borderRadius: 8, marginBottom: 20,
          background: 'rgba(61,140,114,0.08)', border: '1px solid rgba(61,140,114,0.2)',
          color: 'var(--success)', fontSize: 13,
        }}>
          <CheckCircle2 size={15} /> {msg}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: 'var(--cirvio-mint-50)', border: '1px solid var(--cirvio-mint-100)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--cirvio-sage)', flexShrink: 0,
        }}>
          <Building2 size={24} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--fg-1)', margin: 0 }}>{tenant.name}</h1>
            <StatusBadge status={tenant.status} />
          </div>
          <p style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4 }}>{tenant.slug} · {tenant.email}</p>
        </div>

        {/* Status actions */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {statusActions.map(s => {
            const colors: Record<string, string> = { ACTIVE: 'var(--success)', TRIAL: '#2E6FC6', SUSPENDED: 'var(--warning)', CANCELLED: 'var(--danger)' };
            return (
              <button key={s} onClick={() => changeStatus(s)} disabled={statusBusy} style={{
                padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                fontFamily: 'inherit', cursor: 'pointer',
                border: `1px solid ${colors[s]}30`,
                background: `${colors[s]}10`,
                color: colors[s],
              }}>
                {statusBusy ? '…' : `Set ${s.toLowerCase()}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { icon: <Users size={18} />, label: 'Employees', value: tenant._count?.employees ?? 0 },
          { icon: <Users size={18} />, label: 'Users', value: tenant._count?.users ?? 0 },
          { icon: <AlertTriangle size={18} />, label: 'Trial ends', value: tenant.trialEndsAt ? new Date(tenant.trialEndsAt).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '—' },
        ].map(({ icon, label, value }) => (
          <div key={label} style={{ background: 'var(--neutral-0)', border: '1px solid var(--border-soft)', borderRadius: 12, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ color: 'var(--cirvio-sage)' }}>{icon}</div>
            <div>
              <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--fg-1)', letterSpacing: '-0.02em' }}>{value}</p>
              <p style={{ fontSize: 12, color: 'var(--fg-3)' }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Company info */}
        <div style={{ background: 'var(--neutral-0)', border: '1px solid var(--border-soft)', borderRadius: 14, padding: '22px 24px' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 16 }}>Company details</h3>
          <InfoRow label="Name" value={tenant.name} />
          <InfoRow label="Email" value={tenant.email} />
          <InfoRow label="Phone" value={tenant.phone} />
          <InfoRow label="Industry" value={tenant.industry} />
          <InfoRow label="Emirate" value={tenant.emirate} />
          <InfoRow label="Trade licence" value={tenant.tradelicenseNo} />
          <InfoRow label="Licence expiry" value={tenant.tradelicenseExpiry ? new Date(tenant.tradelicenseExpiry).toLocaleDateString('en-GB') : null} />
          <InfoRow label="Registered" value={new Date(tenant.createdAt).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })} />
        </div>

        {/* Plan & billing */}
        <div style={{ background: 'var(--neutral-0)', border: '1px solid var(--border-soft)', borderRadius: 14, padding: '22px 24px' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 16 }}>Plan & billing</h3>
          <InfoRow label="Current plan" value={tenant.plan?.name} />
          <InfoRow label="Max employees" value={tenant.plan?.maxEmployees != null ? String(tenant.plan.maxEmployees) : null} />
          <InfoRow label="Price (AED)" value={tenant.plan?.priceAed != null ? `AED ${tenant.plan.priceAed}/mo` : null} />
          <InfoRow label="Trial ends" value={tenant.trialEndsAt ? new Date(tenant.trialEndsAt).toLocaleDateString('en-GB') : null} />
          <InfoRow label="Subscription ends" value={tenant.subscriptionEndsAt ? new Date(tenant.subscriptionEndsAt).toLocaleDateString('en-GB') : null} />

          {plans.length > 0 && (
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-soft)' }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Change plan</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <select
                  value={selectedPlan}
                  onChange={e => setSelectedPlan(e.target.value)}
                  style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, fontFamily: 'inherit', color: 'var(--fg-1)', background: 'var(--bg)', outline: 'none' }}
                >
                  <option value="">Select plan</option>
                  {plans.map(p => <option key={p.id} value={p.id}>{p.name} — AED {p.priceAed}/mo</option>)}
                </select>
                <button onClick={changePlan} disabled={planBusy || !selectedPlan} className="btn-primary" style={{ padding: '8px 16px', fontSize: 13, whiteSpace: 'nowrap' }}>
                  {planBusy ? 'Saving…' : 'Apply'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Users table */}
      {tenant.users && tenant.users.length > 0 && (
        <div style={{ background: 'var(--neutral-0)', border: '1px solid var(--border-soft)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-soft)' }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-1)', margin: 0 }}>Users ({tenant.users.length})</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--neutral-50)' }}>
                {['Name', 'Email', 'Role', 'Status', 'Joined'].map(h => (
                  <th key={h} style={{ padding: '9px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--fg-3)', borderBottom: '1px solid var(--border-soft)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tenant.users.map((u, i) => (
                <tr key={u.id} style={{ borderBottom: i < tenant.users!.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                  <td style={{ padding: '12px 20px', fontSize: 13, fontWeight: 500, color: 'var(--fg-1)' }}>{u.firstName} {u.lastName}</td>
                  <td style={{ padding: '12px 20px', fontSize: 13, color: 'var(--fg-2)' }}>{u.email}</td>
                  <td style={{ padding: '12px 20px', fontSize: 11, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{u.role.replace('_', ' ')}</td>
                  <td style={{ padding: '12px 20px' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: u.isActive ? 'rgba(61,140,114,0.1)' : 'rgba(184,69,69,0.1)', color: u.isActive ? 'var(--success)' : 'var(--danger)' }}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 20px', fontSize: 12, color: 'var(--fg-3)' }}>
                    {new Date(u.createdAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
