'use client';

import * as React from 'react';
import { CldImage } from 'next-cloudinary';

export function CloudinaryImage({
  src,
  alt,
  height,
  width,
  ...props
}: React.ComponentProps<typeof CldImage>) {
  return <CldImage src={src} alt={alt} height={height} width={width} {...props} />;
}
