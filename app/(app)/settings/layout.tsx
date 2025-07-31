'use client';

import * as React from 'react';
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
      <div className="space-y-6">
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-x-2 text-sm font-semibold text-emerald-700"
          onClick={() => router.back()}>
          <ChevronLeftIcon className="size-4" />
          Return
        </button>
        <h3 className="text-3xl font-bold text-gray-900">Settings</h3>
      </div>
      <div className="mt-12">{children}</div>
    </Container>
  );
}
