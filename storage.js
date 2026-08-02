// storage.js — localStorage persistence helpers.
// Wraps localStorage with JSON handling and a namespaced key prefix so
// this app never collides with other data stored on the same origin.

const STORAGE_PREFIX = "todoapp_";

/**
 * Save a value to localStorage (auto JSON-stringified).
 * @param {string} key
 * @param {*} data
 */
export function saveToStorage(key, data) {
    try {
        localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
    } catch (error) {
        console.error(`Failed to save "${key}" to localStorage:`, error);
    }
}

/**
 * Load a value from localStorage. Returns defaultValue if the key is
 * missing or the stored JSON can't be parsed.
 * @param {string} key
 * @param {*} defaultValue
 */
export function getFromStorage(key, defaultValue = null) {
    try {
        const raw = localStorage.getItem(STORAGE_PREFIX + key);
        return raw ? JSON.parse(raw) : defaultValue;
    } catch (error) {
        console.error(`Failed to load "${key}" from localStorage:`, error);
        return defaultValue;
    }
}

/**
 * Remove a single key from localStorage.
 * @param {string} key
 */
export function removeFromStorage(key) {
    localStorage.removeItem(STORAGE_PREFIX + key);
}