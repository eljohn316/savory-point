import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirectToast } from '@/lib/actions';
import { LikedRecipeItem } from '@/features/my-recipes/components/liked-recipe-item';
import { getLikedRecipes } from '@/features/my-recipes/queries/get-liked-recipes';

export const metadata: Metadata = {
  title: 'Liked recipes',
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return redirectToast('/sign-in', 'Please sign in to continue');

  const likedRecipes = await getLikedRecipes(session.user.id);

  return (
    <div className="divide-y divide-gray-200">
      {likedRecipes.map((liked) => (
        <LikedRecipeItem key={liked.id} liked={liked} />
      ))}
    </div>
  );
}
