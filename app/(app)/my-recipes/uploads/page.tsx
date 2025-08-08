import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirectToast } from '@/lib/actions';
import { UploadedRecipeItem } from '@/features/my-recipes/components/uploaded-recipe-item';
import { getUploadedRecipes } from '@/features/my-recipes/queries/get-uploaded-recipes';

export const metadata: Metadata = {
  title: 'Uploads',
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return redirectToast('/sign-in', 'Please sign in to continue');

  const recipes = await getUploadedRecipes(session.user.id);

  return (
    <div className="divide-y divide-gray-200">
      {recipes.map((recipe) => (
        <UploadedRecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
