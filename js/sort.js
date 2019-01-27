function sortable(rootEl){
    var dragEl;
    // Фнукция отвечающая за сортировку
    function _onDragOver(evt){
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
       
        var target = evt.target;
        if( target && target.nodeName == 'LI' ){
            // Сортируем
            rootEl.insertBefore(dragEl, rootEl.children[0] !== target && target.nextSibling || target);
            save();
        }
    }
    
    // Окончание сортировки
    function _onDragEnd(evt){
        evt.preventDefault();

        rootEl.removeEventListener('dragover', _onDragOver);
        rootEl.removeEventListener('dragend', _onDragEnd);
        save();
    }
    
    // Начало сортировки
    rootEl.addEventListener('dragstart', function (evt){
        dragEl = evt.target; // Запоминаем элемент который будет перемещать
        
        // Ограничиваем тип перетаскивания
        evt.dataTransfer.effectAllowed = 'move';

        // Пописываемся на события при dnd
        rootEl.addEventListener('dragover', _onDragOver);
        rootEl.addEventListener('dragend', _onDragEnd);
        save();
    });
}