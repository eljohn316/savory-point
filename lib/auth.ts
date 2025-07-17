import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { prisma } from '@/lib/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
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
    },
    fields: {
      image: 'image',
      defaultImage: 'defaultImage',
      firstName: 'firstName',
      lastName: 'lastName',
      name: 'name',
      email: 'email',
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
