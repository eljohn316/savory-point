'use client';

import { usePaginationLinks } from '@/hooks/use-pagination-links';
import {
  Pagination,
  PaginationEllipsis,
  PaginationLink,
  PaginationLinkWrapper,
  PaginationNextButton,
  PaginationPrevButton
} from '@/components/ui/pagination';

interface RecipeListPaginationProps {
  totalResults: number;
  currentPage: number;
}

export function RecipeListPagination({
  totalResults,
  currentPage
}: RecipeListPaginationProps) {
  const pages = usePaginationLinks({ totalResults, currentPage });

  if (typeof pages === 'undefined') return null;

  return (
    <Pagination totalResults={totalResults}>
      <PaginationPrevButton />
      <PaginationLinkWrapper>
        {pages.map((page) =>
          typeof page === 'string' ? (
            <PaginationEllipsis key={page} />
          ) : (
            <PaginationLink
              key={page}
              href={`?page=${page}`}
              isActive={currentPage === page}>
              {page}
            </PaginationLink>
          )
        )}
      </PaginationLinkWrapper>
      <PaginationNextButton />
    </Pagination>
  );
}
