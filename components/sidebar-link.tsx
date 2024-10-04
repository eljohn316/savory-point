'use client';

import Link from 'next/link';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const SidebarLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(function SidebarLink({ href, className, ...props }, ref) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        href === pathname || pathname.startsWith(`${href}`)
          ? 'bg-gray-200 text-gray-700'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
        'inline-flex items-center gap-x-2 rounded-md px-4 py-2 text-sm font-medium',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export { SidebarLink };
