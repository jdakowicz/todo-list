define(function () {
    // helper function to check is item has specific class
    function contains (obj, target) {
        if (obj.indexOf(target) >= 0) {
            return true;
        }
        return false;
    }

    // function to swap views depends on selected filter
    function show (selectedFilter) {
        switch (selectedFilter) {
            // Show all tasks
            case '#/':
                // Remove 'hidden' class from all tasks
                Array.from(__e('.todo-list li')).forEach(function (item) {
                    item.classList.remove('hidden');
                });
            break;

            // Show only active tasks
            case '#/active':
                // Hide tasks with 'completed' class, show all others
                Array.from(__e('.todo-list li')).forEach(function (item) {
                    if (contains(Array.from(item.classList), 'completed')) {
                        item.classList.add('hidden');
                    } else {
                        item.classList.remove('hidden');
                    }
                });
            break;

            // Show only completed tasks
            case '#/completed':
                // Show tasks with 'completed' class, hide others
                Array.from(__e('.todo-list li')).forEach(function(item) {
                    if (contains(Array.from(item.classList), 'completed')) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            break;
        }
    }
    return show;
});
