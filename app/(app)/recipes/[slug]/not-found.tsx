import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import {
  Placeholder,
  PlaceholderActions,
  PlaceholderDescription,
  PlaceholderTitle,
} from '@/components/ui/placeholder';

export default function NotFound() {
  return (
    <Placeholder className="py-6">
      <PlaceholderTitle>Recipe not found</PlaceholderTitle>
      <PlaceholderDescription>
        Looks like we could not find the recipe you are looking for.
      </PlaceholderDescription>
      <PlaceholderActions>
        <Link
          href="/"
          className="inline-flex items-center gap-x-2 rounded-md border border-emerald-700 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-700 hover:text-emerald-50 focus:ring-1 focus:ring-emerald-700 focus:ring-offset-2 focus:outline-none">
          <ArrowLeftIcon className="size-4" />
          Back to Home
        </Link>
      </PlaceholderActions>
    </Placeholder>
  );
}
