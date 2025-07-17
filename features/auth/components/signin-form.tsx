'use client';

import Link from 'next/link';
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
import { signinSchema, SigninValues } from '@/features/auth/schema/sign-in';

export function SigninForm() {
  const form = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function handleSignin(values: SigninValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignin)}>
        <h3 className="text-center text-2xl font-semibold text-gray-900 sm:text-3xl">Sign in</h3>
        <div className="mt-8 space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-10 space-y-5 text-center">
          <button
            type="submit"
            className="block w-full rounded-md bg-emerald-700 px-4 py-2 text-base font-medium text-green-50 hover:bg-emerald-800 focus:ring-1 focus:ring-emerald-700 focus:ring-offset-2 focus:outline-none">
            Sign in
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
