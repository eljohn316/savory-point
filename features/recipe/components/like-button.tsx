'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { HeartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { redirectToast } from '@/lib/actions';
import { successToast } from '@/components/ui/sonner';
import { likeRecipe } from '@/features/recipe/actions/like-recipe';
import { unLikeRecipe } from '@/features/recipe/actions/unlike-recipe';
import { useRecipeSlugContext } from '@/features/recipe/providers/recipe-slug-page-provider';

type LikeButtonProps = {
  liked: boolean;
};

export function LikeButton({ liked }: LikeButtonProps) {
  const { userId, recipeId } = useRecipeSlugContext();
  const { slug } = useParams<{ slug: string }>();
  const [isLiked, setIsLiked] = useState(liked);

  async function handleLike() {
    if (!userId) {
      await redirectToast('/sign-in', 'You need to sign in first!');
      return;
    }
    const newValue = !isLiked;
    setIsLiked(newValue);
    successToast(newValue ? 'Added to liked recipes' : 'Removed from liked recipes');
    newValue
      ? await likeRecipe(slug, { userId, recipeId })
      : await unLikeRecipe(slug, { userId, recipeId });
  }

  return (
    <button
      className={cn(
        isLiked
          ? '[&_svg]:fill-emerald-700 [&_svg]:stroke-emerald-700'
          : '[&_svg]:text-gray-400 [&_svg]:hover:text-gray-500',
        'ml-auto',
      )}
      onClick={handleLike}>
      <HeartIcon className="size-5" />
      <span className="sr-only">{isLiked ? 'Unlike' : 'Like'}</span>
    </button>
  );
}
