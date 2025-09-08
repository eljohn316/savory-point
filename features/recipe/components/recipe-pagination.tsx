'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from 'lucide-react';
import { RECIPES_PER_PAGE, NUM_PAGINATION_LINKS } from '@/lib/constants';
import { range } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type RecipePaginationProps = {
  totalRecipes: number;
};

export function RecipePagination({ totalRecipes }: RecipePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const searchParamsPage = searchParams.get('page');
  const currentPage = searchParamsPage ? +searchParamsPage : 1;

  const totalPages = useMemo(
    () => Math.ceil(totalRecipes / RECIPES_PER_PAGE),
    [totalRecipes, RECIPES_PER_PAGE],
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const paginationLinks = useMemo(() => {
    if (totalPages <= NUM_PAGINATION_LINKS) {
      return range(1, totalPages);
    } else {
      const FIRST_PAGE = 1;
      const LAST_PAGE = totalPages;

      const leftSiblingIndex = Math.max(FIRST_PAGE, currentPage - 1);
      const rightSiblingIndex = Math.min(currentPage + 1, LAST_PAGE);

      const shouldDisplayLeftDots = leftSiblingIndex - FIRST_PAGE > 2;
      const shouldDisplayRightDots = LAST_PAGE - rightSiblingIndex > 2;

      if (!shouldDisplayLeftDots && shouldDisplayRightDots) {
        return [...range(FIRST_PAGE, NUM_PAGINATION_LINKS - 2), 'dots-right', LAST_PAGE];
      }

      if (shouldDisplayLeftDots && shouldDisplayRightDots) {
        return [
          FIRST_PAGE,
          'dots-left',
          ...range(leftSiblingIndex, rightSiblingIndex),
          'dots-right',
          LAST_PAGE,
        ];
      }

      if (shouldDisplayLeftDots && !shouldDisplayRightDots) {
        return [1, 'dots-left', ...range(LAST_PAGE - 4, LAST_PAGE)];
      }
    }
  }, [currentPage, totalRecipes, totalPages, RECIPES_PER_PAGE]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParamsPage]);

  function handlePrevStep() {
    if (currentPage > 2) {
      router.push(pathname + '?' + createQueryString('page', `${currentPage - 1}`));
    } else {
      router.push(pathname);
    }
  }

  function handleNextStep() {
    if (currentPage === totalPages) return;
    router.push(pathname + '?' + createQueryString('page', `${currentPage + 1}`));
  }

  if (totalPages <= 1) return null;

  return (
    <nav className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
      <div className="flex w-0 flex-1">
        <Button variant="outline" disabled={currentPage === 1} onClick={handlePrevStep}>
          <ChevronLeftIcon className="-ml-px size-4 text-gray-400" aria-hidden="true" />
          Prev
        </Button>
      </div>
      <div className="hidden md:flex md:items-center md:gap-x-3">
        {paginationLinks?.map((item) =>
          typeof item === 'string' ? (
            <Button key={item} className="pointer-events-none" variant="ghost" size="icon">
              <EllipsisIcon className="size-4 text-gray-600" aria-hidden="true" />
            </Button>
          ) : (
            <Button
              key={item}
              variant={item === currentPage ? 'outline' : 'ghost'}
              size="icon"
              className="transition-none"
              asChild>
              <Link href={item === 1 ? '/' : pathname + '?' + createQueryString('page', `${item}`)}>
                {item}
              </Link>
            </Button>
          ),
        )}
      </div>
      <div className="flex w-0 flex-1 justify-end">
        <Button variant="outline" disabled={currentPage === totalPages} onClick={handleNextStep}>
          Next
          <ChevronRightIcon className="-mr-px size-4 text-gray-400" aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
}
