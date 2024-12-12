import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="md:flex md:gap-x-16 lg:gap-x-24">
      <div className="md:flex-auto">
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="mt-3 flex items-center">
          <Skeleton className="size-8 flex-none rounded-full" />
          <div className="ml-3 flex-auto">
            <Skeleton className="h-4 w-full max-w-44" />
          </div>
        </div>

        <div className="mt-8 space-y-10 lg:space-y-12">
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>

          <div className="space-y-4 md:hidden">
            <div className="rounded-md border border-emerald-700 p-1">
              <Skeleton className="h-60 rounded-md lg:h-72" />
            </div>
            <div className="rounded-md border border-emerald-700 bg-emerald-50 px-6 py-2">
              <dl className="divide-y divide-gray-200 *:py-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-full max-w-20" />
                  <Skeleton className="ml-auto h-5 w-full max-w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-full max-w-20" />
                  <Skeleton className="ml-auto h-5 w-full max-w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-full max-w-20" />
                  <Skeleton className="ml-auto h-5 w-full max-w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-full max-w-20" />
                  <Skeleton className="ml-auto h-5 w-full max-w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-full max-w-20" />
                  <Skeleton className="ml-auto h-5 w-full max-w-24" />
                </div>
              </dl>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-emerald-700">Ingredients</h3>
            <div className="space-y-4">
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-emerald-700">Instructions</h3>
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden flex-none md:block md:w-full md:max-w-80 lg:max-w-96">
        <div className="rounded-md border border-emerald-700 p-2">
          <Skeleton className="h-60 rounded-md lg:h-72" />
        </div>
        <div className="mt-8 rounded-md border border-emerald-700 bg-emerald-50 px-6 py-2">
          <dl className="divide-y divide-gray-200 *:py-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-full max-w-20" />
              <Skeleton className="ml-auto h-5 w-full max-w-24" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-full max-w-20" />
              <Skeleton className="ml-auto h-5 w-full max-w-24" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-full max-w-20" />
              <Skeleton className="ml-auto h-5 w-full max-w-24" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-full max-w-20" />
              <Skeleton className="ml-auto h-5 w-full max-w-24" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-full max-w-20" />
              <Skeleton className="ml-auto h-5 w-full max-w-24" />
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
