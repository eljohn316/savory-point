import type { Metadata } from 'next';
import { SigninForm } from '@/features/auth/components/signin-form';

export const metadata: Metadata = {
  title: 'Sign in',
};

export default function Page() {
  return <SigninForm />;
}
