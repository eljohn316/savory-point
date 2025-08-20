import '@/app/globals.css';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Outfit, Neuton } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/app/_providers/providers';

const fontSans = Outfit({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const fontSerif = Neuton({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Savory Point',
    default: 'Savory Point',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${fontSans.variable} ${fontSerif.variable} overflow-y-scroll antialiased`}>
        <Providers>
          <Suspense>{children}</Suspense>
          <Toaster expand />
        </Providers>
      </body>
    </html>
  );
}
