import Link from 'next/link';
import { db } from '@/lib/db';
import { RECIPES_PER_PAGE } from './config';
import { RecipeListItem } from './recipe-list-item';
import { RecipePagination } from './recipe-pagination';
import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';

export function RecipeListWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-5 grid grid-cols-1 sm:py-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 md:grid-cols-1 md:gap-0 divide-y divide-gray-200 sm:divide-y-0 md:divide-y md:divide-gray-200">
      {children}
    </div>
  );
}

interface RecipeListProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function RecipeList({ searchParams }: RecipeListProps) {
  const search = searchParams.search as string | undefined;
  const sort = searchParams.sort as 'asc' | 'desc' | undefined;
  const page = typeof searchParams.page === 'string' ? +searchParams.page : 1;

  const [recipes, recipesCount] = await Promise.all([
    db.recipe.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive'
        }
      },
      orderBy: {
        uploadedOn: sort ?? 'desc'
      },
      skip: RECIPES_PER_PAGE * (page - 1),
      take: RECIPES_PER_PAGE,
      select: {
        id: true,
        title: true,
        about: true,
        image: {
          select: {
            publicId: true,
            url: true
          }
        },
        uploadedOn: true,
        slug: true
      }
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

  if (recipesCount === 0) {
    return (
      <div className="pt-6 text-center">
        <h3 className="text-2xl font-bold leading-10">No results found</h3>
        <p className="mt-1 mb-4 text-base font-medium text-gray-700">
          We could not find the recipe you&apos;re looking for.
        </p>
        <Button
          variant="link"
          className="gap-x-2 text-base font-semibold"
          asChild>
          <Link href="/recipes">
            <MoveLeft className="size-5" aria-hidden="true" />
            Back to recipes
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <RecipeListWrapper>
        {recipes.map((recipe) => (
          <RecipeListItem
            key={recipe.id}
            recipe={recipe}
            className="py-6 first-of-type:pt-0 last-of-type:pb-0 sm:p-0 md:py-6 md:first-of-type:pt-0 md:last-of-type:pb-0"
          />
        ))}
      </RecipeListWrapper>

      <div className="pt-5">
        <RecipePagination recipesCount={recipesCount} currentPage={page} />
      </div>
    </>
  );
}
