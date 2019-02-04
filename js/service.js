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

    if(data === null) {
        return [];
    } else {
        return data;
    }
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
    var that = this;
    document.addEventListener('click', function(e) {
        var command = e.target.getAttribute('data-command');

        switch (command) {
            case 'edit':
                var taskId = e.target.parentNode.getAttribute('data-id');
                view.handleEditing(e);
                var value = e.target.parentNode.querySelector('.task-content').textContent;
                model.updateItem(taskId, { title: value });
                that.save(model);
                console.log(model, taskId);
                break;

            case 'remove':
                var taskId = e.target.parentNode.getAttribute('data-id');
                view.handleRemove(e);
                model.removeItem(taskId);
                that.save(model);
                console.log(model);
                break;
                
            case 'completed':
                var checkbox = e.target;
                var taskId = e.target.parentNode.parentNode.getAttribute('data-id');
                view.handleCompleted(e);
                if(checkbox.checked) {
                    model.updateItem(taskId, { completed: true });
                    that.save(model);
                    console.log(model, taskId);
                } else {
                    model.updateItem(taskId, { completed: false }); 
                    that.save(model);
                    console.log(model, taskId);
                }
                break;
            default:
                break;
        }
    })
}
