'use client';

import Link from 'next/link';
import React, { useRef, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { updateRecipeDetails } from './lib/actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeClientSchema } from '@/lib/schema';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Prisma } from '@prisma/client';
import { Spinner } from '@/components/ui/spinner';

const schema = recipeClientSchema.pick({
  title: true,
  description: true,
  prepTime: true,
  cookingTime: true,
  servings: true
});

type TSchema = z.infer<typeof schema>;
type Recipe = Prisma.RecipeGetPayload<{
  select: {
    id: true;
    title: true;
    description: true;
    prepTime: true;
    cookingTime: true;
    servings: true;
  };
}>;

interface UpdateDetailsFormProps {
  recipe: Recipe;
}

export function UpdateDetailsForm({ recipe }: UpdateDetailsFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: recipe.title,
      description: recipe.description,
      prepTime: recipe.prepTime,
      cookingTime: recipe.cookingTime,
      servings: recipe.servings
    }
  });

  const [isPending, startTransition] = useTransition();
  const [formState, formAction] = useFormState(
    updateRecipeDetails.bind(null, recipe.id),
    { errors: {} }
  );

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
        <div className="mb-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Update recipe details
          </h3>
        </div>
        <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-5 sm:gap-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Title</FormLabel>
                <FormControl serverError={formState?.errors?.title?.at(0)}>
                  <Input type="text" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage>{formState?.errors?.title?.at(0)}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                <FormLabel>Description</FormLabel>
                <FormControl
                  serverError={formState?.errors?.description?.at(0)}>
                  <Textarea disabled={isPending} {...field} />
                </FormControl>
                <FormMessage>
                  {formState?.errors?.description?.at(0)}
                </FormMessage>
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
                  <FormControl serverError={formState?.errors?.prepTime?.at(0)}>
                    <Input
                      type="number"
                      min={0}
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {formState?.errors?.prepTime?.at(0)}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cookingTime"
              render={({ field }) => (
                <FormItem className="sm:col-span-1">
                  <FormLabel>Cooking time</FormLabel>
                  <FormControl
                    serverError={formState?.errors?.cookingTime?.at(0)}>
                    <Input
                      type="number"
                      min={0}
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {formState?.errors?.cookingTime?.at(0)}
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
                  <FormControl serverError={formState?.errors?.servings?.at(0)}>
                    <Input
                      type="number"
                      min={1}
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {formState?.errors?.servings?.at(0)}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-x-4">
          <Button type="submit" variant="default" disabled={isPending}>
            {isPending ? 'Updating' : 'Update'}
            {isPending && <Spinner className="size-4 ml-2" />}
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/my-recipes/${recipe.id}`}>Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
