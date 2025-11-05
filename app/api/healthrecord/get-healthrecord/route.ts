import { db } from '@/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function GET(): Promise<any> {
  try {
    const healthRecord = await db.healthRecord.findMany();
    return NextResponse.json(healthRecord)
  } catch (error) {
    return error;
  }
};


