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
    const recordId = parseInt(param, 10);

    if (isNaN(recordId)) {
      return NextResponse.json(
        { error: 'Invalid academicrecord ID' },
        { status: 400 }
      );
    }

    const academicrecord = await db.academicRecord.delete({
      where: { recordId },
    });

    return NextResponse.json(academicrecord, { status: 200 });
  } catch (err) {
    console.error('Error deleting academicrecord:', err);
    return NextResponse.json(
      { error: 'Failed to delete academicrecord' },
      { status: 500 }
    );
  }
}
