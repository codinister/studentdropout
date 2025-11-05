
import { db } from '@/db';
import { behaviorRecordsSchema } from '@/state/schemas/validationSchemas';
import { fromZodError } from 'zod-validation-error';
import { NextRequest, NextResponse } from 'next/server';
import { behaviorRecordsFormSchema } from '@/state/schemas/formSchema';


export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function PATCH(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const request = await req.json();
  const paramsId = (await params).id
  const behaviorId = parseInt(paramsId, 10)

 
  const result = behaviorRecordsSchema.safeParse(request);

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
     await db.behaviorRecords.update({
      where: { behaviorId },
      data: behaviorRecordsFormSchema(dataObj)
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
