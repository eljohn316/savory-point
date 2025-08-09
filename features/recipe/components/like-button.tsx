'use client';

import { useState } from 'react';
import { HeartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSession } from '@/lib/auth-client';
import { successToast } from '@/components/ui/sonner';
import { likeRecipe } from '@/features/recipe/actions/like-recipe';
import { unLikeRecipe } from '@/features/recipe/actions/unlike-recipe';
import { useAuthRedirect } from '@/features/auth/hooks/use-auth-redirect';

type LikeButtonProps = {
  liked: boolean;
  recipeId: string;
};

export function LikeButton({ liked, recipeId }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(liked);
  const { data: session } = useSession();
  const authRedirect = useAuthRedirect();

  async function handleLike() {
    if (!session) return await authRedirect();

    const newValue = !isLiked;

    if (newValue) {
      setIsLiked(newValue);
      successToast('Added to liked recipes');

      await likeRecipe(recipeId, session.user.id);
    } else {
      setIsLiked(newValue);
      successToast('Removed from liked recipes');

      await unLikeRecipe(recipeId, session.user.id);
    }
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
