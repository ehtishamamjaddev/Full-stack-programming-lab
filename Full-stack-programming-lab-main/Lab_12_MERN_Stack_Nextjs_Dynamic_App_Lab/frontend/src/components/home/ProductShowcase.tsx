"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../lib/api';
import { Product } from '../../lib/types';
import ProductCard from '../products/ProductCard';

type Tab = 'featured' | 'special' | 'popular';

const TABS: { id: Tab; label: string; query: string }[] = [
  { id: 'featured', label: 'Featured', query: '?featured=true&limit=6' },
  { id: 'special', label: 'Special', query: '?special=true&limit=6' },
  { id: 'popular', label: 'Popular', query: '?popular=true&limit=6' }
];

export default function ProductShowcase() {
  const [tab, setTab] = useState<Tab>('featured');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const current = TABS.find((t) => t.id === tab)!;
    setLoading(true);
    api
      .get(`/products${current.query}`)
      .then((r) => setProducts(r.data.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [tab]);

  return (
    <section className="py-16">
      <section className="mx-auto max-w-site px-4">
        <h2 className="section-title">Our collection</h2>
        <p className="section-subtitle">Handpicked pieces — featured, on sale, and customer favorites.</p>

        <nav className="mt-8 flex flex-wrap justify-center gap-4 border-b border-ink-200">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-4 pb-3 text-sm font-semibold uppercase tracking-wide transition ${
                tab === t.id
                  ? 'border-b-2 border-brand-500 text-brand-600'
                  : 'text-ink-500 hover:text-ink-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {loading ? (
          <p className="mt-12 text-center text-ink-500">Loading products...</p>
        ) : (
          <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </section>
        )}

        <p className="mt-10 text-center">
          <Link href={`/products?${tab}=true`} className="btn-outline">
            See all {tab}
          </Link>
        </p>
      </section>
    </section>
  );
}
