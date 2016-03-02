define(['./display'], function (display) {
    return function () {
        // All filters
        var filtersButtons = document.querySelectorAll('.filters li a');
        // Specific filtees variables
        var filterAll;
        var filterActive;
        var filterComplete;
        // assign filters to variables
        function setFilters() {
            // Create array from object to check all items
            // Rework this later
            Array.from(filtersButtons).forEach(function (item) {
                if (item.getAttribute('href').replace('#/', '') === 'active') {
                    filterActive = item;
                    addHandler(item, 'active');
                    console.log('filterActive: ', filterActive);
                }
                if (item.getAttribute('href').replace('#/', '') === '') {
                    filterAll = item;
                    addHandler(item, 'all');
                    console.log('filterAll: ', filterAll);
                }
                if (item.getAttribute('href').replace('#/', '') === 'completed') {
                    filterComplete = item;
                    addHandler(item, 'completed');
                    console.log('filterComplete: ', filterComplete);
                }
            });
        }
        function resetFilters() {
            Array.from(document.querySelectorAll('.filters li a.selected')).forEach(function(item) {
                console.log('option selected: ', item);
                item.classList.remove('selected');
            });
        }
        function addHandler(item, displayOption) {
            item.addEventListener('click', function () {
                resetFilters();
                this.classList.add('selected');
                display(displayOption);
                console.log(this);
            });
        }
        setFilters();

    };
});
