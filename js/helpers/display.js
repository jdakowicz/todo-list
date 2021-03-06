define(function () {
    // function to swap views depends on selected filter
    function show (selectedFilter) {
        var allTasks = getArray(__e('.todo-list li'));

        switch (selectedFilter) {

        // Show all tasks
        default:
        // case '#/':
            // Remove 'hidden' class from all tasks
            allTasks.forEach(function (item) {
                item.classList.remove('hidden');
            });
            break;

        // Show only active tasks
        case '#/active':
            // Hide tasks with 'completed' class, show all others
            allTasks.forEach(function (item) {
                if (item.classList.contains('completed')) {
                    item.classList.add('hidden');
                } else {
                    item.classList.remove('hidden');
                }
            });
            break;

        // Show only completed tasks
        case '#/completed':
            // Show tasks with 'completed' class, hide others
            allTasks.forEach(function (item) {
                if (item.classList.contains('completed')) {
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
