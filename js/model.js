// function Item(item) {
//     this.item = item;
// };
function Model(items) {
    this.items = items;
};
Model.prototype.getItem = function(id) {
    for(var i = 0; i <= this.items.length; i++) {
        var item = this.items[i];
        if(item.id == id) {
            return item;
        }
    }
};
Model.prototype.addItem = function(item) {
    this.items.push(item);
    return item;
};
Model.prototype.updateItem = function(id, data) {
    var item = this.getItem(id);
    for(var prop in data) {
        item[prop] = data[prop];
    }
    return item;
};
Model.prototype.removeItem = function(id) {
    var index = this.getItem(id);
    
    if(this.items.indexOf(index) > -1) {
        this.items.splice(index, 1);
    }
};
