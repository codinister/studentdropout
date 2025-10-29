import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';

import { comparePassword } from './utils/passwordCrypt';

import getUserByEmail from './state/actions/getUserByEmail';
import { loginSchema } from './state/schemas/validationSchemas';
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
        const compared = await comparePassword(password,user.password);
        if (!compared) return null;
        return user;
      },
    }),
  ],
};

export default authConfig;
