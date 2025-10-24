import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const param = (await params).id
    const studentId = parseInt(param, 10);

    if (isNaN(studentId)) {
      return NextResponse.json(
        { error: 'Invalid student ID' },
        { status: 400 }
      );
    }

    const student = await db.student.delete({
      where: { studentId },
    });

    return NextResponse.json(student, { status: 200 });
  } catch (err) {
    console.error('Error deleting student:', err);
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    );
  }
}
