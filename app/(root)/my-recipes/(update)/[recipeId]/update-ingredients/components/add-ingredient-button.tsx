'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Modal, ModalTitle } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { addIngredient } from '../lib/actions';

export function AddIngredientButton() {
  const params = useParams<{ recipeId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setLoading(true);

      const data = new FormData(e.currentTarget);
      await addIngredient(params.recipeId, data);

      setOpen(false);
      setLoading(false);
    } catch (error) {
      setOpen(false);
      setLoading(false);
    }
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Add
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex items-center justify-between mb-6">
          <ModalTitle as="h3" className="text-base font-semibold text-gray-900">
            Add ingredient
          </ModalTitle>
          <button
            type="button"
            className="-m-1 p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            onClick={() => setOpen(false)}>
            <span className="sr-only">Close</span>
            <XMarkIcon className="size-5" aria-hidden="true" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input type="text" id="ingredient" name="ingredient" required />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Adding ingredient' : 'Add ingredient'}
            {loading && <Spinner className="ml-2 size-4" />}
          </Button>
        </form>
      </Modal>
    </>
  );
}
