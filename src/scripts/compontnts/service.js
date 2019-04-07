function save(data) {
    let string = JSON.stringify(data);
    localStorage.setItem('tasks', string);
}

function load() {
    let string = localStorage.getItem('tasks')
    let data = JSON.parse(string);

    if (data === null) {
        return [];
    } else {
        return data;
    }
}

export { save, load };