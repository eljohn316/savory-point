'use client';

import { startTransition, useActionState, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CircleAlertIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from '@/lib/auth-client';
import { redirectToast } from '@/lib/actions';
import { Form } from '@/components/form/form';
import { FormField } from '@/components/form/form-field';
import { FormItem } from '@/components/form/form-item';
import { FormLabel } from '@/components/form/form-label';
import { FormControl } from '@/components/form/form-control';
import { FormMessage } from '@/components/form/form-message';
import { renderFormErrors } from '@/components/form/utils/render-form-errors';
import { INITIAL_ACTION_STATE } from '@/components/form/utils/action-state-utils';
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import { successToast } from '@/components/ui/sonner';
import {
  updatePasswordSchema,
  type UpdatePasswordValues,
} from '@/features/settings/schema/update-password';
import { updatePassword } from '@/features/settings/actions/update-password';

export function UpdatePasswordForm() {
  const form = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const { data: session } = useSession();
  const [alert, setAlert] = useState<string | null>(null);
  const [actionState, action, isPending] = useActionState(updatePassword, INITIAL_ACTION_STATE);

  useActionFeedback(actionState, {
    onSuccess: ({ message }) => {
      successToast(message);
      form.reset();
    },
    onError: ({ message }) => {
      setAlert(message);
    },
    onFail: ({ fieldErrors }) => {
      renderFormErrors<UpdatePasswordValues>(fieldErrors, form);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!session) return redirectToast('/sign-in', 'You need to sign in to continue');

    form.handleSubmit((data) => {
      setAlert(null);
      startTransition(() => {
        const formData = new FormData();
        formData.set('currentPassword', data.currentPassword);
        formData.set('newPassword', data.newPassword);
        formData.set('confirmNewPassword', data.confirmNewPassword);
        action(formData);
      });
    })(e);
  }

  return (
    <div className="space-y-10">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-base font-bold text-gray-900">Password</h2>
        <p className="mt-1 text-sm text-gray-600">
          Please enter your current password to change your password.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          {alert && (
            <div className="mb-6 flex max-w-sm items-center gap-x-4 rounded-md border border-red-700 bg-red-50 px-4 py-3">
              <CircleAlertIcon className="size-4 text-red-800" />
              <p className="text-sm text-red-800">{alert}</p>
            </div>
          )}
          <div className="max-w-sm space-y-8">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current password</FormLabel>
                  <FormControl>
                    <PasswordInput disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <PasswordInput disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <PasswordInput disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving changes...' : 'Save changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
