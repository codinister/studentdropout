import type { Metadata } from 'next';

import '../globals.css';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import AppProvider from '@/state/redux/Provider'; // ✅ Redux Provider wrapper
import Modal from '@/components/Modal';
import { auth } from '@/auth';
import SessionProviderWrapper from '@/state/SessionProviderWrapper';




// Next.js metadata
export const metadata: Metadata = {
  title: 'BLUECREST UNIVERSITY COLLEGE',
  description: '',
};

// ✅ Root Layout (server component)
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const session = await auth()



  return (
      <AppProvider>
        <SessionProviderWrapper session={session}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6 relative">
            {children}
            <Footer />
          </main>
        </div>
        <Modal />
        <div className="modal-root"></div>
        </SessionProviderWrapper>
      </AppProvider>
  );
}
