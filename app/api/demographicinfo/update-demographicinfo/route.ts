
import { db } from '@/db';
import { demographicInfoSchema } from '@/state/schemas/validationSchemas';
import { fromZodError } from 'zod-validation-error';
import { NextRequest, NextResponse } from 'next/server';
import { demographicInfoFormSchema } from '@/state/schemas/formSchema';


export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function Patch(req: NextRequest, {param}: {param: Promise<{id: string}>}) {
  const request = await req.json();
  const paramId = (await param).id
  const demoId = parseInt(paramId, 10)

 
  const result = demographicInfoSchema.safeParse(request);

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
     await db.demographicInfo.update({
      where: { demoId },
      data: demographicInfoFormSchema(dataObj)
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
