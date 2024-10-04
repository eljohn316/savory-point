import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="space-y-8 divide-y divide-gray-200">
      <div className="flex items-center gap-x-4">
        <Skeleton className="size-14 rounded-full" />
        <div className="ml-auto space-x-4">
          <Button variant="outline">Change</Button>
          <button
            type="button"
            className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Remove
          </button>
        </div>
      </div>
      <div className="pt-8">
        <div className="space-y-8">
          <div className="space-y-1.5">
            <div className="text-sm font-medium text-gray-900">First name</div>
            <Skeleton className="h-9 w-full max-w-md" />
          </div>

          <div className="space-y-1.5">
            <div className="text-sm font-medium text-gray-900">Last name</div>
            <Skeleton className="h-9 w-full max-w-md" />
          </div>

          <div className="space-y-1.5">
            <div className="text-sm font-medium text-gray-900">Email</div>
            <Skeleton className="h-9 w-full max-w-md" />
          </div>
        </div>

        <div className="mt-12">
          <Button type="button">Save</Button>
        </div>
      </div>
    </div>
  );
}
