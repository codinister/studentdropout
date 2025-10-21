export const runtime = 'nodejs';
import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DEFAULT_REDIRECT_ROUTE } from '@/routes';
import { loginSchema } from '@/state/schemas/schemas';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  const values = await req.json();

  // Validate input
  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid credentials' });
  }

  const { email, password } = parsed.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard'
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return NextResponse.json({ error: 'Invalid email or password' });
        default:
          return NextResponse.json({ error: 'Authentication failed' });
      }
    }

    throw error;
  }
}
