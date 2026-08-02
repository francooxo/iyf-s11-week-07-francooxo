# Week 7: JavaScript Best Practices

## Author
- **Name:** Francis Osoro
- **GitHub:** [@francooxo](https://github.com/francooxo)
- **Date:** August 2, 2026

## Project Description
A refactor of the Week 5 To-Do List app. Tasks and the active filter now
persist across page refreshes using localStorage, and the codebase is
split into focused, single-responsibility modules instead of one large
script.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES Modules)
- Web Storage API (localStorage, sessionStorage)

## Features
- Add, complete, edit (double-click a task), and delete tasks
- Filter tasks by All / Active / Completed
- Clear all completed tasks at once
- Tasks and the active filter persist across page refreshes
- Code organized into single-responsibility modules:
  - `state.js` — todos + filter data and persistence, no DOM code
  - `ui.js` — DOM rendering only, no state mutation
  - `storage.js` — localStorage helpers
  - `utils.js` — small pure helper functions
  - `app.js` — entry point, wires DOM events to state changes

## Lesson 13 & 14 Exercises
- **`shopping-cart.html`** (Lesson 13.4) — mini shopping cart: add/remove
  items, adjust quantity, running total, cart count, localStorage
  persistence, centralized state object.
- **`contact-form.html`** (Lesson 13.3) — form that auto-saves to
  sessionStorage on every keystroke and clears on submit.
- **`debug-order-total.js`** (Lesson 14.3) — fixed version of the
  `calculateOrderTotal` debugging exercise, with comments on the two bugs
  found (off-by-one loop bound, `quanity` typo).
- ESLint (flat config) + Prettier configured and passing with 0 errors.
- Vitest unit tests covering extracted pure functions (8 passing).

## How to Run
1. Clone this repository
2. Because `app.js` uses ES module imports, open `index.html` through a
   local server rather than double-clicking the file — e.g. the VS Code
   "Live Server" extension, or run `npx serve` in this folder.
3. `shopping-cart.html` and `contact-form.html` can be opened directly or
   served the same way.

## Lessons Learned
Splitting the app into `state.js`, `ui.js`, and `storage.js` made it clear
what each piece was responsible for — I could change how data persists
without touching the rendering code at all.

## Challenges Faced
I hit a bug where two todos added quickly got the same ID, since
`Date.now()` alone isn't unique to the millisecond — fixed it by combining
the timestamp with a random string.