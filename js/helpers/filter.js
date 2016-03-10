define(['./display', './tasks'], function (display, tasks) {
    // All filters
    var filtersButtons = document.querySelectorAll('.filters li a');
    // Clear completed button
    var clearAll = document.querySelector('.clear-completed');

    // assign filters to variables
    function setFilters() {
        // Create array from object to check all items
        // Rework this later
        Array.from(filtersButtons).forEach(function (item) {
            if (item.getAttribute('href').replace('#/', '') === 'active') {
                addHandler(item, 'active');
            }
            if (item.getAttribute('href').replace('#/', '') === '') {
                addHandler(item, 'all');
            }
            if (item.getAttribute('href').replace('#/', '') === 'completed') {
                addHandler(item, 'completed');
            }
        });
        clearAll.addEventListener('click', function () {
            var temp = tasks.taskList;
            for (var i = temp.length - 1; i >= 0; i--) {
                var listItem = document.querySelectorAll('.todo-list li')[i];
                if (listItem.classList.contains('completed')) {
                    tasks.remove(tasks.taskList[i], listItem);
                }
            }
        });
    }

    // Remove class 'selected' from current filter button so we can change to currently selected filter
    function resetFilter() {
        document.querySelector('.filters li a.selected').classList.remove('selected');
    }

    // Add click handler to filter button
    function addHandler(item, displayOption) {
        item.addEventListener('click', function () {
            // Reset filters
            resetFilter();
            // Add clas to active filter
            this.classList.add('selected');
            // Show results depends on selected filter
            display(displayOption);
            console.log(displayOption);
        });
    }

    return setFilters;
});
