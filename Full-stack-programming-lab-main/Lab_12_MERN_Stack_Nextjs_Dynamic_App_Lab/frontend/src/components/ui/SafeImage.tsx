'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';
import { IMAGES, productImage } from '../../lib/images';

type Props = Omit<ImageProps, 'src'> & {
  src?: string | null;
  category?: string;
};

export default function SafeImage({ src, alt, category, ...props }: Props) {
  const resolved = productImage(src || undefined, category);
  const [current, setCurrent] = useState(resolved);
  const isLocal = current.startsWith('/images/');

  useEffect(() => {
    setCurrent(productImage(src || undefined, category));
  }, [src, category]);

  return (
    <Image
      {...props}
      src={current}
      alt={alt}
      unoptimized={isLocal}
      onError={() => {
        if (current !== IMAGES.placeholder) setCurrent(IMAGES.placeholder);
      }}
    />
  );
}
