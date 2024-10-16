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
import { useSearchParams } from 'next/navigation';

interface RecipeListPaginationProps {
  totalResults: number;
  currentPage: number;
}

export function RecipeSearchListPagination({
  totalResults,
  currentPage
}: RecipeListPaginationProps) {
  const searchParams = useSearchParams();
  const pages = usePaginationLinks({ totalResults, currentPage });

  if (!pages) return null;

  const newSearchParams = new URLSearchParams(searchParams.toString());

  const links = (
    <>
      {pages.map((page) => {
        if (typeof page === 'string') {
          return <PaginationEllipsis key={page} />;
        } else {
          newSearchParams.set('page', `${page}`);
          return (
            <PaginationLink
              key={page}
              href={`/search?${newSearchParams.toString()}`}
              isActive={currentPage === page}>
              {page}
            </PaginationLink>
          );
        }
      })}
    </>
  );

  return (
    <Pagination totalResults={totalResults}>
      <PaginationPrevButton />
      <PaginationLinkWrapper>{links}</PaginationLinkWrapper>
      <PaginationNextButton />
    </Pagination>
  );
}
