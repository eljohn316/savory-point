import { RecipeCardSkeleton } from '@/features/recipe/components/recipe-card-skeleton';

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
    </div>
  );
}
