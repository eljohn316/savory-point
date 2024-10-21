'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User } from 'lucia';
import { Bars3Icon } from '@heroicons/react/24/outline';

import { useToast } from '@/hooks/use-toast';
import { useFormAction } from '@/hooks/use-form-action';
import { signOut } from '@/lib/actions/auth';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSection
} from '@/components/ui/menu';
import { Spinner } from '@/components/ui/spinner';

interface NavigationProps {
  user: User | null;
}

export function Navigation({ user }: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { isPending, formAction, formState, onSubmit } = useFormAction(
    signOut,
    {}
  );

  React.useEffect(() => {
    if (formState.success) {
      router.replace('/');
      toast({
        variant: 'success',
        title: formState.message
      });
    }

    if (formState.success === false) {
      toast({
        variant: 'danger',
        title: formState.message
      });
    }
  }, [formState, router, toast]);

  function handleClick(
    e: React.MouseEvent<HTMLButtonElement>,
    close: () => void
  ) {
    e.preventDefault();

    onSubmit(() => {
      formAction(new FormData());
      close();
    });
  }

  return (
    <nav className="flex items-center justify-between">
      <Logo />
      {user ? (
        <div className="flex items-center gap-x-6">
          {pathname === '/' && (
            <Button asChild className="hidden md:inline-flex">
              <Link href="/upload-recipe">Upload recipe</Link>
            </Button>
          )}
          <Menu>
            <MenuButton className="rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2">
              <span className="sr-only">Open user menu</span>
              <Image
                src={user.image ? user.image : user.defaultImage}
                alt="User profile photo"
                height={60}
                width={60}
                className="size-9 rounded-full"
              />
            </MenuButton>
            <MenuItems className="divide-y divide-gray-200">
              <MenuSection className="px-4 py-2">
                <p className="text-sm">Signed in as</p>
                <p className="truncate text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
              </MenuSection>
              <MenuSection className="py-1">
                <MenuItem>
                  <Link
                    href="/upload-recipe"
                    className="block px-4 py-2 text-sm font-medium text-gray-500 data-[focus]:bg-gray-100 data-[focus]:text-gray-700">
                    Upload a recipe
                  </Link>
                </MenuItem>
              </MenuSection>
              <MenuSection className="py-1">
                <MenuItem>
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm font-medium text-gray-500 data-[focus]:bg-gray-100 data-[focus]:text-gray-700">
                    Account
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm font-medium text-gray-500 data-[focus]:bg-gray-100 data-[focus]:text-gray-700">
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm font-medium text-gray-500 data-[focus]:bg-gray-100 data-[focus]:text-gray-700">
                    Settings
                  </Link>
                </MenuItem>
              </MenuSection>
              <MenuSection className="py-1">
                <MenuItem>
                  {({ close }) => (
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={(e) => {
                        handleClick(e, close);
                      }}
                      className="inline-flex w-full items-center px-4 py-2 text-left text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:pointer-events-none disabled:text-gray-400">
                      {isPending && (
                        <Spinner className="mr-2" aria-hidden="true" />
                      )}
                      {isPending ? 'Signing out' : 'Sign out'}
                    </button>
                  )}
                </MenuItem>
              </MenuSection>
            </MenuItems>
          </Menu>
        </div>
      ) : (
        <>
          <div className="hidden md:flex md:items-center md:gap-x-8">
            <Link
              href="/sign-in"
              className="text-sm font-semibold text-gray-500 hover:text-gray-600">
              Sign in
            </Link>
            <Link
              href="/create-account"
              className="text-sm font-semibold text-gray-500 hover:text-gray-600">
              Create account
            </Link>
            <Button asChild>
              <Link href="/upload-recipe">Upload recipe</Link>
            </Button>
          </div>
          <div className="md:hidden">
            <Menu>
              <MenuButton className="-m-1 rounded-md p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600">
                <Bars3Icon className="size-6" aria-hidden="true" />
                <span className="sr-only">Open mobile menu</span>
              </MenuButton>
              <MenuItems className="divide-y divide-gray-200">
                <MenuSection className="py-1">
                  <MenuItem>
                    <Link
                      href="/sign-in"
                      className="block px-4 py-2 text-sm font-medium text-gray-500 data-[focus]:bg-gray-100 data-[focus]:text-gray-700">
                      Sign in
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="/create-account"
                      className="block px-4 py-2 text-sm font-medium text-gray-500 data-[focus]:bg-gray-100 data-[focus]:text-gray-700">
                      Create account
                    </Link>
                  </MenuItem>
                </MenuSection>
                <MenuSection className="py-1">
                  <MenuItem>
                    <Link
                      href="/upload-recipe"
                      className="block px-4 py-2 text-sm font-medium text-gray-500 data-[focus]:bg-gray-100 data-[focus]:text-gray-700">
                      Upload recipe
                    </Link>
                  </MenuItem>
                </MenuSection>
              </MenuItems>
            </Menu>
          </div>
        </>
      )}
    </nav>
  );
}
