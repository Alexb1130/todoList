(function() {

    function save(data) {
        var string = JSON.stringify(data);
        localStorage.setItem('tasks', string);
    }

    function load() {
        var string = localStorage.getItem('tasks')
        var data = JSON.parse(string);

        return data;
    }

    function Model(items) {
        this.items = items;
    }
    Model.prototype.getItem = function(id) {
        for(var i = 0; i <= this.items.length; i++) {
            var item = this.items[i];
            if(item.id == id) {
                return item;
            }
            return -1;
        }
    }
    Model.prototype.addItem = function(item) {
        this.items.push(item);
    }
    Model.prototype.updateItem = function(id, data) {
        var item = this.getItem(id);
        for(var prop in data) {
            item[prop] = data[prop];
        }
        return item;
    }
    Model.prototype.removeItem = function(id) {
        var index = this.getItem(id);

        if(index > -1) {
            this.items.splice(index, 1);
        }
    }

    function View() {
        this.form = document.querySelector('.form');
        this.input = document.querySelector('.task-edit');
        this.list = document.querySelector('.tasks-container');
        this.listCompleted = document.querySelector('.tasks-container-completed');
        this.taskTemplate = document.querySelector('.task-template').content;
    
        this.form.addEventListener('submit', this.hendleAdd.bind(this));
    }
    View.prototype.createItem = function(task) {
        var item = this.taskTemplate.cloneNode(true).querySelector('.task');
        itemTitle = item.querySelector('.task-content').textContent = this.input.value;
        item.setAttribute('data-id', task.id);
        task.completed ? item.classList.add('completed') : item.classList.remove('completed');
        return item;
    }
    View.prototype.addItem = function(task) {
        var listItem = this.createItem(task);
        this.list.appendChild(listItem);
        this.input.value = '';
    }
    View.prototype.addEventClickHandler = function(e) {
        document.addEventListener('click', this.hendleToggle.bind(this));
    }
    View.prototype.hendleToggle = function(e) {
        var btnChange = e.target.classList.contains('btn-change');
        var btnDelete = e.target.classList.contains('btn-delete');
        var checkbox = e.target.classList.contains('my-checkbox');
    }
    View.prototype.hendleAdd = function(e) {
        if(e) {
            e.preventDefault();
            if(this.input.value) {
                var value = this.input.value;
                this.addItem(value);
                console.log(value);
            } else {
                alert('Поле должно быть заполненно');
            }
        }
    }

    function Controller(model, view) {
        this.model = model;
        this.view = view;
    }
    Controller.prototype.addTask = function(title) {
        var task = this.model.addItem({
            id: Date.now(),
            title: title,
            completed: false
        })
        this.view.form('submit', this.view.addItem(task));
    }

    var model = new Model([]);
    var view = new View();
    var controller = new Controller(model, view);
})()