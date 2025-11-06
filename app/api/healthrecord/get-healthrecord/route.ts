import { db } from '@/db';
import { formatDate, ymd } from '@/utils/dateFormats';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function GET(): Promise<any> {
  try {
    const healthRecord = await db.healthRecord.findMany({
      include: {
        student: true
      }
    });

    const obj = healthRecord.map(v => {

      return {
        healthId: v.healthId,
        date: ymd(v.date), 
        condition: v.condition, 
        studentName: v.student.studentName
      }
    })
    return NextResponse.json(obj)
  } catch (error) {
    return error;
  }
};


