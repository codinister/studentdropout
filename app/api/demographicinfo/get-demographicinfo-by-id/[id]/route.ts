
import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
export const revalidate = 0 


export async function GET(req: NextRequest, {params}: {params: Promise<{
  id: string
}>})  {
  const param = (await params).id
  const demoId = parseInt(param, 10)
  try {
    const demographicinfos = await db.demographicInfo.findFirst({
      where: { demoId },
    });

    if (!demographicinfos) {
      return NextResponse.json({
        error: 'Something went wrong!'
      }, {status: 400})
    }

    return NextResponse.json(demographicinfos)
  } catch (err) {
    console.log(err)
  }
};


