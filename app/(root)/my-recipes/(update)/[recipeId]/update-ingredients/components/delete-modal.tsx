'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Spinner } from '@/components/ui/spinner';
import { Prisma } from '@prisma/client';
import { deleteIngredient } from '../lib/actions';

type Ingredient = Prisma.IngredientGetPayload<{
  select: {
    id: true;
    ingredient: true;
    recipeId: true;
  };
}>;

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  ingredient: Ingredient | null;
}

export function DeleteModal({ open, onClose, ingredient }: DeleteModalProps) {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleClick() {
    try {
      setLoading(true);

      await deleteIngredient(ingredient!.id);

      onClose();
      setLoading(false);
    } catch (error) {
      onClose();
      setLoading(false);
    }
  }
  return (
    <Modal open={open} onClose={onClose}>
      <div className="mb-6 space-y-3">
        <h3 className="text-center text-gray-700 font-semibold">
          Are you sure you want to delete this ingredient?
        </h3>
        <p className="text-gray-500 text-sm">
          This will delete this ingredient permanently. You cannot undo this
          action.
        </p>
      </div>
      <div className="flex gap-x-4 justify-end">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleClick} disabled={loading}>
          {loading ? 'Deleting' : 'Delete'}
          {loading && <Spinner className="ml-2 size-4" />}
        </Button>
      </div>
    </Modal>
  );
}
