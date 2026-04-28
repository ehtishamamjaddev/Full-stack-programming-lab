/**
 * Lab 10 — Node.js + Express.js
 * Task 4: Simple HTML Page Renderer
 *
 * Student  : M Ehtisham Amjad
 * Instructor: Sir Shareef Hussain
 * Course   : Full Stack Programming
 * Institute: Air University Islamabad
 */

const express = require('express');

const router = express.Router();

// Builds the HTML document for the root landing page.
const renderHomePage = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Full Stack Programming — Lab 10</title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <main class="site-shell">
    <section class="page-wrap">
      <article class="page-card">
        <h1 class="page-title">Full Stack Programming — Lab 10</h1>
        <p class="page-lead">Node.js and Express.js make it straightforward to build lightweight server-side applications, route requests cleanly, and return HTML directly in the browser.</p>

        <h2 class="section-title" style="margin-top: 28px;">Express features</h2>
        <ul class="feature-list">
          <li>Lightweight routing</li>
          <li>Middleware support</li>
          <li>Static file serving</li>
          <li>Simple HTML response rendering</li>
        </ul>

        <h2 class="section-title" style="margin-top: 28px;">Open lab routes</h2>
        <ul class="feature-list">
          <li><a href="/students">/students</a></li>
          <li><a href="/home">/home</a></li>
          <li><a href="/about">/about</a></li>
          <li><a href="/contact">/contact</a></li>
          <li><a href="/user/Ehtisham">/user/Ehtisham</a></li>
        </ul>

        <div class="footer">M Ehtisham Amjad | Air University Islamabad</div>
      </article>
    </section>
  </main>
</body>
</html>
`;

// Responds with the root documentation-style landing page.
router.get('/', (req, res) => {
  res.status(200).send(renderHomePage());
});

module.exports = router;
