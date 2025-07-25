'use server';

import { redirect } from 'next/navigation';
import { setCookie } from '@/lib/cookie';

export async function redirectToast(path: string, message: string): Promise<never> {
  await setCookie('toast', message);
  redirect(path);
}
