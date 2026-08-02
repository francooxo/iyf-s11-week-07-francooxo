// app.js — application entry point. Wires DOM events to state changes
// and re-renders the UI whenever state changes. Contains no persistence
// logic and no direct DOM-building — those live in state.js and ui.js.

import {
    getFilteredTodos,
    getActiveCount,
    getFilter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodoText,
    clearCompleted
} from "./state.js";
import { renderTodos, updateStats, setActiveFilterButton, startEditingTodo } from "./ui.js";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const clearCompletedBtn = document.getElementById("clear-completed");

function render() {
    renderTodos(getFilteredTodos());
    updateStats(getActiveCount());
    setActiveFilterButton(getFilter());
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo(input.value);
    input.value = "";
    render();
});

todoList.addEventListener("click", (event) => {
    const li = event.target.closest(".todo-item");
    if (!li) return;
    const id = li.dataset.id;

    if (event.target.classList.contains("delete-btn")) {
        deleteTodo(id);
        render();
    } else if (event.target.classList.contains("toggle-checkbox")) {
        toggleTodo(id);
        render();
    }
});

todoList.addEventListener("dblclick", (event) => {
    if (!event.target.classList.contains("todo-text")) return;
    const li = event.target.closest(".todo-item");
    if (!li) return;
    const id = li.dataset.id;

    startEditingTodo(
        event.target,
        event.target.textContent,
        (newText) => {
            updateTodoText(id, newText);
            render();
        },
        () => render()
    );
});

document.querySelector(".filters").addEventListener("click", (event) => {
    if (!event.target.classList.contains("filter")) return;
    setFilter(event.target.dataset.filter);
    render();
});

clearCompletedBtn.addEventListener("click", () => {
    clearCompleted();
    render();
});

render();