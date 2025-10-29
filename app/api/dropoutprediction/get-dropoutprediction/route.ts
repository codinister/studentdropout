

import { db } from '@/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function GET(): Promise<any> {
  try {
    const dropoutprediction = await db.dropoutPrediction.findMany();
    return NextResponse.json(dropoutprediction)
  } catch (error) {
    return error;
  }
};


