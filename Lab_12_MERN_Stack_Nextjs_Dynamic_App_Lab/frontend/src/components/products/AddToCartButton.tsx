"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function AddToCartButton({
  productId,
  stock = 99
}: {
  productId: string;
  stock?: number;
}) {
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);
  const { addItem } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  async function handleAdd() {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      router.push('/auth/login');
      return;
    }
    setBusy(true);
    try {
      await addItem(productId, qty);
      toast.success('Added to cart');
    } catch (err: any) {
      toast.error(err?.message || 'Could not add to cart');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="flex flex-wrap items-center gap-4">
      <label className="flex items-center gap-2 text-sm">
        Qty
        <select
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="rounded-sm border border-ink-200 px-3 py-2"
        >
          {Array.from({ length: Math.min(stock, 10) }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>
      <button type="button" onClick={handleAdd} disabled={busy || stock < 1} className="btn-primary">
        {stock < 1 ? 'Out of stock' : busy ? 'Adding...' : 'Add to cart'}
      </button>
    </section>
  );
}
