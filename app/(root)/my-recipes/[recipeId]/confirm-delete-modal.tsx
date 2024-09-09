'use client';

import { useState, useTransition } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useFormState } from 'react-dom';
import { deleteRecipeAction } from './lib/action';
import { Spinner } from '@/components/ui/spinner';

export function ConfirmDeleteModal() {
  const params = useParams<{ recipeId: string }>();
  const [isDeleting, startTransition] = useTransition();
  const [open, setOpen] = useState<boolean>(false);
  const [state, action] = useFormState(
    deleteRecipeAction.bind(null, params.recipeId),
    { messsage: '' }
  );

  function handleClick() {
    startTransition(() => {
      action();
    });
  }

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Delete recipe
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="mb-6 space-y-3">
          <h3 className="text-center text-gray-700 font-semibold">
            Are you sure you want to delete this recipe?
          </h3>
          <p className="text-gray-500 text-sm">
            This will delete this recipe permanently. You cannot undo this
            action.
          </p>
        </div>
        <div className="flex gap-x-4 justify-end">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}>
            Cancel
          </Button>

          <Button variant="danger" onClick={handleClick} disabled={isDeleting}>
            {isDeleting ? 'Deleting' : 'Delete'}
            {isDeleting && <Spinner className="ml-2 size-4" />}
          </Button>
        </div>
      </Modal>
    </>
  );
}
