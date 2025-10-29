

import { db } from '@/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0 



export async function GET(): Promise<any> {
  try {
    const academicrecord = await db.academicRecord.findMany();
    return NextResponse.json(academicrecord)
  } catch (error) {
    return error;
  }
};


