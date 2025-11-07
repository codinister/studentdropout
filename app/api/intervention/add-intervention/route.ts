import { db } from '@/db';
import { interventionSchema } from '@/state/schemas/validationSchemas';
import { fromZodError } from 'zod-validation-error';
import { NextRequest, NextResponse } from 'next/server';
import { interventionFormSchema } from '@/state/schemas/formSchema';
import { dateTime, ymd } from '@/utils/dateFormats';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  const request = await req.json();
  const result = interventionSchema.safeParse(request);

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
    const finddup = await db.intervention.findFirst({
      where: {
        studentId: dataobj?.studentId,
      },
    });

    if (finddup) {
      return NextResponse.json(
        {
          error: 'Intervention Record already exist!',
        },
        { status: 400 }
      );
    }

    await db.intervention.create({
      data: { ...interventionFormSchema(dataobj), date: dates },
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
