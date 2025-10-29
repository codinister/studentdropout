

import { db } from '@/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function GET(): Promise<any> {
  try {
    const settings = await db.settings.findMany();
    return NextResponse.json(settings)
  } catch (error) {
    return error;
  }
};


