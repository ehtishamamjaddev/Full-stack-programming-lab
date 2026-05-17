"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../lib/api';
import { BlogPost } from '../../lib/types';
import { productImage } from '../../lib/images';
import SafeImage from '../../components/ui/SafeImage';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    api
      .get('/blog?limit=12')
      .then((r) => setPosts(r.data.data || []))
      .catch(() => setPosts([]));
  }, []);

  return (
    <section className="mx-auto max-w-site px-4 py-12">
      <h1 className="font-serif text-4xl text-center">Blog</h1>
      <p className="section-subtitle mt-4">Design inspiration and furniture care guides.</p>
      <section className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post._id} className="overflow-hidden rounded-sm bg-white shadow-card">
            <figure className="relative aspect-video bg-ink-100">
              <SafeImage
                src={productImage(post.image)}
                alt={post.title}
                fill
                className="object-cover"
                sizes="33vw"
              />
            </figure>
            <section className="p-5">
              <h2 className="font-serif text-xl">
                <Link href={`/blog/${post.slug}`} className="hover:text-brand-500">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-ink-600">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">
                Read more →
              </Link>
            </section>
          </article>
        ))}
      </section>
    </section>
  );
}
