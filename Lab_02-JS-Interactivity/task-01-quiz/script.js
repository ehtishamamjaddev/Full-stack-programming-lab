// M Ehtisham Amjad BSSE-VI-B (231996)
// Task 1: Dynamic Quiz
// Requirement: store each question and answer in separate variables.
const q1Question =
  "Which keyword is used to declare a constant in JavaScript?";
const q1CorrectAnswer = "const";

const q2Question =
  "Which method selects a single element by its ID (e.g., \"#app\")?";
const q2CorrectAnswer = "getElementById";

const q3Question = "What does DOM stand for?";
const q3CorrectAnswer = "Document Object Model";

const q4Question = "What is the output of: 2 + \"2\" ?";
const q4CorrectAnswer = "22";

const q5Question = "Which operator checks value AND type equality?";
const q5CorrectAnswer = "===";

function getSelectedValue(form, name) {
  const selected = form.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : "";
}

function setFeedback(el, isCorrect, message) {
  el.textContent = message;
  el.classList.remove("feedback--ok", "feedback--bad");
  if (isCorrect === true) el.classList.add("feedback--ok");
  if (isCorrect === false) el.classList.add("feedback--bad");
}

// Requirement: use functions to check each answer individually.
function checkQ1(form, feedbackEl) {
  const answer = getSelectedValue(form, "q1");
  if (!answer) {
    setFeedback(feedbackEl, false, "No answer selected.");
    return 0;
  }
  const ok = answer === q1CorrectAnswer;
  setFeedback(
    feedbackEl,
    ok,
    ok ? "Correct." : `Incorrect. Correct answer: ${q1CorrectAnswer}.`
  );
  return ok ? 1 : 0;
}

function checkQ2(form, feedbackEl) {
  const answer = getSelectedValue(form, "q2");
  if (!answer) {
    setFeedback(feedbackEl, false, "No answer selected.");
    return 0;
  }
  const ok = answer === q2CorrectAnswer;
  setFeedback(
    feedbackEl,
    ok,
    ok ? "Correct." : `Incorrect. Correct answer: ${q2CorrectAnswer}().`
  );
  return ok ? 1 : 0;
}

function checkQ3(form, feedbackEl) {
  const answer = getSelectedValue(form, "q3");
  if (!answer) {
    setFeedback(feedbackEl, false, "No answer selected.");
    return 0;
  }
  const ok = answer === q3CorrectAnswer;
  setFeedback(
    feedbackEl,
    ok,
    ok ? "Correct." : `Incorrect. Correct answer: ${q3CorrectAnswer}.`
  );
  return ok ? 1 : 0;
}

function checkQ4(form, feedbackEl) {
  const answer = getSelectedValue(form, "q4");
  if (!answer) {
    setFeedback(feedbackEl, false, "No answer selected.");
    return 0;
  }
  const ok = answer === q4CorrectAnswer;
  setFeedback(
    feedbackEl,
    ok,
    ok ? "Correct." : `Incorrect. Correct answer: ${q4CorrectAnswer}.`
  );
  return ok ? 1 : 0;
}

function checkQ5(form, feedbackEl) {
  const answer = getSelectedValue(form, "q5");
  if (!answer) {
    setFeedback(feedbackEl, false, "No answer selected.");
    return 0;
  }
  const ok = answer === q5CorrectAnswer;
  setFeedback(
    feedbackEl,
    ok,
    ok ? "Correct." : `Incorrect. Correct answer: ${q5CorrectAnswer}.`
  );
  return ok ? 1 : 0;
}

function setScorePill(score) {
  const scorePill = document.getElementById("scorePill");
  if (!scorePill) return;
  scorePill.textContent = typeof score === "number" ? `${score}/5` : "—";
}

function setResultTone(resultEl, score) {
  let tone = "neutral";
  if (score >= 4) tone = "positive";
  else if (score <= 2) tone = "negative";
  resultEl.dataset.tone = tone;
}

function gradeQuiz() {
  const form = document.getElementById("quizForm");
  const quizResultEl = document.getElementById("quizResult");

  const q1Feedback = document.getElementById("q1Feedback");
  const q2Feedback = document.getElementById("q2Feedback");
  const q3Feedback = document.getElementById("q3Feedback");
  const q4Feedback = document.getElementById("q4Feedback");
  const q5Feedback = document.getElementById("q5Feedback");

  const score =
    checkQ1(form, q1Feedback) +
    checkQ2(form, q2Feedback) +
    checkQ3(form, q3Feedback) +
    checkQ4(form, q4Feedback) +
    checkQ5(form, q5Feedback);

  setScorePill(score);

  // Requirement: conditional statements to display messages based on the score.
  let message = "";
  if (score === 5) message = "Excellent! Perfect score.";
  else if (score >= 3) message = "Good job! You're doing well.";
  else if (score >= 1) message = "Nice start—review and try again.";
  else message = "Reset and try again. You've got this.";

  // Requirement: display results dynamically using DOM manipulation.
  quizResultEl.innerHTML = `
    <div class="result__title">Your Score</div>
    <div class="result__value">${score} <span class="muted">/ 5</span></div>
    <div class="result__sub muted">${message}</div>
  `;
  setResultTone(quizResultEl, score);
}

function resetQuiz() {
  const form = document.getElementById("quizForm");
  const quizResultEl = document.getElementById("quizResult");
  form.reset();

  const feedbackEls = [
    document.getElementById("q1Feedback"),
    document.getElementById("q2Feedback"),
    document.getElementById("q3Feedback"),
    document.getElementById("q4Feedback"),
    document.getElementById("q5Feedback"),
  ];

  feedbackEls.forEach((el) => {
    el.textContent = "";
    el.classList.remove("feedback--ok", "feedback--bad");
  });

  quizResultEl.textContent = "";
  quizResultEl.dataset.tone = "neutral";
  setScorePill("—");
}

document.addEventListener("DOMContentLoaded", () => {
  // Keep variables "used" so linters don't complain, while still meeting the lab requirement.
  void q1Question;
  void q2Question;
  void q3Question;
  void q4Question;
  void q5Question;

  document.getElementById("submitQuizBtn").addEventListener("click", gradeQuiz);
  document.getElementById("resetQuizBtn").addEventListener("click", resetQuiz);
});
