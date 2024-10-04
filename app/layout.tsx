import type { Metadata } from 'next';
import { Quicksand, Lora, Cookie } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const fontSans = Quicksand({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

const fontSerif = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap'
});

const fontLogo = Cookie({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-logo'
});

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
    <html
      lang="en"
      className={`${fontSans.variable} ${fontSerif.variable} ${fontLogo.variable}`}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
