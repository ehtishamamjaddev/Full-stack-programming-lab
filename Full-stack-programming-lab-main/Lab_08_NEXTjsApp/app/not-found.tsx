import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-pad">
      <div className="container-shell text-center">
        <div className="soft-card mx-auto max-w-xl rounded-3xl p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">404</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Page not found</h1>
          <p className="mt-4 text-slate-600">The page or product you are looking for does not exist.</p>
          <Link
            href="/products"
            className="focus-ring mt-6 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-2"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
