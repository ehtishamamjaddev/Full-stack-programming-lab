// Created by: M Ehtisham Amjad (231996)
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findProductById, products } from "@/data/products";

interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  const { id } = await params;
  const product = findProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | Ehtisham Tech",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.title} | Ehtisham Tech`,
    description: product.description,
  };
}

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { id } = await params;
  const product = findProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="section-pad">
      <div className="container-shell">
        <Link href="/products" className="focus-ring inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand hover:text-brand">
          Back to Products
        </Link>

        <section className="soft-card mt-6 grid gap-8 rounded-3xl p-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative min-h-80 overflow-hidden rounded-2xl bg-slate-100">
            <Image src={product.image} alt={`${product.title} large image`} fill className="object-cover" priority />
          </div>

          <div>
            <p className="inline-block rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              {product.category}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{product.title}</h1>
            <p className="mt-4 text-base leading-8 text-slate-600">{product.detailedDescription}</p>

            <p className="mt-6 text-2xl font-bold text-slate-900">PKR {product.price.toLocaleString()}</p>

            <h2 className="mt-6 text-lg font-semibold text-slate-900">Key Features</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-slate-600">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <button
              type="button"
              className="focus-ring mt-8 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-2"
            >
              Add to Cart
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}