// Created by: M Ehtisham Amjad (231996)
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Ehtisham Tech",
  description: "About page for Lab 08 Next.js frontend project.",
};

const teamMembers = [
  {
    name: "Ehtisham",
    role: "Lead Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Maryam",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Kashif",
    role: "Backend Engineer",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Haseeb",
    role: "Frontend Engineer",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    name: "Fatima",
    role: "Quality Analyst",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Ali",
    role: "Product Strategist",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Sara",
    role: "Content Specialist",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    name: "Zainab",
    role: "Project Coordinator",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="section-pad">
      <div className="container-shell space-y-10">
        <section className="soft-card rounded-3xl p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">About Ehtisham Tech</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            We are a collaborative student-driven digital team focused on building clean, scalable, and user-friendly
            web experiences. This project reflects how modern engineering teams structure pages, components, and data
            for maintainable frontend delivery.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-xl font-semibold text-slate-900">Our Mission</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                To craft high-quality digital products that balance technical excellence with elegant, human-centered
                design for real-world users and business needs.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-xl font-semibold text-slate-900">Our Vision</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                To become a reliable innovation team known for thoughtful interfaces, accessibility-first development,
                and professional engineering standards across the Pakistani tech landscape.
              </p>
            </article>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900">Our Team</h2>
          <p className="mt-2 text-slate-600">Meet the talented people behind this lab project.</p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <article key={member.name} className="soft-card rounded-2xl p-5 text-center">
                <Image
                  src={member.image}
                  alt={`${member.name} portrait`}
                  width={96}
                  height={96}
                  className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-slate-100"
                />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{member.name}</h3>
                <p className="text-sm text-slate-600">{member.role}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}