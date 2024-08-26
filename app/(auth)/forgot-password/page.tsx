import type { Metadata } from 'next';
import { ForgotPasswordForm } from './forgot-password-form';

export const metadata: Metadata = {
  title: 'Forgot password'
};

export default function Page() {
  return (
    <div className="w-full max-w-sm">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Forgot your password?
      </h2>
      <div className="mt-8">
        <ForgotPasswordForm />;
      </div>
    </div>
  );
}
