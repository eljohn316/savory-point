'use client';

import { CircleAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AccountSettings() {
  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-base font-bold text-gray-900">Account settings</h2>
      </div>
      <div className="space-y-12">
        <div className="border-l-4 border-red-700 bg-red-50 p-3 sm:p-4">
          <div className="flex items-center gap-x-2.5 sm:gap-x-4">
            <CircleAlertIcon className="size-4 flex-none text-red-700" />
            <div className="flex-auto">
              <p className="text-sm font-semibold text-red-800">
                Warning! This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="mt-2 pl-[26px] text-sm text-red-700 sm:pl-8">
            Deleting your account is permanent and cannot be undone. All your data, including
            profile information and recipe uploads, will be lost.
          </div>
        </div>
        <Button variant="danger">Delete my account</Button>
      </div>
    </div>
  );
}
