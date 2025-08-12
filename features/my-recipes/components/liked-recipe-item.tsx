import { EllipsisVerticalIcon } from 'lucide-react';
import { formatDate } from '@/lib/helpers';
import { CloudinaryImage } from '@/components/cloudinary-image';
import { getSavedRecipes } from '@/features/my-recipes/queries/get-saved-recipes';

type LikedRecipeItemProps = {
  liked: Awaited<ReturnType<typeof getSavedRecipes>>[number];
};

export function LikedRecipeItem({ liked }: LikedRecipeItemProps) {
  return (
    <div
      key={liked.id}
      className="py-4 first:pt-0 last:pb-0 min-[24rem]:flex min-[24rem]:items-center min-[24rem]:gap-x-3 md:gap-x-4">
      <CloudinaryImage
        src={liked.recipe.imagePublicId}
        alt={liked.recipe.name}
        height={160}
        width={160}
        crop="fill"
        format="webp"
        quality="auto"
        className="h-40 w-full rounded-md bg-gray-200 object-cover min-[24rem]:size-12 min-[24rem]:shrink-0"
      />
      <div className="mt-6 flex items-start min-[24rem]:mt-0 min-[24rem]:flex-1 min-[24rem]:items-center">
        <div className="flex-1">
          <h3 className="line-clamp-1 text-base text-gray-900">{liked.recipe.name}</h3>
          <p className="text-sm text-gray-500">liked on {formatDate(liked.createdAt)}</p>
        </div>
        <button className="py-1 text-gray-400 hover:text-gray-500">
          <EllipsisVerticalIcon className="size-5 min-[24rem]:size-4" />
        </button>
      </div>
    </div>
  );
}
