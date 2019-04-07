class View {
    constructor() {
        this.form = document.querySelector('.form');
        this.input = document.querySelector('.task-edit');
        this.list = document.querySelector('.tasks-container');
        this.listCompleted = document.querySelector('.tasks-container-completed');
        this.taskTemplate = document.querySelector('.task-template').content;
    }

    createItem(task) {
        const item = this.taskTemplate.cloneNode(true).querySelector('.task');
        const itemTitle = item.querySelector('.task-content').textContent = task.title;
        const itemCheckbox = item.querySelector('.my-checkbox');

        item.dataset.id = task.id;

        if (task.completed) {
            item.classList.add('completed', 'list-group-item-success')
            itemCheckbox.checked = true;
        } else {
            item.classList.remove('completed', 'list-group-item-success')
        }

        return item;
    }

    addItem(value) {
        const listItem = this.createItem(value);
        this.input.value = '';
        this.list.append(listItem);
    }

    handleEditing(e) {
        const btnEdit = e.target.classList.contains('btn-edit');
        const item = e.target.closest('.task');

        if (btnEdit) {
            e.preventDefault();
            item.classList.toggle('editing');

            const label = item.querySelector('.task-content');
            const input = item.querySelector('.task-input');

            input.focus();

            if (item.classList.contains('editing')) {
                input.value = label.textContent;
            } else {
                label.textContent = input.value;
            }
        }
    }

    handleRemove(e) {
        const btnRemove = e.target.classList.contains('btn-remove');
        const item = e.target.closest('.task');

        if (btnRemove) {
            e.preventDefault();
            item.remove();
        }
    }

    handleCompleted(e) {
        let checkbox = e.target.classList.contains('my-checkbox');
        const item = e.target.closest('.task');

        if (checkbox) {
            checkbox = e.target;

            if (checkbox.checked) {
                item.classList.add('completed', 'list-group-item-success');
            } else {
                item.classList.remove('completed', 'list-group-item-success');
            }
        }
    }

    loadData(data) {
        if (data) {
            data.forEach(el => {
                this.list.append(this.createItem(el))
            });
        }
    }
}

export default View;