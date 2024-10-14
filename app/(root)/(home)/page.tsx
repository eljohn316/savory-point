import { db } from '@/lib/db';
import { RecipeList } from '@/components/recipe-list';
import { RESULTS_PER_PAGE } from '@/lib/constants';

async function getRecipes({ currentPage }: { currentPage: number }) {
  try {
    const [recipes, totalRecipes] = await Promise.all([
      db.recipe.findMany({
        orderBy: { uploadedOn: 'desc' },
        select: {
          id: true,
          imageUrl: true,
          title: true,
          slug: true,
          uploader: {
            select: {
              firstName: true,
              lastName: true
            }
          }
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
  const page = typeof searchParams.page === 'string' ? +searchParams.page : 1;
  const { recipes } = await getRecipes({ currentPage: page });

  return <RecipeList recipes={recipes} />;
}
