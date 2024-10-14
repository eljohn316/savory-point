'use client';

import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Modal, ModalTitle } from '@/components/ui/modal';
import { Spinner } from '@/components/ui/spinner';
import { useFormAction } from '@/hooks/use-form-action';
import { deleteRecipe } from '@/lib/actions/recipe';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export function DeleteSection() {
  const params = useParams<{ id: string }>();
  const [open, setOpen] = useState<boolean>(false);
  const { isPending, formAction, onSubmit } = useFormAction(
    deleteRecipe.bind(null, params.id),
    {}
  );

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDelete() {
    onSubmit(() => {
      formAction(new FormData());
    });
  }

  return (
    <>
      <Modal open={open} onClose={handleClose} className="py-5">
        <div className="space-y-4">
          <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-red-100">
            <ExclamationTriangleIcon
              className="size-5 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="text-center sm:ml-4 sm:mt-0">
            <ModalTitle
              as="h3"
              className="text-lg font-bold leading-6 text-gray-900">
              Confirm delete
            </ModalTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-700">
                Are you sure you want to delete this recipe? This action cannot
                be undone
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-x-4">
          <Button variant="outline" disabled={isPending} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" disabled={isPending} onClick={handleDelete}>
            {isPending && <Spinner className="mr-2" aria-hidden="true" />}
            {isPending ? 'Deleting' : 'Delete'}
          </Button>
        </div>
      </Modal>

      <div>
        <Alert variant="danger" className="flex">
          <div className="flex-none">
            <AlertIcon icon={ExclamationCircleIcon} className="shrink-0" />
          </div>
          <div className="ml-4">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              This action will delete this recipe from our servers. This action
              cannot be undone
            </AlertDescription>
          </div>
        </Alert>
        <div className="mt-8">
          <Button variant="danger" onClick={handleOpen}>
            Delete recipe
          </Button>
        </div>
      </div>
    </>
  );
}
