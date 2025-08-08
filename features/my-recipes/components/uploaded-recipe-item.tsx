import { EllipsisVerticalIcon } from 'lucide-react';
import { formatDateFromNow } from '@/lib/helpers';
import { RecipeImage } from '@/components/recipe-image';
import { getUploadedRecipes } from '@/features/my-recipes/queries/get-uploaded-recipes';

type UploadedRecipeItemProps = {
  recipe: Awaited<ReturnType<typeof getUploadedRecipes>>[number];
};

export function UploadedRecipeItem({ recipe }: UploadedRecipeItemProps) {
  return (
    <div
      key={recipe.id}
      className="py-4 first:pt-0 last:pb-0 min-[24rem]:flex min-[24rem]:items-center min-[24rem]:gap-x-3 md:gap-x-4">
      <RecipeImage
        src={recipe.imagePublicId}
        alt={recipe.name}
        height={160}
        width={160}
        crop="fill"
        className="h-40 w-full rounded-md object-cover min-[24rem]:size-12 min-[24rem]:shrink-0"
      />
      <div className="mt-6 flex items-start min-[24rem]:mt-0 min-[24rem]:flex-1 min-[24rem]:items-center">
        <div className="flex-1">
          <h3 className="line-clamp-1 text-base text-gray-900">{recipe.name}</h3>
          <p className="text-sm text-gray-500">
            uploaded on {formatDateFromNow(recipe.uploadedAt)}
          </p>
        </div>
        <button className="py-1 text-gray-400 hover:text-gray-500">
          <EllipsisVerticalIcon className="size-5 min-[24rem]:size-4" />
        </button>
      </div>
    </div>
  );
}
