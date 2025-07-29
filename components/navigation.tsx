'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BellIcon, MenuIcon } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { SignoutModal } from '@/features/auth/components/sign-out-modal';

function NavigationLinks() {
  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const { isPending, data } = useSession();
  const router = useRouter();

  if (isPending) return <Skeleton className="size-10 rounded-md sm:h-10 sm:w-full sm:max-w-80" />;

  if (!data)
    return (
      <>
        <div className="hidden sm:flex sm:items-center sm:gap-x-4">
          <Button variant="outline" className="text-base" asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button variant="primary" className="text-base" asChild>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-md p-1 text-gray-400 hover:text-gray-500 focus:ring-1 focus:ring-emerald-700 focus:ring-offset-2 focus:outline-none sm:hidden">
            <MenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-40 p-2" hideWhenDetached>
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
      <div className="flex items-center gap-x-4 sm:gap-x-6">
        <button type="button" className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">Open notifications</span>
          <BellIcon className="size-5" />
        </button>
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
              <DropdownMenuItem
                onSelect={() => router.push('/my-recipes')}
                className="text-base text-gray-600">
                My Recipes
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => router.push('/settings/profile')}
                className="text-base text-gray-600">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => router.push('/notifications')}
                className="text-base text-gray-600">
                Notifications
              </DropdownMenuItem>
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
      <Container className="flex h-[72px] max-w-4xl items-center justify-between py-0">
        <Logo className="text-[22px] sm:text-2xl" />
        <NavigationLinks />
      </Container>
    </nav>
  );
}
