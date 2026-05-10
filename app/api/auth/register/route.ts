import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:4000';

export async function POST(req: NextRequest) {
  const body = await req.json();

  let backendRes: Response;
  try {
    backendRes = await fetch(`${BACKEND_URL}/api/tenant/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    return NextResponse.json({ error: 'Cannot reach server. Please try again.' }, { status: 503 });
  }

  let data: { token?: string; user?: unknown; error?: string };
  try {
    data = await backendRes.json();
  } catch {
    return NextResponse.json(
      { error: 'Unexpected server response. Please try again.' },
      { status: 502 }
    );
  }

  if (!backendRes.ok) {
    return NextResponse.json(
      { error: data.error ?? 'Registration failed' },
      { status: backendRes.status }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set('cirvio_token', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  return NextResponse.json({ user: data.user });
}
