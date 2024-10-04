'use client';

import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ExclamationTriangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/20/solid';

import { useToast } from '@/hooks/use-toast';
import { useFormAction } from '@/hooks/use-form-action';
import { passwordSchema } from '@/lib/schema/password';
import { deleteAccount } from '@/lib/actions/settings';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Modal, ModalCloseButton, ModalTitle } from '@/components/ui/modal';
import { PasswordInput } from '@/components/ui/password-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';

type TSchema = z.infer<typeof passwordSchema>;

export function DeleteAccountModal() {
  const [open, setShow] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const { isPending, formAction, formState, onSubmit } = useFormAction(
    deleteAccount,
    {}
  );

  const form = useForm<TSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '' }
  });

  React.useEffect(() => {
    if (formState.success) {
      router.replace('/');
      toast({
        variant: 'success',
        title: formState.message
      });
    }

    form.reset();
  }, [formState, form, router, toast]);

  function handleClick() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
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
      <Alert variant="danger" className="flex border-red-400">
        <div className="flex-none">
          <AlertIcon icon={ExclamationTriangleIcon} />
        </div>
        <div className="ml-3 space-y-1">
          <AlertTitle className="font-semibold">
            Warning! This action cannot be undone.
          </AlertTitle>
          <AlertDescription>
            Deleting your account is permanent and cannot be undone. All your
            data, including profile information and recipe uploads, will be
            lost.
          </AlertDescription>
        </div>
      </Alert>

      <div className="mt-8">
        <Button variant="danger" onClick={handleClick}>
          Delete my account
        </Button>

        <Modal open={open} onClose={handleClose} className="relative">
          <ModalCloseButton className="absolute right-6 top-6 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2">
            <XMarkIcon className="size-5" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </ModalCloseButton>

          <ModalTitle
            as="h3"
            className="mb-5 text-base font-semibold text-gray-700">
            Confirm account deletion
          </ModalTitle>

          {formState.success === false && formState.message && (
            <Alert variant="danger" className="mb-6 flex gap-x-2">
              <AlertIcon icon={XCircleIcon} />
              <AlertDescription>{formState.message}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form
              action={formAction}
              onSubmit={handleSubmit}
              className="space-y-6">
              <p className="text-sm text-gray-700">
                To delete your account, you must enter your password
              </p>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Password</FormLabel>
                    <FormControl>
                      <PasswordInput disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="danger" disabled={isPending} className="w-full">
                {isPending && <Spinner className="mr-2" aria-hidden="true" />}
                {isPending ? 'Deleting account' : 'Delete account'}
              </Button>
            </form>
          </Form>
        </Modal>
      </div>
    </>
  );
}
