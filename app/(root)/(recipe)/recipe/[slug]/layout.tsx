import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/"
        className="-ml-1 inline-flex items-center gap-x-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
        <ChevronLeftIcon className="size-5" aria-hidden="true" />
        Return to Recipes
      </Link>
      <div className="mt-10">{children}</div>
    </div>
  );
}
