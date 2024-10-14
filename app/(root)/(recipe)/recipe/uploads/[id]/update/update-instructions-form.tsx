'use client';

import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Prisma } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';

import { useFormAction } from '@/hooks/use-form-action';
import { useToast } from '@/hooks/use-toast';
import { updateRecipeInstructions } from '@/lib/actions/recipe';
import { range } from '@/lib/utils';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Textarea as TextareaBase } from '@/components/ui/textarea';

interface UpdateInstructionsFormProps {
  recipe: Prisma.RecipeGetPayload<{
    select: {
      id: true;
      instructions: {
        orderBy: { step: 'asc' };
        select: {
          id: true;
          step: true;
          instruction: true;
        };
      };
    };
  }>;
}

const schema = z.object({
  instructions: z
    .object({
      instructionId: z.number().optional(),
      instruction: z.string().trim().min(1, 'Instruction is required'),
      step: z.number(),
      status: z.literal('new').optional()
    })
    .array()
    .nonempty({ message: 'Recipe must atleast have one instruction' })
});

type TSchema = z.infer<typeof schema>;

export function UpdateInstructionsForm({
  recipe
}: UpdateInstructionsFormProps) {
  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      instructions: recipe.instructions.map((ins) => ({
        instructionId: ins.id,
        instruction: ins.instruction,
        step: ins.step
      }))
    }
  });

  const [removedIds, setRemovedIds] = useState<number[]>([]);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'instructions'
  });

  const { toast } = useToast();
  const { isPending, formAction, formState, onSubmit } = useFormAction(
    updateRecipeInstructions.bind(null, recipe.id),
    {}
  );

  useEffect(() => {
    if (formState.success) {
      setRemovedIds([]);
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

  function handleAddInstruction() {
    append({ step: fields.at(-1)!.step + 1, instruction: '', status: 'new' });
  }

  function handleRemove(index: number) {
    const field = fields.at(index);
    if (!field) return;

    remove(index);

    if (!field.instructionId) return;
    setRemovedIds([...removedIds, field.instructionId]);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();

    onSubmit(() => {
      form.handleSubmit((data) => {
        formData.set('removed-ids', JSON.stringify(removedIds));
        formData.set(
          'instruction-length',
          JSON.stringify(data.instructions.length)
        );

        range(data.instructions.length).forEach((item) => {
          formData.set(
            `instruction-${item}`,
            JSON.stringify(data.instructions.at(item) ?? '')
          );
        });

        formAction(formData);
      })(e);
    });
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between border-b pb-6">
        <h3 className="text-base font-semibold">Instruction</h3>
        <Button type="button" variant="outline" onClick={handleAddInstruction}>
          Add instruction
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`instructions.${index}.instruction`}
                render={({ field: instruction }) => {
                  const showRemove =
                    fields.length > 1 && fields.length - 1 === index;

                  return (
                    <FormItem>
                      <FormLabel>Step {field.step}</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          showRemove={showRemove}
                          onRemove={() => handleRemove(index)}
                          {...instruction}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <div className="mt-10">
            <Button disabled={isPending}>
              {isPending && <Spinner className="mr-2" aria-hidden="true" />}
              {isPending ? 'Updating instructions' : 'Update instructions'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface TextareaProps
  extends React.ComponentPropsWithoutRef<typeof TextareaBase> {
  onRemove?: () => void;
  showRemove: boolean;
}

const Textarea = React.forwardRef<
  React.ElementRef<typeof TextareaBase>,
  TextareaProps
>(function Textarea({ onRemove, showRemove, ...props }, ref) {
  return (
    <div className="relative">
      <TextareaBase ref={ref} {...props} />
      {showRemove && (
        <div className="absolute inset-y-0 right-0 my-1.5 border-l border-gray-300">
          <button
            type="button"
            className="px-1 text-gray-400 hover:text-gray-500"
            onClick={onRemove}>
            <XMarkIcon className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
});
