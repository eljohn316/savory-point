'use client';

import Link from 'next/link';
import React, { useRef, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';

import { schema, TSchema } from '@/app/(auth)/sign-in/lib/schema';
import { signInAction } from '@/app/(auth)/sign-in/lib/action';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export function SignInForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [result, formAction] = useFormState(signInAction, {
    message: '',
    errors: {}
  });

  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(formRef.current!);

    startTransition(() => {
      form.handleSubmit(() => formAction(formData))(e);
    });
  }

  return (
    <>
      {result.message && (
        <div className="rounded-md p-4 bg-red-50 mb-6">
          <div className="flex">
            <div className="shrink-0">
              <XCircleIcon className="text-red-400 size-5" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">
                {result.message}
              </p>
            </div>
          </div>
        </div>
      )}

      <Form {...form}>
        <form
          ref={formRef}
          action={formAction}
          onSubmit={handleSubmit}
          className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl serverError={result?.errors?.email?.at(0)}>
                  <Input type="email" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage>{result?.errors?.email?.at(0)}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl serverError={result?.errors?.password?.at(0)}>
                  <Input type="password" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage>{result?.errors?.password?.at(0)}</FormMessage>
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
              />
              <Label htmlFor="remember-me" className="ml-3">
                Remember me
              </Label>
            </div>

            <div className="text-sm leading-6">
              <Link
                href="/forgot-password"
                className="font-semibold text-emerald-600 hover:text-emerald-500">
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? 'Signing in' : 'Sign in'}
              {isPending && <Spinner className="size-4 ml-2" />}
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t have an account yet?{' '}
          <Link
            href="/create-account"
            className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500">
            Create account
          </Link>{' '}
          here
        </p>
      </Form>
    </>
  );
}
