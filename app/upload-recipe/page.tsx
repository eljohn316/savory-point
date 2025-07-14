'use client';

import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { XIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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

const schema = z.object({
  name: z.string().min(1, { message: 'Recipe name is required' }),
  summary: z.string().min(1, { message: 'Summary is required' }),
  servings: z.coerce.number().min(1, { message: 'Servings is required' }),
  cooking: z.object({
    preparation: z.coerce
      .number()
      .min(0, { message: 'Preparation time is required' }),
    cooking: z.coerce.number().min(0, { message: 'Cooking time is required' }),
  }),
  ingredients: z
    .object({
      ingredient: z.string().min(1, { message: 'Ingredient is required' }),
    })
    .array()
    .nonempty({ message: 'Recipe must atleast have one ingredient' }),
  instructions: z
    .object({
      step: z.coerce.number(),
      instruction: z.string().min(1, { message: 'Step is required' }),
    })
    .array()
    .nonempty({ message: 'Recipe must atleast have one instruction' }),
  nutrition: z
    .object({
      name: z.string().min(1, { message: 'Name is required' }),
      value: z.string().min(1, { message: 'Value is required' }),
    })
    .array(),
});

type CreateRecipePayload = z.infer<typeof schema>;

function IngredientsField() {
  const { control } = useFormContext<CreateRecipePayload>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  return (
    <FieldListWrapper onAddField={() => append({ ingredient: '' })}>
      <h3 className="text-lg font-bold text-green-900">Ingredients</h3>
      <div className="space-y-4">
        {fields.map(({ id }, index) => (
          <FormField
            key={id}
            name={`ingredients.${index}.ingredient` as const}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredient #{index + 1}</FormLabel>
                <div className="flex items-center gap-x-3">
                  <FormControl>
                    <Input placeholder="1 tbsp olive oil" {...field} />
                  </FormControl>
                  <button
                    type="button"
                    className="flex-none text-gray-400 hover:text-gray-500"
                    onClick={() => remove(index)}>
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
  );
}

function InstructionsField() {
  const { control } = useFormContext<CreateRecipePayload>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'instructions',
  });

  function isLast(id: string) {
    const lastId = fields.at(-1)?.id;
    return lastId === id;
  }

  function handleAppend() {
    const lastStep = fields.at(-1)!.step;
    append({
      step: lastStep + 1,
      instruction: '',
    });
  }

  return (
    <FieldListWrapper onAddField={handleAppend}>
      <h3 className="text-lg font-bold text-green-900">Instructions</h3>
      <div className="space-y-6">
        {fields.map(({ id, step }, index) => (
          <FormField
            key={id}
            name={`instructions.${index}.instruction` as const}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Step {step}</FormLabel>
                  {isLast(id) && (
                    <button
                      type="button"
                      className="ml-auto text-gray-400 hover:text-gray-500"
                      onClick={() => remove(index)}>
                      <XIcon className="size-5" />
                    </button>
                  )}
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Heat olive oil in a large pan over medium heat."
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
  );
}

function NutritionListField() {
  const { control } = useFormContext<CreateRecipePayload>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'nutrition',
  });

  return (
    <FieldListWrapper onAddField={() => append({ name: '', value: '' })}>
      <h3 className="text-lg font-bold text-green-900">Nutrition</h3>
      <div className="space-y-4">
        {fields.map(({ id }, index) => (
          <div key={id} className="flex gap-x-4">
            <FormField
              name={`nutrition.${index}.name` as const}
              render={({ field }) => (
                <FormItem className="w-3/5 flex-auto">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Protein" {...field} />
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
                      <Input placeholder="35g" {...field} />
                    </FormControl>
                    <button
                      type="button"
                      className="flex-none text-gray-400 hover:text-gray-500"
                      onClick={() => remove(index)}>
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
  );
}

export default function Page() {
  const form = useForm<CreateRecipePayload>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      summary: '',
      servings: 1,
      cooking: {
        preparation: 0,
        cooking: 0,
      },
      ingredients: [{ ingredient: '' }],
      instructions: [{ step: 1, instruction: '' }],
      nutrition: [{ name: '', value: '' }],
    },
  });

  function createRecipe(payload: CreateRecipePayload) {
    console.log(payload);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(createRecipe)}>
        <h2 className="text-xl font-bold text-gray-700">Upload a recipe</h2>
        <div className="mt-6 space-y-14">
          <div className="space-y-6 lg:space-y-8">
            <h3 className="text-lg font-bold text-green-900">Recipe details</h3>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g Lasagna" {...field} />
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
                        <NumInput />
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
                        <NumInput />
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
                        <NumInput />
                      </FormControl>
                    </NumInputField>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <IngredientsField />
          <InstructionsField />
          <NutritionListField />
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-green-700 px-4 py-2 text-sm text-green-50 hover:bg-green-800 focus:ring-1 focus:ring-green-700 focus:ring-offset-2 focus:outline-none">
              Upload recipe
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}
