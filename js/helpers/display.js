define(function () {
    var allTasks = Array.from(document.querySelectorAll('.todo-list li'));
    // helper function to check is item has specific class
    function contains (obj, target) {
        if (obj.indexOf(target) >= 0) {
            return true;
        }
        return false;
    }
    // function to swap views depends on selected filrter
    function show (selectedFilter) {
        switch (selectedFilter) {
            case 'all':
                allTasks.forEach(function(item) {
                    item.classList.remove('hidden');
                });
            break;

            case 'active':
                allTasks.forEach(function(item) {
                    if (contains(Array.from(item.classList), 'completed')) {
                        item.classList.add('hidden');
                    } else {
                        item.classList.remove('hidden');
                    }
                });
            break;

            case 'completed':
            allTasks.forEach(function(item) {
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
