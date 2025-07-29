import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment } from '@/features/recipe/actions/update-comment';

export function useUpdateComment(id: string) {
  const queryClient = useQueryClient();
  const {
    isPending: isUpdating,
    mutate: update,
    ...rest
  } = useMutation({
    mutationFn: (content: string) => updateComment(id, content),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  return {
    ...rest,
    isUpdating,
    update,
  };
}
