'use server';

import { z } from 'zod';
import { loginSchema } from '../schemas/schemas';
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DEFAULT_REDIRECT_ROUTE } from '@/routes';


export async function userLogin(values: z.infer<typeof loginSchema>) {

  const loguser = await auth()

  // Validate input
  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    return { error: 'Invalid credentials' };
  }

  const { email, password } = parsed.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT_ROUTE,
    });

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password' };
        default:
          return { error: 'Authentication failed' };
      }
    }

    throw error
  }
}
