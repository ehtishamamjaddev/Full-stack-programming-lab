import Link from 'next/link';

const FOOTER_LINKS = {
  Informations: [
    { href: '/about', label: 'About us' },
    { href: '/contact', label: 'Contact' },
    { href: '/products', label: 'Shop' },
    { href: '/blog', label: 'Blog' }
  ],
  'My Account': [
    { href: '/auth/login', label: 'Your account' },
    { href: '/orders', label: 'Order history' },
    { href: '/cart', label: 'Cart' }
  ],
  Shop: [
    { href: '/products?category=Chairs', label: 'Chairs' },
    { href: '/products?category=Tables', label: 'Tables' },
    { href: '/products?category=Beds', label: 'Beds' },
    { href: '/products?featured=true', label: 'Featured' }
  ],
  Help: [
    { href: '/contact', label: 'Delivery' },
    { href: '/contact', label: 'Service' },
    { href: '/contact', label: 'Gift cards' }
  ]
};

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink-900 text-ink-200">
      <div className="mx-auto grid max-w-site gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <h4 className="mb-4 font-serif text-lg text-brand-500">{title}</h4>
            <ul className="space-y-2 text-sm">
              {links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ink-700">
        <div className="mx-auto max-w-site px-4 py-6 text-center text-sm text-ink-500">
          © {new Date().getFullYear()} Rustik Plank Furniture. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
