import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { auth } from '@/lib/auth';

export const { useSession, ...authClient } = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

export type Session = typeof authClient.$Infer.Session;
export type User = Session['user'];
