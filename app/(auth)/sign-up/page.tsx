import type { Metadata } from 'next';
import { SignupForm } from '@/features/auth/components/signup-form';

export const metadata: Metadata = {
  title: 'Sign up',
};

export default function Page() {
  return <SignupForm />;
}
