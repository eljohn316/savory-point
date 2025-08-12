import Link from 'next/link';
import { formatDate } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { CloudinaryImage } from '@/components/cloudinary-image';
import { getUploadedRecipes } from '@/features/my-recipes/queries/get-uploaded-recipes';

type UploadedRecipeItemProps = {
  recipe: Awaited<ReturnType<typeof getUploadedRecipes>>[number];
};

export function UploadedRecipeItem({ recipe }: UploadedRecipeItemProps) {
  return (
    <div
      key={recipe.id}
      className="py-6 first:pt-0 last:pb-0 sm:flex sm:items-center sm:gap-x-3 sm:py-4 md:gap-x-4">
      <CloudinaryImage
        src={recipe.imagePublicId}
        alt={recipe.name}
        height={160}
        width={160}
        crop="fill"
        format="webp"
        quality="auto"
        className="h-40 w-full rounded-md bg-gray-200 object-cover sm:size-12 sm:shrink-0"
      />
      <div className="mt-6 sm:mt-0 sm:flex sm:flex-1 sm:items-center">
        <div className="flex-1">
          <h3 className="line-clamp-1 text-base text-gray-900">{recipe.name}</h3>
          <p className="text-sm text-gray-500">uploaded on {formatDate(recipe.uploadedAt)}</p>
        </div>
        <Button variant="outline" className="mt-6 w-full flex-none sm:mt-0 sm:w-auto" asChild>
          <Link href={`/my-recipes/uploads/${recipe.id}`}>View</Link>
        </Button>
      </div>
    </div>
  );
}
