'use client';

import Link from 'next/link';
import { FormEvent, startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/form/form';
import { FormField } from '@/components/form/form-field';
import { FormItem } from '@/components/form/form-item';
import { FormLabel } from '@/components/form/form-label';
import { FormControl } from '@/components/form/form-control';
import { FormMessage } from '@/components/form/form-message';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import { Alert } from '@/components/ui/alert';
import { INITIAL_ACTION_STATE } from '@/components/form/utils/action-state-utils';
import { signinSchema, SigninValues } from '@/features/auth/schema/sign-in';
import { signin } from '@/features/auth/actions/sign-in';

export function SigninForm() {
  const form = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [actionState, action, isPending] = useActionState(signin, INITIAL_ACTION_STATE);

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
      <form action={action} onSubmit={handleSignin} className="w-full max-w-sm">
        <h3 className="text-center text-2xl font-semibold text-gray-900 sm:text-3xl">Sign in</h3>

        {actionState.status === 'error' && (
          <Alert variant="error" className="mt-6">
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-emerald-700 decoration-1 hover:underline hover:underline-offset-2">
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-10 space-y-5 text-center">
          <Button type="submit" className="w-full text-base" disabled={isPending}>
            {isPending ? 'Signing in...' : 'Sign in'}
          </Button>
          <p className="text-sm font-light text-gray-600">
            Don&apos;t have an account yet?{' '}
            <Button variant="link" className="p-0 text-emerald-700" asChild>
              <Link href="/sign-up">Sign up</Link>
            </Button>{' '}
            instead
          </p>
        </div>
      </form>
    </Form>
  );
}
