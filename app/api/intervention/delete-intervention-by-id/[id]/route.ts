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
    const interventionId = parseInt(param, 10);

    if (isNaN(interventionId)) {
      return NextResponse.json(
        { error: 'Invalid intervention ID' },
        { status: 400 }
      );
    }

    const intervention = await db.intervention.delete({
      where: { interventionId },
    });

    return NextResponse.json(intervention, { status: 200 });
  } catch (err) {
    console.error('Error deleting intervention:', err);
    return NextResponse.json(
      { error: 'Failed to delete intervention' },
      { status: 500 }
    );
  }
}
