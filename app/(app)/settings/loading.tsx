import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="space-y-28">
      <div className="space-y-10">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-base font-bold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm text-gray-600">Update your photo and personal details here</p>
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">Photo</p>
            <div className="mt-2 flex items-center gap-x-6">
              <Skeleton className="size-12 flex-none rounded-full" />
              <Skeleton className="h-8 w-[74px] flex-none" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">First name</p>
            <Skeleton className="h-[38px] max-w-xs" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">Last name</p>
            <Skeleton className="h-[38px] max-w-xs" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">Bio</p>
            <Skeleton className="h-[98px]" />
          </div>
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
      <div className="space-y-10">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-base font-bold text-gray-900">Email</h2>
          <p className="mt-1 text-sm text-gray-600">Always choose an active email.</p>
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">Email</p>
            <Skeleton className="h-[38px] max-w-sm" />
          </div>
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
      <div className="space-y-10">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-base font-bold text-gray-900">Password</h2>
          <p className="mt-1 text-sm text-gray-600">
            Please enter your current password to change your password.
          </p>
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">Current password</p>
            <Skeleton className="h-[38px] max-w-sm" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">New password</p>
            <Skeleton className="h-[38px] max-w-sm" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">Confirm new password</p>
            <Skeleton className="h-[38px] max-w-sm" />
          </div>
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
      <div className="space-y-10">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-base font-bold text-gray-900">Account</h2>
        </div>
        <div className="space-y-12">
          <Skeleton className="h-[100px]" />
          <Skeleton className="h-9 w-36" />
        </div>
      </div>
    </div>
  );
}
