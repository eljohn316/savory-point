/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import { cookies, headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { isWithinExpirationDate } from 'oslo';
import { generateIdFromEntropySize } from 'lucia';

import { db } from '@/lib/db';
import { sendPasswordResetToken } from '@/lib/email';
import {
  createPasswordResetToken,
  createTokenHash,
  createUserSession,
  hashPassword,
  validateRequest,
  verifyPassword
} from '@/lib/auth';
import { createUserAvatar } from '@/lib/utils';
import { createAccountSchema } from '@/lib/schema/create-account';
import { signInSchema } from '@/lib/schema/sign-in';
import { forgotPasswordSchema } from '@/lib/schema/forgot-password';
import { newPasswordSchema } from '@/lib/schema/new-password';
import { lucia } from '@/lib/lucia';
import { ActionResponse } from '@/lib/types';

type CreateAccountInput = z.infer<typeof createAccountSchema>;

export async function createAccount(
  _: any,
  formData: FormData
): Promise<ActionResponse<CreateAccountInput>> {
  const { success, data, error } = createAccountSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    const err = error.flatten();

    return {
      success: false,
      errors: {
        email: err.fieldErrors.email?.at(0),
        firstName: err.fieldErrors.firstName?.at(0),
        lastName: err.fieldErrors.lastName?.at(0),
        password: err.fieldErrors.password?.at(0),
        confirmPassword: err.fieldErrors.confirmPassword?.at(0)
      }
    };
  }

  const emailTaken = await db.user.findUnique({
    where: {
      email: data.email
    }
  });

  if (emailTaken) {
    return {
      success: false,
      errors: {
        email: 'Email already taken'
      }
    };
  }

  const hashedPassword = await hashPassword(data.password);

  try {
    const newUser = await db.user.create({
      data: {
        id: generateIdFromEntropySize(10),
        defaultImage: createUserAvatar(data.firstName, data.lastName),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword
      }
    });

    await createUserSession(newUser.id);
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong! Could not create account');
  }

  cookies().set(
    'toast-message',
    JSON.stringify({
      variant: 'success',
      title: 'Welcome to Savory Point'
    })
  );

  revalidatePath('/');
  redirect('/');
}

type SignInput = z.infer<typeof signInSchema>;

export async function signIn(
  _: any,
  formData: FormData
): Promise<ActionResponse<SignInput>> {
  const { success, data, error } = signInSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    const err = error.flatten();
    return {
      success: false,
      errors: {
        email: err.fieldErrors.email?.at(0),
        password: err.fieldErrors.password?.at(0)
      }
    };
  }

  const user = await db.user.findUnique({
    where: {
      email: data.email
    }
  });

  if (!user)
    return {
      success: false,
      message: 'Invalid email or password'
    };

  const passwordValid = await verifyPassword(user.password, data.password);

  if (!passwordValid) {
    return {
      success: false,
      message: 'Invalid email or password'
    };
  }

  await createUserSession(user.id);

  cookies().set(
    'toast-message',
    JSON.stringify({
      variant: 'success',
      title: 'Successfully logged in',
      description: `Welcome back, ${user.firstName}`
    })
  );

  const headerList = headers();
  const url = new URL(headerList.get('referer') as string);
  const redirectUrl = url.searchParams.get('redirect');

  redirect(typeof redirectUrl === 'string' ? redirectUrl : '/');
}

type ResetPasswordInput = z.infer<typeof forgotPasswordSchema>;

export async function resetPassword(
  _: any,
  formData: FormData
): Promise<ActionResponse<ResetPasswordInput>> {
  const { success, data, error } = forgotPasswordSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    const err = error.flatten();

    return {
      success: false,
      errors: {
        email: err.fieldErrors.email?.at(0)
      }
    };
  }

  const user = await db.user.findUnique({
    where: {
      email: data.email
    }
  });

  if (!user) {
    return {
      success: false,
      message: 'Invalid email address'
    };
  }

  const verificationToken = await createPasswordResetToken(user.id);
  const verificationLink = `${headers().get('origin')}/forgot-password/${verificationToken}`;

  await sendPasswordResetToken(user, verificationLink);

  return {
    success: true,
    message: 'An email has been sent to you with a link to reset your password.'
  };
}

type SetNewPasswordInput = z.infer<typeof newPasswordSchema>;

export async function setNewPassword(
  verificationToken: string,
  _: any,
  formData: FormData
): Promise<ActionResponse<SetNewPasswordInput>> {
  const { success, data, error } = newPasswordSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    const err = error.flatten();

    return {
      success: false,
      errors: {
        password: err.fieldErrors.password?.at(0),
        confirmPassword: err.fieldErrors.confirmPassword?.at(0)
      }
    };
  }

  const tokenHash = await createTokenHash(verificationToken);
  const token = await db.passwordResetToken.findUnique({
    where: { tokenHash }
  });

  if (token) {
    await db.passwordResetToken.delete({
      where: {
        tokenHash
      }
    });
  }

  if (!token || !isWithinExpirationDate(token.expiresAt)) {
    return {
      success: false,
      message:
        "Sorry, your token has expired. We'll need to send you a new password reset link."
    };
  }

  await lucia.invalidateUserSessions(token.userId);

  const hashedPassword = await hashPassword(data.password);
  await db.user.update({
    where: { id: token.userId },
    data: {
      password: hashedPassword
    }
  });

  await createUserSession(token.userId);

  return {
    success: true,
    message: 'Your password has been successfully updated'
  };
}

export async function signOut(): Promise<{
  success?: boolean;
  message?: string;
}> {
  const { session } = await validateRequest();

  if (!session)
    return {
      success: false,
      message: 'Unauthorized'
    };

  await new Promise((resolve) => setTimeout(resolve, 2000));

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  revalidatePath('/');

  return {
    success: true,
    message: 'You have successfully logged out'
  };
}
