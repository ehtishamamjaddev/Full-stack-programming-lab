"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../lib/api';
import { BlogPost } from '../../lib/types';
import { productImage } from '../../lib/images';
import SafeImage from '../ui/SafeImage';

export default function BlogUpdates() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    api
      .get('/blog?limit=3')
      .then((r) => setPosts(r.data.data || []))
      .catch(() => setPosts([]));
  }, []);

  if (!posts.length) return null;

  return (
    <section className="bg-ink-50 py-16">
      <section className="mx-auto max-w-site px-4">
        <h2 className="section-title">Latest updates</h2>
        <p className="section-subtitle">Tips, trends, and stories from the Rustik Plank workshop.</p>
        <section className="mt-10 grid gap-8 md:grid-cols-3">
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
                <h3 className="font-serif text-xl text-ink-900">{post.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-ink-600">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="btn-outline mt-4 inline-flex text-xs">
                  Read more
                </Link>
              </section>
            </article>
          ))}
        </section>
      </section>
    </section>
  );
}
