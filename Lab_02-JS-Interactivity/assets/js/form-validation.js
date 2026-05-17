// M Ehtisham Amjad BSSE-VI-B (231996)
// Task 5: Form Validation

function setFieldError(inputEl, errorEl, message) {
  errorEl.textContent = message;
  inputEl.classList.toggle("input-error", message !== "");
}

function validateName(value) {
  if (value.trim() === "") return "Name should not be empty.";
  return "";
}

function validateEmail(value) {
  if (value.trim() === "") return "Email should not be empty.";
  if (!value.includes("@")) return "Email must contain @.";
  return "";
}

function validateAge(value) {
  if (value.trim() === "") return "Age should not be empty.";
  const age = Number(value);
  if (Number.isNaN(age)) return "Age must be a number.";
  if (age < 18 || age > 60) return "Age must be between 18 and 60.";
  return "";
}

function validatePassword(value) {
  if (value.trim() === "") return "Password should not be empty.";
  if (value.length < 6) return "Password must be at least 6 characters.";
  return "";
}

function setFormMessage(el, type, text) {
  el.textContent = text;
  el.dataset.type = type; // success | error | warning | neutral
  el.classList.toggle("is-hidden", text.trim() === "");
}

function handleSubmit(e) {
  e.preventDefault();

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const ageEl = document.getElementById("age");
  const passEl = document.getElementById("password");

  const nameErrEl = document.getElementById("nameError");
  const emailErrEl = document.getElementById("emailError");
  const ageErrEl = document.getElementById("ageError");
  const passErrEl = document.getElementById("passwordError");

  const nameMsg = validateName(nameEl.value);
  const emailMsg = validateEmail(emailEl.value);
  const ageMsg = validateAge(ageEl.value);
  const passMsg = validatePassword(passEl.value);

  setFieldError(nameEl, nameErrEl, nameMsg);
  setFieldError(emailEl, emailErrEl, emailMsg);
  setFieldError(ageEl, ageErrEl, ageMsg);
  setFieldError(passEl, passErrEl, passMsg);

  const hasErrors = [nameMsg, emailMsg, ageMsg, passMsg].some((m) => m !== "");
  const formMessage = document.getElementById("formMessage");

  if (hasErrors) {
    setFormMessage(formMessage, "error", "Please fix the highlighted fields.");
    return;
  }

  // Requirement: confirm submission using BOM (confirm dialog)
  const ok = window.confirm("All validations passed. Submit registration?");
  if (!ok) {
    setFormMessage(formMessage, "warning", "Submission cancelled.");
    return;
  }

  setFormMessage(formMessage, "success", "Success! Registration submitted.");
}

function resetForm() {
  const form = document.getElementById("regForm");
  form.reset();

  const fields = [
    ["name", "nameError"],
    ["email", "emailError"],
    ["age", "ageError"],
    ["password", "passwordError"],
  ];

  fields.forEach(([inputId, errId]) => {
    const input = document.getElementById(inputId);
    const err = document.getElementById(errId);
    setFieldError(input, err, "");
  });

  setFormMessage(document.getElementById("formMessage"), "neutral", "");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("regForm").addEventListener("submit", handleSubmit);
  document.getElementById("resetFormBtn").addEventListener("click", resetForm);

  setFormMessage(document.getElementById("formMessage"), "neutral", "");
});

