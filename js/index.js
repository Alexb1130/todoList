(function() {
    var service = new Service();
    var data = service.load();
    var model = new Model(data.items || []);
    var view = new View();
    var controller = new Controller(model, view, service);
    view.input.focus();
})()