import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirectToast } from '@/lib/actions';
import { SavedRecipeItem } from '@/features/my-recipes/components/saved-recipe-item';
import { getSavedRecipes } from '@/features/my-recipes/queries/get-saved-recipes';

export const metadata: Metadata = {
  title: 'Saved recipes',
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return redirectToast('/sign-in', 'Please sign in to continue');

  const savedRecipes = await getSavedRecipes(session.user.id);

  return (
    <div className="divide-y divide-gray-200">
      {savedRecipes.map((saved) => (
        <SavedRecipeItem key={saved.id} saved={saved} />
      ))}
    </div>
  );
}
