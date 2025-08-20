import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { hashPassword, verifyPassword } from '@/lib/password';
import { requestPasswordReset } from '@/lib/email/actions';
import { type User } from '@/lib/auth-client';
import { prisma } from '@/lib/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password: string) => await hashPassword(password),
      verify: async ({ hash, password }) => await verifyPassword(hash, password),
    },
    sendResetPassword: async ({ user, token }) => {
      await requestPasswordReset(user as User, token);
    },
  },
  user: {
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
    },
    additionalFields: {
      firstName: {
        type: 'string',
        required: true,
        fieldName: 'firstName',
        returned: true,
      },
      lastName: {
        type: 'string',
        required: true,
        fieldName: 'lastName',
        returned: true,
      },
      defaultImage: {
        type: 'string',
        required: true,
        fieldName: 'defaultImage',
        returned: true,
      },
      bio: {
        type: 'string',
        required: false,
        fieldName: 'bio',
        returned: true,
      },
    },
    fields: {
      image: 'image',
      defaultImage: 'defaultImage',
      imagePublicId: 'imagePublicId',
      firstName: 'firstName',
      lastName: 'lastName',
      name: 'name',
      email: 'email',
      bio: 'bio',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      emailVerified: 'emailVerified',
    },
  },
  advanced: {
    cookiePrefix: 'savorypoint',
  },
  plugins: [nextCookies()],
});
