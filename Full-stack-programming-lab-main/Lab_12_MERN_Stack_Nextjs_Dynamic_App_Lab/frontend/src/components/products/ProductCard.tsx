import Link from 'next/link';
import { Product } from '../../lib/types';
import { effectivePrice, formatPKR } from '../../lib/format';
import { productImage } from '../../lib/images';
import SafeImage from '../ui/SafeImage';

export default function ProductCard({ product }: { product: Product }) {
  const price = effectivePrice(product);
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const image = productImage(product.images?.[0], product.category);

  return (
    <article className="group overflow-hidden rounded-sm border border-ink-100 bg-white shadow-card transition hover:shadow-card-hover">
      <Link href={`/products/${product._id}`} className="relative block aspect-[4/5] overflow-hidden bg-ink-100">
        <SafeImage
          src={image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {product.special && (
          <span className="absolute left-3 top-3 z-10 bg-brand-500 px-2 py-1 text-xs font-bold uppercase text-white">
            Sale
          </span>
        )}
      </Link>
      <section className="p-4">
        <p className="text-xs uppercase tracking-wide text-ink-500">{product.category}</p>
        <Link href={`/products/${product._id}`}>
          <h3 className="mt-1 font-serif text-lg text-ink-900 line-clamp-2 hover:text-brand-500">
            {product.name}
          </h3>
        </Link>
        <p className="mt-3 flex items-end justify-between gap-2">
          <span>
            <span className="text-lg font-semibold text-brand-500">{formatPKR(price)}</span>
            {hasDiscount && (
              <span className="ml-2 text-sm text-ink-500 line-through">{formatPKR(product.price)}</span>
            )}
          </span>
          <Link href={`/products/${product._id}`} className="btn-outline px-3 py-1.5 text-xs">
            Detail
          </Link>
        </p>
      </section>
    </article>
  );
}
