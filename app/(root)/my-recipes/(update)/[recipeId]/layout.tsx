import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

interface LayoutProps {
  children: React.ReactNode;
  params: { recipeId: string };
}

export default function Layout({ children, params }: LayoutProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href={`/my-recipes/${params.recipeId}`}
        className="-ml-1 inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-700">
        <ChevronLeftIcon className="size-5" aria-hidden="true" />
        <span>Return</span>
      </Link>
      <div className="mt-8">{children}</div>
    </div>
  );
}
