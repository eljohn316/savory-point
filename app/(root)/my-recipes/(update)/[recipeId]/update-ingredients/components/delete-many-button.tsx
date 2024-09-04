'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { deleteMultipleIngredients } from '../lib/actions';
import { Spinner } from '@/components/ui/spinner';

interface DeleteManyButtonProps {
  ids: number[];
  reset: () => void;
}

export function DeleteManyButton({ ids, reset }: DeleteManyButtonProps) {
  const params = useParams<{ recipeId: string }>();

  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  async function handleClick() {
    try {
      setLoading(true);

      await deleteMultipleIngredients(params.recipeId, ids);

      setOpen(false);
      setLoading(false);
      reset();
    } catch (error) {
      setOpen(false);
      setLoading(false);
    }
  }

  if (ids.length === 0) return null;

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        <span>Delete</span>
        <span className="ml-1 font-semibold">({ids.length})</span>
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="mb-6 space-y-3">
          <h3 className="text-center text-gray-700 font-semibold">
            Are you sure you want to delete these ingredients?
          </h3>
          <p className="text-gray-500 text-sm">
            This will delete these ingredients permanently. You cannot undo this
            action.
          </p>
        </div>
        <div className="flex gap-x-4 justify-end">
          <Button variant="outline" onClick={() => reset()} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleClick} disabled={loading}>
            {loading ? 'Deleting' : 'Delete'}
            {loading && <Spinner className="ml-2 size-4" />}
          </Button>
        </div>
      </Modal>
    </>
  );
}
