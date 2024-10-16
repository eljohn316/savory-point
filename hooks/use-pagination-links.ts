import { useMemo } from 'react';
import { RESULTS_PER_PAGE } from '@/lib/constants';

const generatePages = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

interface Props {
  totalResults: number;
  siblingsCount?: number;
  currentPage: number;
}

export function usePaginationLinks({
  currentPage,
  totalResults,
  siblingsCount = 1
}: Props) {
  const pages = useMemo(() => {
    const numPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
    const numPaginationButtons = 5 + 2 * siblingsCount;

    if (numPages <= numPaginationButtons) {
      return generatePages(1, numPages);
    } else {
      const FIRST_PAGE = 1;
      const LAST_PAGE = numPages;

      const leftSiblingIndex = Math.max(
        FIRST_PAGE,
        currentPage - siblingsCount
      );
      const rightSiblingIndex = Math.min(
        currentPage + siblingsCount,
        LAST_PAGE
      );

      const shouldDisplayLeftDots = leftSiblingIndex - FIRST_PAGE > 2;
      const shouldDisplayRightDots =
        Math.abs(rightSiblingIndex - LAST_PAGE) > 2;

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
  }, [currentPage, siblingsCount, totalResults]);

  return pages;
}
