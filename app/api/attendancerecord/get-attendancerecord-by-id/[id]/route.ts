
import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
export const revalidate = 0 


export async function GET(req: NextRequest, {params}: {params: Promise<{
  id: string
}>})  {
  const param = (await params).id
  const attendanceId = parseInt(param, 10)
  try {
    const attendance = await db.attendanceRecord.findFirst({
      where: { attendanceId },
    });


    return NextResponse.json(attendance)
  } catch (err) {
    console.log(err)
  }
};


