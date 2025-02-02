import React from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const { user } = await validateRequest();

  if (!user) redirect('/sign-in');

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
