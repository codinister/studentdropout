import { db } from '@/db';
import z from 'zod';
import { userSchema } from '@/state/schemas/validationSchemas';
import { fromZodError } from 'zod-validation-error';
import { hashPassword } from '@/utils/passwordCrypt';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  const request = await req.json();
  
  const result = userSchema.safeParse(request);

  if (!result.success) {
    return NextResponse.json(
      {
        error: fromZodError(result.error).toString(),
      },
      { status: 400 }
    );
  }

  const { name, roleId, email, password } = result.data;

  const checkEmail = await db.user.findFirst({
    where: { email },
  });

  if (checkEmail) {
    return NextResponse.json(
      {
        error: `${email} is already in use!`,
      },
      { status: 400 }
    );
  }

  const pass = await hashPassword(password);

  try {
    const user = await db.user.create({
      data: {
        name,
        roleId,
        email,
        password: pass,
      },
    });

    return NextResponse.json({
      success: `${name} has been added successfully!`,
      data: user,
    
    }, {status: 200})
  } catch (err) {
    console.log(err)
  }
  return NextResponse.json({
    error: 'An error occured',
  }, {status: 400})
}

