import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <Link
        href="/my-recipes"
        className="-ml-1 inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-700">
        <ChevronLeftIcon className="size-5" aria-hidden="true" />
        <span>Return</span>
      </Link>
      <div className="mt-8">{children}</div>
    </div>
  );
}
