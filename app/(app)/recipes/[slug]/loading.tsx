import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';

export default function Loading() {
  return (
    <>
      <div className="space-y-5">
        <Skeleton className="h-10" />
        <div className="flex items-center gap-x-4">
          <Skeleton className="size-8 flex-none rounded-full" />
          <div className="max-w-40 flex-auto space-y-1">
            <Skeleton className="h-3.5" />
            <Skeleton className="h-3.5" />
          </div>
        </div>
      </div>
      <div className="mt-10 space-y-12">
        <div className="border-y border-gray-200 py-4">
          <Skeleton className="h-5" />
        </div>

        <Skeleton className="h-90 rounded-md sm:h-96" />
        <div className="space-y-2">
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
        </div>
        <Skeleton className="h-[168px]" />
        <div className="space-y-6">
          <h3 className="font-serif text-[28px] font-bold text-emerald-800">Ingredients</h3>
          <div className="space-y-2">
            <Skeleton className="h-4 max-w-3/4" />
            <Skeleton className="h-4 max-w-3/4" />
            <Skeleton className="h-4 max-w-3/4" />
            <Skeleton className="h-4 max-w-3/4" />
            <Skeleton className="h-4 max-w-3/4" />
            <Skeleton className="h-4 max-w-3/4" />
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="font-serif text-[28px] font-bold text-emerald-800">Instructions</h3>
          <div className="space-y-2">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif text-[28px] font-bold text-emerald-800">Nutrition</h3>
            <p className="text-sm font-light text-gray-500">
              The table below shows nutritional values per serving without the additional fillings.
            </p>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="py-3 first:pt-0 last:pb-0">
              <Skeleton className="h-4" />
            </div>
            <div className="py-3 first:pt-0 last:pb-0">
              <Skeleton className="h-4" />
            </div>
            <div className="py-3 first:pt-0 last:pb-0">
              <Skeleton className="h-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-28">
        <div className="space-y-4">
          <Textarea name="content" rows={4} placeholder="Write a comment..." required />
          <Button type="button">Post comment</Button>
        </div>
        <div className="mt-16 space-y-10">
          <p className="text-xl font-bold text-gray-700">Comments</p>
          <div className="divide-y divide-gray-200">
            <div className="py-8 first:pt-0 last:pb-0">
              <div className="flex items-center gap-x-4">
                <Skeleton className="size-9 rounded-full" />
                <div className="flex-auto space-y-1">
                  <Skeleton className="h-3 max-w-32" />
                  <Skeleton className="h-3 max-w-32" />
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <Skeleton className="h-3.5" />
                <Skeleton className="h-3.5" />
              </div>
              <div className="mt-6 flex justify-between">
                <Skeleton className="h-3.5 max-w-24 flex-auto" />
                <Skeleton className="h-3.5 max-w-10 flex-auto" />
              </div>
            </div>
            <div className="py-8 first:pt-0 last:pb-0">
              <div className="flex items-center gap-x-4">
                <Skeleton className="size-9 rounded-full" />
                <div className="flex-auto space-y-1">
                  <Skeleton className="h-3 max-w-32" />
                  <Skeleton className="h-3 max-w-32" />
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <Skeleton className="h-3.5" />
                <Skeleton className="h-3.5" />
              </div>
              <div className="mt-6 flex justify-between">
                <Skeleton className="h-3.5 max-w-24 flex-auto" />
                <Skeleton className="h-3.5 max-w-10 flex-auto" />
              </div>
            </div>
            <div className="py-8 first:pt-0 last:pb-0">
              <div className="flex items-center gap-x-4">
                <Skeleton className="size-9 rounded-full" />
                <div className="flex-auto space-y-1">
                  <Skeleton className="h-3 max-w-32" />
                  <Skeleton className="h-3 max-w-32" />
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <Skeleton className="h-3.5" />
                <Skeleton className="h-3.5" />
              </div>
              <div className="mt-6 flex justify-between">
                <Skeleton className="h-3.5 max-w-24 flex-auto" />
                <Skeleton className="h-3.5 max-w-10 flex-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
