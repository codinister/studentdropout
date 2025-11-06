import { db } from '@/db';
import { ymd } from '@/utils/dateFormats';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(): Promise<any> {
  try {
    const attendancerecord = await db.attendanceRecord.findMany({
      include: {
        student: true,
      },
    });
    const res = attendancerecord.map((v) => ({
      attendanceId: v.attendanceId,
      totalAttendance: v.student.totalAttendance, 
      score: v.student.score,
      studentId: v.student.studentId,
      studentName: v.student.studentName,
      status: v.status,
      date: ymd(v.date),
    }));
    return NextResponse.json(res);
  } catch (error) {
    return error;
  }
}
