import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function DELETE(req: NextRequest, {params}: {params: Promise<{id: string}>}) {

  const param = (await params).id
  const userId = parseInt(param, 10)

  try {
    const user = await db.user.delete({
      where: { userId },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: 'Something went wrong',
        },
        { status: 400 }
      );
    }


    return NextResponse.json(
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
  }
}
