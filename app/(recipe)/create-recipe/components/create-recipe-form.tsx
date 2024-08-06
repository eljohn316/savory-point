'use client';

import React, { forwardRef, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFieldArray, useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import {
  ChevronLeft,
  ImageIcon,
  Loader2,
  XCircleIcon,
  XIcon
} from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { schema } from '../lib/schema';

const Label = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'label'>) => {
  return (
    <label
      className="block text-sm font-medium leading-6 text-gray-900"
      {...props}>
      {children}
    </label>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { error, type, className, ...props },
  ref
) {
  return (
    <input
      type={type}
      className={cn(
        error
          ? 'text-red-600 ring-red-600 placeholder:text-red-600 focus:ring-red-600'
          : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-emerald-600',
        className,
        'block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200'
      )}
      {...props}
      ref={ref}
    />
  );
});

interface TextareaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  function TextareaInput({ error, className, ...props }, ref) {
    return (
      <textarea
        rows={5}
        className={cn(
          error
            ? 'text-red-600 ring-red-600 placeholder:text-red-600 focus:ring-red-600'
            : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-emerald-600',
          className,
          'block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200'
        )}
        ref={ref}
        {...props}></textarea>
    );
  }
);

type TSchema = z.infer<typeof schema>;

interface CreateRecipeFormProps {
  action: (
    prevState: { errors?: string[]; message?: string },
    data: FormData
  ) => Promise<{ errors?: string[]; message?: string }>;
}

interface FieldWrapperProps {
  className?: string;
  label: string;
  children: React.ReactElement;
  error?: string;
}

function FieldWrapper({
  className,
  label,
  children,
  error
}: FieldWrapperProps) {
  const id = children.props.id;

  if (!id) throw new Error('Field must have an id attribute');

  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-1">{children}</div>
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

interface FieldListWrapperProps {
  className?: string;
  onAddField: () => void;
  children: React.ReactNode;
}

function FieldListWrapper({
  className,
  onAddField,
  children
}: FieldListWrapperProps) {
  return (
    <div className={className}>
      <div className="space-y-4">{children}</div>
      <div className="mt-8">
        <button
          type="button"
          className="w-full inline-flex items-center justify-center px-4 py-2 text-emerald-700 text-sm font-medium border-2 border-dashed border-emerald-500 rounded-md hover:bg-emerald-50"
          onClick={onAddField}>
          Add item
        </button>
      </div>
    </div>
  );
}

interface InputWithActionProps
  extends React.ComponentPropsWithoutRef<typeof Input> {
  onAction: () => void;
  showAction: boolean;
}

const InputWithAction = forwardRef<HTMLInputElement, InputWithActionProps>(
  function InputWithAction(
    { onAction, showAction, error, type, className, ...props },
    ref
  ) {
    return (
      <div className="relative">
        <Input
          type="text"
          className={cn(showAction && 'pr-8')}
          error={error}
          ref={ref}
          {...props}
        />
        {showAction && (
          <div
            className={cn(
              error ? 'border-red-600' : 'border-gray-300',
              'absolute inset-y-0 right-0 px-2 my-1 flex items-center border-l'
            )}>
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              onClick={onAction}>
              <span className="sr-only">Remove</span>
              <XIcon className="size-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    );
  }
);

interface TextInputWithActionProps
  extends React.ComponentPropsWithoutRef<typeof TextareaInput> {
  onAction: () => void;
  showAction: boolean;
}

const TextInputWithAction = forwardRef<
  HTMLTextAreaElement,
  TextInputWithActionProps
>(function TextInputWithAction({ onAction, showAction, error, ...props }, ref) {
  return (
    <div className="relative">
      <TextareaInput
        className={cn(showAction && 'pr-8')}
        error={error}
        ref={ref}
        {...props}
      />
      {showAction && (
        <div
          className={cn(
            error ? 'border-red-600' : 'border-gray-300',
            'absolute inset-y-0 right-0 px-2 my-1 flex items-center border-l'
          )}>
          <button
            type="button"
            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            onClick={onAction}>
            <span className="sr-only">Remove</span>
            <XIcon className="size-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
});

function ErrorAlert({
  message,
  errors
}: {
  message: string;
  errors?: string[];
}) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{message}</h3>
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc space-y-1 pl-5">
              {typeof errors !== 'undefined' &&
                errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CreateRecipeForm({ action }: CreateRecipeFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, formAction] = useFormState(action, {
    message: ''
  });

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
          <Link
            href="/"
            className="-ml-1 inline-flex items-center gap-x-1 text-sm font-medium text-emerald-700 hover:text-emerald-900">
            <ChevronLeft className="size-[18px]" aria-hidden="true" />
            Return
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-x-2 rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:hover:bg-emerald-600 disabled:opacity-70">
            {isPending ? (
              <>
                {'Creating recipe'}
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              </>
            ) : (
              'Create recipe'
            )}
          </button>
        </div>
      </div>

      <div className="pt-28 pb-12 max-w-6xl mx-auto px-4 lg:px-6">
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 text-xl">Create recipe</h3>
        </div>
        <div className="space-y-8 lg:space-y-0 lg:flex lg:gap-x-10">
          <div className="space-y-14">
            <div className="space-y-4 lg:space-y-6 lg:min-w-0 lg:flex-1">
              {result.message && (
                <ErrorAlert message={result.message} errors={result.errors} />
              )}
              <FieldWrapper label="Title" error={errors.title?.message}>
                <Input
                  type="text"
                  id="title"
                  disabled={isPending}
                  error={errors.title?.message}
                  {...form.register('title')}
                />
              </FieldWrapper>

              <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-x-6">
                <FieldWrapper
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
                </FieldWrapper>

                <FieldWrapper
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
                </FieldWrapper>

                <FieldWrapper
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
                </FieldWrapper>
              </div>

              <FieldWrapper label="About" error={errors.about?.message}>
                <TextareaInput
                  id="about"
                  disabled={isPending}
                  error={errors.about?.message}
                  {...form.register('about')}
                />
              </FieldWrapper>
            </div>

            <div className="space-y-20">
              <FieldListWrapper onAddField={handleAddIngredient}>
                {ingredientFields.map((field, index) => (
                  <FieldWrapper
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
                  </FieldWrapper>
                ))}
              </FieldListWrapper>

              <FieldListWrapper onAddField={handleAddInstruction}>
                {instructionFields.map((field, index) => (
                  <FieldWrapper
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
                  </FieldWrapper>
                ))}
              </FieldListWrapper>
            </div>
          </div>
          <div className="max-w-96 lg:w-96 lg:shrink-0">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Image
            </label>
            <div
              className={cn(
                errors.image?.message ? 'border-red-600' : 'border-gray-300',
                'mt-2 h-80 border-2 border-dashed rounded-lg flex p-2'
              )}>
              {imagePreview ? (
                <div className="flex-1 relative">
                  <Image
                    src={imagePreview}
                    alt=""
                    fill
                    sizes="100vw"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="m-auto">
                  <ImageIcon
                    className="size-12 text-gray-300"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
            {errors.image?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.image.message}
              </p>
            )}
            <label
              htmlFor="file-upload"
              className="mt-4 cursor-pointer inline-flex w-full items-center justify-center gap-x-1.5 px-4 py-2 text-emerald-600 text-sm font-medium border-2 border-dashed border-emerald-500 rounded-md hover:bg-emerald-50">
              <ImageIcon className="size-5" aria-hidden="true" />
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
          </div>
        </div>
      </div>
    </form>
  );
}
