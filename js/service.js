function Service(data) {
    this.data = data;
};
Service.prototype.save = function(data) {
    var string = JSON.stringify(data);
    localStorage.setItem('tasks', string);
};
Service.prototype.load = function() {
    var string = localStorage.getItem('tasks')
    var data = JSON.parse(string);

    return data;
};
Service.prototype.addItem = function(model, view) {
    var that = this;
    view.form.addEventListener('submit', function(e) {
        e.preventDefault();
        if(view.input.value) {
            var task = model.addItem({
                id: Date.now(),
                title: view.input.value,
                completed: false
            });
            view.addItem(task);
            that.save(model);
        } else {
            alert('Поле должно быть заполненно');
        }
    });
}
Service.prototype.addEventListeners = function(model, view) {
    document.addEventListener('click', function(e) {

        var isRemoved = e.target.classList.contains('btn-remove');
        var isCompleted = e.target.classList.contains('my-checkbox');
        var isEditing = e.target.classList.contains('btn-edit');

        if(isRemoved) {
            var taskId = e.target.parentNode.getAttribute('data-id');
            view.handleRemove(e);
            model.removeItem(taskId);
            console.log(model);

        } else if(isCompleted) {
            var checkbox = e.target;
            var taskId = e.target.parentNode.parentNode.getAttribute('data-id');
            view.handleCompleted(e);

            if(checkbox.checked) {
                model.updateItem(taskId, { completed: true });
                console.log(model, taskId);
            } else {
                model.updateItem(taskId, { completed: false }); 
                console.log(model, taskId);
            }
        } else if(isEditing) {
            var taskId = e.target.parentNode.getAttribute('data-id');
            view.handleEditing(e);
            var value = e.target.parentNode.querySelector('.task-content').textContent;
            model.updateItem(taskId, { title: value });
            console.log(model, taskId);
        }
    })
}
