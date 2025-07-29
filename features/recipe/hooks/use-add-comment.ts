import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { addComment, type AddCommentPayload } from '@/features/recipe/actions/add-comment';

export function useAddComment() {
  const queryClient = useQueryClient();
  const { slug } = useParams<{ slug: string }>();

  return useMutation({
    mutationFn: (payload: AddCommentPayload) => addComment(payload, `/recipes/${slug}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
}
