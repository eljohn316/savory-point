'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  EllipsisVerticalIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

import { useFormAction } from '@/hooks/use-form-action';
import { deleteRecipe } from '@/lib/actions/recipe';

import { Button } from '@/components/ui/button';
import { Menu, MenuItem, MenuItems, MenuButton } from '@/components/ui/menu';
import { Modal, ModalTitle } from '@/components/ui/modal';
import { Spinner } from '@/components/ui/spinner';

export function RecipeActions() {
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

      <div className="hidden flex-none sm:ml-4 sm:flex sm:gap-x-3">
        <Button variant="outline" asChild>
          <Link href={`/account/recipe/${params.id}/update`}>Update</Link>
        </Button>
        <Button variant="danger" onClick={handleOpen}>
          Delete
        </Button>
      </div>
      <Menu as="div" className="flex flex-none items-center sm:hidden">
        <MenuButton className="-m-1 rounded-md p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2">
          <EllipsisVerticalIcon className="size-6" aria-hidden="true" />
          <span className="sr-only">Toggle options</span>
        </MenuButton>
        <MenuItems className="py-1">
          <MenuItem>
            <Link
              href={`/account/recipe/${params.id}/update`}
              className="block px-4 py-2 text-sm font-medium text-gray-500 data-[focus]:bg-gray-100 data-[focus]:text-gray-700">
              Update
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm font-medium text-gray-500 data-[focus]:bg-gray-100 data-[focus]:text-gray-700"
              onClick={handleOpen}>
              Delete
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  );
}
