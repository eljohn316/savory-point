import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';

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
      <body className={fontSans.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
