'use server';

import { redirect, RedirectType } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { setCookie } from '@/lib/cookie';
import { ActionState, fromErrorToActionState } from '@/components/form/utils/action-state-utils';
import { signinSchema } from '@/features/auth/schema/sign-in';

export async function signin(_actionState: ActionState, formData: FormData) {
  try {
    const { email, password } = signinSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  const headerStore = await headers();
  const referer = headerStore.get('referer') as string;
  const url = new URL(referer);
  const redirectSearchParam = url.searchParams.get('redirect');
  const redirectPath = typeof redirectSearchParam === 'string' ? redirectSearchParam : '/';

  setCookie('toast', 'Successfully signed in');
  redirect(redirectPath, RedirectType.replace);
}
