
import { db } from '@/db';
import { userSchema } from '@/state/schemas/validationSchemas';
import { fromZodError } from 'zod-validation-error';
import { hashPassword } from '@/utils/passwordCrypt';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function Patch(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const request = await req.json();
  const paramsId = (await params).id
  const userId = parseInt(paramsId, 10)

  const result = userSchema.safeParse(request);

  if (!result.success) {
    return NextResponse.json(
      {
        error: fromZodError(result.error).toString(),
      },
      { status: 200 }
    );
  }

  const { name, roleId, email, password } = result.data;

  const checkEmail = await db.user.findFirst({
    where: { email, NOT: { userId } },
  });

  if (checkEmail) {
    return NextResponse.json(
      {
        error: `${email} is already in use!`,
      },
      { status: 400 }
    );
  }

  try {
    if (password) {
      const pass = await hashPassword(password);
      await db.user.update({
        where: { userId },
        data: {
          name,
          roleId,
          email,
          password: pass,
        },
      });
    } else {
      await db.user.update({
        where: { userId },
        data: {
          name,
          roleId,
          email,
        },
      });
    }

    return NextResponse.json(
      {
        success: `${name} has been updated successfully!`,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json(
    {
      error: 'An error occured',
    },
    { status: 400 }
  );
}
