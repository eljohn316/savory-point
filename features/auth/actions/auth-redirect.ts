'use server';

import { redirect } from 'next/navigation';
import { setCookie } from '@/lib/cookie';

export async function authRedirect(redirectToPath: string) {
  await setCookie('toast', 'You need to sign in first!');
  redirect(`/sign-in?redirect=${redirectToPath}`);
}
