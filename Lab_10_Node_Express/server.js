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
const path = require('path');

const messageRouter = require('./task2/messageRoutes');
const studentsRouter = require('./task1/students');
const userRouter = require('./task3/user');
const homepageRouter = require('./task4/homepage');

const app = express();
const port = 3000;

// Serves shared static CSS assets from the public folder.
app.use(express.static(path.join(__dirname, 'public')));

// Mounts the task-specific routers for the lab project.
app.use('/', messageRouter);
app.use('/students', studentsRouter);
app.use('/user', userRouter);
app.use('/', homepageRouter);

// Starts the Express server on port 3000.
app.listen(port, () => {
  console.log('Server running → http://localhost:3000');
});
