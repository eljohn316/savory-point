import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRecipeComments } from '@/features/recipe/queries/get-recipe-comments';

type useCommentProps = {
  totalComments: number;
  recipeId: string;
};

export const COMMENTS_PER_PAGE = 4;

export function useComments({ totalComments, recipeId }: useCommentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMemo(() => Math.ceil(totalComments / COMMENTS_PER_PAGE), [totalComments]);

  const handlePrevPage = useCallback(() => {
    const prevPage = currentPage <= 1 ? currentPage : currentPage - 1;
    setCurrentPage(prevPage);
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    setCurrentPage(nextPage);
  }, [currentPage]);

  return {
    ...useQuery({
      queryKey: ['comments', currentPage, recipeId],
      queryFn: () =>
        getRecipeComments(recipeId, {
          take: COMMENTS_PER_PAGE,
          skip: (currentPage - 1) * COMMENTS_PER_PAGE,
        }),
    }),
    currentPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
  };
}
