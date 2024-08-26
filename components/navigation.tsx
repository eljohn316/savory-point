import Link from 'next/link';
import { Cookie } from 'next/font/google';
import { User } from 'lucia';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { validateRequest } from '@/lib/auth';
import { SearchInput } from '@/components/search-input';
import {
  Dropdown,
  DropdownItem,
  DropdownItems,
  DropdownTrigger
} from '@/components/ui/dropdown';
import { AuthenticatedNavLinks } from '@/components/authenticated-nav-links';

const fontLogo = Cookie({ subsets: ['latin'], weight: ['400'] });

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'text-4xl md:text-[2.5rem] lg:text-5xl text-emerald-700',
        fontLogo.className,
        className
      )}>
      Savory Point
    </Link>
  );
}

function NavActions({ user }: { user: User | null }) {
  if (!user)
    return (
      <>
        <Dropdown as="div" className="relative lg:hidden">
          <DropdownTrigger className="-m-2 p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600">
            <Bars3Icon className="size-5" aria-hidden="true" />
            <span className="sr-only">Open mobile nav</span>
          </DropdownTrigger>
          <DropdownItems className="divide-y divide-gray-100">
            <div className="py-1">
              <DropdownItem>
                <Link
                  href="/sign-in"
                  className="block px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                  Sign in
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link
                  href="/create-account"
                  className="block px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                  Create account
                </Link>
              </DropdownItem>
            </div>
            <div className="py-1">
              <DropdownItem>
                <Link
                  href="/upload-recipe"
                  className="block px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                  Upload recipe
                </Link>
              </DropdownItem>
            </div>
          </DropdownItems>
        </Dropdown>

        <div className="hidden lg:block lg:whitespace-nowrap">
          <Link
            href="/sign-in"
            className="text-sm px-4 font-semibold text-gray-500 hover:text-emerald-700">
            Sign in
          </Link>
          <Link
            href="/create-account"
            className="text-sm px-4 font-semibold text-gray-500 hover:text-emerald-700">
            Create account
          </Link>
          <Link
            href="/upload-recipe"
            className="text-sm px-4 font-semibold text-gray-500 hover:text-emerald-700">
            Upload recipe
          </Link>
        </div>
      </>
    );

  return <AuthenticatedNavLinks user={user} />;
}

function SearchActions() {
  return (
    <>
      <button
        type="button"
        className="-m-2 p-2 text-gray-400 hover:text-gray-500 lg:hidden">
        <MagnifyingGlassIcon className="size-6" aria-hidden="true" />
        <span className="sr-only">Open search modal</span>
      </button>

      <SearchInput className="hidden lg:block" />
    </>
  );
}

export async function Navigation() {
  const { user } = await validateRequest();

  return (
    <nav className="shadow p-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center gap-x-4">
        <div className="flex-1 flex-shrink-0">
          <SearchActions />
        </div>
        <div className="flex-grow flex-shrink flex justify-center">
          <Logo />
        </div>
        <div className="flex-1 flex-shrink-0 flex items-center justify-end">
          <NavActions user={user} />
        </div>
      </div>
    </nav>
  );
}
