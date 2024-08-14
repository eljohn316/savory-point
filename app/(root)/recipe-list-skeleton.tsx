import { Skeleton } from '@/components/ui/skeleton';
import { RecipeListWrapper } from './recipe-list';

export function RecipeListSkeleton() {
  return (
    <RecipeListWrapper>
      <div className="py-6 first-of-type:pt-0 last-of-type:pb-0 sm:p-0 md:py-6 md:first-of-type:pt-0 md:last-of-type:pb-0 md:flex md:gap-x-6 md:items-center">
        <Skeleton className="h-44 md:w-48 md:shrink-0 rounded-md" />
        <div className="mt-4 md:mt-0 md:flex-1">
          <Skeleton className="h-4 w-20" />
          <div className="mt-3 space-y-2">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
      <div className="py-6 first-of-type:pt-0 last-of-type:pb-0 sm:p-0 md:py-6 md:first-of-type:pt-0 md:last-of-type:pb-0 md:flex md:gap-x-6 md:items-center">
        <Skeleton className="h-44 md:w-48 md:shrink-0 rounded-md" />
        <div className="mt-4 md:mt-0 md:flex-1">
          <Skeleton className="h-4 w-20" />
          <div className="mt-3 space-y-2">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
      <div className="py-6 first-of-type:pt-0 last-of-type:pb-0 sm:p-0 md:py-6 md:first-of-type:pt-0 md:last-of-type:pb-0 md:flex md:gap-x-6 md:items-center">
        <Skeleton className="h-44 md:w-48 md:shrink-0 rounded-md" />
        <div className="mt-4 md:mt-0 md:flex-1">
          <Skeleton className="h-4 w-20" />
          <div className="mt-3 space-y-2">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
      <div className="py-6 first-of-type:pt-0 last-of-type:pb-0 sm:p-0 md:py-6 md:first-of-type:pt-0 md:last-of-type:pb-0 md:flex md:gap-x-6 md:items-center">
        <Skeleton className="h-44 md:w-48 md:shrink-0 rounded-md" />
        <div className="mt-4 md:mt-0 md:flex-1">
          <Skeleton className="h-4 w-20" />
          <div className="mt-3 space-y-2">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </RecipeListWrapper>
  );
}
