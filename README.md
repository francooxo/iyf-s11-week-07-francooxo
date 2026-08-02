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
- Web Storage API (localStorage)

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

## How to Run
1. Clone this repository
2. Because `app.js` uses ES module imports, open `index.html` through a
   local server rather than double-clicking the file — e.g. the VS Code
   "Live Server" extension, or run `npx serve` in this folder.

## Lessons Learned
<!-- Write 2-4 sentences in your own words: what clicked for you this
     week about state management, modules, or localStorage. -->

## Challenges Faced
<!-- Write 2-4 sentences in your own words: what tripped you up and how
     you worked through it. -->