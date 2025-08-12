'use client';

import { z } from 'zod';
import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from '@/lib/auth-client';
import { Form } from '@/components/form/form';
import { FormField } from '@/components/form/form-field';
import { FormItem } from '@/components/form/form-item';
import { FormLabel } from '@/components/form/form-label';
import { FormControl } from '@/components/form/form-control';
import { FormMessage } from '@/components/form/form-message';
import { INITIAL_ACTION_STATE } from '@/components/form/utils/action-state-utils';
import { renderFormErrors } from '@/components/form/utils/render-form-errors';
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback';
import { Input } from '@/components/ui/input';
import { NumInput, NumInputField } from '@/components/ui/num-input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { errorToast, successToast } from '@/components/ui/sonner';
import { authRedirect } from '@/features/auth/actions/auth-redirect';
import { updateRecipeClientSchema } from '@/features/my-recipes/schema/update-recipe';
import { updateRecipeDetails } from '@/features/my-recipes/actions/update-recipe';
import { getUploadedRecipe } from '@/features/my-recipes/queries/get-uploaded-recipe';

type UpdateRecipeDetailsFormProps = {
  recipe: NonNullable<Awaited<ReturnType<typeof getUploadedRecipe>>>;
};

const schema = updateRecipeClientSchema.pick({
  name: true,
  summary: true,
  servings: true,
  cooking: true,
  total: true,
  preparation: true,
});

type SchemaValues = z.infer<typeof schema>;

export function UpdateRecipeDetailsForm({ recipe }: UpdateRecipeDetailsFormProps) {
  const form = useForm<SchemaValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: recipe.name,
      summary: recipe.summary,
      servings: recipe.servings,
      preparation: recipe.preparation,
      cooking: recipe.cooking,
      total: recipe.preparation + recipe.cooking,
    },
  });

  const { id: recipeId } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const [actionState, action, isPending] = useActionState(
    updateRecipeDetails.bind(null, recipeId),
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
        formData.append('name', data.name);
        formData.append('summary', data.summary);
        formData.append('servings', `${data.servings}`);
        formData.append('cooking', `${data.cooking}`);
        formData.append('preparation', `${data.preparation}`);
        formData.append('total', `${data.preparation + data.cooking}`);
        action(formData);
      });
    })(e);
  }

  return (
    <Form {...form}>
      <form action={action} onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-gray-700">Update recipe</h2>
        <h3 className="mt-10 text-lg font-bold text-green-900">Recipe details</h3>
        <div className="mt-6">
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
                name="preparation"
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
                name="cooking"
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
          <div className="mt-10">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving changes...' : 'Save changes'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
