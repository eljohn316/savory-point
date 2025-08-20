'use client';

import Link from 'next/link';
import { startTransition, useActionState } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheckIcon, MoveLeftIcon } from 'lucide-react';
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
import { Alert } from '@/components/ui/alert';
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from '@/features/auth/schema/reset-password';
import { resetPassword } from '@/features/auth/actions/reset-password';

export function ResetPasswordForm() {
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const { token } = useParams<{ token: string }>();
  const [actionState, action, isPending] = useActionState(
    resetPassword.bind(null, token),
    INITIAL_ACTION_STATE,
  );

  useActionFeedback(actionState, {
    onFail: ({ fieldErrors }) => {
      renderFormErrors<ResetPasswordValues>(fieldErrors, form);
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.handleSubmit(({ newPassword, confirmNewPassword }) => {
      startTransition(() => {
        const formData = new FormData();
        formData.set('newPassword', newPassword);
        formData.set('confirmNewPassword', confirmNewPassword);
        action(formData);
      });
    })(e);
  }

  if (actionState.status === 'success')
    return (
      <div className="w-full max-w-xs">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100">
          <CircleCheckIcon className="size-6 text-emerald-800" />
        </div>
        <div className="mt-6 space-y-2 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Password reset</h3>
          <p className="text-gray-700">{actionState.message}</p>
        </div>
        <Button className="mt-8 w-full text-base" asChild>
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="space-y-2 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Reset your password</h3>
          <p className="text-sm text-gray-700">Choose a new password to secure your account.</p>
        </div>
        {actionState.status === 'error' && (
          <Alert variant="error" className="mt-6">
            {actionState.message}
          </Alert>
        )}
        <div className="mt-8 space-y-6">
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
        </div>
        <div className="mt-10 space-y-4 text-center">
          <Button type="submit" className="w-full text-base" size="lg" disabled={isPending}>
            {isPending ? 'Resetting password...' : 'Reset password'}
          </Button>
          <Button variant="link" className="p-0 text-emerald-700" asChild>
            <Link href="/sign-in">
              <MoveLeftIcon /> Back to Sign in
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
