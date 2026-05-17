import Link from 'next/link';
import { productImage } from '../../../lib/images';
import SafeImage from '../../../components/ui/SafeImage';

async function getPost(slug: string) {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const res = await fetch(`${base}/blog/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();
  return json.post;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <section className="mx-auto max-w-site px-4 py-20 text-center">
        <h1 className="font-serif text-2xl">Post not found</h1>
        <Link href="/blog" className="mt-4 text-brand-600 hover:underline">
          Back to blog
        </Link>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/blog" className="text-sm text-brand-600 hover:underline">
        ← Back to blog
      </Link>
      <h1 className="mt-4 font-serif text-4xl text-ink-900">{post.title}</h1>
      <figure className="relative mt-8 aspect-video overflow-hidden rounded-sm bg-ink-100">
        <SafeImage
          src={productImage(post.image)}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </figure>
      <p className="mt-8 whitespace-pre-line leading-relaxed text-ink-700">{post.content}</p>
    </article>
  );
}
