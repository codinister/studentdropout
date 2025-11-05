import { db } from '@/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function GET(): Promise<any> {
  try {
    const financialStatus = await db.financialStatus.findMany();
    return NextResponse.json(financialStatus)
  } catch (error) {
    return error;
  }
};


