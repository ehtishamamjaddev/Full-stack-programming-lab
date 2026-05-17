import Link from 'next/link';
import { IMAGES } from '../../lib/images';
import SafeImage from '../ui/SafeImage';

const CATEGORIES = [
  { title: 'Chairs Collection', href: '/products?category=Chairs', image: IMAGES.chair },
  { title: 'Beds Collection', href: '/products?category=Beds', image: IMAGES.bed },
  { title: 'Tables Collection', href: '/products?category=Tables', image: IMAGES.table }
];

export default function CategoryShowcase() {
  return (
    <section className="bg-ink-50 py-16">
      <section className="mx-auto max-w-site px-4">
        <h2 className="section-title">Shop by room</h2>
        <p className="section-subtitle">Explore our bestselling categories crafted for Pakistani homes.</p>
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link key={c.title} href={c.href} className="group relative overflow-hidden rounded-sm shadow-card">
              <figure className="relative aspect-[4/5]">
                <SafeImage
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="33vw"
                />
                <figcaption className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="font-serif text-2xl text-brand-500">{c.title}</h3>
                </figcaption>
              </figure>
            </Link>
          ))}
        </section>
      </section>
    </section>
  );
}
