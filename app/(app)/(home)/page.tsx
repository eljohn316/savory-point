import type { Metadata } from 'next';
import { RecipeCard } from '@/features/recipe/components/recipe-card';
import { getAllRecipes } from '@/features/recipe/queries/get-recipes';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function Page() {
  const recipes = await getAllRecipes();

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
