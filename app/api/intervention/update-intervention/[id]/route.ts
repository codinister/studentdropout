import { db } from '@/db';
import { interventionSchema } from '@/state/schemas/validationSchemas';
import { fromZodError } from 'zod-validation-error';
import { NextRequest, NextResponse } from 'next/server';
import { interventionFormSchema } from '@/state/schemas/formSchema';
import { dateTime } from '@/utils/dateFormats';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const request = await req.json();
  const paramsId = (await params).id;
  const interventionId = parseInt(paramsId, 10);

  const result = interventionSchema.safeParse(request);

  if (!result.success) {
    return NextResponse.json(
      {
        error: fromZodError(result.error).toString(),
      },
      { status: 400 }
    );
  }

  const dataObj = result.data;

  try {
    await db.intervention.update({
      where: { interventionId },
      data: {
        ...interventionFormSchema(dataObj),
        date: dateTime(dataObj.date),
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
