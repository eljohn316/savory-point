'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { MenuIcon } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { Container } from '@/components/container';
import { Logo } from '@/components/logo';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SignoutModal } from '@/features/auth/components/sign-out-modal';

function NavigationLinks() {
  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const { isPending, data } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  if (isPending) return <Skeleton className="size-10 rounded-md md:h-10 md:w-full md:max-w-80" />;

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
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() => router.push('/upload-recipe')}
                className="text-base text-gray-600">
                Upload recipe
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem
                onSelect={() => router.push('/sign-in')}
                className="text-base text-gray-600">
                Sign in
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => router.push('/sign-up')}
                className="text-base text-gray-600">
                Sign up
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );

  return (
    <>
      <SignoutModal open={showSignoutModal} onOpenChange={setShowSignoutModal} />
      <div className="flex items-center gap-x-6">
        {pathname !== '/upload-recipe' && (
          <Link
            href="/upload-recipe"
            className="hidden rounded-md bg-emerald-700 px-4 py-2 text-[15px] text-emerald-50 hover:bg-emerald-800 focus:ring-1 focus:ring-emerald-700 focus:ring-offset-2 focus:outline-none md:inline-block">
            Upload recipe
          </Link>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger className="overflow-hidden rounded-full outline-none focus:ring-1 focus:ring-emerald-700 focus:ring-offset-2">
            <Image
              src={data.user.image ?? data.user.defaultImage}
              alt={`${data.user.firstName}'s avatar`}
              height={36}
              width={36}
              className="size-9"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-52 p-2" sideOffset={8} hideWhenDetached>
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <p className="text-gray-600">Signed in as</p>
                <p className="text-base text-gray-800">{data.user.name}</p>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() => router.push('/upload-recipe')}
                className="text-base text-gray-600">
                Upload recipe
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem className="text-base text-gray-600">Account</DropdownMenuItem>
              <DropdownMenuItem className="text-base text-gray-600">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-base text-gray-600">Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() => setShowSignoutModal(true)}
                className="text-base text-gray-600">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

export function Navigation() {
  return (
    <nav className="border-b border-gray-200 shadow-xs">
      <Container className="flex max-w-4xl items-center justify-between py-4">
        <Logo />
        <NavigationLinks />
      </Container>
    </nav>
  );
}
