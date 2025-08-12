'use client';

import { Form } from '@/components/form/form';
import { Ingredient } from '@/features/recipe/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { FieldListWrapper } from '@/components/field-list-wrapper';
import { FormField } from '@/components/form/form-field';
import { FormItem } from '@/components/form/form-item';
import { FormLabel } from '@/components/form/form-label';
import { FormControl } from '@/components/form/form-control';
import { Input } from '@/components/ui/input';
import { XIcon } from 'lucide-react';
import { FormMessage } from '@/components/form/form-message';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/auth-client';
import { authRedirect } from '@/features/auth/actions/auth-redirect';
import { startTransition, useActionState } from 'react';
import { useParams } from 'next/navigation';
import { updateRecipeClientSchema } from '@/features/my-recipes/schema/update-recipe';
import { z } from 'zod';
import { updateRecipeIngredients } from '../actions/update-recipe';
import { INITIAL_ACTION_STATE } from '@/components/form/utils/action-state-utils';
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback';
import { errorToast, successToast } from '@/components/ui/sonner';
import { renderFormErrors } from '@/components/form/utils/render-form-errors';

type UpdateRecipeIngredientsProps = {
  ingredients: Ingredient[];
};

const schema = updateRecipeClientSchema.pick({ ingredients: true });
type SchemaValues = z.infer<typeof schema>;

export function UpdateRecipeIngredientsForm({ ingredients }: UpdateRecipeIngredientsProps) {
  const form = useForm<SchemaValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ingredients,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });
  const { id: recipeId } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const [actionState, action, isPending] = useActionState(
    updateRecipeIngredients.bind(null, recipeId),
    INITIAL_ACTION_STATE,
  );

  useActionFeedback(actionState, {
    onSuccess: ({ message }) => {
      successToast(message);
    },
    onError: ({ message }) => {
      errorToast(message);
    },
    onFail: ({ fieldErrors }) => {
      renderFormErrors(fieldErrors, form);
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!session) return await authRedirect(`/my-recipes/uploads/${recipeId}/update`);

    form.handleSubmit((data) => {
      startTransition(() => {
        const formData = new FormData();
        formData.append('ingredients', JSON.stringify(data.ingredients));
        action(formData);
      });
    })(e);
  }

  return (
    <Form {...form}>
      <form action={action} onSubmit={handleSubmit}>
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
                        <Input placeholder="1 tbsp olive oil" disabled={isPending} {...field} />
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
        <div className="mt-10">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving changes...' : 'Save changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
