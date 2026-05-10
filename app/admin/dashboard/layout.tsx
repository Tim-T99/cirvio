import { cookies } from 'next/headers';
import { decodeAdminToken } from '../../lib/admin-api';
import AdminSideNav from './AdminSideNav';

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  const token = store.get('cirvio_admin_token')?.value;
  const payload = token ? decodeAdminToken(token) : null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <AdminSideNav adminEmail={payload?.email} />
      <main style={{ flex: 1, overflow: 'auto', minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}
