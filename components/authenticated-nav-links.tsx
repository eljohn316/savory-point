'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'lucia';
import { AvatarDropdown } from '@/components/avatar-dropdown';
import { cn } from '@/lib/utils';

export function AuthenticatedNavLinks({ user }: { user: User }) {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden lg:block lg:whitespace-nowrap">
        <Link
          href="/"
          className={cn(
            pathname === '/'
              ? 'text-emerald-700'
              : 'text-gray-500 hover:text-emerald-700',
            'text-sm px-4 font-semibold'
          )}>
          Home
        </Link>
        <Link
          href="/my-recipes"
          className={cn(
            pathname === '/my-recipes'
              ? 'text-emerald-700'
              : 'text-gray-500 hover:text-emerald-700',
            'text-sm px-4 font-semibold'
          )}>
          My recipes
        </Link>
        <Link
          href="/upload-recipe"
          className={cn(
            pathname === '/upload-recipe'
              ? 'text-emerald-700'
              : 'text-gray-500 hover:text-emerald-700',
            'text-sm px-4 font-semibold'
          )}>
          Upload recipe
        </Link>
      </div>

      <AvatarDropdown user={user} className="shrink-0 lg:ml-2" />
    </>
  );
}
