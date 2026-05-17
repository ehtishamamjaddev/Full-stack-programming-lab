"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPKR } from '../../lib/format';
import { Product } from '../../lib/types';
import { IMAGES, productImage } from '../../lib/images';
import SafeImage from '../ui/SafeImage';

const SLIDES = [
  {
    title: 'Heritage Craftsmanship for Modern Homes',
    text: 'Discover handcrafted furniture designed for comfort, durability, and timeless Pakistani interiors.',
    image: IMAGES.heroChair,
    price: 15499,
    href: '/products?featured=true'
  },
  {
    title: 'Elite Collection — Living Room Essentials',
    text: 'Curated sofas, consoles, and accent pieces with premium finishes and nationwide delivery.',
    image: IMAGES.cabinet,
    price: 44999,
    href: '/products?special=true'
  }
];

export default function HeroSlider({ heroProduct }: { heroProduct?: Product | null }) {
  const [index, setIndex] = useState(0);
  const slides = heroProduct
    ? [
        {
          title: heroProduct.name,
          text: heroProduct.description || SLIDES[0].text,
          image: productImage(heroProduct.images?.[0]),
          price: heroProduct.discountPrice || heroProduct.price,
          href: `/products/${heroProduct._id}`
        },
        ...SLIDES
      ]
    : SLIDES;

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[index];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink-100 via-white to-brand-50">
      <section className="mx-auto grid max-w-site items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16 lg:py-20">
        <article>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">New season</p>
          <h1 className="mt-3 text-4xl leading-tight text-ink-900 md:text-5xl">{slide.title}</h1>
          <p className="mt-4 max-w-lg text-ink-600">{slide.text}</p>
          <p className="mt-6 font-serif text-3xl text-ink-900">
            Our price <span className="text-brand-500">{formatPKR(slide.price)}</span>
          </p>
          <Link href={slide.href} className="btn-primary mt-8 inline-flex">
            Buy now
          </Link>
          <section className="mt-8 flex gap-2">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
              className="rounded-full border border-ink-200 p-2 hover:bg-white"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % slides.length)}
              className="rounded-full border border-ink-200 p-2 hover:bg-white"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </section>
        </article>
        <figure className="relative aspect-square overflow-hidden rounded-lg shadow-card md:aspect-[4/5]">
          <SafeImage src={slide.image} alt={slide.title} fill className="object-cover" priority sizes="50vw" />
        </figure>
      </section>
    </section>
  );
}
