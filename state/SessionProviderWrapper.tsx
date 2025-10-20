import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

type SessionWrapperType = {
  children: React.ReactNode;
  session: Session | null;
};
const SessionProviderWrapper = ({ session, children }: SessionWrapperType) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
