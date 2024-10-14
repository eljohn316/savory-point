'use client';

import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal, ModalCloseButton, ModalTitle } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';
import { useFormAction } from '@/hooks/use-form-action';
import { useParams } from 'next/navigation';
import { updateInstructions } from '@/lib/actions/instructions';
import { Spinner } from '@/components/ui/spinner';

type Instruction = {
  id: number;
  instruction: string;
  step: number;
  status?: string;
};

type Mode = 'add' | 'edit' | 'delete';

interface RecipeInstructionsProps {
  instructions: Instruction[];
}

export function RecipeInstructions({
  instructions: data
}: RecipeInstructionsProps) {
  const params = useParams<{ id: string }>();
  const [instructions, setInstructions] = useState<Instruction[]>(data);
  const [mode, setMode] = useState<Mode | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number | null | undefined>(null);

  const selectedInstruction = useMemo(
    () => instructions.find((item) => item.id === currentId),
    [currentId, instructions]
  );

  const { toast } = useToast();
  const { isPending, formAction, onSubmit } = useFormAction(
    updateInstructions,
    {}
  );

  function handleShowModal(mode: Mode, id?: number) {
    setMode(mode);
    setCurrentId(id);
    setShowModal(true);
  }

  function handleAddInstruction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const last = instructions.filter((ins) => ins.status !== 'deleted').at(-1);
    const newInstruction: Instruction = {
      id: last ? last.id + 1 : 1,
      step: last ? last.step + 1 : 1,
      instruction: data.get('instruction') as string,
      status: 'new'
    };

    setInstructions([...instructions, newInstruction]);
    setShowModal(false);
  }

  function handleEditInstruction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const newInstructions = instructions.map((ins) => {
      if (ins.id === selectedInstruction?.id)
        return {
          id: ins.id,
          step: ins.step,
          instruction: data.get('instruction') as string,
          status: ins.status === 'new' ? ins.status : 'updated'
        };

      return ins;
    });

    setInstructions(newInstructions);
    setShowModal(false);
  }

  function handleDeleteInstruction() {
    const instruction = instructions.find(
      (ins) => ins.id === selectedInstruction?.id
    );

    if (!instruction) {
      setShowModal(false);
      return;
    }

    if (instruction.status === 'new') {
      const newInstructions = instructions.filter(
        (ins) => ins.id !== selectedInstruction?.id
      );

      setInstructions(newInstructions);
      setShowModal(false);
    } else {
      const newInstructions = instructions.map((ins) => {
        if (ins.id === selectedInstruction?.id)
          return {
            id: ins.id,
            step: ins.step,
            instruction: ins.instruction,
            status: 'deleted'
          };

        return ins;
      });

      setInstructions(newInstructions);
      setShowModal(false);
    }
  }

  async function handleSave() {
    if (instructions.filter((ins) => ins.status).length === 0)
      toast({
        variant: 'success',
        title: 'Instructions successfully updated'
      });

    const formData = new FormData();

    formData.set('recipe-id', `${params.id}`);
    formData.set(
      'new',
      JSON.stringify(instructions.filter((ins) => ins.status === 'new'))
    );
    formData.set(
      'updated',
      JSON.stringify(instructions.filter((ins) => ins.status === 'updated'))
    );
    formData.set(
      'deleted',
      JSON.stringify(instructions.filter((ins) => ins.status === 'deleted'))
    );

    onSubmit(() => {
      formAction(formData);
    });
  }

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="flex items-center justify-between">
          <ModalTitle as="h3" className="font-semibold text-gray-900">
            {mode === 'add' && 'Add instruction'}
            {mode === 'edit' && 'Edit instruction'}
            {mode === 'delete' && 'Delete instruction'}
          </ModalTitle>
          <ModalCloseButton className="-m-1 rounded-md p-1 text-gray-400 hover:text-gray-500">
            <XMarkIcon className="size-5" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </ModalCloseButton>
        </div>

        {mode === 'add' && (
          <form className="mt-6 space-y-6" onSubmit={handleAddInstruction}>
            <Textarea name="instruction" required />
            <div className="flex justify-end">
              <Button type="submit">Add instruction</Button>
            </div>
          </form>
        )}

        {mode === 'edit' && (
          <form className="mt-6 space-y-6" onSubmit={handleEditInstruction}>
            <Textarea
              name="instruction"
              defaultValue={selectedInstruction?.instruction}
              required
            />
            <div className="flex justify-end">
              <Button type="submit">Edit instruction</Button>
            </div>
          </form>
        )}

        {mode === 'delete' && (
          <div className="mt-6 space-y-6">
            <p className="text-gray-700">
              Are you sure you want to delete this instruction?
            </p>
            <div className="flex justify-end">
              <Button variant="danger" onClick={handleDeleteInstruction}>
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Recipe Instructions</h3>
        <Button variant="outline" onClick={() => handleShowModal('add')}>
          Add instruction
        </Button>
      </div>

      <div className="my-8 divide-y divide-gray-200 border-y border-gray-200 py-6">
        {instructions
          .filter((ins) => ins.status !== 'deleted')
          .map(({ id, instruction, step }) => (
            <div key={step} className="flex gap-x-6 py-4 first:pt-0 last:pb-0">
              <div className="flex-none">
                <p className="text-sm font-medium text-gray-700">Step {step}</p>
              </div>
              <div className="flex-auto">
                <p className="text-sm text-gray-900">{instruction}</p>
              </div>
              <div className="flex-none space-x-4">
                <button
                  type="button"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                  onClick={() => handleShowModal('edit', id)}>
                  Edit
                </button>
                <button
                  type="button"
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                  onClick={() => handleShowModal('delete', id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-end">
        <Button variant="primary" onClick={handleSave} disabled={isPending}>
          {isPending && <Spinner className="mr-2 size-4" />}
          {isPending ? 'Saving changes' : 'Save changes'}
        </Button>
      </div>
    </>
  );
}
