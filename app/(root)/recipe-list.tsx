import Image from 'next/image';
import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';

type Recipe = Prisma.RecipeGetPayload<{
  select: {
    id: true;
    imageUrl: true;
    title: true;
    slug: true;
    about: true;
    uploader: {
      select: {
        image: true;
        firstName: true;
        lastName: true;
      };
    };
  };
}>;

export async function RecipeList() {
  const recipes = await db.recipe.findMany({
    select: {
      id: true,
      imageUrl: true,
      title: true,
      slug: true,
      about: true,
      uploader: {
        select: {
          image: true,
          firstName: true,
          lastName: true
        }
      }
    }
  });

  return (
    <div className="divide-y divide-gray-200">
      {recipes.map((recipe) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

function RecipeListItem({ recipe }: { recipe: Recipe }) {
  return (
    <div className="py-5 first:pt-0 last:pb-0 sm:flex sm:items-center">
      <div className="bg-gray-200 h-48 shrink-0 relative overflow-hidden rounded-md sm:size-36 sm:mr-4">
        {recipe.imageUrl && (
          <Image
            src={recipe.imageUrl}
            alt={`${recipe.title}`}
            fill
            sizes="(min-width: 640px) 50vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="mt-4 sm:mt-0">
        <h3 className="text-lg font-bold truncate">{recipe.title}</h3>
        <p className="mt-1 line-clamp-2">{recipe.about}</p>
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
    </div>
  );
}
