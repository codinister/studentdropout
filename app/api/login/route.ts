export const runtime = 'nodejs';
import { db } from '@/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;zz
export async function GET() {
  try {
    const result = await db.user.findMany();
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
  }
}
