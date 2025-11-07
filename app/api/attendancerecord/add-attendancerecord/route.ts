import { db } from '@/db';
import { attendanceRecordSchema } from '@/state/schemas/validationSchemas';
import { fromZodError } from 'zod-validation-error';
import { NextRequest, NextResponse } from 'next/server';
import { attendanceRecordFormSchema } from '@/state/schemas/formSchema';
import { dateTime } from '@/utils/dateFormats';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  const request = await req.json();
  const result = attendanceRecordSchema.safeParse(request);

  if (!result.success) {
    return NextResponse.json(
      {
        error: fromZodError(result.error).toString(),
      },
      { status: 400 }
    );
  }

  const dataObj = result.data;
  const dates = dateTime(dataObj?.date);

  try {
    const finddup = await db.attendanceRecord.findFirst({
      where: {
        AND: { date: dates, studentId: dataObj?.studentId },
      },
    });

    if (finddup) {
      return NextResponse.json(
        {
          error: 'Attendance Record already exist!',
        },
        { status: 400 }
      );
    }

    await db.attendanceRecord.create({
      data: {
        ...attendanceRecordFormSchema(dataObj),
        date: dates,
      },
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
