/* Task 6 — Mini University Portal (Class, Map, Set, Promise) */

class Student {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.courseSet = new Set();
  }

  enroll(course) {
    if (this.courseSet.has(course)) {
      showToast(`"${course}" is already enrolled for ${this.name}!`, 'warning');
      return false;
    }
    this.courseSet.add(course);
    return true;
  }

  getSummary() {
    let coursesHTML = '';
    for (const c of this.courseSet) {
      coursesHTML += `<span class="chip">${c}</span>`;
    }
    if (this.courseSet.size === 0) {
      coursesHTML = '<span style="color:var(--text-muted);font-size:0.84rem;">No courses enrolled yet.</span>';
    }

    return `
      <div class="portal-card">
        <span class="sid-badge">${this.id}</span>
        <h3>${this.name}</h3>
        <p class="courses-label">Enrolled Courses (${this.courseSet.size})</p>
        <div class="course-chips">${coursesHTML}</div>
      </div>
    `;
  }
}

const studentMap = new Map();

const portalContainer = document.getElementById('portal-container');
const studentSelect = document.getElementById('studentSelect');
const toastArea = document.getElementById('toast-area');

const showToast = (message, type = 'warning') => {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toastArea.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
};

const addStudent = (id, name) => {
  if (studentMap.has(id)) {
    showToast(`Student ID "${id}" already exists!`, 'danger');
    return null;
  }
  const student = new Student(id, name);
  studentMap.set(id, student);
  updateDropdown();
  renderPortal();
  return student;
};

const enrollCourse = (studentId, course) => {
  const student = studentMap.get(studentId);
  if (!student) {
    showToast('Student not found!', 'danger');
    return;
  }
  student.enroll(course);
  renderPortal();
};

const saveData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Data saved successfully!'), 2000);
  });
};

const updateDropdown = () => {
  studentSelect.innerHTML = '<option value="">— Select Student —</option>';
  studentMap.forEach((student, id) => {
    studentSelect.innerHTML += `<option value="${id}">${id} — ${student.name}</option>`;
  });
};

const renderPortal = () => {
  portalContainer.innerHTML = '';
  studentMap.forEach((student) => {
    portalContainer.innerHTML += student.getSummary();
  });
};

document.getElementById('addStudentBtn').addEventListener('click', () => {
  const id = document.getElementById('newStudentId').value.trim();
  const name = document.getElementById('newStudentName').value.trim();
  if (!id || !name) { showToast('Please fill in both ID and Name.', 'danger'); return; }
  addStudent(id, name);
  document.getElementById('newStudentId').value = '';
  document.getElementById('newStudentName').value = '';
  showToast(`Student "${name}" added!`, 'success');
});

document.getElementById('enrollBtn').addEventListener('click', () => {
  const studentId = studentSelect.value;
  const course = document.getElementById('courseNameInput').value.trim();
  if (!studentId || !course) { showToast('Select a student and enter a course name.', 'danger'); return; }
  enrollCourse(studentId, course);
  document.getElementById('courseNameInput').value = '';
});

const saveBtn = document.getElementById('saveBtn');
const saveStatus = document.getElementById('save-status');

saveBtn.addEventListener('click', () => {
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving…';
  saveStatus.innerHTML = '<div class="spinner" style="margin:14px 0;"></div>';

  saveData()
    .then(msg => {
      saveStatus.innerHTML = `<div class="save-banner success">✓ ${msg}</div>`;
    })
    .catch(err => {
      saveStatus.innerHTML = `<div class="save-banner" style="background:rgba(255,118,117,0.08);border:1px solid rgba(255,118,117,0.25);color:var(--danger);">⚠ ${err}</div>`;
    })
    .finally(() => {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save Data';
    });
});

/* Pre-populate with unique Pakistani names */
const s1 = addStudent('S001', 'M Ehtisham Amjad');
const s2 = addStudent('S002', 'Izah Shafqat');
const s3 = addStudent('S003', 'Kashif Mehmood');

s1.enroll('Full Stack Programming');
s1.enroll('Artificial Intelligence');
s1.enroll('Database Systems');
s2.enroll('Data Structures');
s2.enroll('Operating Systems');
s3.enroll('Machine Learning');
s3.enroll('Cloud Computing');

renderPortal();
