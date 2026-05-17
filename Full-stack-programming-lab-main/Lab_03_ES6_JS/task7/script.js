/* Task 7 — Student Data Using JSON (JSON.stringify, JSON.parse, Destructuring) */

/* 1. Define 3 student objects with unique Pakistani names */
const student1 = { name: 'M Ehtisham Amjad', age: 22, semester: 6, courses: ['Full Stack Programming', 'Artificial Intelligence', 'Database Systems'] };
const student2 = { name: 'Izah Shafqat', age: 21, semester: 5, courses: ['Data Structures', 'Operating Systems', 'Discrete Mathematics'] };
const student3 = { name: 'Shareef Hussain', age: 24, semester: 8, courses: ['Machine Learning', 'Cloud Computing', 'Software Engineering'] };

/* 2. Convert to JSON strings and log */
const json1 = JSON.stringify(student1, null, 2);
const json2 = JSON.stringify(student2, null, 2);
const json3 = JSON.stringify(student3, null, 2);

console.log('Student 1 JSON:', json1);
console.log('Student 2 JSON:', json2);
console.log('Student 3 JSON:', json3);

/* 3. Parse back to objects */
const parsed1 = JSON.parse(json1);
const parsed2 = JSON.parse(json2);
const parsed3 = JSON.parse(json3);

/* 4. Destructure each parsed object */
const { name: name1, age: age1, semester: sem1, courses: courses1 } = parsed1;
const { name: name2, age: age2, semester: sem2, courses: courses2 } = parsed2;
const { name: name3, age: age3, semester: sem3, courses: courses3 } = parsed3;

/* 5. Store all in an array */
const students = [parsed1, parsed2, parsed3];
const jsonStrings = [json1, json2, json3];

/* 6. Render into DOM */
const output = document.getElementById('students-output');

students.forEach((student, index) => {
  const { name, age, semester, courses } = student;

  const courseTags = courses.map(c => `<span class="chip">${c}</span>`).join('');

  output.innerHTML += `
    <div class="student-row">
      <div class="info-card">
        <h3>${name}</h3>
        <p class="meta">Age: ${age}</p>
        <span class="sem-badge">Semester ${semester}</span>
        <div class="course-tags">${courseTags}</div>
      </div>
      <div class="json-card">
        <div class="json-bar">Raw JSON String</div>
        <pre>${jsonStrings[index]}</pre>
      </div>
    </div>
  `;
});
