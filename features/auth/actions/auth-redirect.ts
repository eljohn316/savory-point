'use server';

import { redirect } from 'next/navigation';
import { setToastCookie } from '@/lib/toast-cookies';

export async function authRedirect(redirectToPath: string) {
  await setToastCookie({ type: 'error', message: 'Please sign in to continue' });
  redirect(`/sign-in?redirect=${redirectToPath}`);
}
