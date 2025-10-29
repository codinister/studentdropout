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
    const demoId = parseInt(param, 10);

    if (isNaN(demoId)) {
      return NextResponse.json(
        { error: 'Invalid demographicinfo ID' },
        { status: 400 }
      );
    }

    const demographicinfo = await db.demographicInfo.delete({
      where: { demoId },
    });

    return NextResponse.json(demographicinfo, { status: 200 });
  } catch (err) {
    console.error('Error deleting demographicinfo:', err);
    return NextResponse.json(
      { error: 'Failed to delete demographicinfo' },
      { status: 500 }
    );
  }
}
