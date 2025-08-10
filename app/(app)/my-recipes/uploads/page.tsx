import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Placeholder,
  PlaceholderActions,
  PlaceholderDescription,
  PlaceholderTitle,
} from '@/components/ui/placeholder';
import { Button } from '@/components/ui/button';
import { UploadedRecipeItem } from '@/features/my-recipes/components/uploaded-recipe-item';
import { getUploadedRecipes } from '@/features/my-recipes/queries/get-uploaded-recipes';
import { authRedirect } from '@/features/auth/actions/auth-redirect';
import { getAuthSession } from '@/features/auth/queries/get-auth-session';

export const metadata: Metadata = {
  title: 'Uploaded recipes',
};

export default async function Page() {
  const session = await getAuthSession();

  if (!session) return await authRedirect('/my-recipes/uploads');

  const recipes = await getUploadedRecipes(session.user.id);

  if (recipes.length === 0)
    return (
      <Placeholder>
        <PlaceholderTitle className="text-xl">No uploaded recipes yet</PlaceholderTitle>
        <PlaceholderDescription>
          Share your favorite recipes to the community now
        </PlaceholderDescription>
        <PlaceholderActions>
          <Button asChild>
            <Link href="/upload-recipe">Upload recipe</Link>
          </Button>
        </PlaceholderActions>
      </Placeholder>
    );

  return (
    <div className="divide-y divide-gray-200">
      {recipes.map((recipe) => (
        <UploadedRecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
