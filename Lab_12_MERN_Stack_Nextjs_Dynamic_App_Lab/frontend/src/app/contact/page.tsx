"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success('Message sent! Our team will reply within 24 hours.');
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <section className="mx-auto max-w-site px-4 py-12">
      <header className="text-center">
        <h1 className="font-serif text-4xl">Contact us</h1>
        <p className="section-subtitle mt-4">Showrooms in Islamabad & Lahore · Mon–Sat 10am–7pm</p>
      </header>
      <section className="mt-12 grid gap-10 lg:grid-cols-2">
        <article className="space-y-4 text-ink-600">
          <p>
            <strong className="text-ink-900">Email:</strong> hello@rustikplank.com
          </p>
          <p>
            <strong className="text-ink-900">Phone:</strong> +92 300 123 4567
          </p>
          <p>
            <strong className="text-ink-900">Islamabad:</strong> F-7 Markaz
          </p>
          <p>
            <strong className="text-ink-900">Lahore:</strong> DHA Phase 5
          </p>
        </article>
        <form onSubmit={onSubmit} className="space-y-4 rounded-sm border border-ink-100 bg-white p-6 shadow-card">
          {(['name', 'email'] as const).map((field) => (
            <label key={field} className="block text-sm">
              <span className="capitalize text-ink-700">{field}</span>
              <input
                required
                type={field === 'email' ? 'email' : 'text'}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="mt-1 w-full rounded-sm border border-ink-200 px-3 py-2"
              />
            </label>
          ))}
          <label className="block text-sm">
            <span className="text-ink-700">Message</span>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1 w-full rounded-sm border border-ink-200 px-3 py-2"
            />
          </label>
          <button type="submit" className="btn-primary w-full">
            Send message
          </button>
        </form>
      </section>
    </section>
  );
}
