# HOTSPRING React App - Lab 07

React conversion of the HOTSPRING e-commerce website for Full Stack Programming (BSSE-VI-B), Air University Islamabad.

## Course Context

- Course: Full Stack Programming
- Instructor: Mr. Shareef Hussain
- Team Lead: M Ehtisham Amjad (231996)
- Team Member: M Abdullah Fawad (232052)
- Team Member: Aman Mir (233002)
- Repository folder: `Lab_07-hottub-react-app`

## Tech Stack

- React 18
- React Router v6
- Zustand (state management)
- Formik + Yup (forms and validation)
- Framer Motion (page/component animation)
- React Icons
- React Toastify
- CSS Modules

## Implemented Pages

- Home
- Shop
- Product Detail
- Cart
- Checkout
- Account
- Login
- Register
- About
- Contact
- 404 Not Found

## Project Structure

```txt
src/
	app/
	components/
		common/
		layout/
		shop/
	data/
	hooks/
	pages/
	store/
	styles/
	utils/
```

## Scripts

### `npm start`
Run the app in development mode.

### `npm run build`
Create an optimized production build.

### `npm test`
Run tests in watch mode.

### `npm run lint`
Run project lint checks (React + jsx-a11y recommended rules).

### `npm run lint:a11y`
Run focused accessibility lint checks for common WCAG failures.

## Accessibility Notes

- Skip-to-content link included
- Semantic headings and landmarks
- Keyboard focus styling and visible focus states
- Form fields with labels and validation feedback

## Lighthouse Checklist (Release Ready)

- Run Lighthouse in Chrome DevTools for mobile and desktop on Home, Shop, Product Detail, Checkout.
- Accessibility target: 95+ (ideal 100), Performance target: 85+.
- Verify every page has one clear H1 and logical heading order.
- Confirm all interactive controls are reachable and visible by keyboard only.
- Ensure color contrast is readable for body copy, badges, and muted text on white cards.
- Validate all form fields expose labels, invalid states, and readable error text.
- Confirm reduced motion preference softens animations/transitions.
- Check images have meaningful alt text or empty alt for decorative-only images.
- Confirm mobile nav toggle announces expanded/collapsed state.
- Re-run Lighthouse after production build preview (`npm run build`).

## Credits

Detailed contribution mapping is available in `CREDITS.md`.
