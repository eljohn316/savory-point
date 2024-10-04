"use client";

import * as React from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { ArrowRightIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFormAction } from "@/hooks/use-form-action";
import { newPasswordSchema } from "@/lib/schema/new-password";
import { setNewPassword } from "@/lib/actions/auth";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertIcon } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TSchema = z.infer<typeof newPasswordSchema>;

export function NewPasswordForm() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const params = useParams<{ token: string }>();
  const form = useForm<TSchema>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" }
  });

  const { isPending, formState, formAction, onSubmit } = useFormAction(
    setNewPassword.bind(null, params.token),
    { errors: {} }
  );

  React.useEffect(() => {
    if (formState.success === false) {
      form.reset();
    }
  }, [formState, form]);

  function handleOnchange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) setShowPassword(true);
    else setShowPassword(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSubmit(() => {
      const formData = new FormData(e.currentTarget);
      form.handleSubmit(() => formAction(formData))(e);
    });
  }

  if (formState.success)
    return (
      <div className="flex flex-col items-center">
        <div className="flex size-8 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircleIcon className="size-6 text-emerald-800" />
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold">Password reset</h3>
          <p className="mt-1 text-sm text-gray-700">
            Your password has been successfully reset
          </p>
        </div>
        <div className="mt-6">
          <Link
            href="/sign-in"
            className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700">
            Continue to sign in
            <ArrowRightIcon className="ml-2 size-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          Reset your password
        </h2>
      </div>

      {!formState.success && formState.message && (
        <Alert variant="danger" className="flex">
          <div className="shrink-0">
            <AlertIcon icon={XCircleIcon} />
          </div>
          <div className="ml-3">
            <AlertDescription className="font-medium">
              {formState.message}
            </AlertDescription>
            <Link
              href="/forgot-password"
              className="mt-2 block text-sm font-medium text-red-800 underline underline-offset-2 hover:no-underline">
              Request new password reset link
            </Link>
          </div>
        </Alert>
      )}

      <Form {...form}>
        <form action={formAction} onSubmit={handleSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl serverError={formState.errors?.password}>
                  <Input
                    type={showPassword ? "text" : "password"}
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm new password</FormLabel>
                <FormControl serverError={formState.errors?.confirmPassword}>
                  <Input
                    type={showPassword ? "text" : "password"}
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="show-password"
                name="show-password"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                onChange={handleOnchange}
              />
              <Label htmlFor="show-password" className="ml-3">
                Show password
              </Label>
            </div>
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending && <Spinner className="mr-2" aria-hidden="true" />}
            {isPending ? "Resetting password" : "Reset password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
