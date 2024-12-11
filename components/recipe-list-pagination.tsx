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

  if (!pages) return null;

  const links = (
    <>
      {pages.map((page) => {
        if (typeof page === 'string') return <PaginationEllipsis key={page} />;
        else
          return (
            <PaginationLink
              key={page}
              href={`?page=${page}`}
              isActive={currentPage === page}>
              {page}
            </PaginationLink>
          );
      })}
    </>
  );

  return (
    <Pagination totalResults={totalResults}>
      <PaginationPrevButton />
      <PaginationLinkWrapper className="hidden sm:flex">
        {links}
      </PaginationLinkWrapper>
      <PaginationNextButton />
    </Pagination>
  );
}
