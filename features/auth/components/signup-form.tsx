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
import { PasswordInput } from '@/components/ui/password-input';
import { signupSchema, SignupValues } from '@/features/auth/schema/sign-up';
import { signup } from '@/features/auth/actions/sign-up';
import { INITIAL_ACTION_STATE } from '@/components/form/utils/action-state-utils';
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback';
import { errorToast } from '@/components/ui/sonner';
import { renderFormErrors } from '@/components/form/utils/render-form-errors';

export function SignupForm() {
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    reValidateMode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [actionState, action, isPending] = useActionState(signup, INITIAL_ACTION_STATE);

  function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    form.handleSubmit(({ firstName, lastName, email, password, confirmPassword }) => {
      startTransition(() => {
        const formData = new FormData();
        formData.set('firstName', firstName);
        formData.set('lastName', lastName);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);
        action(formData);
      });
    })(e);
  }

  useActionFeedback(actionState, {
    onFail: ({ fieldErrors }) => {
      renderFormErrors<SignupValues>(fieldErrors, form);
    },
    onError: ({ message }) => {
      errorToast(message);
    },
  });

  return (
    <Form {...form}>
      <form action={action} onSubmit={handleSignup}>
        <h3 className="text-center text-2xl font-semibold text-gray-900 sm:text-3xl">Sign up</h3>
        <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="sm:col-span-1">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="sm:col-span-1">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Confirm password</FormLabel>
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
            className="disabled:pointer-none: block w-full rounded-md bg-emerald-700 px-4 py-2 text-base font-medium text-green-50 hover:bg-emerald-800 focus:ring-1 focus:ring-emerald-700 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            disabled={isPending}>
            {isPending ? 'Signing up...' : 'Sign up'}
          </button>
          <p className="text-sm font-light text-gray-600">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-medium text-emerald-700 hover:underline">
              Sign in
            </Link>{' '}
            instead
          </p>
        </div>
      </form>
    </Form>
  );
}
