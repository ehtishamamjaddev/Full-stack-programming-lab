/* Task 3 — Asynchronous Data Loader (Promises) */

const simulateFailure = false;

const fetchUsers = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!simulateFailure) {
        resolve([
          { id: 1, name: 'Kashif Mehmood', role: 'Frontend Developer', email: 'kashif.mehmood@devteam.pk' },
          { id: 2, name: 'Izah Shafqat', role: 'Backend Engineer', email: 'izah.shafqat@devteam.pk' },
          { id: 3, name: 'Noman Rafiq', role: 'UI/UX Designer', email: 'noman.rafiq@devteam.pk' },
          { id: 4, name: 'Rabia Zulfiqar', role: 'DevOps Engineer', email: 'rabia.zulfiqar@devteam.pk' }
        ]);
      } else {
        reject('Error: Failed to load user data.');
      }
    }, 3000);
  });
};

const loadBtn = document.getElementById('loadBtn');
const spinnerArea = document.getElementById('spinner-area');
const errorArea = document.getElementById('error-area');
const usersContainer = document.getElementById('users-container');

loadBtn.addEventListener('click', () => {
  errorArea.innerHTML = '';
  usersContainer.innerHTML = '';
  spinnerArea.innerHTML = '<div class="spinner"></div>';
  loadBtn.disabled = true;
  loadBtn.textContent = 'Loading…';

  fetchUsers()
    .then(users => {
      spinnerArea.innerHTML = '';
      usersContainer.innerHTML = users.map(user => `
        <div class="user-card">
          <span class="role-badge">${user.role}</span>
          <h3>${user.name}</h3>
          <p class="email">✉ ${user.email}</p>
        </div>
      `).join('');
    })
    .catch(err => {
      spinnerArea.innerHTML = '';
      errorArea.innerHTML = `<div class="error-alert">⚠ ${err}</div>`;
    })
    .finally(() => {
      loadBtn.disabled = false;
      loadBtn.textContent = 'Load Users';
    });
});
