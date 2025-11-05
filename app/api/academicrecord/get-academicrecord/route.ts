

import { db } from '@/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0 



export async function GET(): Promise<any> {
  try {
    const academicrecord = await db.academicRecord.findMany({
      include: {
        student: true, 
        subject: true
      }
    });
    const res = academicrecord.map(v => {
      return {
        recordId: v.recordId,
        semester: v.semester, 
        year: v.year, 
        studentId: v.student.studentId, 
        studentName: v.student.studentName, 
        level: v.student.level,
        subjectId: v.subject.subjectId, 
        subjectName: v.subject.subjectName
      }
    })
    return NextResponse.json(res)
  } catch (error) {
    return error;
  }
};


