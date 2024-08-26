import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

export const metadata: Metadata = {
  title: 'Upload recipe'
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="my-12 lg:max-w-3xl mx-auto px-6 lg:px-8">
      <Link
        href="/"
        className="-ml-1 inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-700">
        <ChevronLeftIcon className="size-5" aria-hidden="true" />
        <span>Return</span>
      </Link>
      <div className="mt-10">
        <h3 className="font-bold text-xl text-gray-700">Upload your recipe</h3>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
