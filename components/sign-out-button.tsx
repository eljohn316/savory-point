'use client';

import { useTransition } from 'react';
import { useFormState } from 'react-dom';
import { Spinner } from '@/components/ui/spinner';
import { DropdownItem } from '@/components/ui/dropdown';
import { cn } from '@/lib/utils';
import { signOutAction } from '@/lib/action';

export function SignoutButton() {
  const [isPending, startTransition] = useTransition();
  const [_, formAction] = useFormState(signOutAction, null);

  return (
    <form
      action={() =>
        startTransition(() => {
          formAction();
        })
      }>
      <DropdownItem>
        <button
          type="submit"
          className={cn(
            isPending && 'justify-between items-center',
            'inline-flex w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900'
          )}>
          {isPending ? 'Signing out' : 'Sign out'}
          {isPending && <Spinner className="size-4 text-gray-400" />}
        </button>
      </DropdownItem>
    </form>
  );
}
