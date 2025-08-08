import Link from 'next/link';
import Image from 'next/image';
import { CloudinaryImage } from '@/components/cloudinary-image';
import { getAllRecipes } from '@/features/recipe/queries/get-recipes';
import { RecipeImage } from '@/components/recipe-image';

type RecipeCardProps = {
  recipe: Awaited<ReturnType<typeof getAllRecipes>>[number];
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="group relative">
      <RecipeImage
        src={recipe.imagePublicId}
        alt={recipe.name}
        height="600"
        width="960"
        sizes="100vw"
        className="h-60 rounded-md object-cover sm:h-48"
      />
      <h3 className="mt-4 text-lg font-medium text-gray-700 group-hover:underline lg:text-xl">
        {recipe.name}
      </h3>
      <div className="mt-2 flex items-center gap-x-2">
        {recipe.uploader.image ? (
          <CloudinaryImage
            src={recipe.uploader.image}
            alt={recipe.uploader.name}
            height={40}
            width={40}
            className="size-6 flex-none rounded-full"
          />
        ) : (
          <Image
            src={recipe.uploader.defaultImage}
            alt={recipe.uploader.name}
            height={40}
            width={40}
            className="size-6 flex-none rounded-full"
          />
        )}
        <p className="text-base text-gray-600 sm:text-sm">{recipe.uploader.name}</p>
      </div>
      <Link href={`/recipes/${recipe.slug}`} className="absolute inset-0">
        <span className="sr-only">Go to recipe</span>
      </Link>
    </div>
  );
}
