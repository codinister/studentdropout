import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const param = (await params).id
    const behaviorId = parseInt(param, 10);

    if (isNaN(behaviorId)) {
      return NextResponse.json(
        { error: 'Invalid behaviorRecords ID' },
        { status: 400 }
      );
    }

    const behaviorRecords = await db.behaviorRecords.delete({
      where: { behaviorId },
    });

    return NextResponse.json(behaviorRecords, { status: 200 });
  } catch (err) {
    console.error('Error deleting behaviorRecords:', err);
    return NextResponse.json(
      { error: 'Failed to delete behaviorRecords' },
      { status: 500 }
    );
  }
}
