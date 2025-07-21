import Link from 'next/link';
import type { Metadata } from 'next';
import { HomeIcon } from 'lucide-react';
import {
  Placeholder,
  PlaceholderTitle,
  PlaceholderDescription,
  PlaceholderActions,
} from '@/components/ui/placeholder';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <Placeholder className="">
        <PlaceholderTitle className="text-4xl">Page not found</PlaceholderTitle>
        <PlaceholderDescription className="mt-5 text-lg">
          The page you are looking for doesn&apos;t exist.
        </PlaceholderDescription>
        <PlaceholderActions className="gap-x-4">
          <Button variant="primary" asChild>
            <Link href="/">
              <HomeIcon className="size-4" />
              Take me Home
            </Link>
          </Button>
        </PlaceholderActions>
      </Placeholder>
    </div>
  );
}
