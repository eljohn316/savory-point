import Link from 'next/link';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-sm text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100">
        <ExclamationTriangleIcon
          className="size-6 text-red-700"
          aria-hidden="true"
        />
      </div>
      <div className="my-6">
        <h3 className="text-lg font-bold text-gray-700">Recipe not found</h3>
        <p className="mt-2 text-sm font-medium text-gray-500">
          Sorry! We could not find the recipe you&apos;re looking for
        </p>
      </div>
      <Button variant="outline" asChild>
        <Link href="/account">Go back</Link>
      </Button>
    </div>
  );
}
