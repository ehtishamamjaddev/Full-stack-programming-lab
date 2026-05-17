/**
 * Lab 10 — Node.js + Express.js
 * Task 3: Dynamic User Page
 *
 * Student  : M Ehtisham Amjad
 * Instructor: Sir Shareef Hussain
 * Course   : Full Stack Programming
 * Institute: Air University Islamabad
 */

const express = require('express');

const router = express.Router();

// Normalizes the provided name so blank input falls back gracefully.
const getDisplayName = (rawName) => {
  const cleanedName = (rawName || '').trim();
  return cleanedName;
};

// Example test URLs: /user/Maryam and /user/Shareef.

// Builds the HTML response for the dynamic user page.
const renderUserPage = (displayName) => {
  const isFallback = !displayName;
  const title = isFallback ? 'User Page | Lab 10' : `Hello, ${displayName} | Lab 10`;
  const heading = isFallback ? 'Please provide a name in the URL.' : `Hello, ${displayName} 👋`;
  const subheading = isFallback
    ? 'Example: /user/Ehtisham'
    : `This dynamic route is serving a personalized page for ${displayName}.`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <main class="center-stage">
    <section class="center-card" aria-live="polite">
      <h1>${heading}</h1>
      <p>${subheading}</p>
      <p class="muted-note"><a href="/">Back to Lab 10 home</a></p>
    </section>
  </main>
</body>
</html>
`;
};

// Responds with a personalized greeting card for /user/:name.
router.get('/:name', (req, res) => {
  const displayName = getDisplayName(req.params.name);
  res.status(200).send(renderUserPage(displayName));
});

// Responds with a graceful fallback when no name is provided.
router.get('/', (req, res) => {
  res.status(200).send(renderUserPage(''));
});

module.exports = router;
