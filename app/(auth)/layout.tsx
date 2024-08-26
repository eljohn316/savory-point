import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/auth';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const { session } = await validateRequest();

  if (session) return redirect('/');

  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
