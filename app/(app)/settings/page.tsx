import type { Metadata } from 'next';
import { UpdateEmailForm } from '@/features/settings/components/update-email-form';
import { UpdatePasswordForm } from '@/features/settings/components/update-password-form';
import { UpdateProfileForm } from '@/features/settings/components/update-profile-form';
import { AccountSettings } from '@/features/settings/components/account-settings';
import { authRedirect } from '@/features/auth/actions/auth-redirect';
import { getAuthSession } from '@/features/auth/queries/get-auth-session';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function Page() {
  const session = await getAuthSession();

  if (!session) return await authRedirect('/settings');

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
