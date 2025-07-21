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
import { Button } from '@/components/ui/button';
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
    <Button type="button" variant="ghost" disabled={pending} {...props}>
      Cancel
    </Button>
  );
}
function SignoutButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Signing out...' : 'Sign out'}
    </Button>
  );
}
