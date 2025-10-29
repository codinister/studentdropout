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
    const attendanceId = parseInt(param, 10);

    if (isNaN(attendanceId)) {
      return NextResponse.json(
        { error: 'Invalid attendancerecord ID' },
        { status: 400 }
      );
    }

    const attendancerecord = await db.attendanceRecord.delete({
      where: { attendanceId },
    });

    return NextResponse.json(attendancerecord, { status: 200 });
  } catch (err) {
    console.error('Error deleting attendancerecord:', err);
    return NextResponse.json(
      { error: 'Failed to delete attendancerecord' },
      { status: 500 }
    );
  }
}
