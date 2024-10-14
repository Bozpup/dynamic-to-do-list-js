document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded successfully");
  localStorage.getItem("tasks");
});

const addButton = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Enter a task");
  }
  const listItem = document.createElement("li");
  listItem.textContent = taskText;
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-btn");

  removeButton.addEventListener("click", function () {
    taskList.removeChild(listItem);
    removeTaskFromLocalStorage(taskText);
  });
  listItem.appendChild(removeButton);
  taskList.appendChild(listItem);
  saveTaskToLocalStorage(taskText);
  taskInput.value = "";
}
function saveTaskToLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get existing tasks
  tasks.push(taskText); // Add the new task
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save back to Local Storage
}

// Function to remove the task from Local Storage
function removeTaskFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get existing tasks
  tasks = tasks.filter((task) => task !== taskText); // Remove the task
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save back to Local Storage
}

// Function to load tasks from Local Storage
function loadTasksFromLocalStorage() {
  const tasks = localStorage.getItem("tasks"); // Retrieve the task list
  if (tasks) {
    // Check if tasks are found
    const parsedTasks = JSON.parse(tasks); // Parse JSON to an array
    parsedTasks.forEach((taskText) => {
      const listItem = document.createElement("li");
      listItem.textContent = taskText;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove"; // Set button text
      removeButton.classList.add("remove-btn"); // Use classList.add to add class

      // Assign an onclick event to the remove button
      removeButton.addEventListener("click", function () {
        taskList.removeChild(listItem); // Remove the li element from taskList
        removeTaskFromLocalStorage(taskText); // Remove from Local Storage
      });

      // Append the remove button to the li element
      listItem.appendChild(removeButton);

      // Append the li to taskList
      taskList.appendChild(listItem);
    });
  }
}

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
