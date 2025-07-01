import Image from 'next/image';

type UploaderProps = {
  uploader: {
    id: string;
    firstName: string;
    lastName: string;
    profile: {
      image: string | null;
      defaultImage: string;
    } | null;
  } | null;
};

export function Uploader({ uploader }: UploaderProps) {
  if (!uploader) return null;

  const profile = uploader.profile!;

  return (
    <div className="flex items-center gap-x-2">
      <Image
        src={profile.image || profile.defaultImage}
        alt={`${uploader.firstName}'s avatar`}
        height={40}
        width={40}
        className="size-7 rounded-full"
      />
      <p className="text-sm text-gray-600">
        {uploader.firstName} {uploader.lastName}
      </p>
    </div>
  );
}
