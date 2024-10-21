'use client';

import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/hooks/use-toast';
import { useFormAction } from '@/hooks/use-form-action';
import { createRecipe } from '@/lib/actions/recipe';
import { recipeClientSchema } from '@/lib/schema/upload-recipe';

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
import { Label } from '@/components/ui/label';

import { FieldArrayInput } from './field-array-input';
import { FieldArrayTextareaInput } from './field-array-teaxtarea-input';
import { FieldArrayInputWrapper } from './field-array-input-wrapper';
import { ImageField } from './image-field';
import { TimeInput } from './time-input';

type TSchema = z.infer<typeof recipeClientSchema>;

export function UploadRecipeForm() {
  const router = useRouter();
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

  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    const file = files?.item(0);

    if (!file) return;

    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', () => {
      setImagePreview(fileReader.result as string);
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSubmit(() => {
      const formData = new FormData();

      form.handleSubmit((data) => {
        formData.set('title', data.title);
        formData.set('description', data.description);
        formData.set('prepTimeHours', `${data.prepTimeHours}`);
        formData.set('prepTimeMins', `${data.prepTimeMins}`);
        formData.set('cookingTimeHours', `${data.cookingTimeHours}`);
        formData.set('cookingTimeMins', `${data.cookingTimeMins}`);
        formData.set('servings', `${data.servings}`);
        formData.set('ingredients', `${JSON.stringify(data.ingredients)}`);
        formData.set('instructions', `${JSON.stringify(data.instructions)}`);
        formData.set('image', imagePreview as string);

        formAction(formData);
      })(e);
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
      <form action={formAction} onSubmit={handleSubmit}>
        <div className="space-y-16">
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
                  <FormControl serverError={formState.errors?.servings}>
                    <Input type="number" min={0} {...field} />
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
                      <FormMessage>
                        {formState.errors?.instructions}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </FieldArrayInputWrapper>

          <div className="max-w-md space-y-6">
            <h3 className="text-base font-semibold text-gray-900">Image</h3>
            <ImageField
              form={form}
              error={formState.errors?.image}
              src={imagePreview}
              onChange={handleChange}
            />
          </div>

          <div>
            <Button type="submit" disabled={isPending}>
              {isPending && <Spinner className="mr-2" aria-hidden="true" />}
              {isPending ? 'Uploading recipe' : 'Upload recipe'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
