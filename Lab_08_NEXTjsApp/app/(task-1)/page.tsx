// Created by: M Ehtisham Amjad (231996)
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home | Ehtisham Tech",
  description: "Welcome to Lab 08 Next.js frontend home page.",
};

export default function Home() {
  return (
    <div>
      <section className="section-pad">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full bg-surface-2 px-4 py-2 text-sm font-semibold text-brand">
              Full Stack Programming Lab 08
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
              Build modern interfaces with a
              <span className="text-gradient"> Next.js frontend workflow</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              This multi-page lab project demonstrates practical UI architecture, responsive design, and dynamic
              routing patterns for production-style web experiences.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="focus-ring rounded-full bg-brand px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-2"
              >
                Explore Products
              </Link>
              <Link
                href="/about"
                className="focus-ring rounded-full border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
              >
                Meet the Team
              </Link>
            </div>
          </div>

          <aside className="soft-card rounded-3xl p-8">
            <h2 className="text-xl font-semibold text-slate-900">What this website includes</h2>
            <ul className="mt-5 space-y-4 text-slate-600">
              <li>Multi-page architecture using the App Router</li>
              <li>Reusable components with clean TypeScript structure</li>
              <li>Dynamic product pages powered by route parameters</li>
              <li>Professional visual hierarchy with responsive behavior</li>
            </ul>
            <Link
              href="/contact"
              className="focus-ring mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
            >
              Contact Our Team
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}