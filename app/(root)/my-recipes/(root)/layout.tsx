import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'My recipes'
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Uploaded recipes
        </h3>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <Button asChild>
            <Link href="/upload-recipe">Upload recipe</Link>
          </Button>
        </div>
      </div>
      <div className="my-8">{children}</div>
    </div>
  );
}
