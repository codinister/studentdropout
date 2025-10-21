// app/api/users/route.ts
export const runtime = 'nodejs';

import { db } from '@/db';
import getUsers from '@/state/actions/getUsers';
import { NextResponse } from 'next/server';

export async function GET() {
  const result = await db.user.findMany()
  return NextResponse.json(result);
}
