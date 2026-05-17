"use client";

import { useState } from 'react';
import ProductList from '../../../components/admin/ProductList';
import ProductForm from '../../../components/admin/ProductForm';
import Button from '../../../components/ui/Button';

export default function AdminProductsPage() {
  const [editing, setEditing] = useState<any>(null);

  return (
    <section className="mx-auto max-w-site px-4 py-10">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-3xl">Admin — Products</h1>
        <Button onClick={() => setEditing({})}>New product</Button>
      </header>
      <section className="grid gap-8 lg:grid-cols-12">
        <section className="lg:col-span-8">
          <ProductList onEdit={(p) => setEditing(p)} />
        </section>
        <section className="lg:col-span-4">
          {editing !== null && (
            <ProductForm
              product={editing._id ? editing : null}
              onSaved={() => setEditing(null)}
              onCancel={() => setEditing(null)}
            />
          )}
        </section>
      </section>
    </section>
  );
}
