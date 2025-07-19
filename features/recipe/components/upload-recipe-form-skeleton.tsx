import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

export function UploadRecipeFormSkeleton() {
  return (
    <>
      <h2 className="text-xl font-bold text-gray-700">Upload a recipe</h2>
      <div className="mt-6 space-y-14">
        <div className="space-y-6 lg:space-y-8">
          <div className="space-y-2">
            <Label>Recipe name</Label>
            <Skeleton className="h-[38px]" />
          </div>
          <div className="space-y-2">
            <Label>Summary</Label>
            <Skeleton className="h-[98px]" />
          </div>
          <div className="space-y-8 sm:flex sm:space-y-0 sm:gap-x-5">
            <div className="flex-1 space-y-2">
              <Label>Servings</Label>
              <Skeleton className="h-[38px]" />
            </div>
            <div className="flex-1 space-y-2">
              <Label>Prep time (in mins)</Label>
              <Skeleton className="h-[38px]" />
            </div>
            <div className="flex-1 space-y-2">
              <Label>Cooking time (in mins)</Label>
              <Skeleton className="h-[38px]" />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-green-900">Ingredients</h3>
          <div className="space-y-2">
            <Label>Ingredient #1</Label>
            <Skeleton className="h-[38px]" />
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-green-900">Instructions</h3>
          <div className="space-y-2">
            <Label>Step 1</Label>
            <Skeleton className="h-[98px]" />
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-green-900">Nutrition</h3>
          <div className="flex gap-x-4">
            <div className="w-3/5 flex-auto space-y-2">
              <Label>Name</Label>
              <Skeleton className="h-[38px]" />
            </div>
            <div className="w-2/5 flex-auto space-y-2">
              <Label>Value</Label>
              <Skeleton className="h-[38px]" />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-green-900">Image</h3>
          <Skeleton className="h-80 sm:h-96" />
        </div>
        <div className="flex justify-end border-t border-gray-200 pt-6">
          <button
            type="button"
            className="rounded-md bg-green-700 px-4 py-2 text-sm text-green-50 hover:bg-green-800 focus:ring-1 focus:ring-green-700 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
            Upload recipe
          </button>
        </div>
      </div>
    </>
  );
}
