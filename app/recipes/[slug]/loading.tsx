import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <div className="space-y-4">
        <Skeleton className="h-10 max-w-2/3" />
        <div className="flex items-center gap-x-2">
          <Skeleton className="size-7 flex-none rounded-full" />
          <Skeleton className="h-5 w-full max-w-16 flex-auto" />
        </div>
      </div>
      <div className="mt-6 space-y-8">
        <div className="flex items-center justify-between gap-x-5 border-y border-gray-200 py-4">
          <Skeleton className="h-5 w-full max-w-28 flex-auto" />
          <Skeleton className="h-5 w-full max-w-16 flex-auto" />
        </div>
        <Skeleton className="h-80" />
        <div className="space-y-2">
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
        </div>
        <div className="space-y-2 rounded-xl bg-gray-100 p-6">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-7 w-full max-w-40" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-7 w-full max-w-40" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </>
  );
}
