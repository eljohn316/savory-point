import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment as deleteCommentAction } from '@/features/recipe/actions/delete-comment';

export function useDeleteComment(id: string) {
  const queryClient = useQueryClient();
  const {
    isPending: isDeleting,
    mutate: deleteComment,
    ...rest
  } = useMutation({
    mutationFn: deleteCommentAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  return {
    ...rest,
    isDeleting,
    deleteComment,
  };
}
