'use client';

import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Prisma } from '@prisma/client';

import { useToast } from '@/hooks/use-toast';
import { useFormAction } from '@/hooks/use-form-action';
import { updateRecipeIngredients } from '@/lib/actions/recipe';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import { FieldArrayInput } from '@/components/field-array-input';

interface UpdateIngredientsFormProps {
  recipe: Prisma.RecipeGetPayload<{
    select: {
      id: true;
      ingredients: {
        select: {
          id: true;
          ingredient: true;
          recipeId: true;
        };
      };
    };
  }>;
}

const schema = z.object({
  ingredients: z
    .object({
      ingredientId: z.number().optional(),
      ingredient: z.string().trim().min(1, 'Ingredient is required'),
      status: z.literal('new').optional()
    })
    .array()
    .nonempty({ message: 'Recipe must atleast have one ingredient' })
});

type TSchema = z.infer<typeof schema>;

export function UpdateIngredientsForm({ recipe }: UpdateIngredientsFormProps) {
  const [removedIngredientIds, setRemovedIngredientIds] = useState<number[]>(
    []
  );
  const params = useParams<{ id: string }>();
  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      ingredients: recipe.ingredients.map((ing) => ({
        ingredient: ing.ingredient,
        ingredientId: ing.id
      }))
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients'
  });

  const { toast } = useToast();
  const { isPending, formAction, formState, onSubmit } = useFormAction(
    updateRecipeIngredients.bind(null, params.id),
    {}
  );

  useEffect(() => {
    if (formState.success) {
      setRemovedIngredientIds([]);
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

  function handleAddIngredient() {
    append({ ingredient: '', status: 'new' });
  }

  function handleRemove(index: number) {
    const field = fields.at(index);
    if (!field) return;

    remove(index);

    if (!field.ingredientId) return;
    setRemovedIngredientIds([...removedIngredientIds, field.ingredientId]);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();

    onSubmit(() => {
      form.handleSubmit((data) => {
        formData.set(
          'ingredients',
          JSON.stringify(data.ingredients.filter((ing) => ing.ingredientId))
        );
        formData.set(
          'new-ingredients',
          JSON.stringify(
            data.ingredients.filter((ing) => ing.status && ing.status === 'new')
          )
        );
        formData.set(
          'removed-ingredients',
          JSON.stringify(removedIngredientIds)
        );

        formAction(formData);
      })(e);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Ingredients</h3>
          <Button type="button" variant="outline" onClick={handleAddIngredient}>
            Add ingredient
          </Button>
        </div>

        <div className="my-8 space-y-6 border-y border-gray-200 py-8">
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`ingredients.${index}.ingredient`}
              render={({ field: ingredient }) => (
                <FormItem>
                  <FormLabel className="sr-only"></FormLabel>
                  <FormControl>
                    <FieldArrayInput
                      type="text"
                      onRemove={() => handleRemove(index)}
                      {...ingredient}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner className="mr-2" aria-hidden="true" />}
            {isPending ? 'Updating ingredients' : 'Update ingredients'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
