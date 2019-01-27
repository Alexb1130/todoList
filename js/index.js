(function() {
    var model = new Model([]);
    var view = new View(model);
    view.input.focus();
    var controller = new Controller(model, view);
})()