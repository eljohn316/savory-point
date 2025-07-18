'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon } from 'lucide-react';
import { Container } from '@/components/container';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <Container className="max-w-xl">
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-x-2 text-sm font-semibold text-emerald-700"
        onClick={() => router.back()}>
        <ChevronLeftIcon className="size-4" />
        Return
      </button>
      <div className="mt-6">{children}</div>
    </Container>
  );
}
