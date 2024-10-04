"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold">Something went wrong!</h2>
      <div className="mt-4">
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
