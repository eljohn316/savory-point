'use client';

import Image from 'next/image';
import { ChangeEvent, startTransition, useActionState, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { CameraIcon, ImageIcon, XIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/form/form';
import { FormControl } from '@/components/form/form-control';
import { FormField } from '@/components/form/form-field';
import { FormItem } from '@/components/form/form-item';
import { FormLabel } from '@/components/form/form-label';
import { FormMessage } from '@/components/form/form-message';
import { INITIAL_ACTION_STATE } from '@/components/form/utils/action-state-utils';
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback';
import { renderFormErrors } from '@/components/form/utils/render-form-errors';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { NumInput, NumInputField } from '@/components/ui/num-input';
import { errorToast } from '@/components/ui/sonner';
import { FieldListWrapper } from '@/components/field-list-wrapper';
import { useUser } from '@/components/user-provider';
import { uploadRecipe } from '@/features/recipe/actions/upload-recipe';
import {
  uploadRecipeClientSchema,
  UploadRecipeClientValues,
} from '@/features/recipe/schema/upload-recipe';
import { cn } from '@/lib/utils';

export function UploadRecipeForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const form = useForm<UploadRecipeClientValues>({
    resolver: zodResolver(uploadRecipeClientSchema),
    defaultValues: {
      name: '',
      summary: '',
      servings: 1,
      cooking: {
        preparation: 0,
        cooking: 0,
      },
      ingredients: [{ ingredient: '' }],
      instructions: [
        {
          step: 1,
          instruction: '',
        },
      ],
      nutrition: [{ name: '', value: '' }],
    },
  });

  const {
    fields: ingredientsFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

  const {
    fields: instructionsFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control: form.control,
    name: 'instructions',
  });

  const {
    fields: nutritionFields,
    append: appendNutrition,
    remove: removeNutrition,
  } = useFieldArray({
    control: form.control,
    name: 'nutrition',
  });

  const { user } = useUser();
  const [actionState, action, isPending] = useActionState(
    uploadRecipe.bind(null, user.id),
    INITIAL_ACTION_STATE,
  );

  useActionFeedback(actionState, {
    onFail: ({ fieldErrors }) => {
      renderFormErrors<UploadRecipeClientValues>(fieldErrors, form);
    },
    onError: ({ message }) => {
      errorToast(message);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.handleSubmit((data) => {
      startTransition(() => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('summary', data.summary);
        formData.append('servings', `${data.servings}`);
        formData.append('cooking', JSON.stringify(data.cooking));
        formData.append('ingredients', JSON.stringify(data.ingredients));
        formData.append('instructions', JSON.stringify(data.instructions));
        formData.append('nutrition', JSON.stringify(data.nutrition));
        formData.append('image', preview as string);
        formData.append('uploaderId', user.id);
        action(formData);
      });
    })(e);
  }

  function handlePreview(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.item(0);
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', () => {
      setPreview(fileReader.result as string);
    });
  }

  return (
    <Form {...form}>
      <form action={action} onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-gray-700">Upload a recipe</h2>
        <div className="mt-6 space-y-14">
          <div className="space-y-6 lg:space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g Lasagna" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short summary..."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-8 sm:flex sm:space-y-0 sm:gap-x-5">
              <FormField
                control={form.control}
                name="servings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Servings</FormLabel>
                    <NumInputField min={1} onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <NumInput disabled={isPending} />
                      </FormControl>
                    </NumInputField>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cooking.preparation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Prep time <span className="text-gray-500">(in mins)</span>
                    </FormLabel>
                    <NumInputField
                      min={0}
                      onValueChange={field.onChange}
                      value={field.value}
                      step={5}>
                      <FormControl>
                        <NumInput disabled={isPending} />
                      </FormControl>
                    </NumInputField>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cooking.cooking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Cooking time <span className="text-gray-500">(in mins)</span>
                    </FormLabel>
                    <NumInputField
                      min={0}
                      onValueChange={field.onChange}
                      value={field.value}
                      step={5}>
                      <FormControl>
                        <NumInput disabled={isPending} />
                      </FormControl>
                    </NumInputField>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FieldListWrapper onAddField={() => appendIngredient({ ingredient: '' })}>
            <h3 className="text-lg font-bold text-green-900">Ingredients</h3>
            <div className="space-y-4">
              {ingredientsFields.map(({ id }, index) => (
                <FormField
                  key={id}
                  name={`ingredients.${index}.ingredient` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ingredient #{index + 1}</FormLabel>
                      <div className="flex items-center gap-x-3">
                        <FormControl>
                          <Input placeholder="1 tbsp olive oil" disabled={isPending} {...field} />
                        </FormControl>
                        <button
                          type="button"
                          className="flex-none text-gray-400 hover:text-gray-500"
                          onClick={() => removeIngredient(index)}>
                          <XIcon className="size-5" />
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </FieldListWrapper>
          <FieldListWrapper
            onAddField={() =>
              appendInstruction({
                step: instructionsFields.at(-1)!.step + 1,
                instruction: '',
              })
            }>
            <h3 className="text-lg font-bold text-green-900">Instructions</h3>
            <div className="space-y-6">
              {instructionsFields.map(({ id, step }, index) => (
                <FormField
                  key={id}
                  name={`instructions.${index}.instruction` as const}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Step {step}</FormLabel>
                        {instructionsFields.at(-1)?.id === id && (
                          <button
                            type="button"
                            className="ml-auto text-gray-400 hover:text-gray-500"
                            onClick={() => removeInstruction(index)}>
                            <XIcon className="size-5" />
                          </button>
                        )}
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="Heat olive oil in a large pan over medium heat."
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </FieldListWrapper>
          <FieldListWrapper onAddField={() => appendNutrition({ name: '', value: '' })}>
            <h3 className="text-lg font-bold text-green-900">Nutrition</h3>
            <div className="space-y-4">
              {nutritionFields.map(({ id }, index) => (
                <div key={id} className="flex gap-x-4">
                  <FormField
                    name={`nutrition.${index}.name` as const}
                    render={({ field }) => (
                      <FormItem className="w-3/5 flex-auto">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Protein" disabled={isPending} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`nutrition.${index}.value` as const}
                    render={({ field }) => (
                      <FormItem className="w-2/5 flex-auto">
                        <FormLabel>Value</FormLabel>
                        <div className="flex items-center gap-x-3">
                          <FormControl>
                            <Input placeholder="35g" disabled={isPending} {...field} />
                          </FormControl>
                          <button
                            type="button"
                            className="flex-none text-gray-400 hover:text-gray-500"
                            onClick={() => removeNutrition(index)}>
                            <XIcon className="size-5" />
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </FieldListWrapper>
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-green-900">Image</h3>
            <FormField
              control={form.control}
              name="image"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-0">
                  <div
                    className={cn(
                      fieldState.error ? 'border-red-700' : 'border-gray-300',
                      'h-80 rounded-md border-2 border-dashed p-1 sm:h-96',
                    )}>
                    {preview ? (
                      <div className="relative h-full overflow-hidden rounded-md">
                        <Image
                          src={preview}
                          alt="Recipe image preview"
                          fill
                          sizes="(min-width: 808px) 50vw, 100vw"
                          className="object-cover"
                        />
                        <button
                          className="absolute top-2 right-2 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500"
                          onClick={() => {
                            form.resetField('image');
                            setPreview(null);
                          }}>
                          <XIcon className="size-4" />
                          <span className="sr-only">Remove image</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                          <ImageIcon className="inline-block size-8 text-gray-400" />
                          <p className="mt-4 text-xs leading-5 text-gray-500">
                            PNG, JPG, JPEG, WEBP up to 5MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <FormMessage className="mt-2" />
                  <FormLabel className="mt-6 inline-flex cursor-pointer items-center gap-x-2.5 rounded-md border border-emerald-700 px-4 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-700 hover:text-emerald-50 focus:ring-1 focus:ring-emerald-700 focus:ring-offset-2 focus:outline-none">
                    <CameraIcon className="size-4" />
                    Select image
                    <FormControl>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => {
                          handlePreview(e);
                          field.onChange(e.target.files);
                        }}
                      />
                    </FormControl>
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end border-t border-gray-200 pt-6">
            <button
              type="submit"
              className="rounded-md bg-green-700 px-4 py-2 text-sm text-green-50 hover:bg-green-800 focus:ring-1 focus:ring-green-700 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              disabled={isPending}>
              {isPending ? 'Uploading recipe...' : 'Upload recipe'}
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}
