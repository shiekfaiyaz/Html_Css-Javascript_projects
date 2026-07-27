// 1. Select HTML Elements
const input = document.getElementById('Add-task');
const ulList = document.querySelector('.ul-list');
const addButton = document.querySelector('.add');
const countMsg = document.querySelector('.count');

// 2. Initialize tasks array from LocalStorage
let tasks = JSON.parse(localStorage.getItem("myTask")) || [];

// Save to LocalStorage helper function
function saveTasks() {
    localStorage.setItem("myTask", JSON.stringify(tasks));
}

// 3. Render Tasks on UI
function displayTasks() {
    ulList.innerHTML = ''; // Clear previous list elements

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'taskList';

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <span class="text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="edit" onclick="editTask(${index})">
                <img src="images/edit.svg" width="20" alt="edit icon">
            </button>
            <button class="delete" onclick="deleteTask(${index})">
                <img src="images/delete.svg" width="20" alt="delete icon">
            </button>
        `;

        ulList.appendChild(li);
    });

    updateCount();
}

// 4. Add Task Function
function addTask() {
    const text = input.value.trim();

    if (text === '') {
        alert("Please enter a task!");
        return;
    }

    // Add new task object to array
    tasks.push({ text: text, completed: false });
    saveTasks();
    displayTasks();

    input.value = ''; // Clear input field
}

// 5. Delete Task
function deleteTask(index) {
    tasks.splice(index, 1); // Remove item by index
    saveTasks();
    displayTasks();
}

// 6. Toggle Checkbox (Complete / Incomplete)
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

// 7. Edit Task
function editTask(index) {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        saveTasks();
        displayTasks();
    }
}

// 8. Update Counter Message
function updateCount() {
    const activeTasks = tasks.filter(t => !t.completed).length;
    countMsg.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} left bhai`;
}

// Event Listeners
addButton.addEventListener('click', addTask);

// Add task on 'Enter' key press
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial Render on Page Load
displayTasks();