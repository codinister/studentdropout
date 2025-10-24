
import { db } from '@/db';
import { editStudentFormType } from '@/state/schemas/schemas';
import { fromZodError } from 'zod-validation-error';
import { NextRequest, NextResponse } from 'next/server';


export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function PUT(req: NextRequest) {
  const request = await req.json();
  const result = editStudentFormType.safeParse(request);

  if (!result.success) {
    return NextResponse.json(
      {
        error: fromZodError(result.error).toString(),
      },
      { status: 400 }
    );
  }

  const { studentId, studentName, level, totalAttendance, score } = result.data;

  const checkStudent = await db.student.findUnique({
    where: { studentName, NOT: { studentId } },
  });

  if (checkStudent) {
    return NextResponse.json(
      {
        error: `${studentName} is already in use!`,
      },
      { status: 400 }
    );
  }

  try {
     await db.student.update({
      where: { studentId },
      data: {
        studentName,
        level,
        totalAttendance,
        score,
      },
    });

    return NextResponse.json(
      {
        success: `has been updated successfully!`,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json(
    {
      error: 'An error occured',
    },
    { status: 400 }
  );
}
