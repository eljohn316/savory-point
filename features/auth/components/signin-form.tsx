'use client';

import Link from 'next/link';
import { FormEvent, startTransition, useActionState, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CircleAlertIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/form/form';
import { FormField } from '@/components/form/form-field';
import { FormItem } from '@/components/form/form-item';
import { FormLabel } from '@/components/form/form-label';
import { FormControl } from '@/components/form/form-control';
import { FormMessage } from '@/components/form/form-message';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { INITIAL_ACTION_STATE } from '@/components/form/utils/action-state-utils';
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback';
import { signinSchema, SigninValues } from '@/features/auth/schema/sign-in';
import { signin } from '@/features/auth/actions/sign-in';

export function SigninForm() {
  const [alert, setAlert] = useState<string>();
  const form = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [actionState, action, isPending] = useActionState(signin, INITIAL_ACTION_STATE);

  useActionFeedback(actionState, {
    onError: ({ message }) => {
      setAlert(message);
    },
  });

  function handleSignin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    form.handleSubmit(({ email, password }) => {
      startTransition(() => {
        const formData = new FormData();
        formData.set('email', email);
        formData.set('password', password);
        action(formData);
      });
    })(e);
  }

  return (
    <Form {...form}>
      <form action={action} onSubmit={handleSignin}>
        <h3 className="text-center text-2xl font-semibold text-gray-900 sm:text-3xl">Sign in</h3>

        {alert && (
          <div className="mt-6 flex items-center gap-x-4 rounded-md border border-red-700 bg-red-50 p-4">
            <CircleAlertIcon className="size-4 text-red-800" />
            <p className="text-sm text-red-800">{alert}</p>
          </div>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-10 space-y-5 text-center">
          <button
            type="submit"
            className="block w-full rounded-md bg-emerald-700 px-4 py-2 text-base font-medium text-green-50 hover:bg-emerald-800 focus:ring-1 focus:ring-emerald-700 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isPending}>
            {isPending ? 'Signing in' : 'Sign in'}
          </button>
          <p className="text-sm font-light text-gray-600">
            Don&apos;t have an account yet?{' '}
            <Link href="/sign-up" className="font-medium text-emerald-700 hover:underline">
              Sign up
            </Link>{' '}
            instead
          </p>
        </div>
      </form>
    </Form>
  );
}
