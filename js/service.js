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

    return data;
};