define(function () {
    return function () {
        var tasksList = document.querySelector('.todo-count');
        var allItems = document.querySelectorAll('.todo-list > li').length;
        var done = document.querySelectorAll('.todo-list > li.completed').length;
        var result = allItems - done;
        if (result === 1) {
            if (tasksList.innerHTML.indexOf('items') > -1) {
                tasksList.innerHTML = tasksList.innerHTML.replace('items', 'item');
            }
        } else {
            if (tasksList.innerHTML.indexOf('items') === -1) {
              tasksList.innerHTML = tasksList.innerHTML.replace('item', 'items');
          }
        }
        tasksList.querySelector('strong').innerText = result;
    }
});
