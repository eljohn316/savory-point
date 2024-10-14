'use client';

import Link from 'next/link';
import React, { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

import { SearchInput } from '@/components/search-input';
import { Spinner } from '@/components/ui/spinner';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSearching, startSearching] = useTransition();

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value;

      if (!value) return;

      startSearching(() => {
        router.push(`/search?t=${value}`);
      });
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/"
        className="-ml-1 inline-flex items-center gap-x-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
        <ChevronLeftIcon className="size-5" aria-hidden="true" />
        Return to Home
      </Link>
      <div className="mx-auto mb-8 mt-6 max-w-xl">
        <SearchInput
          defaultValue={searchParams.get('t') ?? ''}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        <div className="mb-8 border-b border-gray-200 pb-5">
          <p className="font-semibold text-gray-500">
            Search results for
            <span className="text-gray-900">
              {' '}
              &ldquo;{searchParams.get('t')}&rdquo;
            </span>
          </p>
        </div>
        {isSearching ? (
          <div className="flex justify-center">
            <Spinner className="size-8 text-gray-400" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
