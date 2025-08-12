import { Skeleton } from '@/components/ui/skeleton';
import { DetailItem } from '@/features/my-recipes/components/detail-item';

export default function Loading() {
  return (
    <>
      <div className="border-b border-gray-200 pb-4">
        <Skeleton className="h-8 max-w-4/5" />
      </div>
      <DetailItem className="mt-8" label="Photo" content={<Skeleton className="h-80 sm:h-96" />} />
      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 min-[25rem]:grid-cols-3 lg:mt-16">
        <DetailItem
          className="col-span-2 min-[25rem]:col-span-3"
          label="Summary"
          content={
            <div className="space-y-2">
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
            </div>
          }
        />
        <DetailItem
          className="col-span-1"
          label="Servings"
          content={<Skeleton className="h-4 max-w-3/4" />}
        />
        <DetailItem
          className="col-span-1"
          label="Preparation"
          content={<Skeleton className="h-4 max-w-3/4" />}
        />
        <DetailItem
          className="col-span-1"
          label="Cooking"
          content={<Skeleton className="h-4 max-w-3/4" />}
        />
        <DetailItem
          className="col-span-1"
          label="Uploaded on"
          content={<Skeleton className="h-4 max-w-3/4" />}
        />
        <DetailItem
          className="col-span-1"
          label="Last updated"
          content={<Skeleton className="h-4 max-w-3/4" />}
        />
      </div>
      <DetailItem
        label="Ingredients"
        className="mt-14 space-y-5 lg:mt-16"
        content={<Skeleton className="h-40" />}
      />
      <DetailItem
        label="Instructions"
        className="mt-14 space-y-5 lg:mt-16"
        content={<Skeleton className="h-40" />}
      />
      <DetailItem
        label="Nutrition"
        className="mt-14 space-y-5 lg:mt-16"
        content={<Skeleton className="h-40" />}
      />
    </>
  );
}
