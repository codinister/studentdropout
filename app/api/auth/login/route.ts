// app/api/auth/login/route.ts
export const runtime = 'nodejs'; // ✅ Forces Node runtime

import { userLogin } from '@/state/actions/userLogin';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const values = await req.json();

  const result = await userLogin(values);
  return NextResponse.json(result);
}
