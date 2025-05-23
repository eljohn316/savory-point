import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="flex justify-center">
      <Spinner className="size-8 text-gray-400" />
    </div>
  );
}
