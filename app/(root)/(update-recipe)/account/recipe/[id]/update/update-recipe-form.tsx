'use client';

import { FieldArrayInput } from '@/app/(root)/(recipe)/upload-recipe/field-array-input';
import { FieldArrayInputWrapper } from '@/app/(root)/(recipe)/upload-recipe/field-array-input-wrapper';
import { TimeInput } from '@/app/(root)/(recipe)/upload-recipe/time-input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal, ModalCloseButton, ModalTitle } from '@/components/ui/modal';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { useFormAction } from '@/hooks/use-form-action';
import { useToast } from '@/hooks/use-toast';
import { addRecipeIngredients } from '@/lib/actions/ingredients';
import { recipeClientSchema } from '@/lib/schema/upload-recipe';
import { PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Prisma } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { type } from 'os';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import { boolean, z } from 'zod';

type TSchema = z.infer<typeof recipeClientSchema>;
type Recipe = Prisma.RecipeGetPayload<{
  include: {
    ingredients: {
      select: {
        id: true;
        ingredient: true;
      };
    };
    instructions: {
      select: {
        step: true;
        instruction: true;
      };
    };
  };
}>;

interface UpdateRecipeFormProps {
  recipe: Recipe;
}

export function UpdateRecipeForm({ recipe }: UpdateRecipeFormProps) {
  const form = useForm<TSchema>({
    resolver: zodResolver(recipeClientSchema),
    defaultValues: {
      title: '',
      description: '',
      prepTimeHours: 0,
      prepTimeMins: 0,
      cookingTimeHours: 0,
      cookingTimeMins: 0,
      servings: 0,
      ingredients: [{ ingredient: '' }],
      instructions: [{ step: 1, instruction: '' }]
    }
  });

  return <PrimaryDetailsForm form={form} />;
}

interface PrimaryDetailsFormProps {
  form: UseFormReturn<TSchema>;
}

function PrimaryDetailsForm({ form }: PrimaryDetailsFormProps) {
  return (
    <div>
      <h3 className="mb-8 font-semibold text-gray-700">Primary details</h3>
      <Form {...form}>
        <form>
          <div className="grid gap-y-6 sm:grid-cols-4 sm:gap-x-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="sm:col-span-3">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="sm:col-span-4">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-1.5 sm:col-span-2">
              <Label>Preparation time</Label>
              <div className="flex flex-col gap-4 xs:flex-row">
                <FormField
                  control={form.control}
                  name="prepTimeHours"
                  render={({ field }) => (
                    <FormItem className="flex-1 space-y-0 sm:max-w-32 sm:flex-none">
                      <FormLabel className="sr-only">Prep time hours</FormLabel>
                      <FormControl>
                        <TimeInput input="hours" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prepTimeMins"
                  render={({ field }) => (
                    <FormItem className="flex-1 space-y-0">
                      <FormLabel className="sr-only">
                        Prep time minutes
                      </FormLabel>
                      <FormControl>
                        <TimeInput
                          input="minutes"
                          step={5}
                          min={0}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label>Cooking time</Label>
              <div className="flex flex-col gap-4 xs:flex-row">
                <FormField
                  control={form.control}
                  name="cookingTimeHours"
                  render={({ field }) => (
                    <FormItem className="flex-1 space-y-0 sm:max-w-32 sm:flex-none">
                      <FormLabel className="sr-only">
                        Cooking time hours
                      </FormLabel>
                      <FormControl>
                        <TimeInput input="hours" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cookingTimeMins"
                  render={({ field }) => (
                    <FormItem className="flex-1 space-y-0">
                      <FormLabel className="sr-only">
                        Cooking time minutes
                      </FormLabel>
                      <FormControl>
                        <TimeInput
                          input="minutes"
                          step={5}
                          min={0}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="servings"
              render={({ field }) => (
                <FormItem className="max-w-48 sm:col-span-2">
                  <FormLabel>Servings</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-14">
            <Button>Update</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface IngredientsFormProps {
  ingredients: {
    id: number;
    ingredient: string;
  }[];
}

const ingredientsSchema = z.object({
  ingredients: z
    .object({
      id: z.number().optional(),
      ingredient: z.string().trim().min(1, 'Ingredient is required')
    })
    .array()
    .nonempty({ message: 'Recipe must atleast have one ingredient' })
});

function IngredientsForm({ ingredients }: IngredientsFormProps) {
  const params = useParams<{ id: string }>();
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const form = useForm<z.infer<typeof ingredientsSchema>>({
    resolver: zodResolver(ingredientsSchema),
    defaultValues: {
      ingredients: ingredients.map(({ ingredient }) => ({ ingredient }))
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients'
  });

  const { toast } = useToast();
  const { isPending, formAction, formState, onSubmit } = useFormAction(
    addRecipeIngredients.bind(null, params.id),
    {}
  );

  useEffect(() => {
    setShowAddForm(false);
    setTimeout(() => form.reset({ ingredients: [{ ingredient: '' }] }), 500);
    toast({
      title: formState.message
    });
  }, [toast, formState, form]);

  function handleCloseAddForm() {
    setShowAddForm(false);
    setTimeout(() => form.reset({ ingredients: [{ ingredient: '' }] }), 500);
  }

  function handleShowDeleteModal(id: number) {
    setSelectedId(id);
    setShowDeleteModal(true);
  }

  function handleDeleteRecipe() {
    console.log(selectedId!);
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
    <div>
      <Modal open={showEditForm} onClose={() => setShowEditForm(false)}>
        <ModalTitle as="h3" className="font-semibold text-gray-700">
          Edit ingredient
        </ModalTitle>
        <div className="mt-6">
          <Input type="text" />
        </div>
        <div className="mt-8 space-y-3 sm:flex sm:flex-row-reverse sm:space-y-0">
          <Button
            variant="primary"
            onClick={() => setShowEditForm(false)}
            className="w-full sm:ml-4 sm:w-auto">
            Update
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowEditForm(false)}
            className="w-full sm:w-auto">
            Cancel
          </Button>
        </div>
      </Modal>

      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
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
            className="w-full sm:ml-4 sm:w-auto">
            Delete
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowDeleteModal(false)}
            className="w-full sm:w-auto">
            Cancel
          </Button>
        </div>
      </Modal>

      <div className="mb-10 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Ingredients</h3>
        <Button variant="primary" onClick={() => setShowAddForm(true)}>
          Add
        </Button>

        <Modal open={showAddForm} onClose={handleCloseAddForm}>
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
                            <FormLabel className="sr-only">
                              Ingredient
                            </FormLabel>
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
                <Button
                  variant="primary"
                  className="w-full"
                  disabled={isPending}>
                  {isPending && <Spinner className="mr-2 size-4" />}
                  {isPending ? 'Adding ingredients' : 'Add ingredients'}
                </Button>
              </div>
            </form>
          </Form>
        </Modal>
      </div>

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
                onClick={() => setShowEditForm(true)}>
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
    </div>
  );
}
