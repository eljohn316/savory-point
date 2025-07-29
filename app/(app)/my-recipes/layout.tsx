import * as React from 'react';
import { Container } from '@/components/container';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <Container className="max-w-4xl">{children}</Container>;
}
