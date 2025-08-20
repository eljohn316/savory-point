import * as React from 'react';
import { Container } from '@/components/container';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Container className="flex min-h-svh flex-col items-center justify-center py-0">
      {children}
    </Container>
  );
}
