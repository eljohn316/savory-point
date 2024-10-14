import React from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

interface LayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default function Layout({ children, params }: LayoutProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href={`/recipe/uploads/${params.id}`}
        className="-ml-1 inline-flex items-center gap-x-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
        <ChevronLeftIcon className="size-5" aria-hidden="true" />
        Back to Recipe details
      </Link>
      <div className="mt-8">{children}</div>
    </div>
  );
}
