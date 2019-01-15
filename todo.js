(() => {
    var form = document.querySelector('.form');
    var container = document.querySelector('.tasks-container');
    var template = document.querySelector('.task-template').content;
    var taskEdit = document.querySelector('.task-edit');
    var data = upLoad();

    function createTask() {
        var taskItem = template.cloneNode(true);
        return taskItem;
    }

    function onAddTask(e) {
        e.preventDefault();

        if (taskEdit.value) {
            var task = createTask();
            var taskLabel = task.querySelector('.task-content-box label');
            var btnChenge = task.querySelector('.btn-chenge');
            var btnDelete = task.querySelector('.btn-delete');
            var checkbox = task.querySelector('.my-checkbox');
            container.appendChild(task);
            taskLabel.textContent = taskEdit.value;
            taskEdit.value = '';
            editingTask(btnChenge);
            onDeleteTask(btnDelete);
            onCompleteTask(checkbox);
            onSave();
        } else if (data) {
            upLoad();
        } else {
            return alert('Поле не должно быть пустым');
        }
        onSave();
    }

    function editingTask(btn) {
        var item = btn.parentNode;
        var label = item.querySelector('label');
        var input = item.querySelector('input');
        var checkbox = item.querySelector('.my-checkbox');
        btn.addEventListener('click', function () {
            var isEditing = item.classList.contains('editing');
            if (!isEditing) {
                input.value = label.textContent;
            } else {
                label.textContent = input.value;
            }
            item.classList.toggle('editing');
            input.focus();
            onSave();
        })
    }

    function onDeleteTask(btn) {
        var item = btn.parentNode;
        btn.addEventListener('click', function () {
            item.remove();
            onSave();
        })
    }

    function onCompleteTask(checkbox) {
        var parent = checkbox.parentNode.parentNode;
        checkbox.addEventListener('change', function () {
            checkbox.checked ?
                parent.classList.add('completed', 'list-group-item-success') && parent.classList.remove('editing') :
                parent.classList.remove('completed', 'list-group-item-success')
            onSave();
        })
    }

    function onSave() {
        var addedTasksArr = [];
        var completedTasksArr = [];
        for (var i = 0; i < container.children.length; i++) {
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

    function upLoad() {
        var data = JSON.parse(localStorage.getItem('list'));
        if (data) {
            for (var i = 0; i < data.addedTask.length; i++) {
                var listItem = createTask().querySelector('li');
                var label = listItem.querySelector('.task-content-box label');
                label.textContent = data.addedTask[i];
                var btnChenge = listItem.querySelector('.btn-chenge');
                var btnDelete = listItem.querySelector('.btn-delete');
                var checkbox = listItem.querySelector('.my-checkbox');
                editingTask(btnChenge);
                onDeleteTask(btnDelete);
                onCompleteTask(checkbox);
                onSave();
                container.appendChild(listItem);
            }
            for (var i = 0; i < data.completedTasks.length; i++) {
                var listItemCompleted = createTask().querySelector('li');
                listItemCompleted.classList.add('completed', 'list-group-item-success');
                var labelCompleted = listItemCompleted.querySelector('.task-content-box label');
                labelCompleted.textContent = data.completedTasks[i];
                var btnChenge = listItemCompleted.querySelector('.btn-chenge');
                var btnDelete = listItemCompleted.querySelector('.btn-delete');
                var checkbox = listItemCompleted.querySelector('.my-checkbox');
                checkbox.checked = true;
                editingTask(btnChenge);
                onDeleteTask(btnDelete);
                onCompleteTask(checkbox);
                onSave();
                container.appendChild(listItemCompleted);
            }
        }
    }

    onSave();

    taskEdit.focus();

    form.addEventListener('submit', onAddTask);

    sortable(container);

})()