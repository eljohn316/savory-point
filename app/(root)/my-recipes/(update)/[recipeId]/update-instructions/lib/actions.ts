'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

type PrevState = {
  status?: 'success' | 'fail';
  message?: string;
  timestamp?: number;
};

export async function addInstruction(
  recipeId: string,
  prevState: PrevState,
  data: FormData
): Promise<PrevState> {
  try {
    const step = data.get('step') as string;
    const instruction = data.get('instruction') as string;

    await db.instruction.create({
      data: {
        step: +step,
        instruction,
        recipeId
      }
    });
  } catch (error) {
    return {
      status: 'fail',
      message: 'Could not create instruction'
    };
  }

  cookies().set('toast-message', 'Instruction successfully added');
  revalidatePath(`/my-recipes/${recipeId}/update-instructions`);

  return {
    status: 'success',
    timestamp: Date.now()
  };
}

export async function deleteInstruction(instructionId: number) {
  try {
    const instruction = await db.instruction.delete({
      where: {
        id: instructionId
      }
    });
    revalidatePath(`/my-recipes/${instruction.recipeId}/update-instructions`);
    cookies().set('toast-message', 'Instruction successfully deleted');
  } catch (error) {
    throw new Error('Could not delete recipe');
  }
}

export async function updateInstruction(formData: FormData) {
  try {
    const id = formData.get('id') as string;
    const instruction = formData.get('instruction') as string;

    const recipe = await db.instruction.update({
      where: {
        id: +id
      },
      data: {
        instruction
      }
    });

    revalidatePath(`/my-recipes/${recipe.recipeId}/update-instructions`);
  } catch (error) {
    return {
      status: 'fail',
      message: 'Could not update instruction'
    };
  }

  cookies().set('toast-message', 'Instruction successfully added');

  return {
    status: 'success',
    timestamp: Date.now()
  };
}
