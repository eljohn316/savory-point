'use client';

import React, { useRef, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Loader2, SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export function SearchInput() {
  const pathname = usePathname();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const search = useSearchParams().get('search');

  const [isPending, startTransition] = useTransition();

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const search = e.currentTarget.value;
      if (!search) return;

      if (inputRef.current) inputRef.current.blur();

      startTransition(() => {
        router.push(`${pathname}?search=${search}`);
      });
    }
    return;
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <SearchIcon className="size-5 text-gray-400" aria-hidden="true" />
        <span className="sr-only">Search</span>
      </div>
      <Input
        type="text"
        id="search"
        name="search"
        className={cn(isPending ? 'px-10' : 'pl-10', 'py-3')}
        defaultValue={search ?? ''}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      {isPending && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <Loader2
            className="size-5 text-gray-400 animate-spin"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
