/**
 * Lab 10 — Node.js + Express.js
 * Task 1: Student List Display
 *
 * Student  : M Ehtisham Amjad
 * Instructor: Sir Shareef Hussain
 * Course   : Full Stack Programming
 * Institute: Air University Islamabad
 */

const express = require('express');

const router = express.Router();

// Hardcoded Pakistani student names used for the browser-rendered list.
const studentNames = ['Ehtisham', 'Maryam', 'Zainab', 'Hasan', 'Umer', 'Fatima', 'Bilal'];

// Builds the HTML response for the student list page.
const renderStudentsPage = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Student List | Lab 10</title>
  <link rel="stylesheet" href="/styles.css" />
  <style>
    .student-page {
      max-width: 720px;
      margin: 0 auto;
      padding: 32px 24px 56px;
    }

    .student-card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 32px;
    }
  </style>
</head>
<body>
  <main class="site-shell">
    <section class="student-page">
      <article class="student-card">
        <h1 class="page-title">Student List</h1>
        <p class="page-lead">A simple Express response that renders a clean list of students in the browser.</p>
        <ul class="student-list">
          ${studentNames.map((student) => `<li>${student}</li>`).join('')}
        </ul>
        <p class="muted-note"><a href="/">Back to Lab 10 home</a></p>
      </article>
    </section>
  </main>
</body>
</html>
`;

// Responds with a styled student list when the browser visits /students.
router.get('/', (req, res) => {
  res.status(200).send(renderStudentsPage());
});

module.exports = router;
