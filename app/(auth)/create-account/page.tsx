import type { Metadata } from 'next';
import { CreateAccountForm } from './create-account-form';

export const metadata: Metadata = {
  title: 'Create account'
};

export default function Page() {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create your account
      </h2>
      <div className="mt-8">
        <CreateAccountForm />
      </div>
    </div>
  );
}
