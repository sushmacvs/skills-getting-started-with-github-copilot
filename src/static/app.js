document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const emptyState = document.getElementById("empty-state");

  const tasks = [];

  function renderTasks() {
    todoList.innerHTML = "";

    tasks.forEach((task) => {
      const item = document.createElement("li");
      item.className = `todo-item${task.completed ? " completed" : ""}`;

      const label = document.createElement("label");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        item.classList.toggle("completed", task.completed);
      });

      const text = document.createElement("span");
      text.textContent = task.text;

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.textContent = "Delete";
      removeButton.addEventListener("click", () => {
        const taskIndex = tasks.indexOf(task);
        if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1);
          renderTasks();
        }
      });

      label.append(checkbox, text);
      item.append(label, removeButton);
      todoList.appendChild(item);
    });

    emptyState.classList.toggle("hidden", tasks.length > 0);
  }

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = todoInput.value.trim();
    if (!text) {
      return;
    }

    tasks.push({ text, completed: false });
    todoInput.value = "";
    todoInput.focus();
    renderTasks();
  });

  renderTasks();
});
