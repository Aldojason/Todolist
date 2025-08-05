document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");
  const taskCategory = document.getElementById("taskCategory");
  const taskList = document.getElementById("taskList");
  const taskFilter = document.getElementById("taskFilter");

  let tasks = [];

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    const date = taskDate.value;
    const category = taskCategory.value;

    if (text && date) {
      tasks.push({ text, date, category, completed: false });
      taskInput.value = "";
      taskDate.value = "";
      renderTasks();
    }
  });

  taskFilter.addEventListener("change", renderTasks);

  function renderTasks() {
    const filter = taskFilter.value;
    taskList.innerHTML = "";

    tasks
      .filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "incomplete") return !task.completed;
        return true;
      })
      .forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";
        if (task.completed) li.classList.add("completed");

        const left = document.createElement("div");
        left.className = "task-left";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
          task.completed = checkbox.checked;
          renderTasks();
        });

        const content = document.createElement("div");
        const span = document.createElement("div");
        span.className = "task-text";
        span.textContent = task.text;

        const meta = document.createElement("div");
        meta.className = "task-meta";
        meta.textContent = `📅 ${task.date} | 📂 ${task.category}`;

        content.appendChild(span);
        content.appendChild(meta);

        left.appendChild(checkbox);
        left.appendChild(content);

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.className = "delete-btn";
        delBtn.addEventListener("click", () => {
          tasks.splice(index, 1);
          renderTasks();
        });

        li.appendChild(left);
        li.appendChild(delBtn);
        taskList.appendChild(li);
      });
  }
});
