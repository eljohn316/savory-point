'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type AddCommentPayload = {
  content: string;
  recipeId: string;
  userId: string;
};
export async function addComment(payload: AddCommentPayload, pathToRevalidate: string) {
  const { content, recipeId, userId } = payload;

  await prisma.comment.create({
    data: {
      content,
      recipeId,
      userId,
    },
  });

  revalidatePath(pathToRevalidate);
}
