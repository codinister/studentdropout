

import { db } from '@/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function GET(): Promise<any> {
  try {
    const subject = await db.subject.findMany();
    return NextResponse.json(subject)
  } catch (error) {
    return error;
  }
};


