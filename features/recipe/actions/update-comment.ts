'use server';

import { prisma } from '@/lib/prisma';

export async function updateComment(id: string, content: string) {
  return await prisma.comment.update({ where: { id }, data: { content } });
}
