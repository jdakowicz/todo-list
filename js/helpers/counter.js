define(function () {
    return function () {
        var counterObj = document.querySelector('.todo-count');
        var allItems = document.querySelectorAll('.todo-list > li').length;
        var done = document.querySelectorAll('.todo-list > li.completed').length;
        var result = allItems - done;
        if (result === 1) {
            if (counterObj.innerHTML.indexOf('items')) {
                console.log('1 item and we need change');
                counterObj.innerHTML = counterObj.innerHTML.replace('items', 'item');
            } else {
                console.log('1 item without change');
            }
        } else if (counterObj.innerHTML.indexOf('item')) {
            console.log('items != 1 and we need change');
            counterObj.innerHTML = counterObj.innerHTML.replace('item', 'items');
        } else {
            console.log('items != 1 but without change');
        }
        // I don't like this option
        // counterObj.children[0].innerText = result;
        // 2nd option
        document.querySelector('.todo-count strong').innerText = result;
    }
});
