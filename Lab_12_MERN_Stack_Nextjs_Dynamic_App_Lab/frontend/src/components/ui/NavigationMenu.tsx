import React from 'react';
import Link from 'next/link';

export function NavigationMenu() {
  return (
    <nav className="flex items-center space-x-4">
      <Link href="/" className="text-sm font-semibold">Home</Link>
      <Link href="/products" className="text-sm">Products</Link>
      <Link href="/cart" className="text-sm">Cart</Link>
      <Link href="/orders" className="text-sm">Orders</Link>
    </nav>
  );
}

export default NavigationMenu;
