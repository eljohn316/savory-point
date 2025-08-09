'use client';

import * as React from 'react';
import { useSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAddComment } from '@/features/recipe/hooks/use-add-comment';
import { useAuthRedirect } from '@/features/auth/hooks/use-auth-redirect';

type CommentFormProps = {
  recipeId: string;
};

export function CommentForm({ recipeId }: CommentFormProps) {
  const { data: session } = useSession();
  const { isPending, mutate } = useAddComment();
  const authRedirect = useAuthRedirect();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!session) return await authRedirect();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const content = formData.get('content') as string;
    const payload = {
      content,
      userId: session.user.id,
      recipeId,
    };

    mutate(payload, {
      onSettled: () => form.reset(),
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Textarea
        name="content"
        rows={4}
        placeholder="Write a comment..."
        disabled={isPending}
        required
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Posting comment...' : 'Post comment'}
      </Button>
    </form>
  );
}
