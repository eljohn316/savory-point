'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { z } from 'zod';
import { useParams } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';

import { recipeClientSchema } from '@/lib/schema/upload-recipe';
import {
  addIngredients,
  deleteIngredient,
  updateIngredient
} from '@/lib/actions/ingredients';
import { useToast } from '@/hooks/use-toast';
import { useFormAction } from '@/hooks/use-form-action';

import { Modal, ModalCloseButton, ModalTitle } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import { FieldArrayInputWrapper } from '@/components/field-array-input-wrapper';
import { FieldArrayInput } from '@/components/field-array-input';
import { Input } from '@/components/ui/input';

interface RecipeIngredientsProps {
  ingredients: {
    id: number;
    ingredient: string;
  }[];
}

const schema = recipeClientSchema.pick({ ingredients: true });

export function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  return (
    <>
      <div className="mb-10 flex items-center justify-between border-b border-gray-300 pb-6">
        <h3 className="font-semibold text-gray-900">Ingredients</h3>
        <AddIngredientModal />
      </div>
      <IngredientsList ingredients={ingredients} />
    </>
  );
}

interface IngredientsListProps {
  ingredients: {
    id: number;
    ingredient: string;
  }[];
}

function IngredientsList({ ingredients }: IngredientsListProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  function handleShowEditModal(id: number) {
    setSelectedId(id);
    setShowEditModal(true);
  }

  function handleCloseEditModal() {
    setShowEditModal(false);
    setSelectedId(null);
  }

  function handleShowDeleteModal(id: number) {
    setSelectedId(id);
    setShowDeleteModal(true);
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false);
    setSelectedId(null);
  }

  return (
    <>
      <EditIngredientModal
        open={showEditModal}
        onClose={handleCloseEditModal}
        ingredient={ingredients.find(({ id }) => id === selectedId!)}
      />

      <DeleteIngredientModal
        open={showDeleteModal}
        onClose={handleCloseDeleteModal}
        ingredient={ingredients.find(({ id }) => id === selectedId!)}
      />

      <div className="divide-y divide-gray-200">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="flex items-center gap-x-6 py-4 first:pt-0 last:pb-0">
            <div className="flex-auto">
              <p className="text-sm text-gray-700">{ingredient.ingredient}</p>
            </div>
            <div className="flex-none space-x-4">
              <button
                type="button"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                onClick={() => handleShowEditModal(ingredient.id)}>
                Edit
              </button>
              <button
                type="button"
                className="text-sm font-medium text-red-600 hover:text-red-700"
                onClick={() => handleShowDeleteModal(ingredient.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

interface EditIngredientModalProps {
  open: boolean;
  onClose: () => void;
  ingredient?: {
    id: number;
    ingredient: string;
  };
}

function EditIngredientModal({
  open,
  onClose,
  ingredient
}: EditIngredientModalProps) {
  const params = useParams<{ id: string }>();
  const { isPending, formAction, onSubmit } = useFormAction(
    updateIngredient,
    {}
  );

  const getCookie = useCallback((name: string) => Cookies.get(name), []);

  const toastMessage = getCookie('toast-message');

  useEffect(() => {
    if (!toastMessage) return;
    onClose();
  }, [toastMessage, onClose]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSubmit(() => {
      formAction(new FormData(e.currentTarget));
    });
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalTitle as="h3" className="font-semibold text-gray-700">
        Edit ingredient
      </ModalTitle>
      <form action={formAction} onSubmit={handleSubmit}>
        <div className="mt-6">
          <Input type="hidden" name="recipe-id" defaultValue={params.id} />
          <Input
            type="hidden"
            name="ingredient-id"
            defaultValue={ingredient?.id}
          />
          <Input
            type="text"
            name="ingredient"
            defaultValue={ingredient?.ingredient}
            disabled={isPending}
            required
          />
        </div>
        <div className="mt-8 space-y-3 sm:flex sm:flex-row-reverse sm:space-y-0">
          <Button
            variant="primary"
            type="submit"
            disabled={isPending}
            className="w-full sm:ml-4 sm:w-auto">
            {isPending && <Spinner className="mr-2 size-4" />}
            {isPending ? 'Updating' : 'Update'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

interface DeleteIngredientModalProps {
  open: boolean;
  onClose: () => void;
  ingredient?: {
    id: number;
    ingredient: string;
  };
}

function DeleteIngredientModal({
  open,
  onClose,
  ingredient
}: DeleteIngredientModalProps) {
  const params = useParams<{ id: string }>();
  const { isPending, formAction, onSubmit } = useFormAction(
    deleteIngredient,
    {}
  );

  const getCookie = useCallback((name: string) => Cookies.get(name), []);

  const toastMessage = getCookie('toast-message');

  useEffect(() => {
    if (!toastMessage) return;
    onClose();
  }, [toastMessage, onClose]);

  function handleDeleteRecipe() {
    if (!ingredient) return;

    const formData = new FormData();

    formData.set('ingredient-id', `${ingredient.id}`);
    formData.set('recipe-id', params.id);

    onSubmit(() => {
      formAction(formData);
    });
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalTitle as="h3" className="font-semibold text-gray-700">
        Delete ingredient
      </ModalTitle>

      <div className="mt-4">
        <p className="text-sm text-gray-700">
          Are you sure you want to delete this ingredient?
        </p>
      </div>

      <div className="mt-8 space-y-3 sm:flex sm:flex-row-reverse sm:space-y-0">
        <Button
          variant="danger"
          onClick={handleDeleteRecipe}
          className="w-full sm:ml-4 sm:w-auto"
          disabled={isPending}>
          {isPending && <Spinner className="mr-2 size-4" />}
          {isPending ? 'Deleting' : 'Delete'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onClose()}
          className="w-full sm:w-auto"
          disabled={isPending}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}

type TSchema = z.infer<typeof schema>;

function AddIngredientModal() {
  const [show, setShow] = useState<boolean>(false);
  const params = useParams<{ id: string }>();

  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: { ingredients: [{ ingredient: '' }] }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients'
  });
  const { toast } = useToast();
  const { isPending, formAction, formState, onSubmit } = useFormAction(
    addIngredients.bind(null, params.id),
    {}
  );

  useEffect(() => {
    if (formState.success) {
      setShow(false);
      setTimeout(() => form.reset({ ingredients: [{ ingredient: '' }] }), 500);
      toast({ title: formState.message });
    }
  }, [toast, formState, form]);

  function handleOpen() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSubmit(() => {
      const formData = new FormData();

      form.handleSubmit((data) => {
        formData.set('ingredients', JSON.stringify(data.ingredients));
        formAction(formData);
      })(e);
    });
  }

  return (
    <>
      <Button variant="primary" onClick={handleOpen}>
        Add
      </Button>
      <Modal open={show} onClose={handleClose}>
        <div className="flex items-center justify-between">
          <ModalTitle as="h3" className="font-semibold text-gray-700">
            Add ingredient
          </ModalTitle>
          <ModalCloseButton className="-m-1 rounded-md p-1 text-gray-400 hover:text-gray-500">
            <XMarkIcon className="size-5" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </ModalCloseButton>
        </div>
        <Form {...form}>
          <form action={formAction} onSubmit={handleSubmit}>
            <div className="my-6">
              <FieldArrayInputWrapper
                onAddField={() => append({ ingredient: '' })}>
                <div className="space-y-8">
                  {fields.map((field, index) => (
                    <FormField
                      key={field.id}
                      name={`ingredients.${index}.ingredient` as const}
                      render={({ field: input }) => (
                        <FormItem>
                          <FormLabel className="sr-only">Ingredient</FormLabel>
                          <FormControl>
                            <FieldArrayInput
                              type="text"
                              disabled={isPending}
                              onRemove={() => remove(index)}
                              {...input}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </FieldArrayInputWrapper>
            </div>
            <div className="mt-8">
              <Button variant="primary" className="w-full" disabled={isPending}>
                {isPending && <Spinner className="mr-2 size-4" />}
                {isPending ? 'Adding ingredients' : 'Add ingredients'}
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </>
  );
}
