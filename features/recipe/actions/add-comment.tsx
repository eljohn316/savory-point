'use server';

import { prisma } from '@/lib/prisma';

export async function addComment(formData: FormData) {
  const content = formData.get('content') as string;
  const recipeId = formData.get('recipeId') as string;
  const userId = formData.get('userId') as string;

  return await prisma.comment.create({
    data: {
      content,
      recipeId,
      userId,
    },
  });
}
