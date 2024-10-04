import Link from 'next/link';
import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

interface LayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default function Layout({ children, params }: LayoutProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <Link
        href={`/account/recipe/${params.id}`}
        className="-ml-1 inline-flex items-center gap-x-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
        <ChevronLeftIcon className="size-5" aria-hidden="true" />
        Return
      </Link>
      {children}
    </div>
  );
}
