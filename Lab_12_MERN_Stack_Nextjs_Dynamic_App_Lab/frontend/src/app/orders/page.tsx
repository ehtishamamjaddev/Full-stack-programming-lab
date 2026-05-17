"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../lib/api';
import { Order } from '../../lib/types';
import { formatPKR } from '../../lib/format';
import { useAuth } from '../../context/AuthContext';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    api
      .get('/orders/my')
      .then((r) => setOrders(r.data.orders || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <section className="mx-auto max-w-site px-4 py-20 text-center">
        <h1 className="font-serif text-3xl">My orders</h1>
        <p className="mt-4 text-ink-600">Sign in to view your order history.</p>
        <Link href="/auth/login" className="btn-primary mt-6 inline-flex">
          Sign in
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-site px-4 py-10">
      <h1 className="font-serif text-4xl">My orders</h1>
      {loading ? (
        <p className="mt-8 text-ink-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="mt-8 text-ink-500">No orders yet.</p>
      ) : (
        <section className="mt-8 space-y-6">
          {orders.map((o) => (
            <article key={o._id} className="rounded-sm border border-ink-100 bg-white p-6 shadow-card">
              <header className="flex flex-wrap items-start justify-between gap-4">
                <article>
                  <p className="font-semibold text-ink-900">{o.orderNumber}</p>
                  <p className="text-sm text-ink-500">
                    {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : ''} · {o.paymentMethod?.replace(/_/g, ' ')}
                  </p>
                </article>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${STATUS_COLORS[o.status] || 'bg-ink-100'}`}>
                  {o.status}
                </span>
              </header>
              <ul className="mt-4 space-y-2 border-t border-ink-100 pt-4 text-sm">
                {o.items?.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-ink-600">
                    <span>
                      {item.productName} × {item.quantity}
                    </span>
                    <span>{formatPKR(item.lineTotal || (item.unitPrice || 0) * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <footer className="mt-4 flex flex-wrap gap-4 border-t border-ink-100 pt-4 text-sm">
                {o.subtotal != null && <span>Subtotal: {formatPKR(o.subtotal)}</span>}
                {o.shippingCost != null && <span>Shipping: {formatPKR(o.shippingCost)}</span>}
                {o.taxAmount != null && <span>Tax: {formatPKR(o.taxAmount)}</span>}
                <span className="ml-auto font-semibold text-brand-600">Total: {formatPKR(o.totalAmount)}</span>
              </footer>
            </article>
          ))}
        </section>
      )}
    </section>
  );
}
