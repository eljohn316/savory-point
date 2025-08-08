import Link from 'next/link';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirectToast } from '@/lib/actions';
import {
  Placeholder,
  PlaceholderActions,
  PlaceholderDescription,
  PlaceholderTitle,
} from '@/components/ui/placeholder';
import { Button } from '@/components/ui/button';
import { LikedRecipeItem } from '@/features/my-recipes/components/liked-recipe-item';
import { getLikedRecipes } from '@/features/my-recipes/queries/get-liked-recipes';

export const metadata: Metadata = {
  title: 'Liked recipes',
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return redirectToast('/sign-in', 'Please sign in to continue');

  const likedRecipes = await getLikedRecipes(session.user.id);

  if (likedRecipes.length === 0)
    return (
      <Placeholder>
        <PlaceholderTitle className="text-xl">No liked recipes yet</PlaceholderTitle>
        <PlaceholderDescription>
          Show your appreciation for others, by liking recipes you love.
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
      {likedRecipes.map((liked) => (
        <LikedRecipeItem key={liked.id} liked={liked} />
      ))}
    </div>
  );
}
