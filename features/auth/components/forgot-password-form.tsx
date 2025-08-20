'use client';

import Link from 'next/link';
import { FormEvent, startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { MoveLeftIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/form/form';
import { FormField } from '@/components/form/form-field';
import { FormItem } from '@/components/form/form-item';
import { FormLabel } from '@/components/form/form-label';
import { FormControl } from '@/components/form/form-control';
import { FormMessage } from '@/components/form/form-message';
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { INITIAL_ACTION_STATE } from '@/components/form/utils/action-state-utils';
import { forgotPasswordSchema, ForgotPasswordValues } from '@/features/auth/schema/forgot-password';
import { forgotPassword } from '@/features/auth/actions/forgot-password';

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const [actionState, action, isPending] = useActionState(forgotPassword, INITIAL_ACTION_STATE);

  useActionFeedback(actionState, {
    onSuccess: () => {
      form.reset();
    },
  });

  function handleSignin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.handleSubmit(({ email }) => {
      startTransition(() => {
        const formData = new FormData();
        formData.set('email', email);
        action(formData);
      });
    })(e);
  }

  return (
    <Form {...form}>
      <form action={action} onSubmit={handleSignin} className="w-full max-w-sm">
        <div className="space-y-2 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Forgot password?</h3>
          <p className="text-sm text-gray-700">
            Enter your email below, and we&apos;ll send you a link to reset it.
          </p>
        </div>
        {(actionState.status === 'success' || actionState.status === 'error') && (
          <Alert variant={actionState.status} className="mt-6">
            {actionState.message}
          </Alert>
        )}
        <div className="mt-8 space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-10 space-y-4 text-center">
          <Button type="submit" className="w-full text-base" size="lg" disabled={isPending}>
            {isPending ? 'Sending instructions...' : 'Send instructions'}
          </Button>
          <Button variant="link" className="p-0 text-emerald-700" disabled={isPending} asChild>
            <Link href="/sign-in">
              <MoveLeftIcon /> Back to Sign in
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
