'use client';

import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { XIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { NumInput, NumInputField } from '@/components/ui/num-input';
import { FieldListWrapper } from '@/components/field-list-wrapper';
import {
  recipeFormSchema,
  type RecipeFormValues,
} from '@/features/recipe/schema';

export default function Page() {
  const [isPending, setIsPending] = useState(false); // to be replaced

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      name: '',
      summary: '',
      servings: 1,
      cooking: {
        preparation: 5,
        cooking: 5,
      },
      ingredients: [{ ingredient: '' }],
      instructions: [{ step: 1, instruction: '' }],
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.handleSubmit(async (data) => {
      setIsPending(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(data);
      setIsPending(false);
    })(e);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
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
