document.getElementById('addContainerButton').addEventListener('click', function () {
    const gridContainer = document.getElementById('gridContainer');
    const containers = document.querySelectorAll('.container');

    if (containers.length < 4) {
        const newContainer = document.createElement('div');
        newContainer.classList.add('container');
        newContainer.innerHTML = `
            <div class="delete-container">✖</div>
            <h1 contenteditable="true" class="editable-title" spellcheck="false">ToDo Liste</h1>
            <div class="task-input">
                <input type="text" class="taskInput" placeholder="Neue Aufgabe...">
                <button class="addTaskButton">Hinzufügen</button>
            </div>
            <div class="task-list"></div>
        `;

        gridContainer.insertBefore(newContainer, document.getElementById('addContainerButton'));

        setupToDoLogic(newContainer);
        setupDeleteLogic(newContainer);
        setupTitleEdit(newContainer);
    }

    if (document.querySelectorAll('.container').length >= 4) {
        document.getElementById('addContainerButton').style.display = 'none';
    }
});

function setupToDoLogic(container) {
    const taskInput = container.querySelector('.taskInput');
    const addTaskButton = container.querySelector('.addTaskButton');
    const taskList = container.querySelector('.task-list');

    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskList, taskText);
            taskInput.value = '';
        }
    });
}

function setupDeleteLogic(container) {
    const deleteButton = container.querySelector('.delete-container');

    deleteButton.addEventListener('click', function () {
        if (confirm('Möchtest du diese Liste wirklich löschen?')) {
            container.remove();

            if (document.querySelectorAll('.container').length < 4) {
                document.getElementById('addContainerButton').style.display = 'block';
            }
        }
    });
}

function setupTitleEdit(container) {
    const title = container.querySelector('.editable-title');

    title.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            title.blur();
        }
    });

    title.addEventListener('blur', function () {
        if (title.textContent.trim() === '') {
            title.textContent = 'ToDo Liste';
        }
    });
}

function addTask(taskList, taskText) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task');

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    taskItem.appendChild(taskContent);

    const doneButton = document.createElement('button');
    doneButton.textContent = '✅';
    doneButton.addEventListener('click', function () {
        taskItem.classList.toggle('done');
    });
    taskItem.appendChild(doneButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑';
    deleteButton.addEventListener('click', function () {
        taskItem.remove();
    });
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
}
