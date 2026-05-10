import { NextRequest, NextResponse } from 'next/server';
import { adminHeaders } from '../../../lib/admin-headers';

const B = process.env.BACKEND_URL || 'http://localhost:4000';

export async function GET(req: NextRequest) {
  const qs = req.nextUrl.searchParams.toString();
  const res = await fetch(`${B}/api/admin/tenants${qs ? `?${qs}` : ''}`, { headers: await adminHeaders(), cache: 'no-store' });
  return NextResponse.json(await res.json(), { status: res.status });
}
