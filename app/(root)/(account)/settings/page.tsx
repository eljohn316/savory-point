import type { Metadata } from 'next';
import { UpdatePasswordForm } from './update-password-form';
import { DeleteAccountModal } from './delete-account-modal';

export const metadata: Metadata = { title: 'Settings' };

export default function Page() {
  return (
    <div className="space-y-16 divide-y divide-gray-300">
      <div>
        <h3 className="mb-10 text-base font-semibold text-gray-900">
          Update password
        </h3>
        <UpdatePasswordForm />
      </div>
      <div className="pt-16">
        <h3 className="mb-10 text-base font-semibold text-gray-900">
          Account deletion
        </h3>
        <DeleteAccountModal />
      </div>
    </div>
  );
}
