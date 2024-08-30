'use client';

import Image from 'next/image';
import React, { useRef, useState, useTransition } from 'react';
import { z } from 'zod';
import { useFormState } from 'react-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { cn } from '@/lib/utils';
import { recipeClientSchema } from '@/lib/schema';
import { createRecipeAction } from '@/app/upload-recipe/lib/action';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

type TRecipeClientSchema = z.infer<typeof recipeClientSchema>;

export function UploadRecipeForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [result, formAction] = useFormState(createRecipeAction, {
    errors: {}
  });

  const form = useForm<TRecipeClientSchema>({
    resolver: zodResolver(recipeClientSchema),
    defaultValues: {
      title: '',
      description: '',
      prepTime: 0,
      cookingTime: 0,
      servings: 1,
      ingredients: [{ ingredient: '' }],
      instructions: [{ step: 1, instruction: '' }]
    }
  });

  const imageRef = form.register('image', {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      const file = files?.item(0);

      if (!file) return;

      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.addEventListener('load', () => {
        setImagePreview(fileReader.result as string);
      });
    }
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient
  } = useFieldArray({
    control: form.control,
    name: 'ingredients'
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction
  } = useFieldArray({
    control: form.control,
    name: 'instructions'
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(formRef.current!);

    startTransition(() => {
      form.handleSubmit(() => formAction(formData))(e);
    });
  }

  return (
    <Form {...form}>
      <form ref={formRef} action={formAction} onSubmit={handleSubmit}>
        <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-5 sm:gap-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Title</FormLabel>
                <FormControl serverError={result?.errors?.title?.at(0)}>
                  <Input type="text" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage>{result?.errors?.title?.at(0)}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                <FormLabel>Description</FormLabel>
                <FormControl serverError={result?.errors?.description?.at(0)}>
                  <Textarea disabled={isPending} {...field} />
                </FormControl>
                <FormMessage>{result?.errors?.description?.at(0)}</FormMessage>
              </FormItem>
            )}
          />

          <div className="space-y-6 sm:space-y-0 sm:col-span-3 sm:grid sm:grid-cols-3 sm:gap-x-5 sm:gap-y-6">
            <FormField
              control={form.control}
              name="prepTime"
              render={({ field }) => (
                <FormItem className="sm:col-span-1">
                  <FormLabel>Prep time</FormLabel>
                  <FormControl serverError={result?.errors?.prepTime?.at(0)}>
                    <Input
                      type="number"
                      min={0}
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{result?.errors?.prepTime?.at(0)}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cookingTime"
              render={({ field }) => (
                <FormItem className="sm:col-span-1">
                  <FormLabel>Cooking time</FormLabel>
                  <FormControl serverError={result?.errors?.cookingTime?.at(0)}>
                    <Input
                      type="number"
                      min={0}
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {result?.errors?.cookingTime?.at(0)}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="servings"
              render={({ field }) => (
                <FormItem className="sm:col-span-1">
                  <FormLabel>Servings</FormLabel>
                  <FormControl serverError={result?.errors?.servings?.at(0)}>
                    <Input
                      type="number"
                      min={1}
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{result?.errors?.servings?.at(0)}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="mb-6 text-base text-gray-700 font-bold">
            Ingredients
          </h3>
          <div className="space-y-4">
            {ingredientFields.map((field, index) => (
              <FormField
                key={field.id}
                name={`ingredients.${index}.ingredient` as const}
                render={({ field: input }) => (
                  <FormItem>
                    <div className="flex items-baseline">
                      <FormLabel>Ingredient {index + 1}</FormLabel>
                      {ingredientFields.length > 1 && (
                        <button
                          type="button"
                          className="ml-auto text-sm font-medium text-red-600 hover:text-red-700"
                          onClick={() => removeIngredient(index)}>
                          Remove
                        </button>
                      )}
                    </div>
                    <FormControl
                      serverError={result?.errors?.ingredients?.at(index)}>
                      <Input type="text" disabled={isPending} {...input} />
                    </FormControl>
                    <FormMessage>
                      {result?.errors?.ingredients?.at(index)}
                    </FormMessage>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="mt-8">
            <Button
              type="button"
              variant="secondary"
              className="w-full border-2 border-dashed border-emerald-600"
              onClick={() => appendIngredient({ ingredient: '' })}>
              Add item
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="mb-6 text-base text-gray-700 font-bold">
            Instructions
          </h3>
          <div className="space-y-4">
            {instructionFields.map((field, index) => (
              <FormField
                key={field.id}
                name={`instructions.${index}.instruction` as const}
                render={({ field: input }) => (
                  <FormItem>
                    <div className="flex items-baseline">
                      <FormLabel>Step {field.step}</FormLabel>
                      {instructionFields.length > 1 &&
                        instructionFields.length - 1 === index && (
                          <button
                            type="button"
                            className="ml-auto text-sm font-medium text-red-600 hover:text-red-700"
                            onClick={() => removeInstruction(index)}>
                            Remove
                          </button>
                        )}
                    </div>
                    <FormControl
                      serverError={result?.errors?.instructions?.at(index)}>
                      <Textarea disabled={isPending} {...input} />
                    </FormControl>
                    <FormMessage>
                      {result?.errors?.instructions?.at(index)}
                    </FormMessage>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="mt-8">
            <Button
              type="button"
              variant="secondary"
              className="w-full border-2 border-dashed border-emerald-600"
              onClick={() =>
                appendInstruction({
                  step: instructionFields.at(-1)!.step + 1,
                  instruction: ''
                })
              }>
              Add item
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="mb-6 text-base text-gray-700 font-bold">Image</h3>
          <div className="sm:grid sm:grid-cols-4">
            <div
              className={cn(
                form.formState.errors.image?.message
                  ? 'border-red-600'
                  : 'border-gray-300',
                'h-80 p-1.5 border-2 border-dashed flex rounded-lg sm:col-span-3'
              )}>
              {imagePreview ? (
                <div className="relative flex-1 rounded-lg overflow-hidden">
                  <Image
                    src={imagePreview as string}
                    alt="Recipe image preview"
                    fill
                    sizes="(min-width: 808px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <PhotoIcon
                      className="size-12 text-gray-300 mx-auto"
                      aria-hidden="true"
                    />
                    <p className="mt-2 text-xs leading-5 text-gray-600">
                      PNG, JPG, JPEG up to 5MB
                    </p>
                  </div>
                </div>
              )}
            </div>
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem className="mt-4 sm:col-span-3">
                  <Button
                    variant="secondary"
                    className="cursor-pointer w-full border-2 border-dashed border-emerald-600"
                    asChild>
                    <FormLabel>
                      <span>Choose image</span>
                      <FormControl>
                        <input type="file" className="sr-only" {...imageRef} />
                      </FormControl>
                    </FormLabel>
                  </Button>
                  <FormMessage>{result?.errors?.image?.at(0)}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-16 pt-5 border-t border-gray-300">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Uploading recipe' : 'Upload recipe'}
            {isPending && <Spinner className="size-4 ml-2" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
