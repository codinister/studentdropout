export const runtime = 'nodejs';

import { userLogin } from '@/state/actions/userLogin';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const values = await req.json();
  const result = await userLogin(values);
  if (result.error) {
    return NextResponse.json(
      { error: result.error || 'Login failed' },
      { status: 400 }
    );
  } else if (result.success) {
    return NextResponse.json({ success: true }, {status: 200});
  }
}
