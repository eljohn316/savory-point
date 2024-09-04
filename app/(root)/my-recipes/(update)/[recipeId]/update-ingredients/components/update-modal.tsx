'use client';

import React, { useState } from 'react';
import { Prisma } from '@prisma/client';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Modal, ModalTitle } from '@/components/ui/modal';
import { Spinner } from '@/components/ui/spinner';
import { updateIngredient } from '../lib/actions';

type Ingredient = Prisma.IngredientGetPayload<{
  select: {
    id: true;
    ingredient: true;
    recipeId: true;
  };
}>;

interface UpdateModalProps {
  open: boolean;
  onClose: () => void;
  ingredient: Ingredient | null;
}

export function UpdateModal({ open, onClose, ingredient }: UpdateModalProps) {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setLoading(true);

      const data = new FormData(e.currentTarget);
      await updateIngredient(ingredient!.id, data);

      onClose();
      setLoading(false);
    } catch (error) {
      onClose();
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-between mb-6">
        <ModalTitle as="h3" className="text-base font-semibold text-gray-900">
          Update ingredient
        </ModalTitle>
        <button
          type="button"
          className="-m-1 p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          onClick={onClose}>
          <span className="sr-only">Close</span>
          <XMarkIcon className="size-5" aria-hidden="true" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          id="ingredient"
          name="ingredient"
          defaultValue={ingredient?.ingredient}
          disabled={loading}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Updating ingredient' : 'Update ingredient'}
          {loading && <Spinner className="ml-2 size-4" />}
        </Button>
      </form>
    </Modal>
  );
}
