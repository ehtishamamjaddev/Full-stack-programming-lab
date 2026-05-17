import { IMAGES } from '../../lib/images';
import SafeImage from '../../components/ui/SafeImage';

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-site px-4 py-12">
      <header className="text-center">
        <h1 className="font-serif text-4xl text-ink-900">About Rustik Plank</h1>
        <p className="section-subtitle mt-4">
          We craft and curate furniture that blends rustic warmth with modern living — made for Pakistani homes.
        </p>
      </header>
      <section className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        <figure className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-card">
          <SafeImage src={IMAGES.box} alt="Rustik Plank workshop" fill className="object-cover" sizes="50vw" />
        </figure>
        <article className="space-y-4 text-ink-600 leading-relaxed">
          <p>
            Founded with a passion for sustainable timber and honest craftsmanship, Rustik Plank partners with
            local artisans across Pakistan to deliver beds, tables, chairs, and storage solutions built to last.
          </p>
          <p>
            Every piece is inspected for quality, finished with low-VOC coatings, and supported by our customer
            team from selection through delivery.
          </p>
          <ul className="list-inside list-disc space-y-2 text-ink-700">
            <li>Handcrafted solid wood & reclaimed materials</li>
            <li>Nationwide delivery & cash on delivery</li>
            <li>Full CRUD admin catalog for lab demonstration</li>
          </ul>
        </article>
      </section>
    </section>
  );
}
