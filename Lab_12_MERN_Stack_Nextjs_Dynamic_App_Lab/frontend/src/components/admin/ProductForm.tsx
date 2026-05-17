"use client";

import { useEffect, useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import api from '../../lib/api';
import toast from 'react-hot-toast';

const CATEGORIES = ['Beds', 'Cabinets', 'Bookcases', 'Boxes', 'Chairs', 'Tables'];

export default function ProductForm({
  product,
  onSaved,
  onCancel
}: {
  product: any;
  onSaved?: () => void;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    discountPrice: 0,
    category: 'Chairs',
    images: [''],
    stock: 10,
    featured: false,
    popular: false,
    special: false,
    sku: ''
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        discountPrice: product.discountPrice || 0,
        category: product.category || 'Chairs',
        images: product.images?.length ? product.images : [''],
        stock: product.stock ?? 10,
        featured: !!product.featured,
        popular: !!product.popular,
        special: !!product.special,
        sku: product.sku || ''
      });
    } else {
      setForm({
        name: '',
        description: '',
        price: 0,
        discountPrice: 0,
        category: 'Chairs',
        images: [''],
        stock: 10,
        featured: false,
        popular: false,
        special: false,
        sku: ''
      });
    }
  }, [product]);

  async function save() {
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
        stock: Number(form.stock),
        images: form.images.filter(Boolean)
      };
      if (product?._id) {
        await api.put(`/products/${product._id}`, payload);
        toast.success('Product updated');
      } else {
        await api.post('/products', payload);
        toast.success('Product created');
      }
      onSaved?.();
    } catch (err: any) {
      toast.error(err?.message || 'Save failed');
    }
  }

  return (
    <section className="space-y-4 rounded-sm border border-ink-100 bg-white p-4 shadow-card">
      <h3 className="font-serif text-lg">{product ? 'Edit product' : 'Create product'}</h3>
      <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input label="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
      <label className="block text-sm">
        <span className="text-ink-700">Category</span>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="mt-1 w-full rounded-sm border border-ink-200 px-3 py-2"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <Input label="Price (PKR)" type="number" value={form.price} onChange={(e: any) => setForm({ ...form, price: e.target.value })} />
      <Input label="Sale price" type="number" value={form.discountPrice} onChange={(e: any) => setForm({ ...form, discountPrice: e.target.value })} />
      <Input label="Stock" type="number" value={form.stock} onChange={(e: any) => setForm({ ...form, stock: e.target.value })} />
      <Input
        label="Image path (e.g. /images/chair.jpg)"
        value={form.images[0]}
        onChange={(e) => setForm({ ...form, images: [e.target.value] })}
        placeholder="/images/chair.jpg"
      />
      <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <section className="flex flex-wrap gap-4 text-sm">
        {(['featured', 'popular', 'special'] as const).map((flag) => (
          <label key={flag} className="flex items-center gap-2 capitalize">
            <input
              type="checkbox"
              checked={form[flag]}
              onChange={(e) => setForm({ ...form, [flag]: e.target.checked })}
            />
            {flag}
          </label>
        ))}
      </section>
      <section className="flex gap-2">
        <Button onClick={save}>Save</Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </section>
    </section>
  );
}
