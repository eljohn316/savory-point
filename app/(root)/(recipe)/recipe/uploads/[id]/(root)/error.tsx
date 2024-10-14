'use client';

import { useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-sm text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100">
        <ExclamationTriangleIcon
          className="size-6 text-red-700"
          aria-hidden="true"
        />
      </div>
      <div className="my-6">
        <h3 className="text-lg font-bold text-gray-700">
          Something went wrong
        </h3>
        <p className="mt-2 text-sm font-medium text-gray-500">
          There was en error encountered while fetching your recipe
        </p>
      </div>
      <Button variant="outline" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
