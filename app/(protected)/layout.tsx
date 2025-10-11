import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import AppProvider from '@/state/redux/Provider'; // ✅ Redux Provider wrapper
import Modal from '@/components/Modal';

// Font setup
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Next.js metadata
export const metadata: Metadata = {
  title: 'BLUECREST UNIVERSITY COLLEGE',
  description: '',
};

// ✅ Root Layout (server component)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <AppProvider>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6 relative">
            {children}
            <Footer />
          </main>
        </div>
        <Modal />
        <div className="modal-root"></div>
      </AppProvider>
  );
}
