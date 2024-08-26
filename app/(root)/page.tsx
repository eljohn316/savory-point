import { Suspense } from 'react';
import { RecipeList } from '@/app/(root)/recipe-list';
import { RecipeListSkeleton } from '@/app/(root)/recipe-list-skeleton';

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto">
      <Suspense fallback={<RecipeListSkeleton />}>
        <RecipeList />
      </Suspense>
    </div>
  );
}
