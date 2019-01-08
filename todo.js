var form = document.querySelector('.form');
var container = document.querySelector('.tasks-container');
var template = document.querySelector('.task-template').content;
var taskEdit = document.querySelector('.task-edit');
var data = load();

function createTask() {
    var taskItem = template.cloneNode(true);
    return taskItem;
}
function addTask(e) {
    e.preventDefault();

    if(taskEdit.value) {
        var task = createTask();
        var taskLabel = task.querySelector('.task-content-box label');
        var btnChenge = task.querySelector('.btn-chenge');
        var btnDelete = task.querySelector('.btn-delete');
        var checkbox = task.querySelector('.my-checkbox');
        container.appendChild(task);
        taskLabel.textContent = taskEdit.value;
        taskEdit.value = '';
        editingTask(btnChenge);
        deleteTask(btnDelete);
        completeTask(checkbox);
        save();
    } else if (data) {
        load();
    } else {
        return alert('Поле не должно быть пустым');
    }
    save();
}
function editingTask(btn) {
    var item = btn.parentNode;
    var label = item.querySelector('label');
    var input = item.querySelector('input');
    btn.addEventListener('click', function() {
        var isEditing = item.classList.contains('editing');
        if(!isEditing) {
            input.value = label.textContent;
        } else {
            label.textContent = input.value;
        }
        item.classList.toggle('editing');
        input.focus();
        save();
    })
}
function deleteTask(btn) {
    var item = btn.parentNode;
    btn.addEventListener('click', function() {
        item.remove();
        save();
    })
}
function completeTask(checkbox) {
    var parent = checkbox.parentNode.parentNode;
    checkbox.addEventListener('change', function() {
        checkbox.checked ? 
        parent.classList.add('completed') :
        parent.classList.remove('completed')
        save();
    })
}
function save() {
    var addedTasksArr = [];
    var completedTasksArr = [];
    for(var i = 0; i < container.children.length; i++) {
        var completed = container.children[i].classList.contains('completed');
        completed ?
        completedTasksArr.push(container.children[i].querySelector('.task-content').textContent) :
        addedTasksArr.push(container.children[i].querySelector('.task-content').textContent);
    }
    localStorage.setItem('list', JSON.stringify({
        addedTask: addedTasksArr,
        completedTasks: completedTasksArr
    }));
}
function load() {
    var data = JSON.parse(localStorage.getItem('list'));
    for(var i = 0; i < data.addedTask.length; i++) {
        var listItem = createTask().querySelector('li');
        var label = listItem.querySelector('.task-content-box label');
        label.textContent = data.addedTask[i];
        var btnChenge = listItem.querySelector('.btn-chenge');
        var btnDelete = listItem.querySelector('.btn-delete');
        var checkbox = listItem.querySelector('.my-checkbox');
        editingTask(btnChenge);
        deleteTask(btnDelete);
        completeTask(checkbox);
        save();
        container.appendChild(listItem);
    }
    for(var i = 0; i < data.completedTasks.length; i++) {
        var listItemCompleted = createTask().querySelector('li');
        listItemCompleted.classList.add('completed');
        var labelCompleted = listItemCompleted.querySelector('.task-content-box label');
        labelCompleted.textContent = data.completedTasks[i];
        var btnChenge = listItemCompleted.querySelector('.btn-chenge');
        var btnDelete = listItemCompleted.querySelector('.btn-delete');
        var checkbox = listItemCompleted.querySelector('.my-checkbox');
        checkbox.checked = true;
        editingTask(btnChenge);
        deleteTask(btnDelete);
        completeTask(checkbox);
        save();
        container.appendChild(listItemCompleted);
    }
}

save();

taskEdit.focus();

form.addEventListener('submit', addTask);

sortable(container);