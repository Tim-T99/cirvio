'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Check, X } from 'lucide-react';

type Plan = {
  id: string; name: string; maxEmployees: number; maxAdmins: number;
  priceAed: number; billingCycleMonths: number; isActive: boolean;
  _count?: { tenants: number };
};

type PlanForm = {
  name: string; maxEmployees: string; maxAdmins: string;
  priceAed: string; billingCycleMonths: string; isActive: boolean;
};

const empty: PlanForm = { name: '', maxEmployees: '', maxAdmins: '', priceAed: '', billingCycleMonths: '1', isActive: true };

function PlanCard({ plan, onEdit }: { plan: Plan; onEdit: (p: Plan) => void }) {
  return (
    <div style={{
      background: 'var(--neutral-0)',
      border: `2px solid ${plan.isActive ? 'var(--cirvio-mint-100)' : 'var(--border-soft)'}`,
      borderRadius: 16, padding: '24px',
      opacity: plan.isActive ? 1 : 0.6,
      position: 'relative',
    }}>
      {!plan.isActive && (
        <span style={{
          position: 'absolute', top: 14, right: 14,
          fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
          background: 'var(--neutral-100)', color: 'var(--fg-3)',
          padding: '2px 8px', borderRadius: 99,
        }}>Inactive</span>
      )}

      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--fg-1)', marginBottom: 4 }}>{plan.name}</h3>
        <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--cirvio-sage)', letterSpacing: '-0.03em' }}>
          AED {plan.priceAed.toLocaleString()}
          <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--fg-3)' }}>/mo</span>
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {[
          [`Up to ${plan.maxEmployees} employees`],
          [`Up to ${plan.maxAdmins} admin accounts`],
          [`${plan.billingCycleMonths}-month billing cycle`],
          [plan._count?.tenants != null ? `${plan._count.tenants} active tenant${plan._count.tenants !== 1 ? 's' : ''}` : null],
        ].filter(([v]) => v).map(([item]) => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Check size={13} style={{ color: 'var(--success)', flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>{item}</span>
          </div>
        ))}
      </div>

      <button onClick={() => onEdit(plan)} style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border)',
        background: 'var(--neutral-50)', color: 'var(--fg-2)', fontSize: 13,
        fontFamily: 'inherit', cursor: 'pointer', width: '100%', justifyContent: 'center',
      }}>
        <Edit2 size={13} /> Edit plan
      </button>
    </div>
  );
}

function PlanModal({ initial, onClose, onSaved }: {
  initial?: Plan; onClose: () => void; onSaved: () => void;
}) {
  const [form, setForm] = useState<PlanForm>(initial ? {
    name: initial.name, maxEmployees: String(initial.maxEmployees),
    maxAdmins: String(initial.maxAdmins), priceAed: String(initial.priceAed),
    billingCycleMonths: String(initial.billingCycleMonths), isActive: initial.isActive,
  } : empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(k: keyof PlanForm, v: string | boolean) {
    setForm(f => ({ ...f, [k]: v }));
  }

  async function save() {
    setSaving(true);
    setError('');
    const body = {
      name: form.name, maxEmployees: Number(form.maxEmployees),
      maxAdmins: Number(form.maxAdmins), priceAed: Number(form.priceAed),
      billingCycleMonths: Number(form.billingCycleMonths), isActive: form.isActive,
    };
    const url = initial ? `/api/admin/plans/${initial.id}` : '/api/admin/plans';
    const method = initial ? 'PATCH' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) { const d = await res.json(); setError(d.error ?? 'Failed'); setSaving(false); return; }
    onSaved();
    onClose();
  }

  const field: React.CSSProperties = {
    width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--border)',
    fontSize: 13, fontFamily: 'inherit', color: 'var(--fg-1)', background: 'var(--bg)', outline: 'none', boxSizing: 'border-box',
  };
  const label: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: 'var(--fg-2)', marginBottom: 5, display: 'block' };

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', zIndex: 40 }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        zIndex: 50, background: 'var(--neutral-0)', borderRadius: 18, padding: '28px 32px',
        width: '100%', maxWidth: 480, boxShadow: 'var(--shadow-xl)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--fg-1)' }}>{initial ? 'Edit plan' : 'New plan'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-3)', display: 'flex' }}>
            <X size={20} />
          </button>
        </div>

        {error && <p style={{ color: 'var(--danger)', fontSize: 13, marginBottom: 16 }}>{error}</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={label}>Plan name</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Starter" style={field} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={label}>Max employees</label>
              <input type="number" value={form.maxEmployees} onChange={e => set('maxEmployees', e.target.value)} placeholder="25" style={field} />
            </div>
            <div>
              <label style={label}>Max admins</label>
              <input type="number" value={form.maxAdmins} onChange={e => set('maxAdmins', e.target.value)} placeholder="2" style={field} />
            </div>
            <div>
              <label style={label}>Price (AED/mo)</label>
              <input type="number" value={form.priceAed} onChange={e => set('priceAed', e.target.value)} placeholder="299" style={field} />
            </div>
            <div>
              <label style={label}>Billing cycle (months)</label>
              <input type="number" value={form.billingCycleMonths} onChange={e => set('billingCycleMonths', e.target.value)} placeholder="1" style={field} />
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13, color: 'var(--fg-1)' }}>
            <input type="checkbox" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} />
            Active (visible to tenants)
          </label>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button onClick={onClose} className="btn-ghost" style={{ flex: 1, padding: '10px', fontSize: 14 }}>Cancel</button>
          <button onClick={save} disabled={saving} className="btn-primary" style={{ flex: 1, padding: '10px', fontSize: 14 }}>
            {saving ? 'Saving…' : initial ? 'Save changes' : 'Create plan'}
          </button>
        </div>
      </div>
    </>
  );
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Plan | undefined>();
  const [creating, setCreating] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin/plans');
    const json = await res.json();
    setPlans(Array.isArray(json) ? json : json.data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1100 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 4 }}>Plans</h1>
          <p style={{ fontSize: 14, color: 'var(--fg-3)' }}>Manage pricing tiers available to tenants</p>
        </div>
        <button onClick={() => setCreating(true)} className="btn-primary" style={{ padding: '9px 18px', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Plus size={15} /> New plan
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {[1, 2, 3].map(i => <div key={i} style={{ height: 260, borderRadius: 16, background: 'var(--neutral-100)' }} />)}
        </div>
      ) : plans.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--fg-3)' }}>
          <p style={{ marginBottom: 16, fontSize: 15 }}>No plans yet</p>
          <button onClick={() => setCreating(true)} className="btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
            Create your first plan
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {plans.map(p => <PlanCard key={p.id} plan={p} onEdit={setEditing} />)}
        </div>
      )}

      {(creating || editing) && (
        <PlanModal
          initial={editing}
          onClose={() => { setCreating(false); setEditing(undefined); }}
          onSaved={load}
        />
      )}
    </div>
  );
}
