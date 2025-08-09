'use server';

import { auth } from '@/lib/auth';
import { setCookie } from '@/lib/cookie';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signout() {
  await auth.api.signOut({ headers: await headers() });
  await setCookie('toast', 'Successfully signed out');
  redirect('/sign-in');
}
