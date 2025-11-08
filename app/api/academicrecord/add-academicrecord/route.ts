import { db } from '@/db';
import { academicRecordSchema } from '@/state/schemas/validationSchemas';
import { fromZodError } from 'zod-validation-error';
import { NextRequest, NextResponse } from 'next/server';
import { academicRecordFormSchema } from '@/state/schemas/formSchema';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  const request = await req.json();

  const result = academicRecordSchema.safeParse(request);

  if (!result.success) {
    return NextResponse.json(
      {
        error: fromZodError(result.error).toString(),
      },
      { status: 400 }
    );
  }




  const dataobj = academicRecordFormSchema(result.data);




  try {


  const checkStudentId = await db.academicRecord.findUnique({
    where: { studentId: dataobj?.studentId },
  });

  if (checkStudentId) {
    return NextResponse.json(
      {
        error: `Student record already exist!`,
      },
      { status: 400 }
    );
  }


    await db.academicRecord.create({
      data: {
        ...dataobj,
        subjectId: Number(dataobj.subjectId),
        studentId: Number(dataobj.studentId),
      },
    });

    return NextResponse.json(
      {
        success: ` Academic recordhas been added successfully!`,
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
