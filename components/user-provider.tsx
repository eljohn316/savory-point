'use client';

import * as React from 'react';

type User = {
  id: string;
  name: string;
  emailVerified: boolean;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
  firstName: string;
  lastName: string;
  defaultImage: string;
};

const UserContext = React.createContext<{ user: User } | null>(null);

type UserProviderProps = {
  user: User;
  children: React.ReactNode;
};

export function UserProvider({ user, children }: UserProviderProps) {
  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a <UserProvider /> component');
  return context;
}
