import { db } from '@/db';
import { studentSchema } from '@/state/schemas/validationSchemas';
import { fromZodError } from 'zod-validation-error';
import { NextRequest, NextResponse } from 'next/server';
import { studentFormSchema } from '@/state/schemas/formSchema';
import { dateTime } from '@/utils/dateFormats';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  const request = await req.json();
  const result = studentSchema.safeParse(request);

  if (!result.success) {
    return NextResponse.json(
      {
        error: fromZodError(result.error).toString(),
      },
      { status: 400 }
    );
  }

  const dataObj = result.data;

  const checkStudentName = await db.student.findUnique({
    where: { studentName: dataObj?.studentName },
  });

  if (checkStudentName) {
    return NextResponse.json(
      {
        error: `${dataObj?.studentName} is already in use!`,
      },
      { status: 400 }
    );
  }
  const admissiondate = dateTime(dataObj?.admissiondate);
  const birthdate = dateTime(dataObj?.birthdate);

  try {
    await db.student.create({
      data: { ...studentFormSchema(dataObj), admissiondate, birthdate },
    });

    return NextResponse.json(
      {
        success: ` has been added successfully!`,
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
