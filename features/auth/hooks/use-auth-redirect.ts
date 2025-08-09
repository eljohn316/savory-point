import { usePathname } from 'next/navigation';
import { authRedirect as authRedirectAction } from '@/features/auth/actions/auth-redirect';

export function useAuthRedirect() {
  const pathname = usePathname();

  async function authRedirect() {
    return await authRedirectAction(pathname);
  }

  return authRedirect;
}
