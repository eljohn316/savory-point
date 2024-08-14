import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';

import './globals.css';

import { Toaster } from '@/components/ui/toaster';
import { CookiesProvider } from 'next-client-cookies/server';

const fontSans = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Savory Point',
    default: 'Savory Point'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CookiesProvider>
        <body className={fontSans.className}>
          <nav className="bg-green-100 h-20">
            <div className="text-center font-bold pt-6">Nav Here</div>
          </nav>
          {children}
          <Toaster />
        </body>
      </CookiesProvider>
    </html>
  );
}
