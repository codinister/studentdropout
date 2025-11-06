import { db } from '@/db';
import {  ymd } from '@/utils/dateFormats';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function GET(): Promise<any> {
  try {
    const intervention = await db.intervention.findMany({
      include: {
        student: true
      }
    });

    const obj = intervention.map(v => {

      return {
        interventionId: v.interventionId,
        date: ymd(v.date), 
        status: v.outcome, 
        outcome: v.outcome,
        type: v.type,
        studentId: v.studentId, 
        studentName: v.student.studentName
      }
    })
    return NextResponse.json(obj)
  } catch (error) {
    return error;
  }
};


