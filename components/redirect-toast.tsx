'use client';

import cookies from 'js-cookie';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { errorToast, successToast } from '@/components/ui/sonner';
import { TOAST_COOKIE_KEY } from '@/lib/constants';

type Toast = {
  type: 'success' | 'error';
  message: string;
};

export function RedirectToast() {
  const pathname = usePathname();

  useEffect(() => {
    const toastCookie = cookies.get(TOAST_COOKIE_KEY);

    if (!toastCookie) return;

    const toast = JSON.parse(toastCookie) as Toast;

    if (toast.type === 'success') {
      successToast(toast.message);
    } else {
      errorToast(toast.message);
    }

    cookies.remove(TOAST_COOKIE_KEY);
  }, [pathname]);

  return null;
}
