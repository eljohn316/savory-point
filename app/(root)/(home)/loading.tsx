import { Skeleton } from '@/components/ui/skeleton';
import { range } from '@/lib/utils';

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {range(12).map((i) => (
        <div key={i}>
          <Skeleton className="h-44 w-full sm:h-40" />
          <div className="mt-5 space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
