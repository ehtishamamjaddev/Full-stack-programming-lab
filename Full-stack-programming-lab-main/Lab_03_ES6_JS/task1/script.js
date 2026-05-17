/* Task 1 — Student Management System (ES6 Classes) */

class Student {
  constructor(id, name, semester, courses) {
    this.id = id;
    this.name = name;
    this.semester = semester;
    this.courses = courses;
  }

  getDetails() {
    const coursesHTML = this.courses
      .map(c => `<span class="chip">${c}</span>`)
      .join('');

    return `
      <div class="student-card">
        <span class="id-badge">${this.id}</span>
        <h3>${this.name}</h3>
        <p class="semester">Semester ${this.semester}</p>
        <div class="courses">${coursesHTML}</div>
      </div>
    `;
  }
}

const students = [
  new Student('STU-001', 'M Ehtisham Amjad', 6, ['Full Stack Programming', 'Artificial Intelligence', 'Database Systems']),
  new Student('STU-002', 'Izah Shafqat', 5, ['Data Structures', 'Operating Systems', 'Discrete Mathematics']),
  new Student('STU-003', 'Shareef Hussain', 8, ['Machine Learning', 'Cloud Computing', 'Software Engineering'])
];

let container = document.getElementById('students-container');

const renderStudents = () => {
  container.innerHTML = '';
  students.forEach(student => {
    container.innerHTML += student.getDetails();
  });
};

const addStudentBtn = document.getElementById('addStudentBtn');

addStudentBtn.addEventListener('click', () => {
  const id = document.getElementById('studentId').value.trim();
  const name = document.getElementById('studentName').value.trim();
  const semester = parseInt(document.getElementById('studentSemester').value, 10);
  const coursesRaw = document.getElementById('studentCourses').value.trim();

  if (!id || !name || !semester || !coursesRaw) {
    alert('Please fill in all fields.');
    return;
  }

  const courses = coursesRaw.split(',').map(c => c.trim()).filter(c => c.length > 0);
  const newStudent = new Student(id, name, semester, courses);
  students.push(newStudent);
  renderStudents();

  document.getElementById('studentId').value = '';
  document.getElementById('studentName').value = '';
  document.getElementById('studentSemester').value = '';
  document.getElementById('studentCourses').value = '';
});

renderStudents();
