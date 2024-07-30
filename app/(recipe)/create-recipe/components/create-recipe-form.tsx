'use client';

import React, { forwardRef, useRef, useTransition } from 'react';

import { useFieldArray, useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Loader2, PlusIcon, XIcon } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { schema } from '../schema';

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
        rows={4}
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
    prevState: {
      success: boolean | null;
      message: string;
      errors?: {
        [key: string]: string;
      };
    },
    data: FormData
  ) => Promise<{
    success: boolean | null;
    message: string;
    errors?: {
      [key: string]: string;
    };
  }>;
}

interface FieldWrapperProps {
  className: string;
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
  onAddField: () => void;
  children: React.ReactNode;
}

function FieldListWrapper({ onAddField, children }: FieldListWrapperProps) {
  return (
    <div>
      <div className="space-y-6">{children}</div>
      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <button
            type="button"
            className="relative rounded-md bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            onClick={onAddField}>
            <PlusIcon className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface FieldListItemProps {
  label: string;
  children: React.ReactElement;
  error?: string;
}

function FieldListItem({ label, children, error }: FieldListItemProps) {
  const id = children.props.id;

  if (!id) throw new Error('Field must have an id attribute');

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface IngredientInputProps
  extends React.ComponentPropsWithoutRef<typeof Input> {
  onClick: () => void;
}

const IngredientInput = forwardRef<HTMLInputElement, IngredientInputProps>(
  function IngredientInput({ onClick, error, ...props }, ref) {
    return (
      <div className="relative pr-8">
        <Input type="text" error={error} ref={ref} {...props} />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            type="button"
            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            onClick={onClick}>
            <span className="sr-only">Remove</span>
            <XIcon className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
);

interface InstructionInputProps
  extends React.ComponentPropsWithoutRef<typeof TextareaInput> {
  onClick: () => void;
}

const InstructionInput = forwardRef<HTMLTextAreaElement, InstructionInputProps>(
  function IngredientInput({ onClick, error, ...props }, ref) {
    return (
      <div className="relative pr-8">
        <TextareaInput error={error} ref={ref} {...props} />
        <div className="absolute top-0 right-0 flex items-center">
          <button
            type="button"
            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            onClick={onClick}>
            <span className="sr-only">Remove</span>
            <XIcon className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
);

export function CreateRecipeForm({ action }: CreateRecipeFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useFormState(action, {
    success: null,
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

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit}>
      {/* {state.message && (
        <div>
          {state.message} <br /> {JSON.stringify(state.errors)}
        </div>
      )} */}
      <div className="space-y-14">
        <div className="grid sm:grid-cols-3 sm:gap-x-6 gap-y-8">
          <FieldWrapper
            className="sm:col-span-2"
            label="Title"
            error={errors.title?.message}>
            <Input
              type="text"
              id="title"
              disabled={isPending}
              error={errors.title?.message}
              {...form.register('title')}
            />
          </FieldWrapper>

          <FieldWrapper
            className="sm:col-span-3"
            label="About"
            error={errors.about?.message}>
            <TextareaInput
              id="about"
              disabled={isPending}
              error={errors.about?.message}
              {...form.register('about')}
            />
          </FieldWrapper>

          <div className="space-y-8 sm:space-y-0 sm:col-span-3 sm:flex sm:gap-x-6">
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
        </div>
        <div className="space-y-10">
          <FieldListWrapper onAddField={handleAddIngredient}>
            <div className="mb-4">
              <h3 className="font-base font-medium text-emerald-700">
                Recipe Ingredients
              </h3>
            </div>

            {ingredientFields.map((field, index) => (
              <FieldListItem key={field.id} label={`Ingredients ${field.num}`}>
                <IngredientInput
                  id={`ingredient-${field.num}`}
                  error={errors.ingredients?.[index]?.ingredient?.message}
                  onClick={() => removeIngredient(index)}
                  {...form.register(`ingredients.${index}.ingredient` as const)}
                />
              </FieldListItem>
            ))}

            {errors.ingredients?.root?.message && (
              <p className="text-sm text-red-600">
                {errors.ingredients?.root?.message}
              </p>
            )}
          </FieldListWrapper>

          <FieldListWrapper onAddField={handleAddInstruction}>
            <div className="mb-4">
              <h3 className="font-base font-medium text-emerald-700">
                Recipe Instructions
              </h3>
            </div>

            {instructionFields.map((field, index) => (
              <FieldListItem key={field.id} label={`Instruction ${field.num}`}>
                <InstructionInput
                  id={`instruction-${field.num}`}
                  disabled={isPending}
                  error={errors.instructions?.[index]?.instruction?.message}
                  onClick={() => removeInstruction(index)}
                  {...form.register(
                    `instructions.${index}.instruction` as const
                  )}
                />
              </FieldListItem>
            ))}

            {errors.instructions?.root?.message && (
              <p className="text-sm text-red-600">
                {errors.instructions?.root?.message}
              </p>
            )}
          </FieldListWrapper>
        </div>
      </div>

      <div className="mt-12 flex justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-medium leading-6 text-gray-900"
          onClick={() => router.push('/')}>
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            isPending &&
              'inline-flex items-center gap-x-2 disabled:bg-emerald-500 disabled:cursor-not-allowed disabled:hover:bg-emerald-500 disabled:text-gray-100',
            'rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600'
          )}>
          {isPending ? 'Creating recipe' : 'Create recipe'}
          {isPending && (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          )}
        </button>
      </div>
    </form>
  );
}
