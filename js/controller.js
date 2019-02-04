function Controller(model, view, service) {
    this.model = model;
    this.view = view;
    this.service = service;

    service.addItem(model, view);
    service.addEventListeners(model, view);
    view.loadData(model.items);
};