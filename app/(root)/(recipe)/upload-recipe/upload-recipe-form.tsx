'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CameraIcon,
  PhotoIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/20/solid';

import { recipeClientSchema } from '@/lib/schema/upload-recipe';
import { cn } from '@/lib/utils';
import { useFormAction } from '@/hooks/use-form-action';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { createRecipe } from '@/lib/actions/recipe';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

type TSchema = z.infer<typeof recipeClientSchema>;

export function UploadRecipeForm() {
  const router = useRouter();
  const form = useForm<TSchema>({
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

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const imageField = form.register('image', {
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

  const { toast } = useToast();
  const { isPending, formAction, formState, onSubmit } = useFormAction(
    createRecipe,
    {}
  );

  useEffect(() => {
    if (formState.success) {
      router.replace('/account');
      toast({
        variant: 'success',
        title: formState.message
      });
    }

    if (formState.success === false) {
      toast({
        variant: 'danger',
        title: formState.message
      });
    }
  }, [router, toast, formState]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSubmit(() => {
      const formData = new FormData(e.currentTarget);
      form.handleSubmit(() => formAction(formData))(e);
    });
  }

  function handleAddIngredient() {
    appendIngredient({
      ingredient: ''
    });
  }

  function handleAddInstruction() {
    appendInstruction({
      step: instructionFields.at(-1)!.step + 1,
      instruction: ''
    });
  }

  return (
    <Form {...form}>
      <form action={formAction} onSubmit={handleSubmit} className="space-y-16">
        <div className="grid gap-y-6 sm:grid-cols-4 sm:gap-x-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                <FormLabel>Title</FormLabel>
                <FormControl serverError={formState.errors?.title}>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage>{formState.errors?.title}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="sm:col-span-4">
                <FormLabel>Description</FormLabel>
                <FormControl serverError={formState.errors?.description}>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage>{formState.errors?.description}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prepTime"
            render={({ field }) => (
              <FormItem className="sm:col-span-1">
                <FormLabel>Prep time</FormLabel>
                <FormControl serverError={formState.errors?.prepTime}>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage>{formState.errors?.prepTime}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cookingTime"
            render={({ field }) => (
              <FormItem className="sm:col-span-1">
                <FormLabel>Cooking time</FormLabel>
                <FormControl serverError={formState.errors?.cookingTime}>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage>{formState.errors?.cookingTime}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="servings"
            render={({ field }) => (
              <FormItem className="sm:col-span-1">
                <FormLabel>Servings</FormLabel>
                <FormControl serverError={formState.errors?.servings}>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage>{formState.errors?.servings}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <FieldArrayInputWrapper
          label="Ingredients"
          onAddField={handleAddIngredient}>
          <div className="space-y-8">
            {ingredientFields.map((field, index) => (
              <FormField
                key={field.id}
                name={`ingredients.${index}.ingredient` as const}
                render={({ field: input }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Ingredient</FormLabel>
                    <FormControl serverError={formState.errors?.ingredients}>
                      <FieldArrayInput
                        type="text"
                        onRemove={() => removeIngredient(index)}
                        {...input}
                      />
                    </FormControl>
                    <FormMessage>{formState.errors?.ingredients}</FormMessage>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </FieldArrayInputWrapper>

        <FieldArrayInputWrapper
          label="Instructions"
          onAddField={handleAddInstruction}>
          <div className="space-y-8">
            {instructionFields.map((field, index) => (
              <FormField
                key={field.id}
                name={`instructions.${index}.instruction` as const}
                render={({ field: input }) => (
                  <FormItem>
                    <FormLabel>Step {field.step}</FormLabel>
                    <FormControl serverError={formState.errors?.instructions}>
                      <FieldArrayTextareaInput
                        onRemove={() => removeInstruction(index)}
                        {...input}
                      />
                    </FormControl>
                    <FormMessage>{formState.errors?.instructions}</FormMessage>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </FieldArrayInputWrapper>

        <div className="max-w-md space-y-6">
          <h3 className="text-base font-semibold text-gray-900">Image</h3>
          <div className="flex h-80 rounded-lg border-2 border-dashed border-gray-300 p-1.5 sm:col-span-3">
            {imagePreview ? (
              <div className="relative flex-1 overflow-hidden rounded-lg">
                <Image
                  src={imagePreview as string}
                  alt="Recipe image preview"
                  fill
                  sizes="(min-width: 808px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto size-12 text-gray-300"
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
                <Button variant="outline" asChild>
                  <FormLabel className="cursor-pointer">
                    <CameraIcon
                      className="mr-2 size-4 text-gray-400"
                      aria-hidden="true"
                    />
                    Choose image
                    <FormControl serverError={formState.errors?.image}>
                      <input type="file" className="sr-only" {...imageField} />
                    </FormControl>
                  </FormLabel>
                </Button>
                <FormMessage>{formState.errors?.image}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div>
          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner className="mr-2" aria-hidden="true" />}
            {isPending ? 'Uploading recipe' : 'Upload recipe'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

interface FieldArrayInputProps
  extends React.ComponentPropsWithoutRef<typeof Input> {
  onRemove: () => void;
}

const FieldArrayInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  FieldArrayInputProps
>(function FieldArrayInput({ onRemove, className, type, ...props }, ref) {
  return (
    <div className="relative">
      <Input type={type} className={className} ref={ref} {...props} />
      <div className="absolute inset-y-0 right-0 my-2 border-l border-gray-300 px-2">
        <button
          type="button"
          className="text-gray-400 hover:text-gray-500"
          onClick={onRemove}>
          <span className="sr-only">Remove field</span>
          <XMarkIcon className="size-[18px]" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});

interface FieldArrayTextareaInputProps
  extends React.ComponentPropsWithoutRef<typeof Textarea> {
  onRemove: () => void;
}

const FieldArrayTextareaInput = React.forwardRef<
  React.ElementRef<typeof Textarea>,
  FieldArrayTextareaInputProps
>(function FieldArrayInput({ onRemove, className, ...props }, ref) {
  return (
    <div className="relative">
      <Textarea className={className} ref={ref} {...props} />
      <div className="absolute inset-y-0 right-0 my-2 border-l border-gray-300 px-2">
        <button
          type="button"
          className="text-gray-400 hover:text-gray-500"
          onClick={onRemove}>
          <span className="sr-only">Remove field</span>
          <XMarkIcon className="size-[18px]" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});

interface FieldArrayInputWrapperProps {
  label: string;
  className?: string;
  onAddField: () => void;
  children: React.ReactNode;
}

function FieldArrayInputWrapper({
  label,
  className,
  onAddField,
  children
}: FieldArrayInputWrapperProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <h3 className="text-base font-semibold text-gray-900">{label}</h3>
      <div className="space-y-6">
        {children}
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <button
              type="button"
              className="bg-white px-2 text-sm font-medium text-gray-400 hover:text-gray-500"
              onClick={onAddField}>
              <PlusIcon className="size-[18px]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
