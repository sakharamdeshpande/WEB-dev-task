// Retrieve tasks from local storage on page load
document.addEventListener('DOMContentLoaded', function () {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => addTaskToList(task));
});

// Function to add a task to the list
function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (taskText !== '') {
    const task = { text: taskText, completed: false };
    addTaskToList(task);
    saveTasksToLocalStorage();
    input.value = '';
  }
}

// Function to add a task to the HTML list
function addTaskToList(task) {
  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');
  li.className = 'flex items-center';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.className = 'mr-2 form-checkbox h-5 w-5 text-blue-600';
  checkbox.addEventListener('change', function () {
    task.completed = checkbox.checked;
    span.classList.toggle('line-through', task.completed); // Apply line-through only to task text
    saveTasksToLocalStorage();
  });
  const span = document.createElement('span');
  span.textContent = task.text;
  span.className = 'flex-grow';
  if (task.completed) {
    span.classList.add('line-through');
  }
  span.contentEditable = false; // Initially not editable
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.className = 'px-2 py-1 bg-blue-500 text-white rounded-md ml-2';
  editButton.addEventListener('click', function () {
    span.contentEditable = true; // Enable editing
    span.focus(); // Focus on the editable span
  });
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'px-2 py-1 bg-red-500 text-white rounded-md ml-2';
  deleteButton.addEventListener('click', function () {
    li.remove();
    saveTasksToLocalStorage();
  });
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  const tasks = Array.from(document.querySelectorAll('#taskList li')).map(
    (li) => ({
      text: li.querySelector('span').textContent,
      completed: li.querySelector("input[type='checkbox']").checked,
    })
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
