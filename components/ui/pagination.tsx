'use client';

import React, { createContext, useContext, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { RESULTS_PER_PAGE } from '@/lib/constants';
import { Button } from '@/components/ui/button';

const PaginationContext = createContext<{ totalPages: number }>({
  totalPages: 0
});

interface PaginationProps extends React.ComponentPropsWithoutRef<'div'> {
  totalResults: number;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  function Pagination({ totalResults, children, className, ...props }, ref) {
    const totalPages = useMemo(
      () => Math.ceil(totalResults / RESULTS_PER_PAGE),
      [totalResults]
    );

    return (
      <PaginationContext.Provider value={{ totalPages }}>
        <div
          className={cn(
            'flex items-center justify-between gap-x-6 border-t border-gray-200 pt-4',
            className
          )}
          ref={ref}
          {...props}>
          {children}
        </div>
      </PaginationContext.Provider>
    );
  }
);

export function PaginationPrevButton() {
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());
  const currentPage =
    typeof searchParams.get('page') === 'string'
      ? +searchParams.get('page')!
      : 1;

  if (currentPage > 2) newSearchParams.set('page', `${currentPage - 1}`);
  else newSearchParams.delete('page');

  if (currentPage === 1)
    return (
      <Button variant="outline" disabled>
        <ChevronLeftIcon
          className="-ml-1 mr-1.5 size-5 text-gray-300"
          aria-hidden="true"
        />
        Previous
      </Button>
    );

  return (
    <Button asChild variant="outline">
      <Link href={`?${newSearchParams.toString()}`}>
        <ChevronLeftIcon
          className="-ml-1 mr-1.5 size-5 text-gray-400"
          aria-hidden="true"
        />
        Previous
      </Link>
    </Button>
  );
}

export function PaginationNextButton() {
  const { totalPages } = useContext(PaginationContext);
  const searchParams = useSearchParams();
  const currentPage =
    typeof searchParams.get('page') === 'string'
      ? +searchParams.get('page')!
      : 1;
  const newSearchParams = new URLSearchParams(searchParams.toString());

  if (currentPage === totalPages)
    return (
      <Button variant="outline" disabled>
        Next
        <ChevronRightIcon
          className="-mr-1 ml-1.5 size-5 text-gray-400"
          aria-hidden="true"
        />
      </Button>
    );

  newSearchParams.set('page', `${currentPage + 1}`);

  return (
    <Button asChild variant="outline">
      <Link href={`?${newSearchParams.toString()}`}>
        Next
        <ChevronRightIcon
          className="-mr-1 ml-1.5 size-5 text-gray-400"
          aria-hidden="true"
        />
      </Link>
    </Button>
  );
}

export const PaginationLinkWrapper = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(function PaginationLinkWrapper({ children, className, ...props }, ref) {
  return (
    <div className={cn('flex gap-x-4', className)} ref={ref} {...props}>
      {children}
    </div>
  );
});

interface PaginationLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  isActive?: boolean;
}

export const PaginationLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  PaginationLinkProps
>(function PaginationLink({ isActive, children, ...props }, ref) {
  return (
    <Button asChild variant={isActive ? 'outline' : 'ghost'}>
      <Link ref={ref} {...props}>
        {children}
      </Link>
    </Button>
  );
});

export const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex size-9 items-center justify-center', className)}
    {...props}>
    <EllipsisHorizontalIcon className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);
