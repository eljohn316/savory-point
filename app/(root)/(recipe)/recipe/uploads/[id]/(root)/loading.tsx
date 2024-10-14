import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Primary details
          </h3>
          <Button variant="outline">Update</Button>
        </div>

        <div className="mt-6">
          <dl className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <dt className="font-medium leading-6 text-gray-900 sm:text-sm">
                Title
              </dt>
              <Skeleton className="mt-2 h-5 w-full max-w-60" />
            </div>

            <div className="sm:col-span-3">
              <dt className="font-medium leading-6 text-gray-900 sm:text-sm">
                Description
              </dt>
              <div className="mt-2 space-y-1.5">
                <Skeleton className="h-5" />
                <Skeleton className="h-5" />
                <Skeleton className="h-5" />
                <Skeleton className="h-5" />
              </div>
            </div>
            <div className="sm:col-span-1">
              <dt className="font-medium leading-6 text-gray-900 sm:text-sm">
                Preparation time
              </dt>
              <Skeleton className="mt-2 h-5 w-full max-w-24" />
            </div>
            <div className="sm:col-span-1">
              <dt className="font-medium leading-6 text-gray-900 sm:text-sm">
                Cooking time
              </dt>
              <Skeleton className="mt-2 h-5 w-full max-w-24" />
            </div>
            <div className="sm:col-span-1">
              <dt className="font-medium leading-6 text-gray-900 sm:text-sm">
                Servings
              </dt>
              <Skeleton className="mt-2 h-5 w-full max-w-24" />
            </div>
            <div className="sm:col-span-1">
              <dt className="font-medium leading-6 text-gray-900 sm:text-sm">
                Uploaded on
              </dt>
              <Skeleton className="mt-2 h-5 w-full max-w-24" />
            </div>
            <div className="sm:col-span-1">
              <dt className="font-medium leading-6 text-gray-900 sm:text-sm">
                Last updated
              </dt>
              <Skeleton className="mt-2 h-5 w-full max-w-24" />
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Ingredients
          </h3>
          <Button variant="outline">Update</Button>
        </div>

        <div className="mt-6">
          <ul className="list-disc space-y-4 marker:text-gray-400">
            <Skeleton className="h-5 w-full max-w-36" />
            <Skeleton className="h-5 w-full max-w-36" />
            <Skeleton className="h-5 w-full max-w-36" />
            <Skeleton className="h-5 w-full max-w-36" />
            <Skeleton className="h-5 w-full max-w-36" />
            <Skeleton className="h-5 w-full max-w-36" />
            <Skeleton className="h-5 w-full max-w-36" />
          </ul>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Instructions
          </h3>
          <Button variant="outline">Update</Button>
        </div>

        <div className="mt-6">
          <ol className="list-none space-y-4 marker:text-gray-400">
            <div className="space-y-2 sm:flex sm:gap-x-6 sm:space-y-0">
              <Skeleton className="h-5 w-full max-w-20 sm:max-w-16" />
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="space-y-2 sm:flex sm:gap-x-6 sm:space-y-0">
              <Skeleton className="h-5 w-full max-w-20 sm:max-w-16" />
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="space-y-2 sm:flex sm:gap-x-6 sm:space-y-0">
              <Skeleton className="h-5 w-full max-w-20 sm:max-w-16" />
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="space-y-2 sm:flex sm:gap-x-6 sm:space-y-0">
              <Skeleton className="h-5 w-full max-w-20 sm:max-w-16" />
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="space-y-2 sm:flex sm:gap-x-6 sm:space-y-0">
              <Skeleton className="h-5 w-full max-w-20 sm:max-w-16" />
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="space-y-2 sm:flex sm:gap-x-6 sm:space-y-0">
              <Skeleton className="h-5 w-full max-w-20 sm:max-w-16" />
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="space-y-2 sm:flex sm:gap-x-6 sm:space-y-0">
              <Skeleton className="h-5 w-full max-w-20 sm:max-w-16" />
              <Skeleton className="h-5 w-full" />
            </div>
          </ol>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Image
          </h3>
          <Button variant="outline">Update</Button>
        </div>

        <div className="mt-6">
          <div className="max-w-md">
            <Skeleton className="h-64 w-full sm:h-80" />
          </div>
        </div>
      </div>
    </>
  );
}
