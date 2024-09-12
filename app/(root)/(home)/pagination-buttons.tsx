'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { createContext, useContext, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon
} from '@heroicons/react/20/solid';
import { RESULTS_PER_PAGE } from './config';

const generatePages = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const PaginationContext = createContext<{
  currentPage: number;
  totalPages: number;
}>({
  currentPage: 1,
  totalPages: 0
});

function PaginationPrevLink() {
  const { currentPage } = useContext(PaginationContext);
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  if (currentPage > 2) urlSearchParams.set('page', `${currentPage - 1}`);
  else urlSearchParams.delete('page');

  if (currentPage === 1)
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-400 cursor-not-allowed">
        <ArrowLongLeftIcon
          className="mr-3 h-5 w-5 text-gray-300"
          aria-hidden="true"
        />
        Previous
      </button>
    );

  return (
    <Link
      href={`?${urlSearchParams.toString()}`}
      className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
      <ArrowLongLeftIcon
        className="mr-3 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
      Previous
    </Link>
  );
}

function PaginationNextLink() {
  const { currentPage, totalPages } = useContext(PaginationContext);
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  urlSearchParams.set('page', `${currentPage + 1}`);

  if (currentPage === totalPages)
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-400 cursor-not-allowed">
        Next
        <ArrowLongRightIcon
          className="ml-3 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </button>
    );

  return (
    <Link
      href={`?${urlSearchParams.toString()}`}
      className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
      Next
      <ArrowLongRightIcon
        className="ml-3 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
    </Link>
  );
}

function PaginationLink({ page }: { page: number }) {
  const { currentPage } = useContext(PaginationContext);
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  if (page === 1) urlSearchParams.delete('page');
  else urlSearchParams.set('page', `${page}`);

  return (
    <Link
      href={`?${urlSearchParams.toString()}`}
      className={clsx(
        page === currentPage
          ? 'border-emerald-600 text-emerald-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        'inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium'
      )}>
      {page}
    </Link>
  );
}

function PaginationDots() {
  return (
    <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
      ...
    </span>
  );
}

interface PaginationButtonsProps {
  siblingCount?: number;
  numResults: number;
}

export function PaginationButtons({
  siblingCount = 1,
  numResults
}: PaginationButtonsProps) {
  const searchParams = useSearchParams();
  const currentPage =
    typeof searchParams.get('page') === 'string'
      ? +searchParams.get('page')!
      : 1;
  const numPages = Math.ceil(numResults / RESULTS_PER_PAGE);

  const pages = useMemo(() => {
    const numPaginationButtons = 5 + 2 * siblingCount;

    if (numPages <= numPaginationButtons) {
      return generatePages(1, numPages);
    } else {
      const leftSiblingIndex = Math.max(1, currentPage - siblingCount);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, numPages);

      const shouldDisplayLeftDots = leftSiblingIndex - 1 > 2;
      const shouldDisplayRightDots = Math.abs(rightSiblingIndex - numPages) > 2;

      if (!shouldDisplayLeftDots && shouldDisplayRightDots) {
        return [
          ...generatePages(1, numPaginationButtons - 2),
          'dots-right',
          numPages
        ];
      }

      if (shouldDisplayLeftDots && shouldDisplayRightDots) {
        return [
          1,
          'dots-left',
          ...generatePages(leftSiblingIndex, rightSiblingIndex),
          'dots-right',
          numPages
        ];
      }

      if (shouldDisplayLeftDots && !shouldDisplayRightDots) {
        return [
          1,
          'dots-left',
          ...generatePages(numPages - (numPaginationButtons - 3), numPages)
        ];
      }
    }
  }, [siblingCount, currentPage, numPages]);

  if (typeof pages === 'undefined' || numResults <= RESULTS_PER_PAGE)
    return null;

  return (
    <PaginationContext.Provider value={{ currentPage, totalPages: numPages }}>
      <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        <div className="-mt-px flex w-0 flex-1">
          <PaginationPrevLink />
        </div>
        <div className="hidden md:-mt-px md:flex">
          {pages.map((page) => {
            if (typeof page === 'number') {
              return <PaginationLink key={page} page={page} />;
            } else {
              return <PaginationDots key={page} />;
            }
          })}
        </div>
        <div className="-mt-px flex w-0 flex-1 justify-end">
          <PaginationNextLink />
        </div>
      </nav>
    </PaginationContext.Provider>
  );
}
