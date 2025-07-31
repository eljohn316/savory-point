import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirectToast } from '@/lib/actions';
import { auth } from '@/lib/auth';
import { UpdateEmailForm } from '@/features/settings/components/update-email-form';
import { UpdatePasswordForm } from '@/features/settings/components/update-password-form';
import { UpdateProfileForm } from '@/features/settings/components/update-profile-form';
import { AccountSettings } from '@/features/settings/components/account-settings';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return redirectToast('/sign-in', 'Sign in to continue');

  return (
    <>
      <div className="space-y-28">
        <UpdateProfileForm user={session.user} />
        <UpdateEmailForm email={session.user.email} />
        <UpdatePasswordForm />
        <AccountSettings />
      </div>
    </>
  );
}
