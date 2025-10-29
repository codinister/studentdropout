import { db } from '@/db';
import {  NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const param = (await params).id
    const predictionId = parseInt(param, 10);

    if (isNaN(predictionId)) {
      return NextResponse.json(
        { error: 'Invalid dropoutprediction ID' },
        { status: 400 }
      );
    }

    const dropoutprediction = await db.dropoutPrediction.delete({
      where: { predictionId},
    });

    return NextResponse.json(dropoutprediction, { status: 200 });
  } catch (err) {
    console.error('Error deleting dropoutprediction:', err);
    return NextResponse.json(
      { error: 'Failed to delete dropoutprediction' },
      { status: 500 }
    );
  }
}
