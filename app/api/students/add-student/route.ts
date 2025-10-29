import { db } from '@/db';
import { studentSchema } from '@/state/schemas/validationSchemas';
import { fromZodError } from 'zod-validation-error';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function POST(req: NextRequest){
  const request = await req.json()
  const result = studentSchema.safeParse(request);

  if (!result.success) {
    return NextResponse.json({
      error: fromZodError(result.error).toString(),
    }, {status: 400})
  }

  const { studentName, level, totalAttendance, score } = result.data;

  const checkStudentName = await db.student.findUnique({
    where: { studentName },
  });

  if (checkStudentName) {
    return NextResponse.json({
      error: `${studentName} is already in use!`,
    }, {status: 400})
  }

  try {
     await db.student.create({
      data: {
        studentName: studentName,
        level,
        totalAttendance: totalAttendance,
        score,
      },
    });

    return NextResponse.json({
      success: ` has been added successfully!`
    }, {status: 200})
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json({
    error: 'An error occured',
  }, {status: 400})
};


