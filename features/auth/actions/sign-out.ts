'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { setToastCookie } from '@/lib/toast-cookies';

export async function signout() {
  await auth.api.signOut({ headers: await headers() });
  await setToastCookie({ type: 'success', message: 'Successfully signed out' });
  redirect('/sign-in');
}
