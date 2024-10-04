import React from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <Link
        href="/"
        className="-ml-1 inline-flex items-center gap-x-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
        <ChevronLeftIcon className="size-5" aria-hidden="true" />
        Return
      </Link>
      {children}
    </div>
  );
}
