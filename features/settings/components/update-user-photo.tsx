'use client';

import Image from 'next/image';
import { type User } from '@/lib/auth-client';
import { CloudinaryImage } from '@/components/cloudinary-image';
import { Button } from '@/components/ui/button';

type UpdateUserPhotoProps = {
  user: User;
};

export function UpdateUserPhoto({ user }: UpdateUserPhotoProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-900">Photo</p>
      <div className="mt-2 flex items-center gap-x-6">
        {user.image ? (
          <CloudinaryImage
            src={user.image}
            alt={`${user.firstName}'s profile photo`}
            height={48}
            width={48}
            className="size-12 rounded-full"
          />
        ) : (
          <Image
            src={user.defaultImage}
            alt={`${user.firstName}'s profile photo`}
            height={48}
            width={48}
            className="size-12 rounded-full"
          />
        )}
        <Button variant="outline" size="sm">
          Change
        </Button>
      </div>
    </div>
  );
}
