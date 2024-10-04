"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFormAction } from "@/hooks/use-form-action";
import { forgotPasswordSchema } from "@/lib/schema/forgot-password";
import { resetPassword } from "@/lib/actions/auth";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertIcon } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

type TSchema = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const form = useForm<TSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" }
  });

  const { isPending, formState, formAction, onSubmit } = useFormAction(
    resetPassword,
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

  if (formState.success)
    return (
      <Alert variant="success" className="flex">
        <div className="shrink-0">
          <AlertIcon icon={CheckCircleIcon} />
        </div>
        <div className="ml-3">
          <AlertDescription className="font-medium">
            An email has been sent to you with a link to reset your password.
          </AlertDescription>
        </div>
      </Alert>
    );

  return (
    <div className="space-y-4">
      {!formState.success && formState.message && (
        <Alert variant="danger" className="flex">
          <div className="shrink-0">
            <AlertIcon icon={XCircleIcon} />
          </div>
          <div className="ml-3">
            <AlertDescription className="font-medium">
              {formState.message}
            </AlertDescription>
          </div>
        </Alert>
      )}

      <p className="text-sm text-gray-700">
        Enter your account&apos;s email address and we&apos;ll send you a link
        to reset your password.
      </p>

      <Form {...form}>
        <form action={formAction} onSubmit={handleSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl serverError={formState.errors?.email}>
                  <Input type="email" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending && <Spinner className="mr-2" aria-hidden="true" />}
            {isPending
              ? "Sending password reset link"
              : "Send password reset link"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
