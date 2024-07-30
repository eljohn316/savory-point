import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { Toaster } from '@/components/ui/toaster';
import { CookiesProvider } from 'next-client-cookies/server';

const fontSans = Inter({ subsets: ['latin'] });

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
