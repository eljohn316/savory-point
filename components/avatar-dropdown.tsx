import Link from 'next/link';
import Image from 'next/image';
import { User } from 'lucia';
import { cn } from '@/lib/utils';
import {
  Dropdown,
  DropdownTrigger,
  DropdownItems,
  DropdownItem
} from '@/components/ui/dropdown';
import { SignoutButton } from '@/components/sign-out-button';

interface AvatarDropdownProps {
  user: User;
  className?: string;
}

export function AvatarDropdown({ user, className }: AvatarDropdownProps) {
  return (
    <Dropdown as="div" className={cn(className, 'relative')}>
      <DropdownTrigger className="flex items-center rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600">
        <span className="sr-only">Open user menu</span>
        <Image
          src={user.image!}
          alt="User avatar"
          height={32}
          width={32}
          className="size-8 rounded-full"
        />
      </DropdownTrigger>
      <DropdownItems className="divide-y divide-gray-200 mt-2">
        <div className="px-4 py-3">
          <p className="text-sm">Signed in as</p>
          <p className="truncate text-sm font-medium text-gray-900">
            {user.email}
          </p>
        </div>
        <div className="py-1">
          <DropdownItem>
            <Link
              href="/"
              className="block px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
              Home
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              href="/my-recipes"
              className="block px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
              My recipes
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              href="/upload-recipe"
              className="block px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
              Upload recipe
            </Link>
          </DropdownItem>
        </div>
        <div className="py-1">
          <SignoutButton />
        </div>
      </DropdownItems>
    </Dropdown>
  );
}
