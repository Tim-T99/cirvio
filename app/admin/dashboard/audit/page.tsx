'use client';

import { useEffect, useState, useCallback } from 'react';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';

type Log = {
  id: string; action: string; targetType?: string; targetId?: string;
  meta?: Record<string, unknown>; createdAt: string;
  admin?: { name: string; email: string; role: string };
};

type Page = { data: Log[]; total: number; page: number; pages: number };

const ACTION_COLORS: Record<string, string> = {
  CREATE: 'rgba(61,140,114,0.12)',
  UPDATE: 'rgba(46,111,198,0.12)',
  DELETE: 'rgba(184,69,69,0.12)',
  LOGIN:  'rgba(198,138,46,0.12)',
  STATUS: 'rgba(140,201,181,0.15)',
};

const ACTION_TEXT_COLORS: Record<string, string> = {
  CREATE: 'var(--success)',
  UPDATE: '#2E6FC6',
  DELETE: 'var(--danger)',
  LOGIN:  'var(--warning)',
  STATUS: 'var(--cirvio-sage)',
};

function ActionBadge({ action }: { action: string }) {
  const key = Object.keys(ACTION_COLORS).find(k => action.includes(k)) ?? '';
  return (
    <span style={{
      display: 'inline-block', padding: '2px 9px', borderRadius: 99,
      fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
      background: ACTION_COLORS[key] ?? 'var(--neutral-100)',
      color: ACTION_TEXT_COLORS[key] ?? 'var(--fg-2)',
    }}>
      {action.replace(/_/g, ' ')}
    </span>
  );
}

export default function AuditPage() {
  const [data, setData] = useState<Page | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '20' });
    if (search) params.set('search', search);
    const res = await fetch(`/api/admin/audit?${params}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }, [search, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search]);

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1100 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 4 }}>Audit Log</h1>
          <p style={{ fontSize: 14, color: 'var(--fg-3)' }}>
            {data ? `${data.total} events recorded` : 'Loading…'}
          </p>
        </div>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: 340, marginBottom: 20 }}>
        <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-3)' }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by action or admin…"
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

      <div style={{ background: 'var(--neutral-0)', border: '1px solid var(--border-soft)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--neutral-50)' }}>
              {['Timestamp', 'Admin', 'Action', 'Target', 'Details', ''].map(h => (
                <th key={h} style={{
                  padding: '11px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--fg-3)',
                  borderBottom: '1px solid var(--border-soft)', whiteSpace: 'nowrap',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} style={{ padding: '13px 20px' }}>
                      <div style={{ height: 12, borderRadius: 4, background: 'var(--neutral-100)', width: j === 0 ? 120 : j === 1 ? 100 : 80 }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : !data || data.data.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--fg-3)', fontSize: 14 }}>
                  No audit events recorded yet
                </td>
              </tr>
            ) : data.data.map((log, i) => (
              <>
                <tr key={log.id} style={{ borderBottom: '1px solid var(--border-soft)', cursor: 'pointer' }}
                  onClick={() => setExpanded(expanded === log.id ? null : log.id)}
                >
                  <td style={{ padding: '12px 20px', fontSize: 12, color: 'var(--fg-3)', whiteSpace: 'nowrap' }}>
                    {new Date(log.createdAt).toLocaleString('en-GB', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })}
                  </td>
                  <td style={{ padding: '12px 20px' }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg-1)' }}>{log.admin?.name ?? '—'}</p>
                    <p style={{ fontSize: 11, color: 'var(--fg-3)' }}>{log.admin?.role?.replace('_',' ')}</p>
                  </td>
                  <td style={{ padding: '12px 20px' }}>
                    <ActionBadge action={log.action} />
                  </td>
                  <td style={{ padding: '12px 20px', fontSize: 13, color: 'var(--fg-2)' }}>
                    {log.targetType ? `${log.targetType}` : '—'}
                    {log.targetId && <span style={{ fontSize: 11, color: 'var(--fg-3)', marginLeft: 4 }}>#{log.targetId.slice(-6)}</span>}
                  </td>
                  <td style={{ padding: '12px 20px', fontSize: 12, color: 'var(--fg-3)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {log.meta ? JSON.stringify(log.meta).slice(0, 60) : '—'}
                  </td>
                  <td style={{ padding: '12px 20px', fontSize: 12, color: 'var(--cirvio-sage)' }}>
                    {log.meta ? (expanded === log.id ? 'Hide' : 'Show') : ''}
                  </td>
                </tr>
                {expanded === log.id && log.meta && (
                  <tr key={`${log.id}-expanded`} style={{ background: 'var(--neutral-50)', borderBottom: '1px solid var(--border-soft)' }}>
                    <td colSpan={6} style={{ padding: '12px 20px 16px 20px' }}>
                      <pre style={{
                        fontSize: 12, color: 'var(--fg-2)', fontFamily: 'var(--font-geist-mono)',
                        background: 'var(--neutral-100)', borderRadius: 8, padding: '12px 16px',
                        overflow: 'auto', maxHeight: 200, margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all',
                      }}>
                        {JSON.stringify(log.meta, null, 2)}
                      </pre>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>

        {data && data.pages > 1 && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 20px', borderTop: '1px solid var(--border-soft)', background: 'var(--neutral-50)',
          }}>
            <p style={{ fontSize: 13, color: 'var(--fg-3)' }}>Page {data.page} of {data.pages}</p>
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
