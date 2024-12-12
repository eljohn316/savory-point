'use client';

import { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { Prisma } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/hooks/use-toast';
import { useFormAction } from '@/hooks/use-form-action';
import { updateRecipeDetails } from '@/lib/actions/recipe';
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
import { TimeInput } from '@/components/time-input';

type Recipe = Prisma.RecipeGetPayload<{
  select: {
    id: true;
    title: true;
    description: true;
    prepTimeHours: true;
    prepTimeMins: true;
    cookingTimeHours: true;
    cookingTimeMins: true;
    servings: true;
  };
}>;

const schema = recipeClientSchema.pick({
  title: true,
  description: true,
  prepTimeHours: true,
  prepTimeMins: true,
  cookingTimeHours: true,
  cookingTimeMins: true,
  servings: true
});

type TSchema = z.infer<typeof schema>;

interface UpdateDetailsFormProps {
  recipe: Recipe;
}

export function UpdateDetailsForm({ recipe }: UpdateDetailsFormProps) {
  const params = useParams<{ id: string }>();
  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: recipe.title,
      description: recipe.description ?? '',
      prepTimeHours: recipe.prepTimeHours,
      prepTimeMins: recipe.prepTimeMins,
      cookingTimeHours: recipe.cookingTimeHours,
      cookingTimeMins: recipe.cookingTimeMins,
      servings: recipe.servings
    }
  });

  const { toast } = useToast();
  const { isPending, formAction, formState, onSubmit } = useFormAction(
    updateRecipeDetails.bind(null, params.id),
    {}
  );

  useEffect(() => {
    if (formState.success) {
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
  }, [toast, formState]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSubmit(() => {
      const formData = new FormData(e.currentTarget);

      form.handleSubmit(() => {
        formAction(formData);
      })(e);
    });
  }

  return (
    <Form {...form}>
      <form action={formAction} onSubmit={handleSubmit}>
        <div className="mb-8">
          <h3 className="font-semibold text-gray-700">Update recipe details</h3>
        </div>
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
                  <Textarea rows={6} {...field} />
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
                    <FormLabel className="sr-only">Prep time minutes</FormLabel>
                    <FormControl>
                      <TimeInput input="minutes" step={5} min={0} {...field} />
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
                      <TimeInput input="minutes" step={5} min={0} {...field} />
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
        <div className="mt-16">
          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner className="mr-2" aria-hidden="true" />}
            {isPending ? 'Updating recipe' : 'Update recipe'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
