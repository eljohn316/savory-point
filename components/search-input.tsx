'use client';

import { useRef, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

export function SearchInput({ className }: { className?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const search = e.currentTarget.value;

      if (!search) return;

      inputRef.current?.blur();

      startTransition(() => {
        router.push(`${pathname}?search=${search}`);
      });
    }
  }

  return (
    <div className={cn('relative', className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="sr-only">Search</span>
        <MagnifyingGlassIcon
          className="size-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <Input
        type="text"
        name="search"
        placeholder="Search"
        className={cn(isPending ? 'px-10' : 'pl-10', 'py-2')}
        defaultValue={searchParams.get('search') ?? undefined}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      {isPending && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <Spinner className="text-gray-400" />
        </div>
      )}
    </div>
  );
}
