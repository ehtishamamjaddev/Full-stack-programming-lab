"use client";

// Created by: M Ehtisham Amjad (231996)
import { FormEvent, useState } from "react";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+92\s?\d{3}\s?\d{7}$/.test(values.phone)) {
    errors.phone = "Use Pakistani format: +92 300 1234567";
  }

  if (!values.message.trim() || values.message.trim().length < 12) {
    errors.message = "Message must be at least 12 characters long.";
  }

  return errors;
}

export default function ContactPage() {
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(formValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      setFormValues(initialValues);
    }
  };

  return (
    <div className="section-pad">
      <div className="container-shell grid gap-8 lg:grid-cols-2">
        <section className="soft-card rounded-3xl p-7">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Contact Us</h1>
          <p className="mt-3 text-slate-600">
            Send your message and our team will get back to you with a tailored response.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formValues.name}
                onChange={(event) => setFormValues((prev) => ({ ...prev, name: event.target.value }))}
                className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formValues.email}
                onChange={(event) => setFormValues((prev) => ({ ...prev, email: event.target.value }))}
                className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
            </div>

            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+92 300 1234567"
                value={formValues.phone}
                onChange={(event) => setFormValues((prev) => ({ ...prev, phone: event.target.value }))}
                className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm"
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone}</p> : null}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={formValues.message}
                onChange={(event) => setFormValues((prev) => ({ ...prev, message: event.target.value }))}
                className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm"
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message ? <p className="mt-1 text-xs text-red-600">{errors.message}</p> : null}
            </div>

            <button
              type="submit"
              className="focus-ring rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-2"
            >
              Send Message
            </button>
            {submitted ? (
              <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                Thank you. Your message has been submitted successfully.
              </p>
            ) : null}
          </form>
        </section>

        <section className="space-y-6">
          <article className="soft-card rounded-3xl p-6">
            <h2 className="text-xl font-semibold text-slate-900">Contact Information</h2>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
              <li>Email: info@ehtishamtech.pk</li>
              <li>Phone: +92 51 2345678</li>
              <li>Address: Office #12, Gulberg Greens, Islamabad, Pakistan</li>
            </ul>
            <div className="mt-4 flex gap-3 text-sm font-medium text-brand">
              <a href="https://github.com/ehtishamamjaddev" target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                X/Twitter
              </a>
            </div>
          </article>

          <article className="soft-card overflow-hidden rounded-3xl p-2">
            <iframe
              title="Islamabad map placeholder"
              src="https://www.google.com/maps?q=Islamabad,+Pakistan&output=embed"
              className="h-64 w-full rounded-2xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </article>
        </section>
      </div>
    </div>
  );
}