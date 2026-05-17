"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, Search, ShoppingCart, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { formatPKR, effectivePrice } from '../../lib/format';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' }
];

const CATEGORIES = ['Beds', 'Cabinets', 'Bookcases', 'Boxes', 'Chairs', 'Tables'];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { user, logout } = useAuth();
  const { items } = useCart();

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce(
    (s, i) => s + effectivePrice(i.product) * i.quantity,
    0
  );

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="border-b border-ink-100">
        <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="font-serif text-2xl tracking-tight md:text-3xl">
            <span className="text-ink-900">Rustik </span>
            <span className="text-brand-500">Plank</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium uppercase tracking-wide text-ink-700 transition hover:text-brand-500"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="hidden items-center gap-2 rounded-sm border border-ink-200 px-3 py-2 text-xs font-medium text-ink-700 transition hover:border-brand-500 sm:flex"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>
                {count} item{count !== 1 ? 's' : ''} — {formatPKR(total)}
              </span>
            </Link>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link href="/admin/products" className="hidden text-sm font-medium text-brand-600 md:inline">
                    Admin
                  </Link>
                )}
                <Link href="/orders" className="hidden text-sm text-ink-600 hover:text-brand-500 md:inline">
                  Orders
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="hidden text-sm text-ink-600 hover:text-brand-500 md:inline"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth/login" className="btn-primary hidden px-4 py-2 text-xs md:inline-flex">
                Sign in
              </Link>
            )}
            <button
              type="button"
              className="rounded-sm p-2 text-ink-700 lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden border-b border-ink-100 bg-ink-50 md:block">
        <div className="mx-auto flex max-w-site flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <form onSubmit={onSearch} className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search furniture..."
              className="w-full rounded-sm border border-ink-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none"
            />
          </form>
          <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider text-ink-600">
            {CATEGORIES.map((c) => (
              <Link
                key={c}
                href={`/products?category=${encodeURIComponent(c)}`}
                className="hover:text-brand-500"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div className="border-b border-ink-100 bg-white px-4 py-4 lg:hidden">
          <form onSubmit={onSearch} className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-sm border py-2 pl-10 pr-3 text-sm"
            />
          </form>
          <nav className="flex flex-col gap-3">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-medium">
                {l.label}
              </Link>
            ))}
            <Link href="/cart" onClick={() => setOpen(false)} className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" /> Cart ({count})
            </Link>
            {user ? (
              <button type="button" onClick={() => { logout(); setOpen(false); }} className="text-left text-red-600">
                Logout
              </button>
            ) : (
              <Link href="/auth/login" onClick={() => setOpen(false)} className="btn-primary text-center">
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
