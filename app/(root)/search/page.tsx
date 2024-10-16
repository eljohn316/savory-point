import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { db } from '@/lib/db';
import { RESULTS_PER_PAGE } from '@/lib/constants';
import { RecipeList } from '@/components/recipe-list';
import { RecipeSearchListPagination } from '@/components/recipe-search-list-pagination';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getRecipes({
  search,
  currentPage
}: {
  search?: string;
  currentPage: number;
}) {
  try {
    const [recipes, totalRecipes] = await Promise.all([
      db.recipe.findMany({
        where: {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        },
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
      db.recipe.count({
        where: {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        }
      })
    ]);

    return { recipes, totalRecipes };
  } catch (error) {
    throw error;
  }
}

export default async function Page({ searchParams }: PageProps) {
  const search = searchParams.t as string | undefined;
  const page = typeof searchParams.page === 'string' ? +searchParams.page : 1;

  const { recipes, totalRecipes } = await getRecipes({
    search,
    currentPage: page
  });

  if (recipes.length === 0)
    return (
      <div className="mx-auto max-w-sm text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100">
          <FaceFrownIcon
            className="size-6 text-emerald-700"
            aria-hidden="true"
          />
        </div>
        <div className="mt-4">
          <h3 className="font-bold text-gray-700">No recipes found</h3>
          <p className="mt-2 text-sm font-medium text-gray-500">
            Sorry, we could not find any results for{' '}
            <span className="text-gray-900">&ldquo;{search}&rdquo;</span>
          </p>
        </div>
      </div>
    );

  return (
    <>
      <RecipeList recipes={recipes} />
      <RecipeSearchListPagination
        currentPage={page}
        totalResults={totalRecipes}
      />
    </>
  );
}
