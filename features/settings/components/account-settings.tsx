'use client';

import { startTransition, useActionState, useState } from 'react';
import { CircleAlertIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PasswordInput } from '@/components/ui/password-input';
import { Form } from '@/components/form/form';
import { FormField } from '@/components/form/form-field';
import { FormItem } from '@/components/form/form-item';
import { FormLabel } from '@/components/form/form-label';
import { FormControl } from '@/components/form/form-control';
import { FormMessage } from '@/components/form/form-message';
import { INITIAL_ACTION_STATE } from '@/components/form/utils/action-state-utils';
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback';
import { authRedirect } from '@/features/auth/actions/auth-redirect';
import {
  deleteAccountSchema,
  DeleteAccountValues,
} from '@/features/settings/schema/delete-account';
import { deleteAccount } from '@/features/settings/actions/delete-account';

export function AccountSettings() {
  const form = useForm<DeleteAccountValues>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      password: '',
    },
  });

  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const [actionState, action, isPending] = useActionState(deleteAccount, INITIAL_ACTION_STATE);

  useActionFeedback(actionState, {
    onError: ({ message }) => setError(message),
  });

  function handleCancel() {
    setShow(false);
    form.reset();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!session) return await authRedirect('/settings');

    setError(null);

    form.handleSubmit((data) => {
      startTransition(() => {
        const formData = new FormData();
        formData.set('password', data.password);
        action(formData);
      });
    })(e);
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-base font-bold text-gray-900">Account settings</h2>
      </div>
      <div className="space-y-12">
        <div className="border-l-4 border-red-700 bg-red-50 p-3 sm:p-4">
          <div className="flex items-center gap-x-2.5 sm:gap-x-4">
            <CircleAlertIcon className="size-4 flex-none text-red-700" />
            <div className="flex-auto">
              <p className="text-sm font-semibold text-red-800">
                Warning! This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="mt-2 pl-[26px] text-sm text-red-700 sm:pl-8">
            Deleting your account is permanent and cannot be undone. All your data, including
            profile information and recipe uploads, will be lost.
          </div>
        </div>
        <Dialog open={show} onOpenChange={setShow}>
          <DialogTrigger asChild>
            <Button variant="danger">Delete my account</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <Form {...form}>
              <form action={action} onSubmit={handleSubmit}>
                <DialogHeader className="gap-6">
                  <DialogTitle>Confirm delete account</DialogTitle>
                  <DialogDescription className="text-base">
                    To delete your account you must enter your password
                  </DialogDescription>
                  {error && (
                    <div className="rounded-md bg-red-50 p-3 sm:p-4">
                      <div className="flex items-center gap-x-2.5 sm:gap-x-4">
                        <CircleAlertIcon className="size-4 flex-none text-red-700" />
                        <div className="flex-auto">
                          <p className="text-sm font-medium text-red-800">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Current password</FormLabel>
                        <FormControl>
                          <PasswordInput disabled={isPending} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </DialogHeader>
                <DialogFooter className="mt-6">
                  <Button type="button" variant="ghost" disabled={isPending} onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="danger" type="submit" disabled={isPending}>
                    {isPending ? 'Deleting account...' : 'Delete account'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
