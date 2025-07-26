import { Button } from '@/components/ui/button';
import { CommentListItem } from '@/features/recipe/components/comment-list-item';
import { getRecipeComments } from '@/features/recipe/queries/get-recipe-comments';

export type Comment = Awaited<ReturnType<typeof getRecipeComments>>['comments'][number];

type CommentListProps = {
  comments: Comment[];
  totalComments: number;
};

export function CommentList({ comments, totalComments }: CommentListProps) {
  if (totalComments === 0)
    return (
      <div className="mt-16 text-center">
        <p className="text-xl font-bold text-gray-700">This recipe has no comments yet</p>
      </div>
    );

  return (
    <>
      <div className="mt-16 space-y-10" id="recipe-comments">
        <p className="text-xl font-bold text-gray-700">Comments ({totalComments})</p>
        <div className="divide-y divide-gray-200">
          {comments.map((comment) => (
            <CommentListItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
      {totalComments > 3 && (
        <div className="mt-8 flex justify-center border-t border-gray-200 pt-8">
          <Button variant="outline">See all comments</Button>
        </div>
      )}
    </>
  );
}
