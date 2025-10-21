import type { Metadata } from 'next';

import './globals.css';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'BLUECREST UNIVERSITY COLLEGE',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-qb-installed="true" suppressHydrationWarning={true}>
      <body cz-shortcut-listen="true" className={`tuctuc  antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
