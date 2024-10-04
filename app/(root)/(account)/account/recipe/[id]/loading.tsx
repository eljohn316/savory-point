import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div className="flex-auto">
          <Skeleton className="h-8 w-full max-w-60" />
        </div>
        <div className="hidden flex-none sm:ml-4 sm:flex sm:gap-x-3">
          <Button variant="outline" className="pointer-events-none">
            Update
          </Button>
          <Button variant="danger" className="pointer-events-none">
            Delete
          </Button>
        </div>
        <div className="flex flex-none items-center sm:hidden">
          <button type="button" className="-ml-1 rounded-md p-1 text-gray-400">
            <EllipsisVerticalIcon className="size-6" aria-hidden="true" />
            <span className="sr-only">Toggle options</span>
          </button>
        </div>
      </div>

      <div className="md:flex md:gap-x-10">
        <div className="flex-1 space-y-10 md:space-y-14">
          <div className="space-y-8">
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="divide-y divide-gray-200 sm:flex sm:gap-x-6 sm:divide-y-0">
              <div className="flex justify-between pb-4 sm:block sm:flex-1 sm:space-y-2 sm:pb-0">
                <p className="text-sm text-gray-700">Prep time</p>
                <Skeleton className="h-5 w-full max-w-20" />
              </div>
              <div className="flex justify-between py-4 sm:block sm:flex-1 sm:space-y-2 sm:py-0">
                <p className="text-sm text-gray-700">Cooking time</p>
                <Skeleton className="h-5 w-full max-w-20" />
              </div>
              <div className="flex justify-between pt-4 sm:block sm:flex-1 sm:space-y-2 sm:pt-0">
                <p className="text-sm text-gray-700">Servings</p>
                <Skeleton className="h-5 w-full max-w-20" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif font-semibold text-gray-900">
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
            <h3 className="font-serif font-semibold text-gray-900">
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

        <div className="mt-16 flex-none md:mt-0 md:w-full md:max-w-72">
          <Skeleton className="h-80 w-full md:h-44" />
          <div className="mt-10 divide-y divide-gray-200">
            <div className="flex justify-between pb-3">
              <p className="text-sm text-gray-700">Date uploaded</p>
              <Skeleton className="h-5 w-full max-w-20" />
            </div>
            <div className="flex justify-between pt-3">
              <p className="text-sm text-gray-700">Last updated on</p>
              <Skeleton className="h-5 w-full max-w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
