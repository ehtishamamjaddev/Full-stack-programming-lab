// Created by: M Ehtisham Amjad (231996)
import type { Metadata } from "next";
import Link from "next/link";
import ProductList from "@/components/ProductList";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products | Ehtisham Tech",
  description: "Browse products in the Lab 08 Next.js dynamic component section.",
};

export default function ProductsPage() {
  return (
    <div className="section-pad">
      <div className="container-shell">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-slate-700">Products</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Featured Products</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Explore our curated products designed for professionals, students, and modern digital lifestyles.
        </p>

        <div className="mt-8">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}