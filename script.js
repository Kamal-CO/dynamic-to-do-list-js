// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTaskToDOM(taskText, false); // false indicates not to save again to Local Storage
        });
    }

    // Function to add task to DOM (separate from saving logic)
    function addTaskToDOM(taskText, save = true) {
        // Create new list item
        const li = document.createElement('li');
        li.textContent = taskText;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        
        // Add click event to remove button to delete the task
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(li);
            // Remove from Local Storage
            removeTaskFromStorage(taskText);
        };
        
        // Append remove button to list item
        li.appendChild(removeButton);
        
        // Append list item to task list
        taskList.appendChild(li);
        
        // Save to Local Storage if requested
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    // Function to save task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const taskIndex = storedTasks.indexOf(taskText);
        if (taskIndex > -1) {
            storedTasks.splice(taskIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Main add task function (handles input and calls DOM function)
    function addTask() {
        // Get and trim the task text from input field
        const taskText = taskInput.value.trim();
        
        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        
        // Add task to DOM and save to Local Storage
        addTaskToDOM(taskText, true);
        
        // Clear the input field
        taskInput.value = '';
    }

    // Load tasks when page loads
    loadTasks();

    // Add task when button is clicked
    addButton.addEventListener('click', addTask);
    
    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});