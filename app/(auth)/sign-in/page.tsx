import type { Metadata } from 'next';
import { SignInForm } from '@/app/(auth)/sign-in/sign-in-form';

export const metadata: Metadata = {
  title: 'Sign in'
};

export default function Page() {
  return (
    <div className="w-full max-w-sm">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <div className="mt-8">
        <SignInForm />
      </div>
    </div>
  );
}
