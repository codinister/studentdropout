
import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
export const revalidate = 0 


export async function GET(req: NextRequest, {params}: {params: Promise<{
  id: string
}>})  {
  const param = (await params).id
  const recordId = parseInt(param, 10)
  try {
    const academicrecords = await db.academicRecord.findFirst({
      where: { recordId },
    });

    if (!academicrecords) {
      return NextResponse.json({
        error: 'Something went wrong!'
      }, {status: 400})
    }

    return NextResponse.json(academicrecords)
  } catch (err) {
    console.log(err)
  }
};


