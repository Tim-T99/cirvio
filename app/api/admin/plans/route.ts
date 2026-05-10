import { NextRequest, NextResponse } from 'next/server';
import { adminHeaders } from '../../../lib/admin-headers';

const B = process.env.BACKEND_URL || 'http://localhost:4000';

export async function GET() {
  const res = await fetch(`${B}/api/admin/plans`, { headers: await adminHeaders(), cache: 'no-store' });
  return NextResponse.json(await res.json(), { status: res.status });
}

export async function POST(req: NextRequest) {
  const res = await fetch(`${B}/api/admin/plans`, {
    method: 'POST', headers: await adminHeaders(), body: await req.text(),
  });
  return NextResponse.json(await res.json(), { status: res.status });
}
