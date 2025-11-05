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
    const healthId = parseInt(param, 10);

    if (isNaN(healthId)) {
      return NextResponse.json(
        { error: 'Invalid healthRecord ID' },
        { status: 400 }
      );
    }

    const healthRecord = await db.healthRecord.delete({
      where: { healthId },
    });

    return NextResponse.json(healthRecord, { status: 200 });
  } catch (err) {
    console.error('Error deleting healthRecord:', err);
    return NextResponse.json(
      { error: 'Failed to delete healthRecord' },
      { status: 500 }
    );
  }
}
