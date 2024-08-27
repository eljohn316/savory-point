import Link from 'next/link';
import Image from 'next/image';
import { Prisma } from '@prisma/client';

type Recipe = Prisma.RecipeGetPayload<{
  select: {
    id: true;
    imageUrl: true;
    title: true;
  };
}>;

function RecipeListItem({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/my-recipes/${recipe.id}`} className="block group">
      <div className="border border-gray-300 shadow-sm rounded-lg p-2 group-hover:border-gray-400 group-hover:shadow">
        <div className="flex items-center gap-x-4">
          <div className="shrink-0">
            <Image
              src={recipe.imageUrl!}
              alt={`${recipe.title}`}
              className="size-16 rounded-lg object-cover"
              height={80}
              width={80}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 font-semibold line-clamp-1">
              {recipe.title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function RecipeList({ recipes }: { recipes: Recipe[] }) {
  if (recipes.length === 0)
    return (
      <div className="text-center">
        <p className="text-base font-semibold text-gray-700">
          You haven&apos;t uploaded any recipes yet
        </p>
      </div>
    );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {recipes.map((recipe) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
