import Link from 'next/link';
import AddToCartButton from '../../../components/products/AddToCartButton';
import ProductGallery from '../../../components/products/ProductGallery';
import { formatPKR, effectivePrice } from '../../../lib/format';

async function fetchProduct(id: string) {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const res = await fetch(`${base}/products/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();
  return json.product;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);

  if (!product) {
    return (
      <section className="mx-auto max-w-site px-4 py-20 text-center">
        <h1 className="font-serif text-2xl">Product not found</h1>
        <Link href="/products" className="mt-4 inline-block text-brand-600 hover:underline">
          Back to shop
        </Link>
      </section>
    );
  }

  const price = effectivePrice(product);
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <section className="mx-auto max-w-site px-4 py-10">
      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/">Home</Link> / <Link href="/products">Shop</Link> / <span>{product.name}</span>
      </nav>
      <section className="grid gap-10 lg:grid-cols-2">
        <ProductGallery src={product.images?.[0]} alt={product.name} category={product.category} />
        <article>
          <p className="text-sm uppercase tracking-wide text-brand-500">{product.category}</p>
          <h1 className="mt-2 font-serif text-4xl text-ink-900">{product.name}</h1>
          {product.ratings?.count > 0 && (
            <p className="mt-2 text-sm text-ink-600">
              ★ {product.ratings.average} ({product.ratings.count} reviews)
            </p>
          )}
          <p className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-brand-500">{formatPKR(price)}</span>
            {hasDiscount && (
              <span className="text-lg text-ink-500 line-through">{formatPKR(product.price)}</span>
            )}
          </p>
          <p className="mt-6 leading-relaxed text-ink-600">{product.description}</p>
          <p className="mt-4 text-sm text-ink-500">
            SKU: {product.sku || '—'} · {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
          <section className="mt-8 border-t border-ink-100 pt-8">
            <AddToCartButton productId={product._id} stock={product.stock} />
          </section>
        </article>
      </section>
    </section>
  );
}
