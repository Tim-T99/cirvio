import { NextRequest, NextResponse } from 'next/server';

const B = process.env.BACKEND_URL || 'http://localhost:4000';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) return NextResponse.json({ error: 'Token is required' }, { status: 400 });

  const res = await fetch(`${B}/api/auth/accept-invite?token=${encodeURIComponent(token)}`, {
    cache: 'no-store',
  });
  return NextResponse.json(await res.json(), { status: res.status });
}

export async function POST(req: NextRequest) {
  const res = await fetch(`${B}/api/auth/accept-invite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: await req.text(),
  });
  return NextResponse.json(await res.json(), { status: res.status });
}
