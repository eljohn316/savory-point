import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import { CookiesProvider } from 'next-client-cookies/server';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

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
          {children}
          <Toaster />
        </body>
      </CookiesProvider>
    </html>
  );
}
