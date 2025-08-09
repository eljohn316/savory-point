'use client';

import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from '@/lib/auth-client';
import { Form } from '@/components/form/form';
import { FormField } from '@/components/form/form-field';
import { FormItem } from '@/components/form/form-item';
import { FormLabel } from '@/components/form/form-label';
import { FormControl } from '@/components/form/form-control';
import { FormMessage } from '@/components/form/form-message';
import { INITIAL_ACTION_STATE } from '@/components/form/utils/action-state-utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { errorToast, successToast } from '@/components/ui/sonner';
import { updateEmailSchema, type UpdateEmailValues } from '@/features/settings/schema/update-email';
import { updateEmail } from '@/features/settings/actions/update-email';
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback';
import { useAuthRedirect } from '@/features/auth/hooks/use-auth-redirect';

type UpdateEmailFormProps = {
  email: string;
};

export function UpdateEmailForm({ email }: UpdateEmailFormProps) {
  const authRedirect = useAuthRedirect();
  const form = useForm<UpdateEmailValues>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email,
    },
  });
  const { data: session } = useSession();
  const [actionState, action, isPending] = useActionState(updateEmail, INITIAL_ACTION_STATE);

  useActionFeedback(actionState, {
    onSuccess: ({ message }) => {
      successToast(message);
    },
    onError: ({ message }) => {
      errorToast(message);
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!session) return await authRedirect();

    form.handleSubmit((data) => {
      startTransition(() => {
        const formData = new FormData();
        formData.set('email', data.email);
        action(formData);
      });
    })(e);
  }

  return (
    <div className="space-y-10">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-base font-bold text-gray-900">Email</h2>
        <p className="mt-1 text-sm text-gray-600">Always choose an active email.</p>
      </div>
      <Form {...form}>
        <form action={action} onSubmit={handleSubmit}>
          <div className="max-w-sm space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving changes...' : 'Save changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
