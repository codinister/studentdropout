
import { db } from '@/db';
import { academicRecordSchema } from '@/state/schemas/validationSchemas';
import { fromZodError } from 'zod-validation-error';
import { NextRequest, NextResponse } from 'next/server';
import { academicRecordFormSchema } from '@/state/schemas/formSchema';


export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function Patch(req: NextRequest, {param}: {param: Promise<{id: string}>}) {
  const request = await req.json();
  const paramId = (await param).id
  const recordId = parseInt(paramId, 10)

 
  const result = academicRecordSchema.safeParse(request);

  if (!result.success) {
    return NextResponse.json(
      {
        error: fromZodError(result.error).toString(),
      },
      { status: 400 }
    );
  }

  const dataObject = result.data;



  try {
     await db.academicRecord.update({
      where: { recordId },
      data: academicRecordFormSchema(dataObject)
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
