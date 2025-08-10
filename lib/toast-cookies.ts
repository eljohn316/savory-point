'use server';

import { cookies } from 'next/headers';

const COOKIE_STORE_KEY = 'toast-message';

type CookieToast = {
  type: 'success' | 'error';
  message: string;
};

export async function getToastCookie(): Promise<CookieToast | undefined> {
  const cookieStore = await cookies();
  const existingCookie = cookieStore.get(COOKIE_STORE_KEY);

  if (!existingCookie) return;

  return JSON.parse(existingCookie.value);
}

export async function setToastCookie({ type, message }: CookieToast) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_STORE_KEY, JSON.stringify({ type, message }));
}

export async function deleteToastCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_STORE_KEY);
}
