export const runtime = 'nodejs';
import { db } from '@/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export async function GET() {
  try {
    const result = await db.user.findMany();
    const users = result || [];

    return NextResponse.json({ success: users });
  } catch (error) {
    console.log(error);
  }
}
