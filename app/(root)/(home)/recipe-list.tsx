'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Prisma } from '@prisma/client';
import { EmptyRecipeState } from '@/components/empty-recipe-state';
import { PaginationButtons } from './pagination-buttons';
import { useSearchParams } from 'next/navigation';

type Recipe = Prisma.RecipeGetPayload<{
  select: {
    id: true;
    imageUrl: true;
    title: true;
    slug: true;
    description: true;
    uploader: {
      select: {
        image: true;
        firstName: true;
        lastName: true;
      };
    };
  };
}>;

interface RecipeListProps {
  recipes: Recipe[];
}

export function RecipeList({ recipes }: RecipeListProps) {
  const search = useSearchParams().get('search');

  if (recipes.length === 0 && search)
    return (
      <div className="text-center">
        <h3 className="text-lg font-bold leading-10">No results found</h3>
        <p className="text-sm font-medium text-gray-700">
          We could not find the recipe you&apos;re looking for.
        </p>
      </div>
    );

  if (recipes.length === 0) return <EmptyRecipeState />;

  return (
    <div className="divide-y divide-gray-200">
      {recipes.map((recipe) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

interface RecipeListItemProps {
  recipe: Recipe;
}

function RecipeListItem({ recipe }: RecipeListItemProps) {
  return (
    <Link
      href={`/${recipe.slug}`}
      className="block group py-5 first:pt-0 last:pb-0 sm:flex sm:items-center">
      <div className="bg-gray-200 h-48 shrink-0 relative overflow-hidden rounded-md sm:size-36 sm:mr-4">
        {recipe.imageUrl && (
          <Image
            src={recipe.imageUrl}
            alt={`${recipe.title}`}
            fill
            sizes="(min-width: 640px) 50vw"
            className="object-cover group-hover:scale-105 duration-300"
          />
        )}
      </div>
      <div className="mt-4 sm:mt-0">
        <h3 className="text-lg font-bold truncate group-hover:underline">
          {recipe.title}
        </h3>
        <p className="mt-1 line-clamp-2">{recipe.description}</p>
        <div className="mt-3 flex items-center gap-x-3">
          <div className="shrink-0">
            {recipe.uploader?.image && (
              <Image
                src={recipe.uploader.image}
                alt="User profile photo"
                height={32}
                width={32}
                className="size-8 rounded-full"
              />
            )}
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {recipe.uploader?.firstName} {recipe.uploader?.lastName}
          </div>
        </div>
      </div>
    </Link>
  );
}
