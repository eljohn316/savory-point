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
      <div className="mt-6 space-y-4">
        <h2 className="font-bold text-gray-700">Something went wrong</h2>
        <Button variant="ghost" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
