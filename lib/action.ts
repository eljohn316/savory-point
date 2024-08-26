'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/auth';
import { lucia } from '@/lib/lucia';

export async function signOutAction() {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  cookies().set('toast-message', 'You have successfully logged out!');

  redirect('/sign-in');
}
