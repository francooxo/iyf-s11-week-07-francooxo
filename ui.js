// ui.js — DOM rendering and manipulation only. This file never mutates
// app state directly; it draws whatever it's told to draw and reports
// user actions back through callbacks (onSave / onCancel).

const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filterButtons = document.querySelectorAll(".filter");

function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.className = "toggle-checkbox";

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
}

export function renderTodos(todos) {
    todoList.innerHTML = "";
    todos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });
}

export function updateStats(activeCount) {
    itemsLeft.textContent = `${activeCount} ${activeCount === 1 ? "item" : "items"} left`;
}

export function setActiveFilterButton(filterType) {
    filterButtons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.filter === filterType);
    });
}

/**
 * Swap a todo's text span for an editable input.
 * Calls onSave(newText) when the edit is committed (Enter or blur),
 * or onCancel() if the user presses Escape. Guards against both
 * firing (Escape removes focus, which would otherwise also fire blur).
 */
export function startEditingTodo(spanElement, currentText, onSave, onCancel) {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = currentText;

    let isResolved = false;

    spanElement.replaceWith(editInput);
    editInput.focus();

    function commit() {
        if (isResolved) return;
        isResolved = true;
        onSave(editInput.value);
    }

    function cancel() {
        if (isResolved) return;
        isResolved = true;
        onCancel();
    }

    editInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            commit();
        } else if (event.key === "Escape") {
            cancel();
        }
    });

    editInput.addEventListener("blur", commit);
}