'use client';

import { useFormStatus } from 'react-dom';
import { Prisma } from '@prisma/client';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Modal, ModalTitle } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { updateInstruction } from './lib/actions';

type Instruction = Prisma.InstructionGetPayload<{
  select: {
    id: true;
    step: true;
    instruction: true;
    recipeId: true;
  };
}>;

interface UpdateModalProps {
  open: boolean;
  onClose: () => void;
  instruction: Instruction | null;
}

export function UpdateModal({ open, onClose, instruction }: UpdateModalProps) {
  async function updateAction(formData: FormData) {
    const res = await updateInstruction(formData);
    if (res.status === 'success') onClose();
  }

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="flex justify-between items-center">
          <ModalTitle as="h3" className="text-base text-gray-900 font-semibold">
            Update instruction
          </ModalTitle>
          <button
            type="button"
            className="p-1 -m-1 rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:outline-none focus:ring-emerald-600"
            onClick={onClose}>
            <span className="sr-only">Close</span>
            <XMarkIcon className="size-5" aria-hidden="true" />
          </button>
        </div>
        <form action={updateAction}>
          <div className="mt-4 mb-8">
            <label
              htmlFor="instruction"
              className="mb-2 block text-gray-900 font-medium leading-6 sm:text-sm">
              Step {instruction?.step}
            </label>
            <Input type="hidden" name="id" value={instruction?.id} />
            <Textarea
              rows={4}
              id="instruction"
              name="instruction"
              defaultValue={instruction?.instruction}
              required
            />
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
      {pending ? 'Updating instruction' : 'Update instruction'}
      {pending && <Spinner className="ml-2 size-4" />}
    </Button>
  );
};
