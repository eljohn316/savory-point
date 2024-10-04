import type { Metadata } from 'next';
import Link from 'next/link';
import { CreateAccountForm } from './create-account-form';

export const metadata: Metadata = { title: 'Create account' };

export default async function Page() {
  return (
    <div className="w-full max-w-md space-y-10">
      <div className="text-center">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          Create Account
        </h2>
      </div>
      <CreateAccountForm />
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500">
            Sign in
          </Link>{' '}
          here
        </p>
      </div>
    </div>
  );
}
