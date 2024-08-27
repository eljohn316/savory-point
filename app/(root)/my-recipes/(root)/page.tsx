import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/db';
import { RecipeList } from '@/app/(root)/my-recipes/(root)/recipe-list';

async function getUploadedRecipes(userId: string) {
  try {
    const recipes = await db.recipe.findMany({
      where: {
        uploaderId: userId
      },
      orderBy: {
        uploadedOn: 'desc'
      },
      select: {
        id: true,
        imageUrl: true,
        title: true
      }
    });

    return recipes;
  } catch (error) {
    throw new Error('Failed to get recipe data');
  }
}

export default async function Page() {
  const { user } = await validateRequest();

  if (!user) return redirect('/sign-in');

  const recipes = await getUploadedRecipes(user.id);

  return <RecipeList recipes={recipes} />;
}
