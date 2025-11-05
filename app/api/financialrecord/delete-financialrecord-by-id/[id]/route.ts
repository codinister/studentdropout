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
    const financialId = parseInt(param, 10);

    if (isNaN(financialId)) {
      return NextResponse.json(
        { error: 'Invalid financialStatus ID' },
        { status: 400 }
      );
    }

    const financialStatus = await db.financialStatus.delete({
      where: { financialId },
    });

    return NextResponse.json(financialStatus, { status: 200 });
  } catch (err) {
    console.error('Error deleting financialStatus:', err);
    return NextResponse.json(
      { error: 'Failed to delete financialStatus' },
      { status: 500 }
    );
  }
}
