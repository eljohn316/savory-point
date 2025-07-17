import '@/app/globals.css';
import type { Metadata } from 'next';
import { Outfit, Neuton } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

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
    <html lang="en">
      <body className={`${fontSans.variable} ${fontSerif.variable} antialiased`}>
        {children}
        <Toaster expand />
      </body>
    </html>
  );
}
