'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { deleteCookieByKey, getCookieByKey } from '@/lib/cookie';
import { successToast } from '@/components/ui/sonner';

export function RedirectToast() {
  const pathname = usePathname();

  useEffect(() => {
    const showCookieToast = async () => {
      const toast = await getCookieByKey('toast');
      if (toast) {
        successToast(toast);
      }
      await deleteCookieByKey('toast');
    };

    showCookieToast();
  }, [pathname]);

  return null;
}
