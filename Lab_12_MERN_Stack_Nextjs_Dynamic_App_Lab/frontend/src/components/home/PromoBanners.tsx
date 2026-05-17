import Link from 'next/link';
import { IMAGES } from '../../lib/images';
import SafeImage from '../ui/SafeImage';

export default function PromoBanners() {
  return (
    <section className="py-8">
      <section className="mx-auto grid max-w-site gap-6 px-4 md:grid-cols-2">
        <article className="relative overflow-hidden rounded-sm bg-ink-900 text-white shadow-card">
          <figure className="relative aspect-[16/10]">
            <SafeImage
              src={IMAGES.dining}
              alt="Reclaimed furniture sale"
              fill
              className="object-cover opacity-60"
              sizes="50vw"
            />
          </figure>
          <section className="absolute inset-0 z-10 flex flex-col justify-center p-8">
            <p className="text-sm uppercase tracking-widest text-brand-100">Reclaimed & hand crafted</p>
            <h3 className="mt-2 font-serif text-3xl">Sale off 50%</h3>
            <Link href="/products?special=true" className="btn-primary mt-6 w-fit">
              Shop sale
            </Link>
          </section>
        </article>
        <article className="relative overflow-hidden rounded-sm border border-ink-200 bg-white shadow-card">
          <figure className="relative aspect-[16/10]">
            <SafeImage src={IMAGES.living} alt="Elite collection" fill className="object-cover" sizes="50vw" />
          </figure>
          <section className="p-6">
            <span className="rounded-sm bg-brand-500 px-2 py-1 text-xs font-bold text-white">35% off</span>
            <h3 className="mt-3 font-serif text-2xl text-ink-900">Elite collection design furniture</h3>
            <Link href="/products?featured=true" className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline">
              View collection →
            </Link>
          </section>
        </article>
      </section>
      <section className="mx-auto mt-6 max-w-site px-4">
        <article className="rounded-sm bg-amber-100 px-6 py-8 text-center md:px-12">
          <h3 className="font-serif text-2xl font-bold uppercase text-ink-900 md:text-3xl">
            Buy online — pick up in store
          </h3>
          <p className="mt-2 text-ink-700">Now available in Islamabad & Lahore showrooms</p>
          <Link href="/contact" className="mt-4 inline-block font-semibold text-brand-700 hover:underline">
            Learn more
          </Link>
        </article>
      </section>
    </section>
  );
}
