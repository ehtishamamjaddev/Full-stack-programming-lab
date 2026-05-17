/* Task 4 — Unique Course Registration (Set) */

const registeredCourses = new Set();

registeredCourses.add('Mathematics');
registeredCourses.add('Physics');
registeredCourses.add('Data Structures');

const courseInput = document.getElementById('courseInput');
const registerBtn = document.getElementById('registerBtn');
const coursesContainer = document.getElementById('courses-container');
const courseCountEl = document.getElementById('courseCount');
const toastArea = document.getElementById('toast-area');

const showToast = (message, type = 'warning') => {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toastArea.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
};

const renderCourses = () => {
  coursesContainer.innerHTML = '';
  courseCountEl.textContent = registeredCourses.size;

  for (const course of registeredCourses) {
    coursesContainer.innerHTML += `
      <span class="course-chip">
        ${course}
        <button onclick="removeCourse('${course}')" title="Remove">×</button>
      </span>
    `;
  }
};

const registerCourse = (courseName) => {
  const trimmed = courseName.trim();
  if (!trimmed) {
    showToast('Please enter a course name.', 'danger');
    return;
  }

  if (registeredCourses.has(trimmed)) {
    showToast('Course already registered!', 'warning');
    return;
  }

  registeredCourses.add(trimmed);
  renderCourses();
  showToast(`"${trimmed}" registered successfully!`, 'success');
};

const removeCourse = (name) => {
  registeredCourses.delete(name);
  renderCourses();
};

registerBtn.addEventListener('click', () => {
  registerCourse(courseInput.value);
  courseInput.value = '';
  courseInput.focus();
});

courseInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    registerCourse(courseInput.value);
    courseInput.value = '';
  }
});

renderCourses();
