import { useEffect, useState } from 'react';
import { getFallbackHotTubImage } from '../../utils/imageFallback';

function SafeImage({ src, alt, className, loading = 'lazy' }) {
  const fallback = getFallbackHotTubImage(alt || 'Product Image');
  const [currentSrc, setCurrentSrc] = useState(src || fallback);

  useEffect(() => {
    setCurrentSrc(src || fallback);
  }, [src, fallback]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => {
        if (currentSrc !== fallback) setCurrentSrc(fallback);
      }}
    />
  );
}

export default SafeImage;
