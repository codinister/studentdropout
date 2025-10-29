

import { db } from '@/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function GET(): Promise<any> {
  try {
    const intervention = await db.intervention.findMany();
    return NextResponse.json(intervention)
  } catch (error) {
    return error;
  }
};


