
import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export async function GET(req: NextRequest, {params}: {params: Promise<{
  email: string
}>}) {
  const  email  = (await params).email

  try {
    const user = await db.user.findFirst({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
