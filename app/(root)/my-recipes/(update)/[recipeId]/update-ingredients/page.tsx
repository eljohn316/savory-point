import { db } from '@/lib/db';
import { IngredientsList } from './ingredients-list';

interface PageProps {
  params: { recipeId: string };
}

export default async function Page({ params }: PageProps) {
  const ingredients = await db.ingredient.findMany({
    orderBy: {
      id: 'asc'
    },
    where: { recipeId: params.recipeId }
  });

  return <IngredientsList ingredients={ingredients} />;
}
