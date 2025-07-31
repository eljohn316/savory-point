'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/form/form';
import { FormField } from '@/components/form/form-field';
import { FormItem } from '@/components/form/form-item';
import { FormLabel } from '@/components/form/form-label';
import { FormControl } from '@/components/form/form-control';
import { FormMessage } from '@/components/form/form-message';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateEmailSchema, type UpdateEmailValues } from '@/features/settings/schema/update-email';

type UpdateEmailFormProps = {
  email: string;
};

export function UpdateEmailForm({ email }: UpdateEmailFormProps) {
  const form = useForm<UpdateEmailValues>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email,
    },
  });

  function handleUpdateEmail({ email }: UpdateEmailValues) {
    console.log(email);
  }

  return (
    <div className="space-y-10">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-base font-bold text-gray-900">Email</h2>
        <p className="mt-1 text-sm text-gray-600">Always choose an active email.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdateEmail)}>
          <div className="max-w-sm space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
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
