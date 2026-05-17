# Lab 06 - React JS Frontend

Student: M Ehtisham Amjad  
Roll Number: 231996  
Section: BSSE-VI-B  
Instructor: Sir Shareef Hussain

## Objective
This lab demonstrates core React frontend concepts through four separate applications:
- React State
- Event Handling
- Controlled Inputs
- Client-side Routing

## Applications Overview

### 1) counter-app
Purpose: Demonstrates state updates with a counter.

Concepts:
- Functional component architecture
- useState hook
- Conditional UI behavior

Features:
- Increment (+1)
- Decrement (-1), never below 0
- Reset button
- Decrement disabled at 0

### 2) user-form-app
Purpose: Demonstrates controlled form handling with validation.

Concepts:
- useState for form data and errors
- onChange and onSubmit events
- Controlled input fields

Features:
- Name and Email inputs
- Inline validation messages
- Success message after valid submission
- Submitted data preview
- Input fields reset after submission

### 3) event-app
Purpose: Demonstrates handling multiple event types.

Concepts:
- onClick
- onMouseOver and onMouseOut
- State updates from user interaction

Features:
- Show Message button
- Change Background button (dark color cycle)
- Show Alert button
- Hover-based heading color feedback
- Smooth transition and message fade-in

### 4) routing-app
Purpose: Demonstrates React Router navigation and multi-page structure.

Concepts:
- BrowserRouter, Routes, Route
- Link navigation
- Page-level component organization

Pages:
- Home
- About
- Contact
- Products
- NotFound

Features:
- About page includes: Ehtisham Amjad, Maryam Noor, Shareef Hussain
- Contact form with basic validation and success feedback
- Products page with static product cards and Add to Cart buttons
- 404 page with return link to Home

## Folder Structure
Lab_06_reactjsApp/
- counter-app/
- user-form-app/
- event-app/
- routing-app/

## Design Notes
All apps follow a clean professional dark dashboard style with consistent theme tokens:
- Background: #0f172a
- Card: #111827
- Border: #1f2937
- Accent: #4f46e5
- Text: #e5e7eb
- Muted: #9ca3af

## How to Run Any App
1. Open the app folder:
   - counter-app, user-form-app, event-app, or routing-app
2. Install dependencies:
   npm install
3. Start development server:
   npm start

## Build Check
All four apps were built successfully using production build commands.
