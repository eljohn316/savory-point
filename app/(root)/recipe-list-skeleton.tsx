import { Skeleton } from '@/components/ui/skeleton';
import { range } from '@/lib/utils';

export function RecipeListSkeleton() {
  return (
    <div className="divide-y divide-gray-200">
      {range(4).map((num) => (
        <div
          key={num}
          className="py-5 first:pt-0 last:pb-0 sm:flex sm:items-center">
          <Skeleton className="shrink-0 h-32 sm:w-36 sm:mr-4" />
          <div className="mt-4 sm:mt-0 sm:flex-1">
            <Skeleton className="max-w-40 h-5" />
            <div className="space-y-2 mt-3">
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
            </div>
            <div className="mt-3 flex items-center gap-x-2">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-4 max-w-24 w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
