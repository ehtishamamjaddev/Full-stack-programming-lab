# Lab 02 — JS Interactivity

Open `index.html` in your browser, then select a task.

## File structure (clean)

- `index.html` (landing)
- `task-01-quiz/index.html` (Task 1)
- `task-02-calculator/index.html` (Task 2)
- `task-03-todo/index.html` (Task 3)
- `task-04-color-generator/index.html` (Task 4)
- `task-05-form-validation/index.html` (Task 5)
- `assets/css/style.css`
- `assets/js/quiz.js`
- `assets/js/calculator.js`
- `assets/js/todo.js`
- `assets/js/color-generator.js`
- `assets/js/form-validation.js`

## Task 1: Dynamic Quiz

- 5 questions (radio buttons)
- Each question + correct answer stored in separate variables in `assets/js/quiz.js`
- Individual `checkQ#()` functions + total score
- DOM updates for per-question feedback and final score message
- Reset button clears selections and results

## Task 2: Interactive Calculator

- Two number inputs + operation dropdown
- Calculates result with validation (including division by zero) in `assets/js/calculator.js`
- Result renders in the DOM
- Bonus: result box color changes based on positive/negative/neutral

## Task 3: Simple To-Do List

- 3 fixed tasks using individual input fields
- Complete / Remove buttons per task
- DOM updates task status + visibility
- Loop applies consistent styling (strike-through on completed)

## Task 4: Color Box Generator

- 3 separate color input fields (each with its own handler function)
- Add creates a colored div box
- Clear removes all boxes
- Bonus: displays BOM info (window size + user agent)

## Task 5: Form Validation

- Registration form (name, email, age, password)
- Individual validation functions + conditional checks
- Inline error messages via DOM
- Success message + submission confirmation using `confirm()`

