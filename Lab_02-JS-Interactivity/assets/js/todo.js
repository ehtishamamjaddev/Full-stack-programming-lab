// M Ehtisham Amjad BSSE-VI-B (231996)
// Task 3: Simple To-Do List (3 fixed tasks)

function applyTaskStyles() {
  // Requirement: use loops to style all tasks the same way.
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    const input = task.querySelector("input");
    const status = task.dataset.status;

    task.classList.toggle("is-complete", status === "complete");
    task.classList.toggle("is-removed", status === "removed");

    if (input) {
      input.disabled = status === "removed";
      input.setAttribute("aria-disabled", String(status === "removed"));
    }
  });
}

function toggleComplete(taskEl) {
  const current = taskEl.dataset.status;
  if (current === "removed") return;
  taskEl.dataset.status = current === "complete" ? "active" : "complete";
  applyTaskStyles();
}

function removeTask(taskEl) {
  taskEl.dataset.status = "removed";
  applyTaskStyles();
}

function resetList() {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    task.dataset.status = "active";
  });
  applyTaskStyles();
}

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("todoList");
  const resetBtn = document.getElementById("todoResetBtn");

  // DOM manipulation: update status and visibility on button clicks
  list.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const taskEl = btn.closest(".task");
    if (!taskEl) return;

    const action = btn.dataset.action;
    if (action === "complete") toggleComplete(taskEl);
    if (action === "remove") removeTask(taskEl);
  });

  resetBtn.addEventListener("click", resetList);

  applyTaskStyles();
});

