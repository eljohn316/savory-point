import * as React from 'react';
import { Navigation } from '@/components/navigation';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
