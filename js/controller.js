function Controller(model, view) {
    this.model = model;
    this.view = view;

    this.addItem(model, view);
    this.addEventListeners(model, view);
};
Controller.prototype.addItem = function(model, view) {
    view.form.addEventListener('submit', function(e) {
        e.preventDefault();
        if(view.input.value) {
            var task = model.addItem({
                id: Date.now(),
                title: view.input.value,
                completed: false
            });
            view.addItem(task);
        } else {
            alert('Поле должно быть заполненно');
        }
    });
}
Controller.prototype.addEventListeners = function(model, view) {
    document.addEventListener('click', function(e) {

        var isRemove = e.target.classList.contains('btn-remove');
        var isCompleted = e.target.classList.contains('my-checkbox');
        var isEditing = e.target.classList.contains('btn-edit');

        if(isRemove) {
            var taskId = e.target.parentNode.getAttribute('data-id');
            view.hendleRemove(e);
            model.removeItem(taskId);
            console.log(model);

        } else if(isCompleted) {
            var checkbox = e.target;
            var taskId = e.target.parentNode.parentNode.getAttribute('data-id');
            view.hendleCompleted(e);

            if(checkbox.checked) {
                model.updateItem(taskId, { completed: true });
                console.log(model, taskId);
            } else {
                model.updateItem(taskId, { completed: false }); 
                console.log(model, taskId);
            }
        } else if(isEditing) {
            var taskId = e.target.parentNode.getAttribute('data-id');
            view.hendleEditing(e);
            var value = e.target.parentNode.querySelector('.task-content').textContent;
            model.updateItem(taskId, { title: value });
            console.log(model, taskId);
        }
    })
}
