
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/db';
import authConfig from './auth.config';
import getUserByEmail from './state/actions/getUserByEmail';
import { userDatasetType } from './types/types';

export const { auth, signIn, signOut, handlers } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.roleId = token.roleId;
        session.user.userId = token.userId;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = (await getUserByEmail(
        String(token.email)
      )) as userDatasetType;
      if (!user) return token;

      token.roleId = user.roleId;
      token.userId = user.userId;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
