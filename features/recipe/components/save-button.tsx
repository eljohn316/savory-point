'use client';

import { useState } from 'react';
import { BookmarkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSession } from '@/lib/auth-client';
import { successToast } from '@/components/ui/sonner';
import { saveRecipe } from '@/features/recipe/actions/save-recipe';
import { unsaveRecipe } from '@/features/recipe/actions/unsave-recipe';
import { useAuthRedirect } from '@/features/auth/hooks/use-auth-redirect';

type SaveButtonProps = {
  saved: boolean;
  recipeId: string;
};

export function SaveButton({ saved, recipeId }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(saved);
  const { data: session } = useSession();
  const authRedirect = useAuthRedirect();

  async function handleSave() {
    if (!session) return await authRedirect();

    const newValue = !isSaved;

    if (newValue) {
      setIsSaved(newValue);
      successToast('Added to saved recipes');

      await saveRecipe(recipeId, session.user.id);
    } else {
      setIsSaved(newValue);
      successToast('Removed from saved recipes');

      await unsaveRecipe(recipeId, session.user.id);
    }
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
