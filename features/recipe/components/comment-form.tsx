'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { useRecipeSlugContext } from '../providers/recipe-slug-page-provider';
import { redirectToast } from '@/lib/actions';
import { addComment } from '../actions/add-comment';

export function CommentForm() {
  const { recipeId, userId } = useRecipeSlugContext();
  const { isPending, mutate } = useMutation({
    mutationFn: (data: FormData) => addComment(data),
  });

  async function handleSubmit(formData: FormData) {
    if (!userId) {
      await redirectToast('/sign-in', 'You need to sign in first');
      return;
    }

    formData.set('userId', userId);
    formData.set('recipeId', recipeId);

    mutate(formData);
  }

  return (
    <form className="space-y-4" action={handleSubmit}>
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
