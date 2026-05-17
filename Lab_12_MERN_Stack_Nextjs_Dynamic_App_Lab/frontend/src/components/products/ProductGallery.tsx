'use client';

import { productImage } from '../../lib/images';
import SafeImage from '../ui/SafeImage';

export default function ProductGallery({
  src,
  alt,
  category
}: {
  src?: string;
  alt: string;
  category?: string;
}) {
  return (
    <figure className="relative aspect-square overflow-hidden rounded-sm bg-ink-100 shadow-card">
      <SafeImage
        src={productImage(src, category)}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="50vw"
      />
    </figure>
  );
}
