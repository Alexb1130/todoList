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
        if(e.target.classList.contains('btn-remove')) {
            var taskId = e.target.parentNode.getAttribute('data-id');
            view.hendleRemove(e);
            model.removeItem(taskId);
        }
        view.hendleCompleted(e);
        view.hendleEditing(e);
    })
}
