import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImagePreviewProps {
  url: string | null;
  errorMsg?: string;
}

export function ImagePreview({ url, errorMsg }: ImagePreviewProps) {
  return (
    <>
      <Label htmlFor="recipe-image">Image</Label>
      <div
        className={cn(
          errorMsg ? 'border-red-600' : 'border-gray-300',
          'mt-2 h-80 border-2 border-dashed rounded-lg flex p-2 mb-4'
        )}>
        {url ? (
          <div className="flex-1 relative">
            <Image
              src={url}
              alt="Upload preview"
              sizes="100vw"
              className="w-full h-auto object-cover rounded-lg"
              fill
            />
          </div>
        ) : (
          <div className="m-auto">
            <ImageIcon
              className="size-12 text-gray-300"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {errorMsg && <p className="mt-1 text-sm text-red-600">{errorMsg}</p>}
    </>
  );
}
