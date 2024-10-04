import React from 'react';
import { SearchInput } from '@/components/search-input';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <SearchInput className="mx-auto max-w-xl" />
      {children}
    </div>
  );
}
