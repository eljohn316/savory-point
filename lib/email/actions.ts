'use server';

import { headers } from 'next/headers';
import { User } from '@/lib/auth-client';
import { sendPasswordResetLink } from '@/lib/email';

export async function requestPasswordReset(user: User, token: string) {
  const headerStore = await headers();
  const link = `${headerStore.get('origin')}/reset-password/${token}`;
  await sendPasswordResetLink(user, link);
}
