'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getToastCookie, deleteToastCookie } from '@/lib/toast-cookies';
import { errorToast, successToast } from '@/components/ui/sonner';

export function RedirectToast() {
  const pathname = usePathname();

  useEffect(() => {
    const showCookieToast = async () => {
      const toast = await getToastCookie();

      if (!toast) return;

      if (toast.type === 'success') {
        successToast(toast.message);
      } else {
        errorToast(toast.message);
      }

      await deleteToastCookie();
    };

    showCookieToast();
  }, [pathname]);

  return null;
}
