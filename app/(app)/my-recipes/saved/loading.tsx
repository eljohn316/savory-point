import { RecipeItemSkeleton } from '@/features/my-recipes/components/recipe-item-skeleton';

export default function Loading() {
  return (
    <div className="divide-y divide-gray-200">
      <RecipeItemSkeleton />
      <RecipeItemSkeleton />
      <RecipeItemSkeleton />
      <RecipeItemSkeleton />
      <RecipeItemSkeleton />
    </div>
  );
}
