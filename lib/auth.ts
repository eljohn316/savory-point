import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { prisma } from '@/lib/prisma';
import { hashPassword, verifyPassword } from '@/lib/password';

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
  },
  user: {
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
