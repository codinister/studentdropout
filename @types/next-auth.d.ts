import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  userId: string | unknown;
  roleId: string | unknown;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
