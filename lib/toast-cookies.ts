'use server';

import { cookies } from 'next/headers';
import { TOAST_COOKIE_KEY } from '@/lib/constants';

type CookieToast = {
  type: 'success' | 'error';
  message: string;
  scroll?: boolean;
};

export async function getToastCookie(): Promise<CookieToast | undefined> {
  const cookieStore = await cookies();
  const existingCookie = cookieStore.get(TOAST_COOKIE_KEY);

  if (!existingCookie) return;

  return JSON.parse(existingCookie.value);
}

export async function setToastCookie(toast: CookieToast) {
  const cookieStore = await cookies();
  cookieStore.set(TOAST_COOKIE_KEY, JSON.stringify(toast));
}

export async function deleteToastCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(TOAST_COOKIE_KEY);
}
