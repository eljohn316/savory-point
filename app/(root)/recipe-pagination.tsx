'use client';

import { useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { RECIPES_PER_PAGE } from './config';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationPrevious as PaginationPreviousBase,
  PaginationNext as PaginationNextBase
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RecipePaginationProps {
  currentPage: number;
  recipesCount: number;
}

function PaginationPrevious() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage =
    typeof searchParams.get('page') === 'string'
      ? Number(searchParams.get('page'))
      : 1;

  if (currentPage === 1)
    return (
      <Button variant="ghost" className="gap-1 pl-2.5 mr-auto" disabled>
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
    );

  const urlSearchParams = new URLSearchParams(searchParams);

  if (currentPage > 2) urlSearchParams.set('page', `${currentPage - 1}`);
  else urlSearchParams.delete('page');

  return (
    <PaginationPreviousBase
      href={`${pathname}?${urlSearchParams.toString()}`}
      className="mr-auto"
    />
  );
}

function PaginationNext({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage =
    typeof searchParams.get('page') === 'string'
      ? Number(searchParams.get('page'))
      : 1;

  if (currentPage >= totalPages)
    return (
      <Button variant={'ghost'} className="gap-1 pr-2.5 ml-auto" disabled>
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    );

  const urlSearchParams = new URLSearchParams(searchParams);
  urlSearchParams.set('page', `${currentPage + 1}`);

  return (
    <PaginationNextBase
      href={`${pathname}?${urlSearchParams.toString()}`}
      className="ml-auto"
    />
  );
}

export function RecipePagination({
  currentPage,
  recipesCount
}: RecipePaginationProps) {
  const totalPages = Math.ceil(recipesCount / RECIPES_PER_PAGE);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paginationLinks = useMemo(() => {
    // 5 - First Page + Last Page + Current Page + 2 Dots;
    const siblingsCount = 1;
    const numPaginationItems = 5 + 2 * siblingsCount;

    if (totalPages <= numPaginationItems) {
      return range(1, totalPages);
    }

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    const leftSiblingIndex = Math.max(
      firstPageIndex,
      currentPage - siblingsCount
    );
    const rightSiblingIndex = Math.min(
      currentPage + siblingsCount,
      lastPageIndex
    );

    const shouldShowLeftDots =
      leftSiblingIndex > firstPageIndex + (siblingsCount + 1);
    const shouldShowRightDots =
      rightSiblingIndex < lastPageIndex - (siblingsCount + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      return [
        ...range(firstPageIndex, numPaginationItems - 2),
        'dots-right',
        lastPageIndex
      ];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      return [
        firstPageIndex,
        'dots-left',
        ...range(lastPageIndex - (numPaginationItems - 3), lastPageIndex)
      ];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      return [
        firstPageIndex,
        'dots-left',
        ...range(leftSiblingIndex, rightSiblingIndex),
        'dots-right',
        lastPageIndex
      ];
    }
  }, [currentPage, totalPages]);

  if (totalPages <= 1 || typeof paginationLinks === 'undefined') return null;

  return (
    <Pagination>
      <PaginationPrevious />
      <PaginationContent className="hidden md:flex">
        {paginationLinks.map((page) => {
          if (typeof page === 'string')
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            );

          const urlSearchParams = new URLSearchParams(searchParams);
          urlSearchParams.set('page', `${page}`);

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={`${pathname}?${urlSearchParams.toString()}`}
                isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>
      <PaginationNext totalPages={totalPages} />
    </Pagination>
  );
}

function range(start: number, end: number) {
  let length = end - start + 1;
  return Array.from({ length }, (_, i) => i + start);
}
