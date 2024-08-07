'use client';

import React, { useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { useFieldArray, useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { ChevronLeft, ImageIcon, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../lib/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TextareaInput } from '@/components/ui/textarea-input';
import { InputWrapper } from '@/app/(recipe)/create-recipe/components/input-wrapper';
import { InputListWrapper } from '@/app/(recipe)/create-recipe/components/input-list-wrapper';
import { InputWithAction } from '@/app/(recipe)/create-recipe/components/input-with-action';
import { TextInputWithAction } from '@/app/(recipe)/create-recipe/components/text-area-with-action';
import { ErrorAlert } from '@/app/(recipe)/create-recipe/components/error-alert';
import { ImagePreview } from '@/app/(recipe)/create-recipe/components/image-preview';

type TSchema = z.infer<typeof schema>;

interface CreateRecipeFormProps {
  action: (
    prevState: { errors?: string[]; message?: string },
    data: FormData
  ) => Promise<{ errors?: string[]; message?: string }>;
}

export function CreateRecipeForm({ action }: CreateRecipeFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, formAction] = useFormState(action, { message: '' });

  const {
    formState: { errors },
    ...form
  } = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      ingredients: [{ num: 1, ingredient: '' }],
      instructions: [{ num: 1, instruction: '' }]
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

  function handleAddIngredient() {
    const last = ingredientFields.at(-1);
    const ingredient = last?.num
      ? { num: last.num + 1, ingredient: '' }
      : { ingredient: '' };

    appendIngredient(ingredient);
  }

  function handleAddInstruction() {
    const last = instructionFields.at(-1);
    const instruction = last?.num
      ? { num: last.num + 1, instruction: '' }
      : { instruction: '' };

    appendInstruction(instruction);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(formRef.current!);

    startTransition(() => {
      form.handleSubmit(() => formAction(formData))(e);
    });
  }

  function handleSetImagePreview(e: React.ChangeEvent<HTMLInputElement>) {
    const ACCEPTED_FILES = ['image/png', 'image/jpg', 'image/jpeg'];
    const files = e.target.files;

    if (!files) return;

    const file = files[0];

    if (ACCEPTED_FILES.includes(file.type)) {
      const fileReader = new FileReader();

      fileReader.addEventListener('load', () => {
        setImagePreview(fileReader.result as string);
      });

      fileReader.readAsDataURL(file);
    }
  }

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit}>
      <div className="h-20 bg-white fixed inset-x-0 top-0 z-10 flex items-center shadow">
        <div className="flex-1 max-w-6xl mx-auto flex justify-between px-4 lg:px-6">
          <Button variant={'link'} className="p-0" asChild>
            <Link href="/">
              <ChevronLeft className="size-4 mr-2" aria-hidden="true" />
              Return
            </Link>
          </Button>

          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                {'Creating recipe'}
                <Loader2
                  className="ml-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              </>
            ) : (
              'Create recipe'
            )}
          </Button>
        </div>
      </div>

      <div className="pt-28 pb-12 max-w-6xl mx-auto px-4 lg:px-6">
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 text-xl">Create recipe</h3>
        </div>
        <div className="space-y-8 lg:space-y-0 lg:flex lg:gap-x-10">
          <div className="space-y-14">
            <div className="space-y-4 lg:space-y-6 lg:min-w-0 lg:flex-1">
              <ErrorAlert message={result.message} errors={result.errors} />
              <InputWrapper label="Title" error={errors.title?.message}>
                <Input
                  type="text"
                  id="title"
                  disabled={isPending}
                  error={errors.title?.message}
                  {...form.register('title')}
                />
              </InputWrapper>

              <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-x-6">
                <InputWrapper
                  className="flex-1"
                  label="Prep time"
                  error={errors.prepTime?.message}>
                  <Input
                    type="number"
                    id="prep-time"
                    disabled={isPending}
                    error={errors.prepTime?.message}
                    {...form.register('prepTime')}
                  />
                </InputWrapper>

                <InputWrapper
                  className="flex-1"
                  label="Cooking time"
                  error={errors.cookingTime?.message}>
                  <Input
                    type="number"
                    id="cooking-time"
                    disabled={isPending}
                    error={errors.cookingTime?.message}
                    {...form.register('cookingTime')}
                  />
                </InputWrapper>

                <InputWrapper
                  className="flex-1"
                  label="Servings"
                  error={errors.servings?.message}>
                  <Input
                    type="number"
                    id="servings"
                    disabled={isPending}
                    error={errors.servings?.message}
                    {...form.register('servings')}
                  />
                </InputWrapper>
              </div>

              <InputWrapper label="About" error={errors.about?.message}>
                <TextareaInput
                  id="about"
                  disabled={isPending}
                  error={errors.about?.message}
                  {...form.register('about')}
                />
              </InputWrapper>
            </div>

            <div className="space-y-20">
              <InputListWrapper onAddField={handleAddIngredient}>
                {ingredientFields.map((field, index) => (
                  <InputWrapper
                    key={field.id}
                    label={`Ingredient ${field.num}`}
                    error={errors.ingredients?.[index]?.ingredient?.message}>
                    <InputWithAction
                      id={`ingredient-${field.num}`}
                      disabled={isPending}
                      error={errors.ingredients?.[index]?.ingredient?.message}
                      onAction={() => removeIngredient(index)}
                      showAction={ingredientFields.length > 1}
                      {...form.register(
                        `ingredients.${index}.ingredient` as const
                      )}
                    />
                  </InputWrapper>
                ))}
              </InputListWrapper>

              <InputListWrapper onAddField={handleAddInstruction}>
                {instructionFields.map((field, index) => (
                  <InputWrapper
                    key={field.id}
                    label={`Instruction ${field.num}`}
                    error={errors.instructions?.[index]?.instruction?.message}>
                    <TextInputWithAction
                      id={`instruction-${field.num}`}
                      disabled={isPending}
                      showAction={
                        instructionFields.length === index + 1 &&
                        instructionFields.length > 1
                      }
                      error={errors.instructions?.[index]?.instruction?.message}
                      onAction={() => removeInstruction(index)}
                      {...form.register(
                        `instructions.${index}.instruction` as const
                      )}
                    />
                  </InputWrapper>
                ))}
              </InputListWrapper>
            </div>
          </div>
          <div className="max-w-96 lg:w-96 lg:shrink-0">
            <ImagePreview url={imagePreview} errorMsg={errors.image?.message} />
            <Button
              variant={'secondary'}
              className="w-full text-emerald-700 border-2 border-emerald-600 border-dashed"
              asChild>
              <label htmlFor="file-upload">
                <ImageIcon className="size-4 mr-2" aria-hidden="true" />
                <span>Choose a photo</span>
                <input
                  type="file"
                  id="file-upload"
                  className="sr-only"
                  {...form.register('image', {
                    onChange: handleSetImagePreview
                  })}
                />
              </label>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
