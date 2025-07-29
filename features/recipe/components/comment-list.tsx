'use client';

import { CommentListPagination } from '@/features/recipe/components/comment-list-pagination';
import { CommentListSkeleton } from '@/features/recipe/components/comment-list-skeleton';
import { CommentListItem } from '@/features/recipe/components/comment-list-item';
import { useComments } from '@/features/recipe/hooks/use-comments';
import { getRecipeComments } from '@/features/recipe/queries/get-recipe-comments';

export type Comment = Awaited<ReturnType<typeof getRecipeComments>>[number];

type CommentsProps = {
  totalComments: number;
};

export function CommentList({ totalComments }: CommentsProps) {
  const {
    isPending,
    data: comments,
    totalPages,
    currentPage,
    handlePrevPage,
    handleNextPage,
  } = useComments({
    totalComments,
  });

  if (isPending) return <CommentListSkeleton num={4} />;

  if (comments?.length === 0)
    return (
      <div className="mt-8 text-center">
        <p className="text-gray-700">This recipe has no comments yet.</p>
      </div>
    );

  return (
    <>
      <div className="mt-8 divide-y divide-gray-200">
        {comments?.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} />
        ))}
      </div>
      <CommentListPagination
        currentPage={currentPage}
        totalComments={totalComments}
        totalPages={totalPages}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
      />
    </>
  );
}
