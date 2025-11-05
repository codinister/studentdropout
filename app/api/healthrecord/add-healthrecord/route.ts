import { db } from '@/db';
import {   healthRecordSchema } from '@/state/schemas/validationSchemas';
import { fromZodError } from 'zod-validation-error';
import { NextRequest, NextResponse } from 'next/server';
import {  healthRecordsFormSchema } from '@/state/schemas/formSchema';

export const dynamic = 'force-dynamic'
export const revalidate = 0 

export async function POST(req: NextRequest){
  const request = await req.json()
  const result = healthRecordSchema.safeParse(request);

  if (!result.success) {
    return NextResponse.json({
      error: fromZodError(result.error).toString(),
    }, {status: 400})
  }

  const dataObj = result.data;


  try {
     await db.healthRecord.create({
      data: healthRecordsFormSchema(dataObj)
    });

    return NextResponse.json({
      success: ` has been added successfully!`
    }, {status: 200})
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json({
    error: 'An error occured',
  }, {status: 400})
};


