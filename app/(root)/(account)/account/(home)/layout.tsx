import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="space-y-8">
      <div className="border-b border-gray-300 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          Uploaded recipes
        </h3>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <Button asChild>
            <Link href="/upload-recipe">Upload recipe</Link>
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}
