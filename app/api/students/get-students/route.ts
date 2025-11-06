import { db } from '@/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function GET(){
  try {
    const student = await db.student.findMany();
    return NextResponse.json(student)
  } catch (error) {
    return error;
  }
};


