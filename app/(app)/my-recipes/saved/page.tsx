import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Placeholder,
  PlaceholderActions,
  PlaceholderDescription,
  PlaceholderTitle,
} from '@/components/ui/placeholder';
import { Button } from '@/components/ui/button';
import { SavedRecipeItem } from '@/features/my-recipes/components/saved-recipe-item';
import { getSavedRecipes } from '@/features/my-recipes/queries/get-saved-recipes';
import { authRedirect } from '@/features/auth/actions/auth-redirect';
import { getAuthSession } from '@/features/auth/queries/get-auth-session';

export const metadata: Metadata = {
  title: 'Saved recipes',
};

export default async function Page() {
  const session = await getAuthSession();

  if (!session) return await authRedirect('/my-recipes/saved');

  const savedRecipes = await getSavedRecipes(session.user.id);

  if (savedRecipes.length === 0)
    return (
      <Placeholder className="mx-auto max-w-sm">
        <PlaceholderTitle className="text-xl">No saved recipes yet</PlaceholderTitle>
        <PlaceholderDescription>
          Saw an interesting recipe? Just click the save button and we&apos;ll collect it for you.
        </PlaceholderDescription>
        <PlaceholderActions>
          <Button asChild>
            <Link href="/">See all recipes</Link>
          </Button>
        </PlaceholderActions>
      </Placeholder>
    );

  return (
    <div className="divide-y divide-gray-200">
      {savedRecipes.map((saved) => (
        <SavedRecipeItem key={saved.id} saved={saved} />
      ))}
    </div>
  );
}
