"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';
import { formatPKR, effectivePrice } from '../../lib/format';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [address, setAddress] = useState({
    fullName: user?.name || '',
    phone: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Pakistan'
  });

  const subtotal = items.reduce((s, i) => s + effectivePrice(i.product) * i.quantity, 0);
  const shippingCost = 1500;
  const taxAmount = Math.round(subtotal * 0.05);
  const total = subtotal + shippingCost + taxAmount;

  async function placeOrder() {
    if (!user) {
      toast.error('Please sign in to checkout');
      router.push('/auth/login');
      return;
    }
    if (!address.fullName || !address.phone || !address.street || !address.city) {
      toast.error('Please fill in all required fields');
      return;
    }
    setBusy(true);
    try {
      await api.post('/orders', {
        shippingAddress: address,
        paymentMethod: 'cash_on_delivery',
        shippingCost
      });
      toast.success('Order placed successfully');
      router.push('/orders');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to place order');
    } finally {
      setBusy(false);
    }
  }

  if (!items.length) {
    return (
      <section className="mx-auto max-w-site px-4 py-20 text-center">
        <p>Your cart is empty.</p>
        <Link href="/products" className="btn-primary mt-4 inline-flex">
          Shop now
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-site px-4 py-10">
      <h1 className="font-serif text-4xl">Checkout</h1>
      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <form
          className="space-y-4 rounded-sm border border-ink-100 bg-white p-6 shadow-card"
          onSubmit={(e) => {
            e.preventDefault();
            placeOrder();
          }}
        >
          <h2 className="font-serif text-xl">Shipping details</h2>
          {[
            ['fullName', 'Full name *'],
            ['phone', 'Phone *'],
            ['street', 'Street address *'],
            ['city', 'City *'],
            ['province', 'Province'],
            ['postalCode', 'Postal code']
          ].map(([key, label]) => (
            <label key={key} className="block text-sm">
              <span className="text-ink-700">{label}</span>
              <input
                required={label.includes('*')}
                value={(address as any)[key]}
                onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
                className="mt-1 w-full rounded-sm border border-ink-200 px-3 py-2 focus:border-brand-500 focus:outline-none"
              />
            </label>
          ))}
          <button type="submit" disabled={busy} className="btn-primary w-full">
            {busy ? 'Placing order...' : 'Place order (Cash on delivery)'}
          </button>
        </form>
        <aside className="h-fit rounded-sm border border-ink-100 bg-white p-6 shadow-card">
          <h2 className="font-serif text-xl">Summary</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-600">
            {items.map((i) => (
              <li key={i.product._id} className="flex justify-between">
                <span>
                  {i.product.name} × {i.quantity}
                </span>
                <span>{formatPKR(effectivePrice(i.product) * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <hr className="my-4 border-ink-100" />
          <p className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPKR(subtotal)}</span>
          </p>
          <p className="mt-2 flex justify-between text-sm">
            <span>Shipping</span>
            <span>{formatPKR(shippingCost)}</span>
          </p>
          <p className="mt-2 flex justify-between text-sm">
            <span>Tax (5%)</span>
            <span>{formatPKR(taxAmount)}</span>
          </p>
          <p className="mt-4 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span className="text-brand-500">{formatPKR(total)}</span>
          </p>
        </aside>
      </section>
    </section>
  );
}
