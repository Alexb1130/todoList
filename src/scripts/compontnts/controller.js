import { save } from './service';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.addItem();
        this.addEventListeners();
    }

    addItem() {
        this.view.form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (this.view.input.value) {

                console.log(this.view.input.value);

                let task = this.model.addItem({
                    id: Date.now(),
                    title: this.view.input.value,
                    completed: false
                })

                this.view.addItem(task);

                save(this.model);

            } else {
                alert('Поле должно быть заполненно');
            }
        })
    }

    addEventListeners() {
        document.addEventListener('click', (e) => {
            let command = e.target.getAttribute('data-command');

            switch (command) {
                case 'edit':
                    let parent = e.target.closest('.task');
                    let taskId = parent.dataset.id;
                    this.view.handleEditing(e);
                    let value = parent.querySelector('.task-content').textContent;
                    this.model.updateItem(taskId, { title: value });
                    save(this.model);
                    break;

                case 'remove':
                    parent = e.target.closest('.task');
                    taskId = parent.dataset.id;
                    this.view.handleRemove(e);
                    this.model.removeItem(taskId);
                    save(this.model);
                    break;

                case 'completed':
                    let checkbox = e.target;
                    parent = checkbox.closest('.task');
                    taskId = parent.dataset.id;
                    this.view.handleCompleted(e);

                    if (checkbox.checked) {
                        this.model.updateItem(taskId, { completed: true });
                        save(this.model);
                    } else {
                        this.model.updateItem(taskId, { completed: false });
                        save(this.model);
                    }
                    break;
                default:
                    break;
            }
        })
    }
}

export default Controller;