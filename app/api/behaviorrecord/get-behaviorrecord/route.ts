import { db } from '@/db';
import { formatDate, ymd } from '@/utils/dateFormats';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function GET(): Promise<any> {
  try {
    const behaviorRecords = await db.behaviorRecords.findMany({
      include: {
        student: true
      }
    });

    const obj = behaviorRecords.map(v => {

      return {
        behaviorId: v.behaviorId,
        date: ymd(v.date), 
        description: v.description, 
        studentName: v.student.studentName, 
        studentId: v.student.studentId
      }
    })
    return NextResponse.json(obj)
  } catch (error) {
    return error;
  }
};


