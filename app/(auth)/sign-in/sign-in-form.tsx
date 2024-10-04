"use client";

import * as React from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFormAction } from "@/hooks/use-form-action";
import { signInSchema } from "@/lib/schema/sign-in";
import { signIn } from "@/lib/actions/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertIcon } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";

type TSchema = z.infer<typeof signInSchema>;

export function SigninForm() {
  const form = useForm<TSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" }
  });

  const { isPending, formAction, formState, onSubmit } = useFormAction(signIn, {
    errors: {}
  });

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
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl serverError={formState?.errors?.password}>
                    <PasswordInput disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage>{formState?.errors?.password}</FormMessage>
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
          </div>

          <div className="mt-8">
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending && <Spinner className="mr-2" aria-hidden="true" />}
              {isPending ? "Signing in" : "Sign in"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
