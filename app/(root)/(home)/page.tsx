import { db } from '@/lib/db';
import { RecipeList } from '@/components/recipe-list';
import { RESULTS_PER_PAGE } from '@/lib/constants';
import { RecipeListPagination } from '@/components/recipe-list-pagination';

async function getRecipes({ currentPage }: { currentPage: number }) {
  try {
    const [recipes, totalRecipes] = await Promise.all([
      db.recipe.findMany({
        orderBy: { uploadedOn: 'desc' },
        select: {
          id: true,
          imageUrl: true,
          title: true,
          slug: true
        },
        take: RESULTS_PER_PAGE,
        skip: (currentPage - 1) * RESULTS_PER_PAGE
      }),
      db.recipe.count()
    ]);

    return { recipes, totalRecipes };
  } catch (error) {
    throw error;
  }
}

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams }: PageProps) {
  const searchParamsPage = searchParams.page;
  const page = typeof searchParamsPage === 'string' ? +searchParamsPage : 1;

  const { recipes, totalRecipes } = await getRecipes({ currentPage: page });

  return (
    <>
      <RecipeList recipes={recipes} />
      <RecipeListPagination totalResults={totalRecipes} currentPage={page} />
    </>
  );
}
