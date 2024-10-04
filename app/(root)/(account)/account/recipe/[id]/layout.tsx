import Link from 'next/link';
import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="space-y-8">
      <Link
        href="/account"
        className="-ml-1 inline-flex items-center gap-x-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
        <ChevronLeftIcon className="size-5" aria-hidden="true" />
        Back to Account
      </Link>
      {children}
    </div>
  );
}
