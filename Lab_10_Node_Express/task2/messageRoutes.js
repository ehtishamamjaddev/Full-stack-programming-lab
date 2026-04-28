/**
 * Lab 10 — Node.js + Express.js
 * Task 2: Simple Message Routes System
 *
 * Student  : M Ehtisham Amjad
 * Instructor: Sir Shareef Hussain
 * Course   : Full Stack Programming
 * Institute: Air University Islamabad
 */

const express = require('express');

const router = express.Router();

// Builds the full HTML page used by the Task 2 routes with active navigation.
const renderMessagePage = ({ title, heading, description, activePath }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <main class="site-shell">
    <header class="top-nav">
      <div class="brand">Air University Full Stack Lab</div>
      <nav class="nav-links" aria-label="Primary navigation">
        <a class="nav-link ${activePath === '/home' ? 'active' : ''}" href="/home">Home</a>
        <a class="nav-link ${activePath === '/about' ? 'active' : ''}" href="/about">About</a>
        <a class="nav-link ${activePath === '/contact' ? 'active' : ''}" href="/contact">Contact</a>
      </nav>
    </header>

    <section class="page-wrap">
      <article class="page-card">
        <h1 class="page-title">${heading}</h1>
        <p class="page-lead">${description}</p>
      </article>
    </section>
  </main>
</body>
</html>
`;

// Renders the home page for the multi-route message system.
router.get('/home', (req, res) => {
  res.status(200).send(
    renderMessagePage({
      title: 'Home | Lab 10',
      heading: 'Air University Full Stack Lab',
      description:
        'This lab demonstrates a minimal Express.js setup with clean routing, browser-visible responses, and a simple developer-style layout.',
      activePath: '/home',
    })
  );
});

// Renders the about page with a brief bio-style description.
router.get('/about', (req, res) => {
  res.status(200).send(
    renderMessagePage({
      title: 'About | Lab 10',
      heading: 'About Me',
      description:
        'I am M Ehtisham Amjad, a Full Stack Programming student at Air University Islamabad. This lab focuses on understanding Express routing with readable HTML responses.',
      activePath: '/about',
    })
  );
});

// Renders the contact page with a simple email reference.
router.get('/contact', (req, res) => {
  res.status(200).send(
    renderMessagePage({
      title: 'Contact | Lab 10',
      heading: 'Contact',
      description:
        'For lab-related communication, reach out at ehtishamamjad121@gmail.com. The page stays intentionally minimal and easy to read.',
      activePath: '/contact',
    })
  );
});

module.exports = router;