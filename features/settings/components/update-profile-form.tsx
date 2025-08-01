'use client';

import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { redirectToast } from '@/lib/actions';
import { useSession, type User } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/form/form';
import { FormField } from '@/components/form/form-field';
import { FormItem } from '@/components/form/form-item';
import { FormLabel } from '@/components/form/form-label';
import { FormControl } from '@/components/form/form-control';
import { FormMessage } from '@/components/form/form-message';
import { INITIAL_ACTION_STATE } from '@/components/form/utils/action-state-utils';
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback';
import { renderFormErrors } from '@/components/form/utils/render-form-errors';
import { errorToast, successToast } from '@/components/ui/sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  updateProfileSchema,
  type UpdateProfileValues,
} from '@/features/settings/schema/update-profile';
import { UpdateUserPhoto } from '@/features/settings/components/update-user-photo';
import { updateProfile } from '@/features/settings/actions/update-profile';

type UpdateProfileFormProps = {
  user: User;
};

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const { data: session, refetch } = useSession();
  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio ?? '',
    },
  });
  const [actionState, action, isPending] = useActionState(updateProfile, INITIAL_ACTION_STATE);

  useActionFeedback(actionState, {
    onSuccess: ({ message }) => {
      refetch();
      successToast(message);
    },
    onError: ({ message }) => {
      errorToast(message);
    },
    onFail: ({ fieldErrors }) => {
      renderFormErrors<UpdateProfileValues>(fieldErrors, form);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!session) return redirectToast('/sign-in', 'You need to sign in to continue');

    form.handleSubmit((data) => {
      startTransition(() => {
        const formData = new FormData();
        formData.set('firstName', data.firstName);
        formData.set('lastName', data.lastName);
        formData.set('bio', data.bio);
        action(formData);
      });
    })(e);
  }

  return (
    <div className="space-y-10">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-base font-bold text-gray-900">Profile</h2>
        <p className="mt-1 text-sm text-gray-600">Update your photo and personal details here</p>
      </div>
      <div className="space-y-8">
        <UpdateUserPhoto user={user} />
        <Form {...form}>
          <form action={action} onSubmit={handleSubmit}>
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="max-w-xs">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="max-w-xs">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea disabled={isPending} {...field} />
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
    </div>
  );
}
