document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = "";
    
    tasks.forEach((task, index) => addTaskToDOM(task, index));
}

function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskText = taskInput.value.trim();
    
    if (taskText === "") return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    addTaskToDOM(taskText, tasks.length - 1);
    taskInput.value = "";
}

function addTaskToDOM(taskText, index) {
    let ul = document.getElementById('taskList');
    let li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="btn btn-warning btn-sm me-2" onclick="editTask(${index})">✏ Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">❌ Delete</button>
        </div>
    `;
    ul.appendChild(li);
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    let updatedTask = prompt("Edit your task:", tasks[index]);

    if (updatedTask !== null && updatedTask.trim() !== "") {
        tasks[index] = updatedTask.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
