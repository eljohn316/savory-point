import { Skeleton } from '@/components/ui/skeleton';
import { range } from '@/lib/utils';

export default function Loading() {
  return (
    <div className="divide-y divide-gray-200">
      {range(10).map((i) => (
        <div key={i} className="flex py-4 first:pt-0 last:pb-0">
          <Skeleton className="size-12 flex-none rounded-md" />
          <div className="ml-3 flex-1 space-y-2">
            <Skeleton className="h-5 w-full max-w-44" />
            <Skeleton className="h-4 w-full max-w-56" />
          </div>
        </div>
      ))}
    </div>
  );
}
