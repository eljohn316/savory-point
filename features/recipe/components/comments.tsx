'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CommentForm } from '@/features/recipe/components/comment-form';
import { CommentList } from '@/features/recipe/components/comment-list';
import { CommentListPagination } from '@/features/recipe/components/comment-list-pagination';
import { CommentListSkeleton } from '@/features/recipe/components/comment-list-skeleton';
import { useRecipeSlugContext } from '@/features/recipe/providers/recipe-slug-page-provider';
import { getRecipeComments } from '@/features/recipe/queries/get-recipe-comments';

export type Comment = Awaited<ReturnType<typeof getRecipeComments>>[number];

type CommentsProps = {
  totalComments: number;
};

const COMMENTS_PER_PAGE = 4;

export function Comments({ totalComments }: CommentsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { recipeId } = useRecipeSlugContext();
  const { isPending, data } = useQuery({
    queryKey: ['comments', currentPage, recipeId],
    queryFn: () =>
      getRecipeComments(recipeId, {
        take: COMMENTS_PER_PAGE,
        skip: (currentPage - 1) * COMMENTS_PER_PAGE,
      }),
  });
  const totalPages = useMemo(() => Math.ceil(totalComments / COMMENTS_PER_PAGE), [totalComments]);

  function handlePrevPage() {
    const prevPage = currentPage <= 1 ? currentPage : currentPage - 1;
    setCurrentPage(prevPage);
  }

  function handleNextPage() {
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    setCurrentPage(nextPage);
  }

  return (
    <div className="space-y-14">
      <CommentForm />
      <div id="recipe-comments">
        <p className="text-xl font-bold text-gray-700">Comments ({totalComments})</p>
        {isPending ? <CommentListSkeleton num={3} /> : <CommentList comments={data} />}
        <CommentListPagination
          currentPage={currentPage}
          totalComments={totalComments}
          totalPages={totalPages}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
      </div>
    </div>
  );
}
