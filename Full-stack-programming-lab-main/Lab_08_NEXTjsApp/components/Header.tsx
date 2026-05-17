"use client";

// Created by: M Ehtisham Amjad (231996)
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/products", label: "Products" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-lg">
      <div className="container-shell flex h-18 items-center justify-between py-3">
        <Link
          href="/"
          className="focus-ring flex items-center gap-3 rounded-md px-1 py-1"
          aria-label="Go to homepage"
        >
          <Image src="/images/logo.svg" alt="Ehtisham Tech logo" width={34} height={34} priority />
          <span className="text-lg font-semibold tracking-tight text-slate-900">Ehtisham Tech</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-brand text-white shadow-md shadow-blue-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="focus-ring inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Toggle mobile navigation"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-slate-200 bg-white px-4 pb-4 pt-3 md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`focus-ring rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-brand text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
