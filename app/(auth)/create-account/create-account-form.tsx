'use client';

import Link from 'next/link';
import React, { useRef, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, TSchema } from '@/app/(auth)/create-account/lib/schema';
import { createAccountAction } from '@/app/(auth)/create-account/lib/action';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export function CreateAccountForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [result, formAction] = useFormState(createAccountAction, {
    errors: {}
  });

  const form = useForm<TSchema>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
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
      <Form {...form}>
        <form ref={formRef} action={formAction} onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-6 sm:space-y-0 sm:flex sm:gap-x-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="sm:flex-1">
                    <FormLabel>First name</FormLabel>
                    <FormControl serverError={result?.errors?.firstName?.at(0)}>
                      <Input type="text" disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage>
                      {result?.errors?.firstName?.at(0)}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="sm:flex-1">
                    <FormLabel>Last name</FormLabel>
                    <FormControl serverError={result?.errors?.lastName?.at(0)}>
                      <Input type="text" disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage>{result?.errors?.lastName?.at(0)}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl
                    serverError={result?.errors?.confirmPassword?.at(0)}>
                    <Input type="password" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage>
                    {result?.errors?.confirmPassword?.at(0)}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="mt-8">
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? 'Creating account' : 'Create account'}
              {isPending && <Spinner className="size-4 ml-2" />}
            </Button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500">
              Sign in
            </Link>{' '}
            here
          </p>
        </form>
      </Form>
    </>
  );
}
