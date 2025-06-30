import { Container } from '@/components/container';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Container className="max-w-md sm:max-w-2xl lg:max-w-4xl">
      {children}
    </Container>
  );
}
