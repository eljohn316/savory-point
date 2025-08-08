import * as React from 'react';
import { getCldImageUrl } from 'next-cloudinary';
import { CloudinaryImage } from '@/components/cloudinary-image';

export async function RecipeImage({
  src,
  height,
  width,
  alt,
  format = 'webp',
  quality = 'auto',
  ...props
}: React.ComponentProps<typeof CloudinaryImage>) {
  const imageUrl = getCldImageUrl({ src, width: 100 });
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString('base64');
  const dataUrl = `data:${response.type};base64,${base64}`;

  return (
    <CloudinaryImage
      src={src}
      alt={alt}
      height={height}
      width={width}
      format={format}
      quality={quality}
      placeholder="blur"
      blurDataURL={dataUrl}
      {...props}
    />
  );
}
