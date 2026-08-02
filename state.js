// state.js — owns the todos array and the current filter, and keeps
// them persisted to localStorage. Nothing in this file touches the DOM;
// it only manages data and business rules.

import { saveToStorage, getFromStorage } from "./storage.js";
import { generateId } from "./utils.js";

export const FILTER_ALL = "all";
export const FILTER_ACTIVE = "active";
export const FILTER_COMPLETED = "completed";

const TODOS_KEY = "todos";
const FILTER_KEY = "filter";

let todos = getFromStorage(TODOS_KEY, []);
let currentFilter = getFromStorage(FILTER_KEY, FILTER_ALL);

function persistTodos() {
    saveToStorage(TODOS_KEY, todos);
}

export function getFilteredTodos() {
    return todos.filter(todo => {
        if (currentFilter === FILTER_ACTIVE) return !todo.completed;
        if (currentFilter === FILTER_COMPLETED) return todo.completed;
        return true;
    });
}

export function getActiveCount() {
    return todos.filter(todo => !todo.completed).length;
}

export function getFilter() {
    return currentFilter;
}

export function setFilter(filterType) {
    currentFilter = filterType;
    saveToStorage(FILTER_KEY, currentFilter);
}

export function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    todos.push({
        id: generateId(),
        text: trimmed,
        completed: false
    });
    persistTodos();
}

export function toggleTodo(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    persistTodos();
}

export function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    persistTodos();
}

/**
 * Update a todo's text. An empty result deletes the todo instead
 * (matches the original app's "clear the text to remove it" behavior).
 */
export function updateTodoText(id, newText) {
    const trimmed = newText.trim();
    if (!trimmed) {
        deleteTodo(id);
        return;
    }
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, text: trimmed } : todo
    );
    persistTodos();
}

export function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    persistTodos();
}