import { formatDate } from '@/lib/helpers';
import { CloudinaryImage } from '@/components/cloudinary-image';
import { getSavedRecipes } from '@/features/my-recipes/queries/get-saved-recipes';

type SavedRecipeItemProps = {
  saved: Awaited<ReturnType<typeof getSavedRecipes>>[number];
};

export function SavedRecipeItem({ saved }: SavedRecipeItemProps) {
  return (
    <div
      key={saved.id}
      className="py-4 first:pt-0 last:pb-0 min-[24rem]:flex min-[24rem]:items-center min-[24rem]:gap-x-3 md:gap-x-4">
      <CloudinaryImage
        src={saved.recipe.imagePublicId}
        alt={saved.recipe.name}
        height={160}
        width={160}
        crop="fill"
        format="webp"
        quality="auto"
        className="h-40 w-full rounded-md bg-gray-200 object-cover min-[24rem]:size-12 min-[24rem]:shrink-0"
      />
      <div className="mt-6 min-[24rem]:mt-0">
        <h3 className="line-clamp-1 text-base text-gray-900">{saved.recipe.name}</h3>
        <p className="text-sm text-gray-500">saved on {formatDate(saved.createdAt)}</p>
      </div>
    </div>
  );
}
