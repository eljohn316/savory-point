'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { BookmarkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { redirectToast } from '@/lib/actions';
import { successToast } from '@/components/ui/sonner';
import { saveRecipe } from '@/features/recipe/actions/save-recipe';
import { unsaveRecipe } from '@/features/recipe/actions/unsave-recipe';
import { useRecipeSlugContext } from '@/features/recipe/providers/recipe-slug-page-provider';

type SaveButtonProps = {
  saved: boolean;
};

export function SaveButton({ saved }: SaveButtonProps) {
  const { userId, recipeId } = useRecipeSlugContext();
  const { slug } = useParams<{ slug: string }>();

  const [isSaved, setIsSaved] = useState(saved);

  async function handleSave() {
    if (!userId) {
      await redirectToast('/sign-in', 'You need to sign in first!');
      return;
    }
    const newValue = !isSaved;
    setIsSaved(newValue);
    successToast(newValue ? 'Added to saved recipes' : 'Removed from saved recipes');
    newValue
      ? await saveRecipe(slug, { userId, recipeId })
      : await unsaveRecipe(slug, { userId, recipeId });
  }

  return (
    <button
      className={cn(
        isSaved
          ? '[&_svg]:fill-emerald-700 [&_svg]:stroke-emerald-700'
          : '[&_svg]:text-gray-400 [&_svg]:hover:text-gray-500',
      )}
      onClick={handleSave}>
      <BookmarkIcon className="size-5" />
      <span className="sr-only">{isSaved ? 'Unsave' : 'Save'}</span>
    </button>
  );
}
