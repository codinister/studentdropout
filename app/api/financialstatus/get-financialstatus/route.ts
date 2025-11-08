import { db } from '@/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(): Promise<any> {
  try {
    const financialStatus = await db.financialStatus.findMany({
      include: {
        student: true,
      },
    });

    const obj = financialStatus.map((v) => {
      return {
        financialId: v.financialId,
        status: v.status,
        studentName: v.student.studentName,
        studentId: v.studentId,
      };
    });
    return NextResponse.json(obj);
  } catch (error) {
    return error;
  }
}
