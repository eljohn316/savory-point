import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <Skeleton className="h-10 w-full max-w-96" />
        <div className="flex border-y border-gray-200 py-4">
          <Skeleton className="size-11 flex-none rounded-full" />
          <div className="ml-4 flex-1">
            <Skeleton className="h-4 w-full max-w-44" />
            <div className="mt-2 space-y-1">
              <Skeleton className="h-3 w-full max-w-32" />
              <Skeleton className="h-3 w-full max-w-32" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>

      <div className="mx-auto max-w-xl">
        <Skeleton className="h-64 w-auto sm:h-72" />
      </div>

      <div className="flex flex-col divide-y divide-gray-300 rounded-md border border-gray-300 bg-gray-50 xs:flex-row xs:divide-x xs:divide-y-0">
        <div className="flex-1 py-3 text-center">
          <p className="text-sm font-medium text-gray-500">Servings</p>
          <Skeleton className="mx-auto mt-2 h-5 w-full max-w-20" />
        </div>
        <div className="flex-1 py-3 text-center">
          <p className="text-sm font-medium text-gray-500">Prep time</p>
          <Skeleton className="mx-auto mt-2 h-5 w-full max-w-20" />
        </div>
        <div className="flex-1 py-3 text-center">
          <p className="text-sm font-medium text-gray-500">Cooking time</p>
          <Skeleton className="mx-auto mt-2 h-5 w-full max-w-20" />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="font-serif text-lg font-semibold text-gray-900">
          Ingredients
        </h3>
        <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-3 sm:space-y-0">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="font-serif text-lg font-semibold text-gray-900">
          Instructions
        </h3>
        <div className="space-y-5">
          <div className="5">
            <Skeleton className="h-4 w-full max-w-20" />
            <Skeleton className="mb-2 mt-3 h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
          <div className="5">
            <Skeleton className="h-4 w-full max-w-20" />
            <Skeleton className="mb-2 mt-3 h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
          <div className="5">
            <Skeleton className="h-4 w-full max-w-20" />
            <Skeleton className="mb-2 mt-3 h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
          <div className="5">
            <Skeleton className="h-4 w-full max-w-20" />
            <Skeleton className="mb-2 mt-3 h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
          <div className="5">
            <Skeleton className="h-4 w-full max-w-20" />
            <Skeleton className="mb-2 mt-3 h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
