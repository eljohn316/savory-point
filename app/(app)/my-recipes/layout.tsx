'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeftIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';

type LayoutProps = {
  children: React.ReactNode;
};

const tabs = [
  { name: 'Uploads', href: '/my-recipes/uploads' },
  { name: 'Saved', href: '/my-recipes/saved' },
  { name: 'Liked', href: '/my-recipes/liked' },
];

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Container className="max-w-4xl">
      <div className="space-y-6">
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-x-2 text-sm font-semibold text-emerald-700"
          onClick={() => router.back()}>
          <ChevronLeftIcon className="size-4" />
          Return
        </button>
        <div className="relative border-b border-gray-200 pb-0">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl leading-6 font-semibold text-gray-900">My Recipes</h3>
            <Button asChild>
              <Link href="/upload-recipe">Upload</Link>
            </Button>
          </div>
          <div className="mt-8">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={cn(
                    tab.href === pathname
                      ? 'border-emerald-700 text-emerald-700'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'border-b-2 px-1 pb-4 text-sm font-medium whitespace-nowrap',
                  )}>
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="mt-10">{children}</div>
    </Container>
  );
}
