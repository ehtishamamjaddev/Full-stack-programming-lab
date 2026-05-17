// M Ehtisham Amjad BSSE-VI-B (231996)
// Task 2: Interactive Calculator
function symbolFor(op) {
  if (op === "add") return "+";
  if (op === "sub") return "−";
  if (op === "mul") return "×";
  if (op === "div") return "÷";
  return "?";
}

function setCalcResult(resultEl, tone, html) {
  resultEl.dataset.tone = tone;
  resultEl.innerHTML = html;
}

function calculate() {
  const num1El = document.getElementById("num1");
  const num2El = document.getElementById("num2");
  const opEl = document.getElementById("operation");
  const resultEl = document.getElementById("calcResult");

  const a = Number(num1El.value);
  const b = Number(num2El.value);
  const op = opEl.value;

  // Requirement: validate input with conditional statements
  if (num1El.value.trim() === "" || num2El.value.trim() === "") {
    setCalcResult(
      resultEl,
      "error",
      "<strong>Error:</strong> Please enter both numbers."
    );
    return;
  }
  if (Number.isNaN(a) || Number.isNaN(b)) {
    setCalcResult(
      resultEl,
      "error",
      "<strong>Error:</strong> Please enter valid numbers."
    );
    return;
  }

  // Requirement: prevent division by zero.
  if (op === "div" && b === 0) {
    setCalcResult(
      resultEl,
      "error",
      "<strong>Error:</strong> Division by zero is not allowed."
    );
    return;
  }

  let value = 0;
  if (op === "add") value = a + b;
  else if (op === "sub") value = a - b;
  else if (op === "mul") value = a * b;
  else if (op === "div") value = a / b;

  // Bonus: Change background color depending on positive or negative value.
  let tone = "neutral";
  if (value > 0) tone = "positive";
  else if (value < 0) tone = "negative";

  setCalcResult(
    resultEl,
    tone,
    `<div class="result__title">Result</div>
     <div class="result__value">${value}</div>
     <div class="result__sub muted">(${a} ${symbolFor(op)} ${b})</div>`
  );
}

function resetCalculator() {
  const num1El = document.getElementById("num1");
  const num2El = document.getElementById("num2");
  const opEl = document.getElementById("operation");
  const resultEl = document.getElementById("calcResult");

  num1El.value = "";
  num2El.value = "";
  opEl.value = "add";
  setCalcResult(resultEl, "neutral", "");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("calcBtn").addEventListener("click", calculate);
  document.getElementById("resetCalcBtn").addEventListener("click", resetCalculator);
});

