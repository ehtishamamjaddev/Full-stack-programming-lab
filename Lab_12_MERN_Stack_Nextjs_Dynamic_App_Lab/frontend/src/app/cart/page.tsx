"use client";

import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { formatPKR, effectivePrice } from '../../lib/format';
import { productImage } from '../../lib/images';
import SafeImage from '../../components/ui/SafeImage';

export default function CartPage() {
  const { items, loading, updateItem, removeItem } = useCart();

  if (loading) {
    return <p className="mx-auto max-w-site px-4 py-20 text-center text-ink-500">Loading cart...</p>;
  }

  if (!items.length) {
    return (
      <section className="mx-auto max-w-site px-4 py-20 text-center">
        <h1 className="font-serif text-3xl">Your cart is empty</h1>
        <Link href="/products" className="btn-primary mt-6 inline-flex">
          Continue shopping
        </Link>
      </section>
    );
  }

  const subtotal = items.reduce((s, i) => s + effectivePrice(i.product) * i.quantity, 0);

  return (
    <section className="mx-auto max-w-site px-4 py-10">
      <h1 className="font-serif text-4xl text-ink-900">Shopping cart</h1>
      <section className="mt-8 grid gap-8 lg:grid-cols-3">
        <section className="space-y-4 lg:col-span-2">
          {items.map((it) => (
            <article key={it.product._id} className="flex gap-4 rounded-sm border border-ink-100 bg-white p-4 shadow-card">
              <figure className="relative h-24 w-24 shrink-0 overflow-hidden rounded-sm bg-ink-100">
                <SafeImage
                  src={productImage(it.product.images?.[0], it.product.category)}
                  alt={it.product.name}
                  fill
                  className="object-cover"
                />
              </figure>
              <section className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                <article>
                  <Link href={`/products/${it.product._id}`} className="font-medium hover:text-brand-500">
                    {it.product.name}
                  </Link>
                  <p className="text-sm text-ink-500">{formatPKR(effectivePrice(it.product))} each</p>
                </article>
                <section className="mt-3 flex items-center gap-3 sm:mt-0">
                  <button
                    type="button"
                    onClick={() => updateItem(it.product._id, it.quantity - 1)}
                    className="h-8 w-8 rounded border border-ink-200"
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{it.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateItem(it.product._id, it.quantity + 1)}
                    className="h-8 w-8 rounded border border-ink-200"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(it.product._id)}
                    className="ml-2 text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </section>
              </section>
            </article>
          ))}
        </section>
        <aside className="h-fit rounded-sm border border-ink-100 bg-white p-6 shadow-card">
          <h2 className="font-serif text-xl">Order summary</h2>
          <p className="mt-4 flex justify-between text-ink-600">
            <span>Subtotal</span>
            <span className="font-semibold text-ink-900">{formatPKR(subtotal)}</span>
          </p>
          <p className="mt-2 text-xs text-ink-500">Shipping & tax calculated at checkout</p>
          <Link href="/checkout" className="btn-primary mt-6 block w-full text-center">
            Proceed to checkout
          </Link>
        </aside>
      </section>
    </section>
  );
}
