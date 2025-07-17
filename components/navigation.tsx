'use client';

import Link from 'next/link';
import { MenuIcon } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { Container } from '@/components/container';
import { Logo } from '@/components/logo';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function NavigationLinks() {
  const { isPending, data } = useSession();

  if (isPending) return <Skeleton className="size-9 rounded-md md:h-9 md:w-full md:max-w-80" />;

  if (!data)
    return (
      <>
        <div className="hidden md:flex md:items-center md:gap-x-10">
          <Link href="/sign-in" className="text-base text-gray-700 hover:text-emerald-700">
            Sign in
          </Link>
          <Link href="/sign-up" className="text-base text-gray-700 hover:text-emerald-700">
            Sign up
          </Link>
          <Link
            href="/upload-recipe"
            className="rounded-md bg-emerald-700 px-4 py-2 text-[15px] text-emerald-50 hover:bg-emerald-800 focus:ring-1 focus:ring-emerald-700 focus:ring-offset-2 focus:outline-none">
            Upload recipe
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-md p-1 text-gray-400 hover:text-gray-500 focus:ring-1 focus:ring-emerald-700 focus:ring-offset-2 focus:outline-none md:hidden">
            <MenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-40 p-2" hideWhenDetached>
            <DropdownMenuGroup className="space-y-1">
              <Link
                href="/sign-in"
                className="block rounded-md p-2 leading-none text-gray-600 hover:bg-gray-200">
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="block rounded-md p-2 leading-none text-gray-600 hover:bg-gray-200">
                Sign up
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuGroup>
              <Link
                href="/upload-recipe"
                className="block rounded-md p-2 leading-none text-gray-600 hover:bg-gray-200">
                Upload recipe
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );

  return (
    <div className="flex items-center gap-x-6">
      <Link
        href="/upload-recipe"
        className="hidden rounded-md bg-emerald-700 px-4 py-2 text-[15px] text-emerald-50 hover:bg-emerald-800 focus:ring-1 focus:ring-emerald-700 focus:ring-offset-2 focus:outline-none md:inline-block">
        Upload recipe
      </Link>
      <div className="size-10 rounded-full bg-gray-300" />
    </div>
  );
}

export function Navigation() {
  return (
    <nav>
      <Container className="flex max-w-4xl items-center justify-between py-4 sm:py-6">
        <Logo />
        <NavigationLinks />
      </Container>
    </nav>
  );
}
