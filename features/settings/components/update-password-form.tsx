'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/form/form';
import { FormField } from '@/components/form/form-field';
import { FormItem } from '@/components/form/form-item';
import { FormLabel } from '@/components/form/form-label';
import { FormControl } from '@/components/form/form-control';
import { FormMessage } from '@/components/form/form-message';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import {
  updatePasswordSchema,
  type UpdatePasswordValues,
} from '@/features/settings/schema/update-password';

export function UpdatePasswordForm() {
  const form = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  function handleUpdatePassword(values: UpdatePasswordValues) {
    console.log(values);
  }

  return (
    <div className="space-y-10">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-base font-bold text-gray-900">Password</h2>
        <p className="mt-1 text-sm text-gray-600">
          Please enter your current password to change your password.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdatePassword)}>
          <div className="max-w-sm space-y-8">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
