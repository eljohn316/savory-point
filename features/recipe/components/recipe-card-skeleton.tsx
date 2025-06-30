import { Skeleton } from '@/components/ui/skeleton';

export function RecipeCardSkeleton() {
  return (
    <div>
      <Skeleton className="h-52 rounded-md sm:h-48" />
      <Skeleton className="mt-4 h-6 w-full max-w-3/4" />
      <div className="mt-2 flex items-center gap-x-2">
        <Skeleton className="size-6 flex-none rounded-full" />
        <Skeleton className="h-3 w-full max-w-16 flex-auto" />
      </div>
    </div>
  );
}
