import Link from 'next/link';
import Image from 'next/image';
import { getAllRecipes } from '@/features/recipe/queries/get-recipes';

type RecipeCardProps = {
  recipe: Awaited<ReturnType<typeof getAllRecipes>>[number];
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="group relative">
      {recipe.image && (
        <Image
          src={recipe.image}
          alt={recipe.name}
          height={668}
          width={700}
          className="h-52 rounded-md object-cover sm:h-48"
        />
      )}
      <h3 className="mt-4 text-lg font-medium text-gray-700 group-hover:underline lg:text-xl">
        {recipe.name}
      </h3>
      <div className="mt-2 flex items-center gap-x-2">
        {recipe.uploader && (
          <>
            <Image
              src={recipe.uploader.profile?.defaultImage!}
              alt={recipe.uploader.firstName}
              height={40}
              width={40}
              className="size-6 rounded-full"
            />
            <p className="text-base text-gray-600 sm:text-sm">
              {recipe.uploader.firstName} {recipe.uploader.lastName}
            </p>
          </>
        )}
      </div>
      <Link
        prefetch
        href={`/recipes/${recipe.slug}`}
        className="absolute inset-0">
        <span className="sr-only">Go to recipe</span>
      </Link>
    </div>
  );
}
