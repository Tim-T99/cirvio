import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:4000';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('cirvio_token')?.value;
  const adminToken = cookieStore.get('cirvio_admin_token')?.value;

  // Best-effort logout on the backend to invalidate the session
  if (token) {
    try {
      await fetch(`${BACKEND_URL}/api/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      // Continue even if backend is unreachable — cookie is cleared client-side
    }
  }

  if (adminToken) {
    try {
      await fetch(`${BACKEND_URL}/api/admin/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
      });
    } catch {
      // Continue
    }
  }

  cookieStore.delete('cirvio_token');
  cookieStore.delete('cirvio_admin_token');

  return NextResponse.json({ success: true });
}
