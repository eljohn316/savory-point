'use client';

import * as React from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { User } from 'lucia';
import { useForm } from 'react-hook-form';
import {
  XMarkIcon,
  CameraIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';

import { useFormAction } from '@/hooks/use-form-action';
import { useToast } from '@/hooks/use-toast';
import {
  removeUserImage,
  updateUserImage,
  updateUserProfile
} from '@/lib/actions/user';
import { profileSchema, userImageClientSchema } from '@/lib/schema/profile';

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Modal, ModalCloseButton, ModalTitle } from '@/components/ui/modal';

type TSchema = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const { toast } = useToast();

  const form = useForm<TSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
  });

  const { isPending, formState, formAction, onSubmit } = useFormAction(
    updateUserProfile,
    { errors: {} }
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSubmit(() => {
      const formData = new FormData(e.currentTarget);
      form.handleSubmit(() => formAction(formData))(e);
    });
  }

  React.useEffect(() => {
    if (formState.success) {
      toast({
        variant: 'success',
        title: formState.message
      });
    }

    if (formState.success === false) {
      toast({
        variant: 'danger',
        title: 'Uh oh! Something went wrong',
        description: formState.message
      });
    }
  }, [toast, formState]);

  return (
    <div className="space-y-8 divide-y divide-gray-300">
      <div className="flex items-center">
        <Image
          src={user.image ? user.image : user.defaultImage}
          alt="User image profile"
          height={60}
          width={60}
          className="size-14 rounded-full"
        />
        <div className="ml-auto space-x-4">
          <UpdateImageFormModal user={user} />
          <RemoveImageModal />
        </div>
      </div>
      <div className="pt-8">
        <Form {...form}>
          <form action={formAction} onSubmit={handleSubmit}>
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl serverError={formState.errors?.firstName}>
                      <Input type="text" disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage>{formState.errors?.firstName}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl serverError={formState.errors?.lastName}>
                      <Input type="text" disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage>{formState.errors?.lastName}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl serverError={formState.errors?.email}>
                      <Input type="text" disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage>{formState.errors?.email}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-12">
              <Button type="submit" disabled={isPending}>
                {isPending && <Spinner className="mr-2" aria-hidden="true" />}
                {isPending ? 'Saving' : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

type TUserImageClientSchema = z.infer<typeof userImageClientSchema>;

interface UpdateImageFormModalProps {
  user: User;
}

function UpdateImageFormModal({ user }: UpdateImageFormModalProps) {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const { toast } = useToast();
  const { isPending, formAction, formState, onSubmit } = useFormAction(
    updateUserImage,
    { errors: {} }
  );

  const form = useForm<TUserImageClientSchema>({
    resolver: zodResolver(userImageClientSchema)
  });

  const field = form.register('image', {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      const file = files?.item(0);

      if (!file) return;

      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.addEventListener('load', () => {
        setPreview(fileReader.result as string);
      });
    }
  });

  React.useEffect(() => {
    if (formState.success) {
      setOpen(false);
      setTimeout(() => setPreview(null), 500);

      toast({
        variant: 'success',
        title: formState.message
      });

      form.reset();
    }

    if (formState.success === false) {
      toast({
        variant: 'danger',
        title: 'Uh oh! Something went wrong',
        description: formState.message
      });
    }
  }, [formState, form, toast]);

  function handleClose() {
    setOpen(false);
    setTimeout(() => setPreview(null), 500);

    form.reset();
  }

  function handleClick() {
    setOpen(true);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSubmit(() => {
      const formData = new FormData(e.currentTarget);
      form.handleSubmit(() => formAction(formData))(e);
    });
  }

  return (
    <>
      <Button variant="outline" onClick={handleClick}>
        Change
      </Button>

      <Modal open={open} onClose={handleClose} className="relative max-w-sm">
        <div className="absolute right-4 top-4">
          <ModalCloseButton className="-m-1 rounded-md p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2">
            <span className="sr-only">Close image form</span>
            <XMarkIcon className="size-5" aria-hidden="true" />
          </ModalCloseButton>
        </div>

        <Form {...form}>
          <form
            action={formAction}
            onSubmit={handleSubmit}
            className="space-y-8">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-6">
                <Image
                  src={
                    preview
                      ? preview
                      : user.image
                        ? user.image
                        : user.defaultImage
                  }
                  alt="User profile photo"
                  height={60}
                  width={60}
                  className="size-20 rounded-full"
                />
              </div>

              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <Button
                      variant="outline"
                      asChild
                      className="cursor-pointer gap-x-2 focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2">
                      <FormLabel>
                        <CameraIcon className="size-5" aria-hidden="true" />
                        Choose new photo
                        <FormControl>
                          <input type="file" className="sr-only" {...field} />
                        </FormControl>
                      </FormLabel>
                    </Button>
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isPending || !preview}
              className="w-full">
              {isPending && <Spinner className="mr-2" aria-hidden="true" />}
              {isPending ? 'Updating profile photo' : 'Update profile photo'}
            </Button>
          </form>
        </Form>
      </Modal>
    </>
  );
}

function RemoveImageModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  const { toast } = useToast();
  const { isPending, formAction, formState, onSubmit } = useFormAction(
    removeUserImage,
    {}
  );

  React.useEffect(() => {
    if (formState.success) {
      setOpen(false);

      toast({
        variant: 'success',
        title: formState.message
      });
    }

    if (formState.success === false) {
      toast({
        variant: 'danger',
        title: 'Uh oh! Something went wrong',
        description: formState.message
      });
    }
  }, [formState, toast]);

  function handleRemove() {
    onSubmit(() => {
      formAction(new FormData());
    });
  }

  function handleClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Button variant="ghost" onClick={handleClick}>
        Remove
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
            <ExclamationTriangleIcon
              className="size-5 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <ModalTitle
              as="h3"
              className="text-base font-semibold leading-6 text-gray-900">
              Remove profile photo
            </ModalTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-700">
                Are you sure you want to remove your profile photo?
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-x-4 sm:flex-row-reverse sm:justify-start">
          <Button variant="danger" disabled={isPending} onClick={handleRemove}>
            {isPending && <Spinner className="mr-2" aria-hidden="true" />}
            {isPending ? 'Removing' : 'Remove'}
          </Button>
          <Button variant="ghost" disabled={isPending} onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
