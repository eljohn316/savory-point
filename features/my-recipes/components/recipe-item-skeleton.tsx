import { EllipsisVerticalIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function RecipeItemSkeleton() {
  return (
    <div className="py-4 first:pt-0 last:pb-0 min-[24rem]:flex min-[24rem]:items-center min-[24rem]:gap-x-3 md:gap-x-4">
      <Skeleton className="h-40 w-full rounded-md min-[24rem]:size-12 min-[24rem]:shrink-0" />
      <div className="mt-6 flex items-start min-[24rem]:mt-0 min-[24rem]:flex-1 min-[24rem]:items-center">
        <div className="flex-1 space-y-1">
          <Skeleton className="h-3.5 max-w-3/4 sm:max-w-2/5" />
          <Skeleton className="h-3 max-w-3/4 sm:max-w-2/5" />
        </div>
        <div className="py-1 text-gray-400">
          <EllipsisVerticalIcon className="size-5 min-[24rem]:size-4" />
        </div>
      </div>
    </div>
  );
}
