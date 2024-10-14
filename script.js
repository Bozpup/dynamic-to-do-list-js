document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded successfully");
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
  removeButton.textContent = "remove";
  removeButton.className = "remove-btn";

  removeButton.addEventListener("click", function () {
    taskList.removeChild(listItem);
  });
  listItem.appendChild(removeButton);
  taskList.appendChild(listItem);
  taskInput.value = "";
}

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
