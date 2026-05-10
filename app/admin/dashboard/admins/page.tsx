'use client';

import { useEffect, useState } from 'react';
import { Plus, X, ShieldCheck, ShieldAlert } from 'lucide-react';

type Admin = {
  id: string; name: string; email: string; role: string;
  isActive: boolean; lastLoginAt?: string; createdAt: string;
};

function RoleBadge({ role }: { role: string }) {
  const isSuper = role === 'SUPER_ADMIN';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '2px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
      textTransform: 'uppercase', letterSpacing: '0.05em',
      background: isSuper ? 'rgba(61,140,114,0.12)' : 'rgba(46,111,198,0.12)',
      color: isSuper ? 'var(--success)' : '#2E6FC6',
    }}>
      {isSuper ? <ShieldCheck size={11} /> : <ShieldAlert size={11} />}
      {role.replace('_', ' ')}
    </span>
  );
}

function NewAdminModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'SUPPORT' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  async function save() {
    setSaving(true); setError('');
    const res = await fetch('/api/admin/admins', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) { const d = await res.json(); setError(d.error ?? 'Failed'); setSaving(false); return; }
    onSaved(); onClose();
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
        width: '100%', maxWidth: 440, boxShadow: 'var(--shadow-xl)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--fg-1)' }}>New admin account</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-3)', display: 'flex' }}>
            <X size={20} />
          </button>
        </div>

        {error && <p style={{ color: 'var(--danger)', fontSize: 13, marginBottom: 16 }}>{error}</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={label}>Full name</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Jane Smith" style={field} />
          </div>
          <div>
            <label style={label}>Email</label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@cirvio.com" style={field} />
          </div>
          <div>
            <label style={label}>Password</label>
            <input type="password" value={form.password} onChange={e => set('password', e.target.value)} style={field} />
          </div>
          <div>
            <label style={label}>Role</label>
            <select value={form.role} onChange={e => set('role', e.target.value)} style={{ ...field, cursor: 'pointer' }}>
              <option value="SUPPORT">Support</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button onClick={onClose} className="btn-ghost" style={{ flex: 1, padding: '10px', fontSize: 14 }}>Cancel</button>
          <button onClick={save} disabled={saving} className="btn-primary" style={{ flex: 1, padding: '10px', fontSize: 14 }}>
            {saving ? 'Creating…' : 'Create admin'}
          </button>
        </div>
      </div>
    </>
  );
}

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin/admins');
    const json = await res.json();
    setAdmins(Array.isArray(json) ? json : json.data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function toggleStatus(admin: Admin) {
    setToggling(admin.id);
    await fetch(`/api/admin/admins/${admin.id}/status`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !admin.isActive }),
    });
    setToggling(null);
    load();
  }

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1000 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 4 }}>Platform admins</h1>
          <p style={{ fontSize: 14, color: 'var(--fg-3)' }}>Manage admin accounts for this platform</p>
        </div>
        <button onClick={() => setCreating(true)} className="btn-primary" style={{ padding: '9px 18px', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Plus size={15} /> Add admin
        </button>
      </div>

      <div style={{ background: 'var(--neutral-0)', border: '1px solid var(--border-soft)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--neutral-50)' }}>
              {['Name', 'Email', 'Role', 'Status', 'Last login', 'Created', ''].map(h => (
                <th key={h} style={{
                  padding: '11px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--fg-3)',
                  borderBottom: '1px solid var(--border-soft)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 7 }).map((_, j) => (
                    <td key={j} style={{ padding: '14px 20px' }}>
                      <div style={{ height: 13, borderRadius: 4, background: 'var(--neutral-100)', width: j === 0 ? 120 : 80 }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : admins.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--fg-3)', fontSize: 14 }}>
                  No admins found
                </td>
              </tr>
            ) : admins.map((a, i) => (
              <tr key={a.id} style={{ borderBottom: i < admins.length - 1 ? '1px solid var(--border-soft)' : 'none', opacity: a.isActive ? 1 : 0.6 }}>
                <td style={{ padding: '13px 20px', fontSize: 13, fontWeight: 500, color: 'var(--fg-1)' }}>{a.name}</td>
                <td style={{ padding: '13px 20px', fontSize: 13, color: 'var(--fg-2)' }}>{a.email}</td>
                <td style={{ padding: '13px 20px' }}><RoleBadge role={a.role} /></td>
                <td style={{ padding: '13px 20px' }}>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: '2px 9px', borderRadius: 99,
                    background: a.isActive ? 'rgba(61,140,114,0.1)' : 'rgba(184,69,69,0.1)',
                    color: a.isActive ? 'var(--success)' : 'var(--danger)',
                  }}>
                    {a.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '13px 20px', fontSize: 12, color: 'var(--fg-3)' }}>
                  {a.lastLoginAt ? new Date(a.lastLoginAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) : 'Never'}
                </td>
                <td style={{ padding: '13px 20px', fontSize: 12, color: 'var(--fg-3)' }}>
                  {new Date(a.createdAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
                </td>
                <td style={{ padding: '13px 20px' }}>
                  <button
                    onClick={() => toggleStatus(a)}
                    disabled={toggling === a.id}
                    style={{
                      fontSize: 12, fontWeight: 500, padding: '5px 12px', borderRadius: 7,
                      border: '1px solid var(--border)', background: 'var(--neutral-50)',
                      color: 'var(--fg-2)', fontFamily: 'inherit', cursor: 'pointer',
                    }}
                  >
                    {toggling === a.id ? '…' : a.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {creating && <NewAdminModal onClose={() => setCreating(false)} onSaved={load} />}
    </div>
  );
}
