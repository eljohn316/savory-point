import { Skeleton } from '@/components/ui/skeleton';

export function CommentListSkeleton({ num = 1 }: { num?: number }) {
  return (
    <div className="mt-8 divide-y divide-gray-200">
      {Array.from({ length: num }, (_, i) => i + 1).map((i) => (
        <div key={i} className="py-8 first:pt-0 last:pb-0">
          <div className="flex items-center gap-x-4">
            <Skeleton className="size-9 rounded-full" />
            <div className="flex-auto space-y-1">
              <Skeleton className="h-3 max-w-32" />
              <Skeleton className="h-3 max-w-32" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
