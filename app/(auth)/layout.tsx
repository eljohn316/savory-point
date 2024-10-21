import React from 'react';
import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/auth';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const { user } = await validateRequest();

  if (user) redirect('/');

  return (
    <div className="flex items-start justify-center px-4 pb-6 pt-16 lg:px-8">
      {children}
    </div>
  );
}
