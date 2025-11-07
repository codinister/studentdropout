import { db } from '@/db';
import { healthRecordSchema } from '@/state/schemas/validationSchemas';
import { fromZodError } from 'zod-validation-error';
import { NextRequest, NextResponse } from 'next/server';
import { healthRecordsFormSchema } from '@/state/schemas/formSchema';
import { dateTime, ymd } from '@/utils/dateFormats';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  const request = await req.json();
  const result = healthRecordSchema.safeParse(request);

  if (!result.success) {
    return NextResponse.json(
      {
        error: fromZodError(result.error).toString(),
      },
      { status: 400 }
    );
  }

  const dataobj = result.data;

  const dates = dateTime(dataobj.date);

  try {
    const finddup = await db.healthRecord.findFirst({
      where: {
        studentId: dataobj?.studentId,
      },
    });

    if (finddup) {
      return NextResponse.json(
        {
          error: 'Health Record already exist!',
        },
        { status: 400 }
      );
    }

    await db.healthRecord.create({
      data: { ...healthRecordsFormSchema(dataobj), date: dates },
    });

    return NextResponse.json(
      {
        success: `Behavior has been added successfully!`,
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
