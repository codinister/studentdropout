
import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
export const revalidate = 0 


export async function GET(req: NextRequest, {params}: {params: Promise<{
  id: string
}>})  {
  const param = (await params).id
  const predictionId = parseInt(param, 10)
  try {
    const dropoutpredictions = await db.dropoutPrediction.findFirst({
      where: { predictionId },
    });

    if (!dropoutpredictions) {
      return NextResponse.json({
        error: 'Something went wrong!'
      }, {status: 400})
    }

    return NextResponse.json(dropoutpredictions)
  } catch (err) {
    console.log(err)
  }
};


