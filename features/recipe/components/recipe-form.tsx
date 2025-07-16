'use client';

import { startTransition, useActionState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { XIcon } from 'lucide-react';
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
import {
  recipeFormSchema,
  type RecipeFormValues,
} from '@/features/recipe/schema';
import { uploadRecipe } from '@/features/recipe/actions/upload-recipe';

export function RecipeForm() {
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
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

  const [actionState, action, isPending] = useActionState(
    uploadRecipe,
    INITIAL_ACTION_STATE,
  );

  useActionFeedback(actionState, {
    onFail: ({ fieldErrors }) => {
      renderFormErrors<RecipeFormValues>(fieldErrors, form);
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
        action(formData);
      });
    })(e);
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
                    <Input
                      placeholder="e.g Lasagna"
                      disabled={isPending}
                      {...field}
                    />
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
                    <NumInputField
                      min={1}
                      onValueChange={field.onChange}
                      value={field.value}>
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
                      Cooking time{' '}
                      <span className="text-gray-500">(in mins)</span>
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
          <FieldListWrapper
            onAddField={() => appendIngredient({ ingredient: '' })}>
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
                          <Input
                            placeholder="1 tbsp olive oil"
                            disabled={isPending}
                            {...field}
                          />
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
          <FieldListWrapper
            onAddField={() => appendNutrition({ name: '', value: '' })}>
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
                          <Input
                            placeholder="Protein"
                            disabled={isPending}
                            {...field}
                          />
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
                            <Input
                              placeholder="35g"
                              disabled={isPending}
                              {...field}
                            />
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
          <div className="flex justify-end">
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
