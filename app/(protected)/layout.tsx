import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import AppProvider from '@/state/redux/Provider';
import Modal from '@/components/Modal';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
    <html lang="en">
      <body
        cz-shortcut-listen="true"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 p-6 relative">
            {children}
            <br />
            <br />
            <Footer />
          </main>
        </div>
          <Modal />
        </AppProvider>
      </body>
    </html>
  );
}
