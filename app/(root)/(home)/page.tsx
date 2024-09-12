import { db } from '@/lib/db';
import { RecipeList } from '@/app/(root)/(home)/recipe-list';
import { PaginationButtons } from './pagination-buttons';
import { RESULTS_PER_PAGE } from './config';

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

async function getRecipes({ page, search }: { page: number; search?: string }) {
  return await db.recipe.findMany({
    where: {
      title: {
        contains: search,
        mode: 'insensitive'
      }
    },
    take: RESULTS_PER_PAGE,
    skip: (page - 1) * RESULTS_PER_PAGE,
    orderBy: { uploadedOn: 'desc' },
    select: {
      id: true,
      imageUrl: true,
      title: true,
      slug: true,
      description: true,
      uploader: {
        select: {
          image: true,
          firstName: true,
          lastName: true
        }
      }
    }
  });
}

async function getTotalRecipes({ search }: { search?: string }) {
  return await db.recipe.count({
    where: {
      title: {
        contains: search,
        mode: 'insensitive'
      }
    }
  });
}

export default async function Page({ searchParams }: PageProps) {
  const { search, page } = searchParams;
  const currentPage = typeof page === 'string' ? +page : 1;

  const [recipes, count] = await Promise.all([
    getRecipes({ page: currentPage, search }),
    getTotalRecipes({ search })
  ]);

  return (
    <>
      {search && (
        <div className="mb-6">
          <p className="text-gray-700">
            Search results for{' '}
            <span className="text-gray-900 font-semibold">
              &ldquo;{search}&rdquo;
            </span>
          </p>
        </div>
      )}
      <RecipeList recipes={recipes} />
      <div className="mt-8">
        <PaginationButtons numResults={count} />
      </div>
    </>
  );
}
