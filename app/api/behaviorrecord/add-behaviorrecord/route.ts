import { db } from '@/db';
import { behaviorRecordsSchema } from '@/state/schemas/validationSchemas';
import { fromZodError } from 'zod-validation-error';
import { NextRequest, NextResponse } from 'next/server';
import { behaviorRecordsFormSchema } from '@/state/schemas/formSchema';
import { dateTime, ymd } from '@/utils/dateFormats';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  const request = await req.json();
  const result = behaviorRecordsSchema.safeParse(request);

  if (!result.success) {
    return NextResponse.json(
      {
        error: fromZodError(result.error).toString(),
      },
      { status: 400 }
    );
  }

  const { date, studentId, description } = result.data;

  const dates = dateTime(date);

  try {
    await db.behaviorRecords.create({
      data: {
        date: dates,
        studentId,
        description,
      },
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
