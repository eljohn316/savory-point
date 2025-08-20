import type { Metadata } from 'next';
import { RecipeCard } from '@/features/recipe/components/recipe-card';
import { getAllRecipes } from '@/features/recipe/queries/get-recipes';
import { RecipePagination } from '@/features/recipe/components/recipe-pagination';
import { RECIPES_PER_PAGE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Home',
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { page = '1' } = await searchParams;
  const { recipes, totalRecipes } = await getAllRecipes({
    take: RECIPES_PER_PAGE,
    skip: (+page - 1) * RECIPES_PER_PAGE,
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <RecipePagination totalRecipes={totalRecipes} />
    </>
  );
}
