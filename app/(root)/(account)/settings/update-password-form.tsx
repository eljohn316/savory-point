'use client';

import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useFormAction } from '@/hooks/use-form-action';
import { useToast } from '@/hooks/use-toast';
import { passwordSchema } from '@/lib/schema/update-password';
import { updatePassword } from '@/lib/actions/settings';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertIcon } from '@/components/ui/alert';
import { XCircleIcon } from '@heroicons/react/20/solid';

type TSchema = z.infer<typeof passwordSchema>;

export function UpdatePasswordForm() {
  const form = useForm<TSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  });

  const { toast } = useToast();
  const { isPending, formState, formAction, onSubmit } = useFormAction(
    updatePassword,
    {}
  );

  React.useEffect(() => {
    if (formState.success) {
      toast({
        variant: 'success',
        title: formState.message
      });
    }

    form.reset();
  }, [formState, form, toast]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSubmit(() => {
      const formData = new FormData(e.currentTarget);
      form.handleSubmit(() => formAction(formData))(e);
    });
  }

  return (
    <Form {...form}>
      <form action={formAction} onSubmit={handleSubmit}>
        <div className="space-y-6">
          {formState.success === false && formState.message && (
            <Alert variant="danger" className="flex gap-x-2">
              <AlertIcon icon={XCircleIcon} />
              <AlertDescription>{formState.message}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current password</FormLabel>
                <FormControl serverError={formState.errors?.currentPassword}>
                  <PasswordInput disabled={isPending} {...field} />
                </FormControl>
                <FormMessage>{formState.errors?.currentPassword}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl serverError={formState.errors?.newPassword}>
                  <PasswordInput disabled={isPending} {...field} />
                </FormControl>
                <FormMessage>{formState.errors?.newPassword}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm new password</FormLabel>
                <FormControl serverError={formState.errors?.confirmNewPassword}>
                  <PasswordInput disabled={isPending} {...field} />
                </FormControl>
                <FormMessage>
                  {formState.errors?.confirmNewPassword}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-10">
          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner className="mr-2" aria-hidden="true" />}
            {isPending ? 'Updating' : 'Update'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
