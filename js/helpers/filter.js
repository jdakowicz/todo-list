define(['./display', './tasks'], function (display, tasks) {
    var filtersButtons = __e('.filters li a'),
        clearAll = _e('.clear-completed'),
        toggleAll = _e('.toggle-all');

    function checkAll () {
        // Checks if all tasks has same status based on 1st item
        return tasks.taskList.every(function (item) {
            return item.isComplete === tasks.taskList[0].isComplete;
        });
    }
    function addToggleAll () {
        toggleAll.addEventListener('click', function () {
            // FIXME fix checked state depending on situation
            // If all the same switch all of them
            if (checkAll()) {
                tasks.taskList.forEach(function (item, index) {
                    tasks.change(item, __e('.todo-list > li')[index]);
                });
            } else {
                tasks.taskList.forEach(function (item, index) {
                    if (item.isComplete === false) {
                        tasks.change(item, __e('.todo-list > li')[index]);
                    }
                });
            }
        });
    }
    // Remove class 'selected' from current filter button so we can change
    // to currently selected filter
    function resetActiveFilter () {
        // Removes 'selected' class from filter so we can change it to current
        _e('.filters li a.selected').classList.remove('selected');
    }

    // Add click handler to filter button
    function addHandler (item, displayOption) {
        // Add event on click
        item.addEventListener('click', function () {
            // Reset filters
            resetActiveFilter();
            // Add class to active filter
            item.classList.add('selected');
            // Show results depends on selected filter
            display(displayOption);
        });
    }
    // Add filters all/active/completed functionality
    function addFilters () {
        // Create array from object to add all items handler
        Array.from(filtersButtons).forEach(function (item) {
            addHandler(item, item.getAttribute('href'));
        });
    }
    // Add clear completed functionality
    function addClear () {
        clearAll.addEventListener('click', function () {
            var temp = tasks.taskList,
                listItem,
                i;
            /*
            For each item checks if it is 'completed' starting from the end
            Because
            > We start with i = 0
            > We remove one item on our way
            > Item with [i + 1] indexOf becames [i] and we miss it
            */
            for (i = temp.length - 1; i >= 0; i--) {
                // Get item with [i] index
                listItem = __e('.todo-list li')[i];
                // If it's completed remove it
                if (listItem.classList.contains('completed')) {
                    tasks.remove(tasks.taskList[i], listItem);
                }
            }
        });
    }
    // Initialize all filters
    function setFilters () {
        addFilters();
        addClear();
        addToggleAll();
    }
    setFilters();
    return;
});
