import SideNav from '../ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--bg)',
    }}>
      <SideNav />
      <main style={{
        flex: 1,
        overflowY: 'auto',
        padding: '32px 40px',
      }}>
        {children}
      </main>
    </div>
  );
}
