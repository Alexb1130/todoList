(function() {
    var service = new Service();
    var model = new Model([]);
    service.save(model);
    var view = new View(model);
    var controller = new Controller(model, view, service);
    view.input.focus();
})()