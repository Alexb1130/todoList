function View() {
    this.form = document.querySelector('.form');
    this.input = document.querySelector('.task-edit');
    this.list = document.querySelector('.tasks-container');
    this.listCompleted = document.querySelector('.tasks-container-completed');
    this.taskTemplate = document.querySelector('.task-template').content;
}
View.prototype.createItem = function(task) {
    var item = this.taskTemplate.cloneNode(true).querySelector('.task');
    var itemTitle = item.querySelector('.task-content').textContent = task.title;
    var itemCheckbox = item.querySelector('.my-checkbox');
    item.setAttribute('data-id', task.id);
    if(task.completed) {
        item.classList.add('completed', 'list-group-item-success')
        itemCheckbox.checked = true;
    } else {
        item.classList.remove('completed', 'list-group-item-success')
    }
    return item;
}
View.prototype.addItem = function(value) {
    var listItem = this.createItem(value);
    this.input.value = '';
    this.list.appendChild(listItem);
}
View.prototype.handleEditing = function(e) {
    var btnEdit = e.target.classList.contains('btn-edit');
    var item = e.target.parentNode;

    if(btnEdit) {
        e.preventDefault()
        item.classList.toggle('editing');
        var label = item.querySelector('.task-content');
        var input = item.querySelector('.task-input');
        if(item.classList.contains('editing')) {
            input.value = label.textContent;
        } else {
            label.textContent = input.value;
        }
    }
}
View.prototype.handleRemove = function(e) {
    var btnRemove = e.target.classList.contains('btn-remove');
    var item = e.target.parentNode;
    if(btnRemove) {
        e.preventDefault();
        item.remove();
    }
}
View.prototype.handleCompleted = function(e) {
    var checkbox = e.target.classList.contains('my-checkbox');
    var item = e.target.parentNode.parentNode;
    if(checkbox) {
        checkbox = e.target;
        if(checkbox.checked) {
            item.classList.add('completed', 'list-group-item-success');
        } else {
            item.classList.remove('completed', 'list-group-item-success');
        }
    }
}
View.prototype.loadData = function(data) {
    if(data) {
        for(var i = 0; i < data.length; i++) {
            var item = this.createItem(data[i]);
            this.list.appendChild(item);
        }
    }
} 