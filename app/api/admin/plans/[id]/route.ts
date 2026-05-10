import { NextRequest, NextResponse } from 'next/server';
import { adminHeaders } from '../../../../lib/admin-headers';

const B = process.env.BACKEND_URL || 'http://localhost:4000';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`${B}/api/admin/plans/${id}`, {
    method: 'PATCH', headers: await adminHeaders(), body: await req.text(),
  });
  return NextResponse.json(await res.json(), { status: res.status });
}
