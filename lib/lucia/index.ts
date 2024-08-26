import { Lucia } from 'lucia';
import { adapter } from '@/lib/lucia/adapter';

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production'
    }
  },
  getUserAttributes: (attributes) => {
    return {
      image: attributes.image,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      email: attributes.email,
      emailVerified: attributes.emailVerified,
      dateJoined: attributes.dateJoined
    };
  }
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  image?: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: string;
  dateJoined: Date;
}
