import { notFound } from 'next/navigation';
import { db } from '@/lib/db';

interface PageProps {
  params: { recipeId: string };
}

async function getRecipeDetails(recipeId: string) {
  try {
    const recipe = await db.recipe.findUnique({ where: { id: recipeId } });
    return recipe;
  } catch (error) {
    throw new Error('Error fetching recipe details');
  }
}

export default async function Page({ params }: PageProps) {
  const recipe = await getRecipeDetails(params.recipeId);

  if (!recipe) notFound();

  return <div className="text-center">{recipe.title}</div>;
}
