'use client';

import React, { useEffect, useState } from 'react';
import { Prisma } from '@prisma/client';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Modal, ModalTitle } from '@/components/ui/modal';
import { addInstruction } from './lib/actions';
import { Textarea } from '@/components/ui/textarea';
import { useFormState, useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

type Instruction = Prisma.InstructionGetPayload<{
  select: {
    id: true;
    step: true;
    instruction: true;
    recipeId: true;
  };
}>;

interface AddInstructionButtonProps {
  instructions: Instruction[];
}

export function AddInstructionButton({
  instructions
}: AddInstructionButtonProps) {
  const params = useParams<{ recipeId: string }>();
  const [open, setOpen] = useState<boolean>(false);
  const [formState, formAction] = useFormState(
    addInstruction.bind(null, params.recipeId),
    { message: '' }
  );

  useEffect(() => {
    if (formState.status === 'success') setOpen(false);
  }, [formState]);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Add instruction
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex justify-between items-center">
          <ModalTitle as="h3" className="text-base text-gray-900 font-semibold">
            Add instruction
          </ModalTitle>
          <button
            type="button"
            className="p-1 -m-1 rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:outline-none focus:ring-emerald-600"
            onClick={() => setOpen(false)}>
            <span className="sr-only">Close</span>
            <XMarkIcon className="size-5" aria-hidden="true" />
          </button>
        </div>
        <form action={formAction}>
          <div className="mt-4 mb-8">
            <label
              htmlFor="instruction"
              className="mb-2 block text-gray-900 font-medium leading-6 sm:text-sm">
              Step {instructions.length + 1}
            </label>
            <Input type="hidden" name="step" value={instructions.length + 1} />
            <Textarea rows={4} id="instruction" name="instruction" required />
          </div>
          <SubmitButton />
        </form>
      </Modal>
    </>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Adding instruction' : 'Add instruction'}
      {pending && <Spinner className="ml-2 size-4" />}
    </Button>
  );
};
