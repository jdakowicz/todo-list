define(function () {
    function update () {
        var counter = document.querySelector('.todo-count'),
            activeItems = document.querySelectorAll('.todo-list > li:not(.completed)').length;

        if (activeItems === 1) {
            if (counter.innerHTML.indexOf('items') > -1) {
                counter.innerHTML = counter.innerHTML.replace('items', 'item');
            }
        } else {
            if (counter.innerHTML.indexOf('items') === -1) {
                counter.innerHTML = counter.innerHTML.replace('item', 'items');
            }
        }
        counter.querySelector('strong').innerText = activeItems;
    }

    return {
        update: update
    };
});
