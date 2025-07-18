import * as React from 'react';
import { Container } from '@/components/container';
import { Navigation } from '@/components/navigation';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      <Container className="max-w-4xl">{children}</Container>
    </>
  );
}
