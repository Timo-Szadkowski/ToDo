const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

addTaskButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();

    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
    }
});

function addTask(taskText) {
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

    taskContent.addEventListener('click', function () {
        if (!taskItem.classList.contains('editing')) {
            taskItem.classList.add('editing');
            const input = document.createElement('input');
            input.type = 'text';
            input.value = taskContent.textContent;
            taskItem.replaceChild(input, taskContent);
            input.focus();

            input.addEventListener('blur', function () {
                if (input.value.trim() !== '') {
                    taskContent.textContent = input.value;
                    taskItem.replaceChild(taskContent, input);
                } else {
                    taskItem.remove();
                }
                taskItem.classList.remove('editing');
            });

            input.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    if (input.value.trim() !== '') {
                        taskContent.textContent = input.value;
                        taskItem.replaceChild(taskContent, input);
                    } else {
                        taskItem.remove();
                    }
                    taskItem.classList.remove('editing');
                }
            });
        }
    });
    taskList.appendChild(taskItem);
}
