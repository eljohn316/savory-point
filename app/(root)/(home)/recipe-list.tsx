import Link from 'next/link';
import Image from 'next/image';
import { Prisma } from '@prisma/client';

type Recipe = Prisma.RecipeGetPayload<{
  select: {
    id: true;
    imageUrl: true;
    title: true;
    slug: true;
    uploader: {
      select: {
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
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 duration-200 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {recipes.map((recipe) => (
        <Link
          key={recipe.id}
          href={`/recipe/${recipe.slug}`}
          className="group block">
          <div className="relative h-44 overflow-hidden rounded-md sm:h-40">
            <Image
              src={recipe.imageUrl!}
              alt={recipe.title}
              sizes="(min-width: 360px) 50vw, 100vw"
              className="object-cover duration-300 group-hover:scale-105"
              fill
            />
          </div>
          <div className="mt-4">
            <h3 className="line-clamp-2 font-serif text-xl font-semibold leading-7 text-gray-900 group-hover:underline group-hover:underline-offset-2 sm:text-lg sm:leading-6">
              {recipe.title}
            </h3>
            <p className="mt-2 text-base font-medium sm:text-sm">
              <span className="text-gray-500">by</span>{' '}
              <span className="text-gray-700">
                {recipe.uploader?.firstName} {recipe.uploader?.lastName}
              </span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
