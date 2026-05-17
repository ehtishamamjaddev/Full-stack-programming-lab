"use client";

import { useEffect, useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import api from '../../lib/api';

export default function ProductList({ onEdit }: { onEdit?: (p: any) => void }) {
  const [products, setProducts] = useState<any[] | null>(null);

  async function load() {
    const res = await api.get('/products?limit=100');
    setProducts(res.data.data || []);
  }

  useEffect(() => {
    load().catch(() => setProducts([]));
  }, []);

  if (products === null) {
    return <p className="text-ink-500">Loading products...</p>;
  }

  return (
    <section className="space-y-4">
      {products.map((p) => (
        <Card key={p._id}>
          <section className="flex flex-wrap items-center justify-between gap-4">
            <article>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-ink-500">
                {p.category} · PKR {p.price?.toLocaleString()}
              </p>
            </article>
            <section className="flex gap-2">
              <Button onClick={() => onEdit?.(p)}>Edit</Button>
              <Button
                className="!bg-red-600 hover:!bg-red-700"
                onClick={async () => {
                  await api.delete(`/products/${p._id}`);
                  setProducts((s) => s!.filter((x) => x._id !== p._id));
                }}
              >
                Delete
              </Button>
            </section>
          </section>
        </Card>
      ))}
    </section>
  );
}
