# Lab 08 - Next.js Frontend Development

Developed by: M Ehtisham Amjad (Roll# 231996)  
Course: Full Stack Programming Lab  
Instructor: Sir Shareef Hussain  
Email: ehtishamamjad121@gmail.com

## Overview

This project implements Lab 08 requirements using Next.js App Router, TypeScript, and Tailwind CSS. It includes:

- Multi-page application (Home, About, Contact, Products)
- Reusable layout components (Header and Footer)
- Dynamic routing with product detail pages (`/products/[id]`)
- Responsive and accessible UI with modern design patterns

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint

## Project Structure

```txt
Lab_08_NEXTjsApp/
	app/
		(task-1)/
			page.tsx
			about/page.tsx
			contact/page.tsx
		(task-2)/
			products/page.tsx
			products/[id]/page.tsx
		layout.tsx
		not-found.tsx
		globals.css
	components/
		Header.tsx
		Footer.tsx
		ProductList.tsx
		ProductCard.tsx
	data/
		products.ts
	public/
		images/
			logo.svg
```

Task 1 pages are grouped under `app/(task-1)` and Task 2 pages are grouped under `app/(task-2)` so the lab stays organized while keeping the same public URLs.

## Features Checklist

### Task 1

- Home page with hero section, introduction, and CTA links
- About page with mission, vision, and team members (Pakistani names)
- About page team section uses real portrait photos for the team cards
- Contact page with styled form and client-side validation
- Responsive Header with active links and mobile menu
- Footer with quick links, contact details, and social links

### Task 2

- ProductList component with responsive grid layout
- Products page with breadcrumb and product cards
- Product cards use real stock photography for a more polished presentation
- Dynamic product detail pages through `/products/[id]`
- 3 complete products with PKR pricing and feature lists
- Invalid product IDs handled using Next.js `notFound()`

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open in browser:

```txt
http://localhost:3000
```

## Quality Checks

Run lint:

```bash
npm run lint
```

Run production build:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## Screenshots

Add screenshots before final submission:

- Home page
- About page
- Contact page
- Products page
- Product detail page

## Credits

- Developed by: M Ehtisham Amjad (231996)
- Repository: https://github.com/ehtishamamjaddev/Full-stack-programming-lab
- Course: Full Stack Programming Lab
- Instructor: Sir Shareef Hussain
