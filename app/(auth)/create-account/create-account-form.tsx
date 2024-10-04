"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XCircleIcon } from "@heroicons/react/20/solid";

import { useFormAction } from "@/hooks/use-form-action";
import { createAccountSchema } from "@/lib/schema/create-account";
import { createAccount } from "@/lib/actions/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertIcon } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";

type TSchema = z.infer<typeof createAccountSchema>;

export function CreateAccountForm() {
  const form = useForm<TSchema>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const { isPending, formAction, formState, onSubmit } = useFormAction(
    createAccount,
    { errors: {} }
  );

  React.useEffect(() => {
    if (formState.success === false) {
      form.reset();
    }
  }, [formState, form]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSubmit(() => {
      const formData = new FormData(e.currentTarget);
      form.handleSubmit(() => formAction(formData))(e);
    });
  }

  return (
    <div className="space-y-4">
      {!formState.success && formState.message && (
        <Alert variant="danger" className="flex">
          <div className="shrink-0">
            <AlertIcon icon={XCircleIcon} className="shrink-0" />
          </div>
          <div className="ml-3">
            <AlertDescription className="font-medium">
              {formState.message}
            </AlertDescription>
          </div>
        </Alert>
      )}

      <Form {...form}>
        <form action={formAction} onSubmit={handleSubmit}>
          <div className="space-y-6 sm:grid sm:gap-x-5 sm:gap-y-6 sm:space-y-0">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="sm:col-span-1">
                  <FormLabel>First name</FormLabel>
                  <FormControl serverError={formState?.errors?.firstName}>
                    <Input type="text" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage>{formState?.errors?.firstName}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="sm:col-span-1">
                  <FormLabel>Last name</FormLabel>
                  <FormControl serverError={formState?.errors?.lastName}>
                    <Input type="text" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage>{formState?.errors?.lastName}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl serverError={formState?.errors?.email}>
                    <Input type="email" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage>{formState?.errors?.email}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl serverError={formState?.errors?.password}>
                    <PasswordInput disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage>{formState?.errors?.password}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl serverError={formState?.errors?.confirmPassword}>
                    <PasswordInput disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage>
                    {formState?.errors?.confirmPassword}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="mt-8">
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending && <Spinner className="mr-2" aria-hidden="true" />}
              {isPending ? "Creating account" : "Create account"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
