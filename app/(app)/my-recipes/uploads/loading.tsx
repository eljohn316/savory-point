import { UploadedRecipeItemSkeleton } from '@/features/my-recipes/components/uploaded-recipe-item-skeleton';

export default function Loading() {
  return (
    <div className="divide-y divide-gray-200">
      <UploadedRecipeItemSkeleton />
      <UploadedRecipeItemSkeleton />
      <UploadedRecipeItemSkeleton />
      <UploadedRecipeItemSkeleton />
      <UploadedRecipeItemSkeleton />
    </div>
  );
}
