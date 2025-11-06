import { db } from '@/db';
import { settingsSchema } from '@/state/schemas/validationSchemas';
import { fromZodError } from 'zod-validation-error';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const request = await req.json();
  const paramId = (await params).id;
  const settingsId = parseInt(paramId, 10);

  const result = settingsSchema.safeParse(request);

  if (!result.success) {
    return NextResponse.json(
      {
        error: fromZodError(result.error).toString(),
      },
      { status: 400 }
    );
  }

  const {
    schoolName,
    schoolPhone,
    schoolWebsite,
    schoolLocation,
    schoolPostalAddress,
  } = result.data;

  try {
    await db.settings.update({
      where: { settingsId },
      data: {
        schoolName,
        schoolPhone,
        schoolWebsite,
        schoolLocation,
        schoolPostalAddress,
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
