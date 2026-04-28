// Created by: M Ehtisham Amjad (231996)
import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/products", label: "Products" },
];

const socialLinks = [
  { href: "https://github.com/ehtishamamjaddev", label: "GitHub" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://x.com", label: "X / Twitter" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <section>
          <h3 className="text-lg font-semibold text-white">Ehtisham Tech</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Professional frontend solutions built with modern standards for the Full Stack Programming Lab.
          </p>
          <p className="mt-4 text-sm text-slate-400">Developed by Ehtisham Amjad</p>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-100">Quick Links</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link className="focus-ring rounded hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-100">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>Email: hello@ehtishamtech.pk</li>
            <li>Phone: +92 300 1234567</li>
            <li>Address: I-8 Markaz, Islamabad, Pakistan</li>
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-100">Follow Us</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {socialLinks.map((item) => (
              <li key={item.label}>
                <Link
                  className="focus-ring rounded hover:text-white"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="border-t border-slate-800 py-5 text-center text-sm text-slate-400">
        <p>© {currentYear} Ehtisham Tech. All rights reserved.</p>
      </div>
    </footer>
  );
}
