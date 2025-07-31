'use client';

import { useForm } from 'react-hook-form';
import { type User } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/form/form';
import { FormField } from '@/components/form/form-field';
import { FormItem } from '@/components/form/form-item';
import { FormLabel } from '@/components/form/form-label';
import { FormControl } from '@/components/form/form-control';
import { Input } from '@/components/ui/input';
import { FormMessage } from '@/components/form/form-message';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { updateProfile, type UpdateProfileValues } from '@/features/settings/schema/update-profile';
import { UpdateUserPhoto } from '@/features/settings/components/update-user-photo';

type UpdateProfileFormProps = {
  user: User;
};

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfile),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio ?? '',
    },
  });

  function handleUpdate(values: UpdateProfileValues) {
    console.log(values);
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
          <form onSubmit={form.handleSubmit(handleUpdate)}>
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="max-w-xs">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Textarea {...field} />
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
    </div>
  );
}
