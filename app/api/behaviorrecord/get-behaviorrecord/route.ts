import { db } from '@/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function GET(): Promise<any> {
  try {
    const behaviorRecords = await db.behaviorRecords.findMany();
    return NextResponse.json(behaviorRecords)
  } catch (error) {
    return error;
  }
};


