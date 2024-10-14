'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SearchInput } from '@/components/search-input';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const router = useRouter();

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value;

      if (!value) return;

      router.push(`/search?t=${value}`);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <div className="mx-auto max-w-xl">
        <SearchInput onKeyDown={handleKeyDown} />
      </div>
      {children}
    </div>
  );
}
