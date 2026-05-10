import { cookies } from 'next/headers';

export async function adminHeaders(): Promise<Record<string, string>> {
  const store = await cookies();
  const token = store.get('cirvio_admin_token')?.value;
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
}
