"use client";

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '../../lib/api';
import { Product } from '../../lib/types';
import ProductCard from '../../components/products/ProductCard';

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const queryString = useMemo(() => {
    const p = new URLSearchParams();
    const q = searchParams.get('q');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const special = searchParams.get('special');
    const popular = searchParams.get('popular');
    if (q) p.set('q', q);
    if (category) p.set('category', category);
    if (featured) p.set('featured', featured);
    if (special) p.set('special', special);
    if (popular) p.set('popular', popular);
    p.set('limit', '24');
    return `?${p.toString()}`;
  }, [searchParams]);

  useEffect(() => {
    api.get('/products/categories/list').then((r) => setCategories(r.data.categories || [])).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/products${queryString}`)
      .then((r) => setProducts(r.data.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [queryString]);

  const title = searchParams.get('category') || searchParams.get('q') || 'All products';

  return (
    <section className="mx-auto max-w-site px-4 py-10">
      <header className="mb-8 border-b border-ink-100 pb-6">
        <h1 className="font-serif text-4xl capitalize text-ink-900">{title}</h1>
        <p className="mt-2 text-ink-600">{products.length} products found</p>
      </header>

      <section className="flex flex-col gap-8 lg:flex-row">
        <aside className="lg:w-56">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-700">Categories</h2>
          <nav className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            <a href="/products" className="text-sm text-brand-600 hover:underline">
              All
            </a>
            {categories.map((c) => (
              <a
                key={c}
                href={`/products?category=${encodeURIComponent(c)}`}
                className="text-sm text-ink-600 hover:text-brand-500"
              >
                {c}
              </a>
            ))}
          </nav>
        </aside>

        <section className="flex-1">
          {loading ? (
            <p className="text-ink-500">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-ink-500">No products match your filters.</p>
          ) : (
            <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </section>
          )}
        </section>
      </section>
    </section>
  );
}
