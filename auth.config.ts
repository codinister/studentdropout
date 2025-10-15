import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';

import bcrypt from 'bcryptjs';

import getUserByEmail from './state/actions/getUserByEmail';
import { loginSchema } from './state/schemas/schemas';
import { userSchema, UserType } from './types/types';

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials): Promise<any> {
        // Validate input using Zod schema
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        // Fetch user from database
        const user = (await getUserByEmail(email)) as userSchema;
        if (!user || !user?.password) return null;
        const compared = bcrypt.compare(user.password, password);
        if (!compared) return null;
        return user;
      },
    }),
  ],
};

export default authConfig;
