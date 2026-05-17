import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="soft-card group flex h-full flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={`${product.title} product image`}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">{product.category}</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-900">{product.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{product.description}</p>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-lg font-bold text-slate-900">PKR {product.price.toLocaleString()}</p>
          <Link
            href={`/products/${product.id}`}
            className="focus-ring rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
