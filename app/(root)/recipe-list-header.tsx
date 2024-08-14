'use client';

import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

function Heading() {
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const sort = searchParams.get('sort') ?? 'desc';

  if (search)
    return (
      <div className="text-gray-500 font-semibold">
        Showing results for{' '}
        <span className="text-gray-900">&ldquo;{search}&rdquo;</span>
      </div>
    );

  return (
    <div className="text-gray-500 font-semibold">
      Showing {sort === 'desc' ? 'latest' : 'earliest'} results
    </div>
  );
}

function SortButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get('sort') ?? 'desc';

  const [sort, setSortOption] = useState<string>(defaultValue);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.delete('page');
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function handleValueChange(value: string) {
    setSortOption(value);
    router.push(pathname + '?' + createQueryString('sort', value));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Sort by: {sort === 'desc' ? 'Latest' : 'Earliest'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44" align="end">
        <DropdownMenuRadioGroup value={sort} onValueChange={handleValueChange}>
          <DropdownMenuRadioItem value="desc">Latest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="asc">Earliest</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function RecipeListHeader() {
  return (
    <div className="pb-5 space-y-2 sm:space-y-0 sm:flex sm:justify-between sm:items-center">
      <Heading />
      <SortButton />
    </div>
  );
}
