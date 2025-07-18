'use client';

import * as React from 'react';
import { useFormStatus } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { signout } from '@/features/auth/actions/sign-out';

type SignoutModalProps = React.ComponentProps<typeof Dialog> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SignoutModal({ open, onOpenChange, ...props }: SignoutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="gap-3">
          <DialogTitle>Confirm sign out</DialogTitle>
          <DialogDescription className="text-base">
            Are you sure you want to sign out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form action={signout} className="flex gap-x-3">
            <CancelButton onClick={() => onOpenChange(false)} />
            <SignoutButton />
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CancelButton(props: React.ComponentProps<'button'>) {
  const { pending } = useFormStatus();
  return (
    <button
      type="button"
      className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-75"
      disabled={pending}
      {...props}>
      Cancel
    </button>
  );
}
function SignoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-emerald-50 outline-none hover:bg-emerald-800 focus:ring-1 focus:ring-emerald-700 focus:ring-offset-2 disabled:opacity-75"
      disabled={pending}>
      {pending ? 'Signing out' : 'Sign out'}
    </button>
  );
}
