// M Ehtisham Amjad BSSE-VI-B (231996)
// Task 4: Color Box Generator

function isValidCssColor(value) {
  // Try setting a style property; browsers normalize valid colors.
  const el = document.createElement("div");
  el.style.color = "";
  el.style.color = value;
  return el.style.color !== "";
}

function addColorBox(color, container) {
  const box = document.createElement("div");
  box.className = "color-box";
  box.style.backgroundColor = color;

  const label = document.createElement("div");
  label.className = "color-box__label";
  label.textContent = color;

  box.appendChild(label);
  container.appendChild(box);
}

function setMessage(el, type, text) {
  el.textContent = text;
  el.dataset.type = type; // "success" | "error" | "neutral"
  el.classList.toggle("is-hidden", text.trim() === "");
}

// Requirement: use functions to handle each color input.
function handleColor1() {
  handleColorInput("color1");
}
function handleColor2() {
  handleColorInput("color2");
}
function handleColor3() {
  handleColorInput("color3");
}

function handleColorInput(inputId) {
  const input = document.getElementById(inputId);
  const container = document.getElementById("colorBoxes");
  const message = document.getElementById("colorMessage");

  const value = input.value.trim();
  if (!value) {
    setMessage(message, "error", "Please enter a color value before adding.");
    input.focus();
    return;
  }

  if (!isValidCssColor(value)) {
    setMessage(message, "error", "That doesn’t look like a valid CSS color.");
    input.focus();
    return;
  }

  addColorBox(value, container);
  setMessage(message, "success", "Color added.");
  input.value = "";
  input.focus();
}

function clearBoxes() {
  const container = document.getElementById("colorBoxes");
  const message = document.getElementById("colorMessage");
  container.innerHTML = "";
  setMessage(message, "neutral", "Cleared all boxes.");
}

function updateBomInfo() {
  const winSize = document.getElementById("winSize");
  const ua = document.getElementById("ua");

  // Bonus: Display window width/height or browser info using BOM objects.
  winSize.textContent = `${window.innerWidth} × ${window.innerHeight}`;
  ua.textContent = navigator.userAgent;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("addColor1Btn").addEventListener("click", handleColor1);
  document.getElementById("addColor2Btn").addEventListener("click", handleColor2);
  document.getElementById("addColor3Btn").addEventListener("click", handleColor3);
  document.getElementById("clearColorsBtn").addEventListener("click", clearBoxes);

  updateBomInfo();
  window.addEventListener("resize", updateBomInfo);

  // Start with a clean message state
  setMessage(document.getElementById("colorMessage"), "neutral", "");
});

