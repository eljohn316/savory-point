'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { generateDefaultUserAvatar } from '@/lib/utils';
import { ActionState, fromErrorToActionState } from '@/components/form/utils/action-state-utils';
import { signupSchema } from '@/features/auth/schema/sign-up';
import { setToastCookie } from '@/lib/toast-cookies';

export async function signup(_actionState: ActionState, formData: FormData) {
  try {
    const { firstName, lastName, email, password } = await signupSchema.parseAsync({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    await auth.api.signUpEmail({
      body: {
        defaultImage: generateDefaultUserAvatar({ firstName, lastName }),
        email,
        firstName,
        lastName,
        name: firstName + ' ' + lastName,
        password,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  await setToastCookie({ type: 'success', message: 'Account successfully created' });
  redirect('/');
}
