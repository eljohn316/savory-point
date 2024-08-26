'use client';

import { useCallback } from 'react';
import Cookies from 'js-cookie';

export function useCookies() {
  const getCookie = useCallback(
    (cookieName: string) => Cookies.get(cookieName),
    []
  );

  const deleteCookie = useCallback(
    (cookieName: string, options?: Cookies.CookieAttributes) =>
      Cookies.remove(cookieName, options),
    []
  );

  return {
    getCookie,
    deleteCookie
  };
}
