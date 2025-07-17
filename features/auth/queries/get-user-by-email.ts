'use server';

import { prisma } from '@/lib/prisma';

export async function getUserbyEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}
