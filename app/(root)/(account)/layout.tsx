import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import {
  Cog6ToothIcon,
  UserCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { SidebarLink } from '@/components/sidebar-link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto max-w-6xl lg:flex lg:gap-x-12">
      <aside className="lg:w-52 lg:flex-none lg:space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-x-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
          <ChevronLeftIcon className="size-5" aria-hidden="true" />
          Return to Home
        </Link>
        <nav className="mb-12 mt-6 space-y-2 border-y border-gray-200 py-4 sm:flex sm:gap-x-3 sm:space-y-0 lg:flex-col lg:space-y-2 lg:border-y-0 lg:py-0">
          <SidebarLink href="/account" className="w-full">
            <UserCircleIcon className="size-5" aria-hidden="true" />
            Account
          </SidebarLink>
          <SidebarLink href="/profile" className="w-full">
            <UserIcon className="size-5" aria-hidden="true" />
            Profile
          </SidebarLink>
          <SidebarLink href="/settings" className="w-full">
            <Cog6ToothIcon className="size-5" aria-hidden="true" />
            Settings
          </SidebarLink>
        </nav>
      </aside>
      <div className="lg:flex-auto lg:border-l lg:border-gray-200 lg:pl-12">
        {children}
      </div>
    </div>
  );
}
