'use client';

import { Form } from '@/components/form/form';
import { startTransition, useActionState } from 'react';
import { useParams } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { XIcon } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldListWrapper } from '@/components/field-list-wrapper';
import { FormField } from '@/components/form/form-field';
import { FormItem } from '@/components/form/form-item';
import { FormLabel } from '@/components/form/form-label';
import { FormControl } from '@/components/form/form-control';
import { FormMessage } from '@/components/form/form-message';
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback';
import { renderFormErrors } from '@/components/form/utils/render-form-errors';
import { errorToast, successToast } from '@/components/ui/sonner';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/auth-client';
import { authRedirect } from '@/features/auth/actions/auth-redirect';
import { INITIAL_ACTION_STATE } from '@/components/form/utils/action-state-utils';
import { updateRecipeClientSchema } from '@/features/my-recipes/schema/update-recipe';
import { Instruction } from '@/features/recipe/types';
import { updateRecipeInstructions } from '@/features/my-recipes/actions/update-recipe';

type UpdateRecipeIngredientsProps = {
  instructions: Instruction[];
};

const schema = updateRecipeClientSchema.pick({ instructions: true });
type SchemaValues = z.infer<typeof schema>;

export function UpdateRecipeInstructionsForm({ instructions }: UpdateRecipeIngredientsProps) {
  const form = useForm<SchemaValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      instructions,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'instructions',
  });
  const { id: recipeId } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const [actionState, action, isPending] = useActionState(
    updateRecipeInstructions.bind(null, recipeId),
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
        formData.append('instructions', JSON.stringify(data.instructions));
        action(formData);
      });
    })(e);
  }

  return (
    <Form {...form}>
      <form action={action} onSubmit={handleSubmit}>
        <FieldListWrapper
          onAddField={() => append({ step: fields.at(-1)!.step + 1, instruction: '' })}>
          <h3 className="text-lg font-bold text-green-900">Instructions</h3>
          <div className="space-y-4">
            {fields.map(({ id }, index) => (
              <FormField
                key={id}
                name={`instructions.${index}.instruction` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instruction #{index + 1}</FormLabel>
                    <div className="flex items-center gap-x-3">
                      <FormControl>
                        <Textarea
                          placeholder="Heat olive oil in a large pan over medium heat."
                          disabled={isPending}
                          {...field}
                        />
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
