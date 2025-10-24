import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const param = (await params).id
  const userId = parseInt(param, 10);

      console.log('ID', userId)

  try {
    const user = await db.user.findFirst({
      where: {userId}
    });


    console.log('USA', user)
    if (!user){
      return NextResponse.json(
        { error: 'Something went wrong!' },
        { status: 400 }
      );
    }


    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
  }
}
