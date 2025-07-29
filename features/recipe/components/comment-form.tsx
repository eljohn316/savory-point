'use client';

import * as React from 'react';
import { redirectToast } from '@/lib/actions';
import { useSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRecipeSlugContext } from '@/features/recipe/providers/recipe-slug-page-provider';
import { useAddComment } from '@/features/recipe/hooks/use-add-comment';

export function CommentForm() {
  const { recipeId } = useRecipeSlugContext();
  const { data: session } = useSession();
  const { isPending, mutate } = useAddComment();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!session) return redirectToast('/sign-in', 'You need to sign in first');

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
