import { Suspense } from 'react';
import { SearchInput } from './search-input';
import { RecipeList } from './recipe-list';
import { RecipeListSkeleton } from './recipe-list-skeleton';
import { RecipeListHeader } from './recipe-list-header';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ searchParams }: PageProps) {
  return (
    <>
      <SearchInput />
      <div className="mt-8 divide-y divide-gray-200">
        <RecipeListHeader />
        <Suspense fallback={<RecipeListSkeleton />}>
          <RecipeList searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
