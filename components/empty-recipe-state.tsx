import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function EmptyRecipeState() {
  return (
    <div className="text-center">
      <div className="mx-auto size-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6">
          <path d="M2 12h20" />
          <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
          <path d="m4 8 16-4" />
          <path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-bold text-gray-900">No recipes</h3>
      <p className="mt-1 text-gray-500">
        Share your recipe to the community now
      </p>
      <div className="mt-6">
        <Button asChild>
          <Link href="/upload-recipe">Upload recipe</Link>
        </Button>
      </div>
    </div>
  );
}
