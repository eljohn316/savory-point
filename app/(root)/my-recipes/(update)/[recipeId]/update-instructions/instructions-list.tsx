'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Prisma } from '@prisma/client';
import { AddInstructionButton } from './add-instruction-button';
import { DeleteModal } from './delete-modal';
import { UpdateModal } from './update-modal';

type Instruction = Prisma.InstructionGetPayload<{
  select: {
    id: true;
    step: true;
    instruction: true;
    recipeId: true;
  };
}>;

interface InstructionsListProps {
  instructions: Instruction[];
}

export function InstructionsList({ instructions }: InstructionsListProps) {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const [selectedInstruction, setSelectedInstruction] =
    useState<Instruction | null>(null);

  function handleShowUpdateModal(id: number) {
    const instruction = instructions.find((ins) => ins.id === id);
    if (!instruction) return;

    setShowUpdateModal(true);
    setSelectedInstruction(instruction);
  }

  function handleShowDeleteModal(id: number) {
    const instruction = instructions.find((ins) => ins.id === id);
    if (!instruction) return;

    setShowDeleteModal(true);
    setSelectedInstruction(instruction);
  }

  return (
    <div>
      <UpdateModal
        open={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        instruction={selectedInstruction}
      />

      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        instruction={selectedInstruction!}
      />

      <div className="border-b border-gray-200 pb-6 flex items-center justify-between mb-8">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Ingredients
        </h3>
        <div>
          <AddInstructionButton instructions={instructions} />
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {instructions.map(({ id, instruction, step }) => (
          <div key={id} className="py-5 first:pt-0 last:pb-0">
            <div className="sm:grid sm:grid-cols-[auto_1fr_auto] sm:gap-x-4 lg:gap-x-8">
              <div className="text-gray-500 font-medium sm:text-sm">
                Step {step}
              </div>
              <div className="mt-1 mb-4 sm:mt-0 sm:mb-0">
                <p className="text-gray-900 font-medium sm:text-sm">
                  {instruction}
                </p>
              </div>
              <div className="space-x-4">
                <button
                  type="button"
                  className="p-1 -m-1 text-emerald-600 font-medium rounded-md hover:text-emerald-600/90 focus:outline-none focus:ring-2 focus:ring-emerald-600 sm:text-sm"
                  onClick={() => handleShowUpdateModal(id)}>
                  Edit
                </button>
                <button
                  type="button"
                  className="p-1 -m-1 text-red-600 font-medium rounded-md hover:text-red-600/90 focus:outline-none focus:ring-2 focus:ring-red-600 sm:text-sm"
                  onClick={() => handleShowDeleteModal(id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
