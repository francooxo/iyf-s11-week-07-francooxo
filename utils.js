// utils.js — small, pure helper functions with no DOM or storage
// dependencies. Easy to unit test on their own (see Task 14.5).

/**
 * Generate a reasonably unique id for a new todo.
 * @returns {string}
 */
export function generateId() {
    return Date.now().toString();
}