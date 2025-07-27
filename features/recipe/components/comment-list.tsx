import { CommentListItem } from '@/features/recipe/components/comment-list-item';
import { Comment } from '@/features/recipe/components/comments';

type CommentListProps = {
  comments?: Comment[];
};

export function CommentList({ comments }: CommentListProps) {
  if (!comments) return null;

  if (comments.length === 0)
    return (
      <div className="mt-8 text-center">
        <p className="text-gray-700">This recipe has no comments yet.</p>
      </div>
    );

  return (
    <div className="mt-8 divide-y divide-gray-200">
      {comments.map((comment) => (
        <CommentListItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
