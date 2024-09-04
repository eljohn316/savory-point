'use client';

import { Prisma } from '@prisma/client';
import { EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import {
  Dropdown,
  DropdownItem,
  DropdownItems,
  DropdownTrigger
} from '@/components/ui/dropdown';
import React, { useRef, useState } from 'react';
import { AddIngredientButton } from './components/add-ingredient-button';
import { DeleteManyButton } from './components/delete-many-button';
import { Modal, ModalTitle } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { UpdateModal } from './components/update-modal';
import { DeleteModal } from './components/delete-modal';

type Ingredient = Prisma.IngredientGetPayload<{
  select: {
    id: true;
    ingredient: true;
    recipeId: true;
  };
}>;

interface IngredientsListProps {
  ingredients: Ingredient[];
}

export function IngredientsList({ ingredients }: IngredientsListProps) {
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    if (e.target.checked) {
      const ids = [...selectedIds, id];
      setSelectedIds(ids);
    } else {
      const ids = selectedIds.filter((item) => item !== id);
      setSelectedIds(ids);
    }
  }

  function handleShowUpdateModal(id: number) {
    const ingredient = ingredients.find((ing) => ing.id === id);

    setShowUpdateModal(true);
    setSelectedIngredient(ingredient ?? null);
  }

  function handleShowDeleteModal(id: number) {
    const ingredient = ingredients.find((ing) => ing.id === id);

    setShowDeleteModal(true);
    setSelectedIngredient(ingredient ?? null);
  }

  return (
    <>
      <UpdateModal
        open={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        ingredient={selectedIngredient}
      />

      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        ingredient={selectedIngredient}
      />

      <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Ingredients
        </h3>
        <div className="flex gap-x-3">
          <DeleteManyButton
            ids={selectedIds}
            reset={() => setSelectedIds([])}
          />
          <AddIngredientButton />
        </div>
      </div>

      <div className="mt-6">
        <div className="divide-y divide-gray-200">
          {ingredients.map(({ id, ingredient }) => (
            <div
              key={id}
              className="py-4 flex items-start gap-x-4 sm:gap-x-8 first:pt-0 last:pb-0">
              <div className="shrink-0">
                <input
                  type="checkbox"
                  className="-mt-1.5 size-4 rounded border-gray-400 text-emerald-600 focus:ring-emerald-600"
                  onChange={(e) => handleChange(e, id)}
                  checked={selectedIds.includes(id)}
                />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-900">{ingredient}</div>
              </div>
              <div className="shrink-0">
                <div className="hidden sm:block sm:divide-x sm:divide-gray-300">
                  <button
                    type="button"
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-600/90 pr-4"
                    onClick={() => handleShowUpdateModal(id)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-sm font-medium text-red-600 hover:text-red-600/90 pl-4"
                    onClick={() => handleShowDeleteModal(id)}>
                    Delete
                  </button>
                </div>
                <Dropdown as="div" className="relative sm:hidden">
                  <DropdownTrigger className="p-1 -m-1 inset-0 inline-flex items-center text-gray-400 rounded-full bg-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600">
                    <span className="sr-only">Open user menu</span>
                    <EllipsisVerticalIcon className="size-5" />
                  </DropdownTrigger>
                  <DropdownItems>
                    <DropdownItem>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        onClick={() => handleShowUpdateModal(id)}>
                        Edit
                      </button>
                    </DropdownItem>
                    <DropdownItem>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        onClick={() => handleShowDeleteModal(id)}>
                        Delete
                      </button>
                    </DropdownItem>
                  </DropdownItems>
                </Dropdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
